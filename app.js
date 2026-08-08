/* ================================================================
 * 工具函数
 * ================================================================ */
function esc(str) {
    if (str == null) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}

function showToast(msg, duration = 2000) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

/* ================================================================
 * 语音朗读（双引擎方案）
 *
 * 问题根因：
 *   Chromium 内核浏览器（Chrome、华为、夸克、微信 WebView）
 *   在国内网络环境下无法连接 Google 的 TTS 云服务，
 *   speechSynthesis API 完全不可用。
 *   Edge（Microsoft 本地 TTS）和 Safari（Apple 本地 TTS）不受影响。
 *
 * 解决方案：
 *   1. 优先使用有道词典 TTS API（返回 MP3 音频，国内任何浏览器都能播放）
 *   2. 仅在无法使用有道 API 时（如本地文件打开、无网络）降级到 speechSynthesis
 *   3. 有道 API 支持英语和中文，URL 格式：
 *      - 英语：https://dict.youdao.com/dictvoice?audio=hello&type=2
 *      - 中文：https://dict.youdao.com/dictvoice?audio=你好&type=1
 * ================================================================ */
let _speakTimer = null;   // 保活定时器
let _isSpeaking = false;  // 朗读状态标记
let _currentAudio = null; // 当前播放的 audio 元素

/**
 * 检测是否可以用有道 TTS API
 * 条件：页面通过 HTTP/HTTPS 访问（非本地文件），且能访问网络
 */
function canUseYoudaoTTS() {
    return window.location.protocol === 'http:' || window.location.protocol === 'https:';
}

/**
 * 使用有道词典 TTS API 朗读
 * 通过 <audio> 元素播放 MP3 音频，兼容所有浏览器
 */
function speakWithYoudao(text, lang, rate) {
    // 停止当前播放
    if (_currentAudio) {
        _currentAudio.pause();
        _currentAudio.currentTime = 0;
        _currentAudio.src = '';  // 释放资源，防止旧音频继续加载
        _currentAudio = null;
    }

    const prefix = lang.toLowerCase().split('-')[0];
    // type=2 美式英语, type=1 英式英语/中文
    const type = (prefix === 'en') ? 2 : 1;
    const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=${type}&le=${prefix}`;

    const audio = new Audio();
    audio.preload = 'auto';
    _currentAudio = audio;
    _isSpeaking = false;
    let _playStarted = false;  // 防止重复 play()

    function tryPlay() {
        if (_playStarted || _currentAudio !== audio) return;
        _playStarted = true;
        audio.play().then(() => {
            _isSpeaking = true;
            audio.playbackRate = rate || 0.9;
        }).catch(err => {
            console.warn('有道 TTS play() 失败:', err);
            _currentAudio = null;
            _isSpeaking = false;
            speakWithBrowser(text, lang, rate);
        });
    }

    audio.oncanplaythrough = tryPlay;
    audio.onplay = () => { _isSpeaking = true; };
    audio.onended = () => { _isSpeaking = false; _currentAudio = null; };
    audio.onerror = () => {
        _isSpeaking = false;
        _currentAudio = null;
        console.warn('有道 TTS 播放失败，尝试降级到 speechSynthesis...');
        speakWithBrowser(text, lang, rate);
    };

    // 设置 src（放在事件绑定之后）
    audio.src = url;

    // 兜底：部分浏览器不触发 canplaythrough，1 秒后尝试播放
    setTimeout(tryPlay, 1000);
}

/**
 * 使用浏览器 speechSynthesis API 朗读（降级方案）
 * 适用于 Edge、Safari 等有本地 TTS 引擎的浏览器
 */
function speakWithBrowser(text, lang, rate) {
    if (!('speechSynthesis' in window)) return;

    if (_speakTimer) { clearInterval(_speakTimer); _speakTimer = null; }
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = rate || 0.9;
    utter.volume = 1;

    // 尝试选择本地语音
    const voices = window.speechSynthesis.getVoices();
    const prefix = lang.toLowerCase().split('-')[0];
    let bestVoice = null;
    if (prefix === 'en') {
        bestVoice = voices.find(v => v.localService && v.lang.toLowerCase().startsWith('en') && /microsoft/i.test(v.name));
        if (!bestVoice) bestVoice = voices.find(v => v.localService && v.lang.toLowerCase().startsWith('en'));
    } else if (prefix === 'zh') {
        bestVoice = voices.find(v => v.localService && v.lang.toLowerCase().startsWith('zh'));
    }
    if (!bestVoice) bestVoice = voices.find(v => v.localService);
    if (bestVoice) utter.voice = bestVoice;

    utter.onstart = () => {
        _isSpeaking = true;
        if (_speakTimer) clearInterval(_speakTimer);
        _speakTimer = setInterval(() => {
            if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }
        }, 10000);
    };
    utter.onend = () => {
        _isSpeaking = false;
        if (_speakTimer) { clearInterval(_speakTimer); _speakTimer = null; }
    };
    utter.onerror = (e) => {
        _isSpeaking = false;
        if (_speakTimer) { clearInterval(_speakTimer); _speakTimer = null; }
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
            console.warn('speechSynthesis 朗读错误:', e.error);
        }
    };

    window.speechSynthesis.speak(utter);
}

/**
 * 朗读入口函数
 * 自动选择最佳引擎：有道 TTS 优先，speechSynthesis 降级
 */
function speakText(text, lang = 'en-US', rate = 0.9) {
    // 停止当前播放
    if (_currentAudio) {
        _currentAudio.pause();
        _currentAudio = null;
    }
    if (_speakTimer) { clearInterval(_speakTimer); _speakTimer = null; }
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    // 朗读文本清理
    const cleanText = text.replace(/<[^>]*>/g, '')
                          .replace(/&amp;/gi, '&')
                          .replace(/&lt;/gi, '<')
                          .replace(/&gt;/gi, '>')
                          .replace(/&quot;/gi, '"')
                          .replace(/&#39;/gi, "'")
                          .replace(/&nbsp;/gi, ' ')
                          .trim();
    if (!cleanText) { showToast('朗读内容为空'); return; }

    // 选择引擎：有道 TTS 优先（HTTP/HTTPS 环境），speechSynthesis 降级
    if (canUseYoudaoTTS()) {
        speakWithYoudao(cleanText, lang, rate);
    } else {
        // 本地文件打开时，无法使用有道 API（跨域限制），降级到 speechSynthesis
        speakWithBrowser(cleanText, lang, rate);
    }
}

// 预加载语音列表（Chrome 异步加载，需监听 voiceschanged）
if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
        window.speechSynthesis.getVoices();
    });
}


/* ================================================================
 * 侧边栏遮罩交互
 * ================================================================ */
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
}

// 移动端菜单切换
document.getElementById('mobileMenuToggle')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// 点击遮罩关闭侧边栏
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}


/* ================================================================
 * 年级切换（4年级 ↔ 5年级）
 * ================================================================ */
let currentGrade = localStorage.getItem('currentGrade') || '4';
let _activeChineseData, _activeMathData, _activeEnglishData, _activeWordData;

function loadActiveData() {
    if (currentGrade === '5') {
        _activeChineseData = (typeof chineseData5 !== 'undefined') ? chineseData5 : chineseData;
        _activeMathData    = (typeof mathData5 !== 'undefined') ? mathData5 : mathData;
        _activeEnglishData = (typeof englishData5 !== 'undefined') ? englishData5 : englishData;
        _activeWordData    = (typeof window.wordData5 !== 'undefined') ? window.wordData5 : window.wordData;
    } else {
        _activeChineseData = chineseData;
        _activeMathData    = mathData;
        _activeEnglishData = englishData;
        _activeWordData    = window.wordData;
    }
}
loadActiveData();

function switchGrade(grade) {
    if (grade === currentGrade) return;
    currentGrade = grade;
    localStorage.setItem('currentGrade', grade);
    loadActiveData();

    // 切换年级按钮状态
    document.querySelectorAll('.grade-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.grade === grade);
    });

    // 更新页面标题
    const gradeLabel = grade === '5' ? '五年级上册' : '四年级上册';
    const titleChinese = document.querySelector('#page-chinese .page-title');
    const titleMath = document.querySelector('#page-math .page-title');
    const titleEnglish = document.querySelector('#page-english .page-title');
    if (titleChinese) titleChinese.innerHTML = '<span class="accent"></span>语文 · ' + gradeLabel;
    if (titleMath) titleMath.innerHTML = '<span class="accent"></span>数学 · ' + gradeLabel;
    if (titleEnglish) titleEnglish.innerHTML = '<span class="accent"></span>英语 · ' + gradeLabel;

    // 更新单词背诵教材选项（课本随年级切换，新概念/1000词是共用的）
    const textbookOption = document.querySelector('#book-select-words option[value="textbook"]');
    if (textbookOption) textbookOption.textContent = gradeLabel;
    // 重置教材下拉为当前年级课本，确保显示文本同步更新
    const bookSel = document.getElementById('book-select-words');
    if (bookSel) { bookSel.value = 'textbook'; bookSel.dispatchEvent(new Event('change')); }

    // 更新页面 title
    document.title = gradeLabel.replace('上册', '学习平台');

    // 重新填充所有下拉和内容
    fillChineseUnits();
    fillMathUnits();
    fillEnglishUnits();
    fillWordUnits();
    renderChineseChars();
    renderChinesePoints();
    renderChineseSentences();
    renderMathSummary();
    renderMathExtension();
    renderEnglishSummary();
    renderEnglishSentences();
    renderEnglishGrammar();
    renderWordPreview();

    // 更新首页学科卡片的描述
    updateSubjectCards();

    showToast(grade === '5' ? '已切换到五年级上册' : '已切换到四年级上册');
}

// 年级按钮绑定
document.querySelectorAll('.grade-tab').forEach(btn => {
    btn.addEventListener('click', () => switchGrade(btn.dataset.grade));
    if (btn.dataset.grade === currentGrade) btn.classList.add('active');
    else btn.classList.remove('active');
});

// 更新首页学科卡片描述
function updateSubjectCards() {
    const descs = {
        'chinese': currentGrade === '5' ? '8单元 · 24课' : '8单元 · 27课',
        'math': currentGrade === '5' ? '9单元' : '6单元',
        'english': currentGrade === '5' ? 'Starter + 10 Units' : 'Starter + 10 Units',
    };
    const chineseCard = document.querySelector('.subject-card[data-goto="page-chinese"] p:first-of-type');
    const mathCard = document.querySelector('.subject-card[data-goto="page-math"] p:first-of-type');
    if (chineseCard) chineseCard.textContent = descs.chinese;
    if (mathCard) mathCard.textContent = descs.math;
}

// 初始化年级按钮和标题
function initGradeUI() {
    document.querySelectorAll('.grade-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.grade === currentGrade);
    });
    // 初始化标题（如果用户上次选了五年级）
    const gradeLabel = currentGrade === '5' ? '五年级上册' : '四年级上册';
    const titleChinese = document.querySelector('#page-chinese .page-title');
    const titleMath = document.querySelector('#page-math .page-title');
    const titleEnglish = document.querySelector('#page-english .page-title');
    if (titleChinese) titleChinese.innerHTML = '<span class="accent"></span>语文 · ' + gradeLabel;
    if (titleMath) titleMath.innerHTML = '<span class="accent"></span>数学 · ' + gradeLabel;
    if (titleEnglish) titleEnglish.innerHTML = '<span class="accent"></span>英语 · ' + gradeLabel;
    const textbookOption = document.querySelector('#book-select-words option[value="textbook"]');
    if (textbookOption) textbookOption.textContent = gradeLabel;
    const bookSelInit = document.getElementById('book-select-words');
    if (bookSelInit) { bookSelInit.value = 'textbook'; bookSelInit.dispatchEvent(new Event('change')); }
    document.title = gradeLabel.replace('上册', '学习平台');
    updateSubjectCards();
}
initGradeUI();

/* ================================================================
 * 主导航菜单切换
 * ================================================================ */
function switchPage(pageId) {
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    document.querySelector(`.menu-item[data-page="${pageId}"]`)?.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId)?.classList.add('active');

    if (pageId === 'page-sentence') renderSentenceModule();

    // 移动端关闭菜单
    closeSidebar();
}

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => switchPage(item.dataset.page));
});

// 首页学科卡片点击跳转
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', () => switchPage(card.dataset.goto));
});


/* ================================================================
 * 首页：今日日期 + 任务管理
 * ================================================================ */
(function initHome() {
    const today = new Date();
    const weekDays = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    document.getElementById('todayDate').textContent =
        `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日 ${weekDays[today.getDay()]}`;
})();

function loadTasks() {
    const list = JSON.parse(localStorage.getItem('taskList') || '[]');

    const total = list.length;
    const done = list.filter(t => t.completed).length;
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-done').textContent = done;
    document.getElementById('stat-pending').textContent = total - done;

    // 按学科分组渲染
    const subjectKeyMap = { '语文': 'chinese', '数学': 'math', '英语': 'english' };
    Object.entries(subjectKeyMap).forEach(([subj, key]) => {
        const col = document.getElementById('task-list-' + key);
        if (!col) return;
        const items = list.map((t, i) => ({ ...t, _idx: i })).filter(t => t.subject === subj);
        if (items.length === 0) {
            col.innerHTML = '<div class="task-col-empty">暂无任务</div>';
            return;
        }
        col.innerHTML = items.map(t => `
            <div class="task-item ${t.completed ? 'completed' : ''}">
                <input type="checkbox" ${t.completed ? 'checked' : ''} data-index="${t._idx}">
                <span class="task-label">${esc(t.text)}</span>
                <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px;" data-del="${t._idx}">✕</button>
            </div>
        `).join('');
    });

    // 绑定事件
    document.querySelectorAll('.task-list-col input[type=checkbox]').forEach(cb => {
        cb.addEventListener('change', function() {
            const arr = JSON.parse(localStorage.getItem('taskList') || '[]');
            arr[this.dataset.index].completed = this.checked;
            localStorage.setItem('taskList', JSON.stringify(arr));
            loadTasks();
        });
    });
    document.querySelectorAll('.task-list-col [data-del]').forEach(btn => {
        btn.addEventListener('click', function() {
            const arr = JSON.parse(localStorage.getItem('taskList') || '[]');
            arr.splice(this.dataset.del, 1);
            localStorage.setItem('taskList', JSON.stringify(arr));
            loadTasks();
            showToast('任务已删除');
        });
    });
}

function addTask(subject) {
    const subjectKeyMap = { '语文': 'chinese', '数学': 'math', '英语': 'english' };
    const inputId = 'task-text-' + (subjectKeyMap[subject] || subject);
    const inputEl = document.getElementById(inputId);
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) { showToast('请输入任务内容'); return; }
    const arr = JSON.parse(localStorage.getItem('taskList') || '[]');
    arr.push({ subject: subject, text: text, completed: false });
    localStorage.setItem('taskList', JSON.stringify(arr));
    inputEl.value = '';
    loadTasks();
    showToast('任务添加成功');
}

// 三列添加按钮
document.querySelectorAll('[data-add-task]').forEach(btn => {
    btn.addEventListener('click', () => addTask(btn.dataset.addTask));
});
// 三列回车添加
const subjectKeyMap = { '语文': 'chinese', '数学': 'math', '英语': 'english' };
Object.entries(subjectKeyMap).forEach(([subj, key]) => {
    const input = document.getElementById('task-text-' + key);
    if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(subj); });
});
loadTasks();


/* ================================================================
 * 子标签页通用切换
 * ================================================================ */
function initSubTabs(tabSelector, panePrefix) {
    document.querySelectorAll(tabSelector).forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset[Object.keys(this.dataset)[0]];
            const group = this.closest('.sub-tabs');
            group.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const page = this.closest('.page');
            page.querySelectorAll('.sub-pane').forEach(p => p.classList.remove('active'));
            document.getElementById(tabId)?.classList.add('active');
        });
    });
}
document.querySelectorAll('.sub-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = Object.values(this.dataset)[0];
        const page = this.closest('.page');
        const tabs = page.querySelectorAll('.sub-tab');
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        page.querySelectorAll('.sub-pane').forEach(p => p.classList.remove('active'));
        document.getElementById(tabId)?.classList.add('active');
    });
});


/* ================================================================
 * 语文模块
 * ================================================================ */

// 填充语文单元下拉
function fillChineseUnits() {
    const units = Object.keys(_activeChineseData);
    ['chinese-unit-chars', 'chinese-unit-points', 'chinese-unit-sentences'].forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = units.map(u => `<option value="${esc(u)}">${esc(u)} · ${esc(_activeChineseData[u].theme)}</option>`).join('');
    });
}
fillChineseUnits();

// 渲染生字词
function renderChineseChars() {
    const unit = document.getElementById('chinese-unit-chars').value;
    const data = _activeChineseData[unit];
    const display = document.getElementById('chinese-chars-display');
    if (!data) { display.innerHTML = '<div class="empty-state"><div class="emoji">📝</div><div class="text">暂无数据</div></div>'; return; }

    display.innerHTML = data.lessons.map(lesson => `
        <div class="lesson-section-title">${esc(lesson.name)}</div>
        <div class="char-grid">
            ${(lesson.characters || []).map(c => `
                <div class="char-card">
                    <div>
                        <span class="char-word">${esc(c.word)}</span>
                        <span class="char-pinyin">${esc(c.pinyin)}</span>
                    </div>
                    <div class="char-meaning">${esc(c.meaning)}</div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// 打印默写纸（按课分页，田字格，A4横向）
function showPrintSheet() {
    const unit = document.getElementById('chinese-unit-chars').value;
    const data = _activeChineseData[unit];
    if (!data) return;

    const content = document.getElementById('printContent');
    let html = '';

    data.lessons.forEach((lesson, lessonIdx) => {
        const chars = lesson.characters || [];
        if (!chars.length) return;

        // 每课一页
        html += `<div class="dictation-page">`;
        html += `<div class="dictation-header">`;
        html += `<h2>${esc(lesson.name)} · 生字默写纸</h2>`;
        html += `<div class="sheet-info">姓名：__________　日期：__________　成绩：__________</div>`;
        html += `</div>`;

        // 田字格网格：每行放多个字，A4横向排列
        html += `<div class="tian-grid">`;
        chars.forEach(c => {
            html += `
                <div class="tian-cell">
                    <div class="tian-pinyin">${esc(c.pinyin)}</div>
                    <div class="tian-box">
                        <div class="tian-mi"></div>
                        <div class="tian-gong"></div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        html += `</div>`;
    });

    content.innerHTML = html;
    document.getElementById('printModal').style.display = 'flex';
}

// 渲染重点讲解
function renderChinesePoints() {
    const unit = document.getElementById('chinese-unit-points').value;
    const data = _activeChineseData[unit];
    const display = document.getElementById('chinese-points-display');
    if (!data) { display.innerHTML = ''; return; }

    display.innerHTML = data.lessons.map(lesson => `
        <div class="lesson-section-title">${esc(lesson.name)}</div>
        ${(lesson.keyPoints || []).map(p => `
            <div class="point-card">
                <div class="point-content">${esc(p)}</div>
            </div>
        `).join('')}
    `).join('');
}

// 渲染仿写造句
function renderChineseSentences() {
    const unit = document.getElementById('chinese-unit-sentences').value;
    const data = _activeChineseData[unit];
    const display = document.getElementById('chinese-sentences-display');
    if (!data) { display.innerHTML = ''; return; }

    display.innerHTML = data.lessons.map(lesson => `
        <div class="lesson-section-title">${esc(lesson.name)}</div>
        ${(lesson.goodSentences || []).map(s => `
            <div class="sentence-write-card">
                <div>
                    <span class="sw-word">★ ${esc(s.word)}</span>
                    <span class="sw-pattern">句式：${esc(s.pattern)}</span>
                </div>
                <div class="sw-example">📖 例句：${esc(s.example)}</div>
                <div class="sw-label">✍️ 请仿照上面的句式，自己写一句话：</div>
                <div style="margin-top:8px;border-bottom:2px dashed #d1d5db;height:32px;"></div>
            </div>
        `).join('')}
    `).join('');
}

// 绑定语文事件
document.getElementById('chinese-unit-chars').addEventListener('change', renderChineseChars);
document.getElementById('chinese-unit-points').addEventListener('change', renderChinesePoints);
document.getElementById('chinese-unit-sentences').addEventListener('change', renderChineseSentences);
document.getElementById('btn-print-chars').addEventListener('click', showPrintSheet);
document.getElementById('closePrintModal').addEventListener('click', () => document.getElementById('printModal').style.display = 'none');
document.getElementById('closePrintModal2').addEventListener('click', () => document.getElementById('printModal').style.display = 'none');

renderChineseChars();
renderChinesePoints();
renderChineseSentences();


/* ================================================================
 * 数学模块
 * ================================================================ */
function fillMathUnits() {
    const units = Object.keys(_activeMathData);
    ['math-unit-summary', 'math-unit-extension'].forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = units.map(u => `<option value="${esc(u)}">${esc(u)}</option>`).join('');
    });
}
fillMathUnits();

function renderMathSummary() {
    const unit = document.getElementById('math-unit-summary').value;
    const data = _activeMathData[unit];
    const display = document.getElementById('math-summary-display');
    if (!data) { display.innerHTML = ''; return; }

    display.innerHTML = (data.summary || []).map(s => `
        <div class="knowledge-card">
            <div class="kc-title">${esc(s.title)}</div>
            <div class="kc-content">${esc(s.content)}</div>
        </div>
    `).join('');
}

function renderMathExtension() {
    const unit = document.getElementById('math-unit-extension').value;
    const data = _activeMathData[unit];
    const display = document.getElementById('math-extension-display');
    if (!data) { display.innerHTML = ''; return; }

    // 兼容两种字段名：extensions（四年级）和 extension（五年级）
    const items = data.extensions || data.extension || [];
    display.innerHTML = items.map(e => {
        // 兼容两种数据格式：
        // 格式1（四年级）：{ title, question, analysis, answer }
        // 格式2（五年级）：{ title, content }
        if (e.question) {
            return `
                <div class="extension-card">
                    <div class="ext-title">🏆 ${esc(e.title)}</div>
                    <div class="ext-question">❓ ${esc(e.question)}</div>
                    <div class="ext-analysis">${esc(e.analysis)}</div>
                    <div class="ext-answer">${esc(e.answer)}</div>
                </div>
            `;
        } else {
            return `
                <div class="extension-card">
                    <div class="ext-title">🏆 ${esc(e.title)}</div>
                    <div class="kc-content">${esc(e.content)}</div>
                </div>
            `;
        }
    }).join('');
}

document.getElementById('math-unit-summary').addEventListener('change', renderMathSummary);
document.getElementById('math-unit-extension').addEventListener('change', renderMathExtension);
renderMathSummary();
renderMathExtension();


/* ================================================================
 * 英语模块
 * ================================================================ */
function fillEnglishUnits() {
    const units = Object.keys(_activeEnglishData);
    ['english-unit-summary', 'english-unit-sentences', 'english-unit-grammar'].forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = units.map(u => {
            const title = _activeEnglishData[u].title ? ` (${_activeEnglishData[u].title})` : '';
            return `<option value="${esc(u)}">${esc(u)}${esc(title)}</option>`;
        }).join('');
    });
}
fillEnglishUnits();

function renderEnglishSummary() {
    const unit = document.getElementById('english-unit-summary').value;
    const data = _activeEnglishData[unit];
    const display = document.getElementById('english-summary-display');
    if (!data) { display.innerHTML = ''; return; }

    display.innerHTML = (data.summary || []).map(s => `
        <div class="en-summary-card">
            <div class="es-title">📖 ${esc(s.title)}</div>
            <div class="es-content">${esc(s.content)}</div>
        </div>
    `).join('');
}

function renderEnglishSentences() {
    const unit = document.getElementById('english-unit-sentences').value;
    const data = _activeEnglishData[unit];
    const display = document.getElementById('english-sentences-display');
    if (!data) { display.innerHTML = ''; return; }

    const sentences = data.keySentences || [];
    display.innerHTML = sentences.map((s, i) => `
        <div class="en-sentence-card">
            <span class="en-text">${esc(s)}</span>
            <button class="btn-read-small" data-idx="${i}">🔊 朗读</button>
        </div>
    `).join('');
    display.querySelectorAll('.btn-read-small').forEach(btn => {
        const idx = parseInt(btn.dataset.idx);
        btn.onclick = () => speakText(sentences[idx]);
    });
}

function renderEnglishGrammar() {
    const unit = document.getElementById('english-unit-grammar').value;
    const data = _activeEnglishData[unit];
    const display = document.getElementById('english-grammar-display');
    if (!data) { display.innerHTML = ''; return; }

    display.innerHTML = (data.grammar || []).map(g => `
        <div class="grammar-card">
            <div class="g-title">📐 ${esc(g.title)}</div>
            <div class="g-content">${esc(g.content)}</div>
        </div>
    `).join('');
}

document.getElementById('english-unit-summary').addEventListener('change', renderEnglishSummary);
document.getElementById('english-unit-sentences').addEventListener('change', renderEnglishSentences);
document.getElementById('english-unit-grammar').addEventListener('change', renderEnglishGrammar);
renderEnglishSummary();
renderEnglishSentences();
renderEnglishGrammar();


/* ================================================================
 * 每日句子
 * ================================================================ */
const sentenceLibrary = [
    { sentences: [{ text: "The only way to do great work is to love what you do.", source: "Steve Jobs" }, { text: "Dream big and dare to fail.", source: "Norman Vaughan" }], goodWords: [{ word: "great", example: "She did a great job on her English test." }, { word: "dream", example: "My dream is to travel around the world." }, { word: "dare", example: "I dare to speak English in front of the class." }] },
    { sentences: [{ text: "Knowledge is power.", source: "Francis Bacon" }, { text: "Learning is a lifelong journey.", source: "Unknown" }], goodWords: [{ word: "knowledge", example: "We can get knowledge from books and teachers." }, { word: "learning", example: "English learning requires practice every day." }, { word: "journey", example: "Our life is a wonderful journey full of surprises." }] },
    { sentences: [{ text: "Where there is a will, there is a way.", source: "Proverb" }, { text: "Practice makes perfect.", source: "Proverb" }], goodWords: [{ word: "will", example: "She has a strong will to learn English well." }, { word: "practice", example: "Daily practice helps improve your pronunciation." }, { word: "perfect", example: "Nobody is perfect, but we can always improve." }] },
    { sentences: [{ text: "The best preparation for tomorrow is doing your best today.", source: "H. Jackson Brown Jr." }, { text: "You are never too old to learn.", source: "Proverb" }], goodWords: [{ word: "preparation", example: "Good preparation is the key to success." }, { word: "tomorrow", example: "I will finish my homework tomorrow morning." }, { word: "learn", example: "Children learn new things very quickly." }] },
    { sentences: [{ text: "Every child is an artist. The problem is how to remain an artist once we grow up.", source: "Pablo Picasso" }, { text: "Creativity is intelligence having fun.", source: "Albert Einstein" }], goodWords: [{ word: "artist", example: "My sister wants to be an artist in the future." }, { word: "creativity", example: "Drawing helps develop children's creativity." }, { word: "intelligence", example: "Reading books can increase your intelligence." }] }
];

function renderSentenceModule() {
    const todayStr = getTodayStr();
    const cacheKey = `dailySentence_${todayStr}`;
    let todayData = localStorage.getItem(cacheKey);
    if (!todayData) {
        const d = new Date();
        const idx = (d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate()) % sentenceLibrary.length;
        todayData = sentenceLibrary[idx];
        localStorage.setItem(cacheKey, JSON.stringify(todayData));
    } else {
        todayData = JSON.parse(todayData);
    }

    document.getElementById('dateInfo').textContent = `📅 ${todayStr} · 每日自动更换`;
    const sBox = document.getElementById('sentenceBox');
    const sentences = todayData.sentences;
    sBox.innerHTML = sentences.map((item, i) => `
        <div class="sentence-card-box">
            <div class="sentence-text">${i + 1}. ${esc(item.text)}</div>
            <div class="sentence-source">—— ${esc(item.source)}</div>
            <button class="btn-read-small" data-sidx="${i}">🔊 朗读</button>
        </div>
    `).join('');
    sBox.querySelectorAll('.btn-read-small').forEach(btn => {
        const idx = parseInt(btn.dataset.sidx);
        btn.onclick = () => speakText(sentences[idx].text);
    });
    const wBox = document.getElementById('wordBox');
    const goodWords = todayData.goodWords;
    wBox.innerHTML = goodWords.map((item, i) => `
        <div class="word-item-box">
            <span class="word-en">${esc(item.word)}</span>
            <span class="word-example">${esc(item.example)}</span>
            <button class="btn-read-small" data-widx="${i}">🔊 朗读</button>
        </div>
    `).join('');
    wBox.querySelectorAll('.btn-read-small').forEach(btn => {
        const idx = parseInt(btn.dataset.widx);
        btn.onclick = () => speakText(goodWords[idx].example);
    });
}


/* ================================================================
 * 单词背诵
 * ================================================================ */
const nce1Data = (typeof window.nce1Data !== 'undefined') ? window.nce1Data : [];
const primary1000Data = (typeof window.primary1000Data !== 'undefined') ? window.primary1000Data : [];
// _activeWordData 已在年级切换模块定义，此处不重复声明

// 当前教材数据集
function getCurrentWordBook() {
    const bookSel = document.getElementById('book-select-words');
    const book = bookSel ? bookSel.value : 'textbook';
    if (book === 'nce1' && nce1Data.length) return nce1Data;
    if (book === 'primary1000' && primary1000Data.length) return primary1000Data;
    return _activeWordData;
}

// 根据教材填充单元下拉
function fillWordUnits() {
    const sel = document.getElementById('unit-select-words');
    if (!sel) return;
    const data = getCurrentWordBook();
    if (!data || !data.length) {
        sel.innerHTML = '<option value="">暂无数据</option>';
        return;
    }
    const units = [...new Set(data.map(w => w.unit))];
    sel.innerHTML = units.map(u => `<option value="${esc(u)}">${esc(u)}</option>`).join('');
}

// 初始化填充
fillWordUnits();

// 教材切换时重新填充单元
document.getElementById('book-select-words')?.addEventListener('change', fillWordUnits);

let studyList = [],      // 当前单元全部单词（原始顺序，用于预览）
    readQueue = [],      // 背诵队列（随机打乱）
    writeList = [],      // 默写队列
    currentWord = null,
    studyMode = 'idle',  // idle | preview | read | write
    writeIndex = 0,
    totalWords = 0,
    answerChecked = false; // 默写时是否已核对过当前题

function updateProgress(current, total) {
    const pct = total > 0 ? (current / total) * 100 : 0;
    document.getElementById('progressBar').style.width = pct + '%';
}

/* ---- 选择单元后先预览全部单词 ---- */
document.getElementById('book-select-words')?.addEventListener('change', renderWordPreview);
document.getElementById('unit-select-words')?.addEventListener('change', renderWordPreview);

function renderWordPreview() {
    if (studyMode === 'read' || studyMode === 'write') return; // 背诵进行中不刷新
    const selUnit = document.getElementById('unit-select-words').value;
    const currentData = getCurrentWordBook();
    studyList = currentData.filter(w => w.unit === selUnit);
    const area = document.getElementById('word-area');
    if (studyList.length === 0) {
        area.innerHTML = '<div class="empty-state"><div class="emoji">📖</div><div class="text">该单元暂无单词</div></div>';
        return;
    }
    studyMode = 'preview';
    updateProgress(0, studyList.length);
    area.innerHTML = `
        <div class="word-preview-bar">
            <span>📋 本单元共 <strong>${studyList.length}</strong> 个单词，点击「开始背诵」进入随机复习 + 默写</span>
        </div>
        <div class="word-preview-grid">
            ${studyList.map(w => `
                <div class="word-preview-card">
                    <div class="wpv-word">${esc(w.word)}</div>
                    <div class="wpv-phonetic">${esc(w.phonetic || '')}</div>
                    <div class="wpv-pos">${esc(w.pos || '')}</div>
                    <div class="wpv-meaning">${esc(w.meaning || '')}</div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ---- 开始背诵 ---- */
document.getElementById('start-study')?.addEventListener('click', function() {
    const selUnit = document.getElementById('unit-select-words').value;
    const currentData = getCurrentWordBook();
    studyList = currentData.filter(w => w.unit === selUnit);
    if (studyList.length === 0) { showToast('该单元暂无单词数据'); return; }

    readQueue = [...studyList].sort(() => Math.random() - 0.5);
    writeList = [...studyList].sort(() => Math.random() - 0.5);
    totalWords = studyList.length;
    studyMode = 'read';
    writeIndex = 0;
    answerChecked = false;
    showNextWord();
});

/* ---- 背诵阶段：随机逐个展示 ---- */
function showNextWord() {
    if (studyMode !== 'read') return;
    if (readQueue.length === 0) {
        studyMode = 'write';
        writeIndex = 0;
        answerChecked = false;
        showToast('✅ 复习完成！进入默写模式', 2500);
        showWriteWord();
        return;
    }
    const studied = totalWords - readQueue.length;
    updateProgress(studied, totalWords);
    currentWord = readQueue[0];
    const pos = currentWord.pos || '';
    document.getElementById('word-area').innerHTML = `
        <div class="word-card">
            <div class="read-progress-tag">📖 复习 ${studied + 1} / ${totalWords}</div>
            <div class="word-title">${esc(currentWord.word)}</div>
            <div class="phonetic">${esc(currentWord.phonetic || '')}</div>
            ${pos ? `<span class="pos">${esc(pos)}</span>` : ''}
            <div class="meaning">${esc(currentWord.meaning || '')}</div>
            <div class="btn-group">
                <button class="btn btn-primary" id="btn-audio">🔊 朗读</button>
                <button class="btn btn-success" id="btn-know">✓ 认识，下一个</button>
                <button class="btn btn-warning" id="btn-unknow">↻ 不认识，再来</button>
            </div>
        </div>
    `;
    document.getElementById('btn-audio').addEventListener('click', () => speakText(currentWord.word, 'en-GB'));
    document.getElementById('btn-know').addEventListener('click', () => { readQueue.shift(); showNextWord(); });
    document.getElementById('btn-unknow').addEventListener('click', () => { const w = readQueue.shift(); readQueue.push(w); showNextWord(); });
}

/* ---- 默写阶段 ---- */
function showWriteWord() {
    if (writeIndex >= writeList.length) {
        updateProgress(totalWords, totalWords);
        document.getElementById('word-area').innerHTML = `
            <div class="word-card">
                <div style="font-size:48px;margin-bottom:16px;">🎉</div>
                <h3 style="font-size:22px;color:#10b981;">本单元默写全部完成！</h3>
                <p style="color:#6b7280;margin-top:8px;">错词已自动记录到下方「错词记录」表格</p>
                <button class="btn btn-primary" style="margin-top:20px;" id="btn-back-preview">↩ 返回单词列表</button>
            </div>
        `;
        document.getElementById('btn-back-preview')?.addEventListener('click', () => {
            studyMode = 'preview';
            renderWordPreview();
        });
        renderWrongRecordTable();
        return;
    }
    updateProgress(writeIndex, writeList.length);
    currentWord = writeList[writeIndex];
    answerChecked = false;
    document.getElementById('word-area').innerHTML = `
        <div class="word-card write-card">
            <h3>✍️ 汉译英默写（${writeIndex + 1} / ${writeList.length}）</h3>
            <p class="meaning-prompt">${esc(currentWord.meaning)}</p>
            <div class="write-box">
                <input type="text" class="answer-input" id="ans-input" placeholder="输入英文单词或短语，按 Enter 核对，再按 Enter 到下一题" autocomplete="off" autocapitalize="off">
            </div>
            <div class="btn-group" style="margin-top:20px;">
                <button class="btn btn-primary" id="btn-check">核对答案</button>
                <button class="btn btn-ghost" id="btn-skip">下一题 →</button>
            </div>
            <div class="check-tip" id="check-tip"></div>
            <div class="enter-hint" id="enter-hint"></div>
        </div>
    `;
    const input = document.getElementById('ans-input');
    input.focus();
    // Enter：第一次核对，第二次跳下一题
    input.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (!answerChecked) {
            checkAnswer();
        } else {
            writeIndex++;
            showWriteWord();
        }
    });
    document.getElementById('btn-check').addEventListener('click', checkAnswer);
    document.getElementById('btn-skip').addEventListener('click', () => {
        // 跳过也算错误，记录跳过未答的词
        if (!answerChecked) {
            saveWrongRecord(currentWord.word, '(未作答)');
        }
        writeIndex++;
        showWriteWord();
    });
}

function checkAnswer() {
    const inputEl = document.getElementById('ans-input');
    const input = inputEl.value.trim();
    const ans = currentWord.word;
    const tip = document.getElementById('check-tip');
    const hint = document.getElementById('enter-hint');
    if (!input) { showToast('请先输入答案'); return; }

    answerChecked = true;
    if (input.toLowerCase() === ans.toLowerCase()) {
        tip.className = 'check-tip correct';
        tip.textContent = '✅ 回答正确！';
        hint.textContent = '按 Enter 继续下一题';
        speakText(currentWord.word, 'en-GB');
    } else {
        tip.className = 'check-tip wrong';
        tip.textContent = `❌ 错误！正确答案：${ans}`;
        hint.textContent = '按 Enter 继续下一题';
        // 记录错词
        saveWrongRecord(ans, input);
    }
}

/* ---- 错词记录（localStorage 持久化） ---- */
function getWrongRecords() {
    return JSON.parse(localStorage.getItem('wrongWordRecords') || '[]');
}

function saveWrongRecord(correctWord, userInput) {
    const records = getWrongRecords();
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dateTime = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const selUnit = document.getElementById('unit-select-words').value;
    const bookSel = document.getElementById('book-select-words');
    const bookName = bookSel ? bookSel.options[bookSel.selectedIndex].text : '';

    // 如果同一个单词已经错过，累加错误次数并更新日期/输入
    const existing = records.find(r => r.correctWord === correctWord && r.unit === selUnit && r.book === bookName);
    if (existing) {
        existing.wrongCount++;
        existing.lastInput = userInput;
        existing.dateTime = dateTime;
    } else {
        records.push({
            book: bookName,
            unit: selUnit,
            correctWord: correctWord,
            wrongInput: userInput,
            lastInput: userInput,
            wrongCount: 1,
            dateTime: dateTime
        });
    }
    localStorage.setItem('wrongWordRecords', JSON.stringify(records));
}

/* ---- 渲染错词记录表格 ---- */
function renderWrongRecordTable() {
    const records = getWrongRecords();
    const wrap = document.getElementById('wrong-record-area');
    if (!wrap) return;

    if (records.length === 0) {
        wrap.innerHTML = '<div class="empty-state"><div class="emoji">🎯</div><div class="text">暂无错词记录，继续保持！</div></div>';
        return;
    }

    // 按错误次数降序
    records.sort((a, b) => b.wrongCount - a.wrongCount);

    wrap.innerHTML = `
        <div class="wrong-record-toolbar">
            <span class="wrong-record-info">📋 共 <strong>${records.length}</strong> 个错词记录</span>
            <button class="btn btn-success" id="btn-download-records">⬇ 下载记录 (CSV)</button>
            <button class="btn btn-ghost" id="btn-clear-records">🗑 清空记录</button>
        </div>
        <div class="table-scroll">
            <table class="record-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>教材</th>
                        <th>单元</th>
                        <th>正确单词</th>
                        <th>本次默写</th>
                        <th>错误次数</th>
                        <th>默写时间</th>
                    </tr>
                </thead>
                <tbody>
                    ${records.map((r, i) => `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${esc(r.book || '')}</td>
                            <td>${esc(r.unit || '')}</td>
                            <td class="cell-correct">${esc(r.correctWord)}</td>
                            <td class="cell-wrong">${esc(r.lastInput || '')}</td>
                            <td class="cell-count">${r.wrongCount}</td>
                            <td class="cell-date">${esc(r.dateTime || '')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    document.getElementById('btn-download-records')?.addEventListener('click', downloadWrongRecords);
    document.getElementById('btn-clear-records')?.addEventListener('click', () => {
        if (confirm('确定要清空所有错词记录吗？此操作不可撤销。')) {
            localStorage.removeItem('wrongWordRecords');
            renderWrongRecordTable();
            showToast('记录已清空');
        }
    });
}

/* ---- 下载CSV ---- */
function downloadWrongRecords() {
    const records = getWrongRecords();
    if (records.length === 0) { showToast('暂无记录可下载'); return; }
    records.sort((a, b) => b.wrongCount - a.wrongCount);
    // UTF-8 BOM 防止 Excel 乱码
    let csv = '\uFEFF序号,教材,单元,正确单词,本次默写输入,错误次数,默写时间\n';
    records.forEach((r, i) => {
        const row = [
            i + 1,
            r.book || '',
            r.unit || '',
            r.correctWord || '',
            r.lastInput || '',
            r.wrongCount,
            r.dateTime || ''
        ].map(field => {
            const s = String(field).replace(/"/g, '""');
            return `"${s}"`;
        });
        csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    a.download = `错词记录_${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('CSV 已下载');
}

// 初始渲染
renderWordPreview();
renderWrongRecordTable();


/* ================================================================
 * 自定义下拉选择器（支持长选项列表滚动选择）
 * ================================================================ */
class CustomSelect {
    constructor(selectEl) {
        this.select = selectEl;
        this.isOpen = false;

        // 创建包装器
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'custom-select';

        // 创建触发按钮
        this.trigger = document.createElement('div');
        this.trigger.className = 'custom-select-trigger';
        this.trigger.textContent = this._getSelectedText();

        // 创建选项面板
        this.optionsPanel = document.createElement('div');
        this.optionsPanel.className = 'custom-select-options';
        this._buildOptions();

        // 插入 DOM：把 select 包裹进 wrapper
        this.select.parentNode.insertBefore(this.wrapper, this.select);
        this.wrapper.appendChild(this.trigger);
        this.wrapper.appendChild(this.optionsPanel);
        this.select.style.display = 'none';
        this.wrapper.appendChild(this.select);

        // 点击触发器开关
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // 点击外部关闭
        document.addEventListener('click', (e) => {
            if (!this.wrapper.contains(e.target)) this.close();
        });

        // 触摸滑动关闭（防止穿透）
        document.addEventListener('touchstart', (e) => {
            if (this.isOpen && !this.wrapper.contains(e.target)) this.close();
        }, { passive: true });

        // 监听原生 select change（外部程序更新值时同步）
        this.select.addEventListener('change', () => {
            this.trigger.textContent = this._getSelectedText();
            this._buildOptions();
        });

        // MutationObserver 监听子元素变化（动态更新选项时同步）
        this._observer = new MutationObserver(() => {
            this._buildOptions();
            this.trigger.textContent = this._getSelectedText();
        });
        this._observer.observe(this.select, { childList: true });
    }

    _getSelectedText() {
        const opt = this.select.options[this.select.selectedIndex];
        return opt ? opt.textContent : '';
    }

    _buildOptions() {
        this.optionsPanel.innerHTML = '';
        Array.from(this.select.options).forEach(opt => {
            const el = document.createElement('div');
            el.className = 'custom-select-option' + (opt.selected ? ' selected' : '');
            el.textContent = opt.textContent;
            el.dataset.value = opt.value;
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                this._selectOption(opt.value);
            });
            this.optionsPanel.appendChild(el);
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        // 先关闭其他已打开的下拉
        document.querySelectorAll('.custom-select.open').forEach(el => el.classList.remove('open'));
        this.wrapper.classList.add('open');
        this.isOpen = true;

        // 检查底部空间，空间不足则上弹
        const rect = this.wrapper.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 250 && rect.top > 250) {
            this.wrapper.classList.add('dropup');
        } else {
            this.wrapper.classList.remove('dropup');
        }

        // 滚动到选中项
        const sel = this.optionsPanel.querySelector('.selected');
        if (sel) sel.scrollIntoView({ block: 'nearest' });
    }

    close() {
        this.wrapper.classList.remove('open', 'dropup');
        this.isOpen = false;
    }

    _selectOption(value) {
        this.select.value = value;
        this.select.dispatchEvent(new Event('change'));
        this.trigger.textContent = this._getSelectedText();
        this._buildOptions();
        this.close();
    }
}

// 初始化所有自定义下拉
function initCustomSelects() {
    document.querySelectorAll('select').forEach(sel => {
        if (!sel.closest('.custom-select')) {
            new CustomSelect(sel);
        }
    });
}

// 等所有选项填充完毕后初始化
initCustomSelects();
