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

function speakText(text, lang = 'en-US', rate = 0.9) {
    if (!('speechSynthesis' in window)) { showToast('当前浏览器不支持语音朗读'); return; }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = rate;
    window.speechSynthesis.speak(utter);
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
    const wrap = document.getElementById('task-list');

    const total = list.length;
    const done = list.filter(t => t.completed).length;
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-done').textContent = done;
    document.getElementById('stat-pending').textContent = total - done;

    if (list.length === 0) {
        wrap.innerHTML = '<div class="task-empty">📝 暂无任务，添加一个开始吧</div>';
        return;
    }

    wrap.innerHTML = list.map((t, idx) => `
        <div class="task-item ${t.completed ? 'completed' : ''}">
            <input type="checkbox" ${t.completed ? 'checked' : ''} data-index="${idx}">
            <span class="task-subject-tag subject-${esc(t.subject)}">${esc(t.subject)}</span>
            <span class="task-label">${esc(t.text)}</span>
            <button class="btn btn-ghost" style="font-size:12px;padding:4px 12px;" data-del="${idx}">删除</button>
        </div>
    `).join('');

    wrap.querySelectorAll('input[type=checkbox]').forEach(cb => {
        cb.addEventListener('change', function() {
            const arr = JSON.parse(localStorage.getItem('taskList') || '[]');
            arr[this.dataset.index].completed = this.checked;
            localStorage.setItem('taskList', JSON.stringify(arr));
            loadTasks();
        });
    });
    wrap.querySelectorAll('[data-del]').forEach(btn => {
        btn.addEventListener('click', function() {
            const arr = JSON.parse(localStorage.getItem('taskList') || '[]');
            arr.splice(this.dataset.del, 1);
            localStorage.setItem('taskList', JSON.stringify(arr));
            loadTasks();
            showToast('任务已删除');
        });
    });
}

function addTask() {
    const subj = document.getElementById('task-subject').value;
    const text = document.getElementById('task-text').value.trim();
    if (!text) { showToast('请输入任务内容'); return; }
    const arr = JSON.parse(localStorage.getItem('taskList') || '[]');
    arr.push({ subject: subj, text: text, completed: false });
    localStorage.setItem('taskList', JSON.stringify(arr));
    document.getElementById('task-text').value = '';
    loadTasks();
    showToast('任务添加成功');
}

document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('task-text').addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
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
    const units = Object.keys(chineseData);
    ['chinese-unit-chars', 'chinese-unit-points', 'chinese-unit-sentences'].forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = units.map(u => `<option value="${esc(u)}">${esc(u)} · ${esc(chineseData[u].theme)}</option>`).join('');
    });
}
fillChineseUnits();

// 渲染生字词
function renderChineseChars() {
    const unit = document.getElementById('chinese-unit-chars').value;
    const data = chineseData[unit];
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
                    <div class="char-write-box">✍️ 在此练写</div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// 打印默写纸
function showPrintSheet() {
    const unit = document.getElementById('chinese-unit-chars').value;
    const data = chineseData[unit];
    if (!data) return;

    let allChars = [];
    data.lessons.forEach(lesson => {
        (lesson.characters || []).forEach(c => allChars.push(c));
    });

    const content = document.getElementById('printContent');
    content.innerHTML = `
        <div class="dictation-sheet">
            <h2>${esc(unit)}（${esc(data.theme)}）生字默写纸</h2>
            <div class="sheet-info">姓名：__________　日期：__________　成绩：__________</div>
            ${allChars.map((c, i) => `
                <div class="dictation-row">
                    <div class="dictation-pinyin">${esc(c.pinyin)}</div>
                    <div class="dictation-box"></div>
                </div>
            `).join('')}
        </div>
    `;
    document.getElementById('printModal').style.display = 'flex';
}

// 渲染重点讲解
function renderChinesePoints() {
    const unit = document.getElementById('chinese-unit-points').value;
    const data = chineseData[unit];
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
    const data = chineseData[unit];
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
    const units = Object.keys(mathData);
    ['math-unit-summary', 'math-unit-extension'].forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = units.map(u => `<option value="${esc(u)}">${esc(u)}</option>`).join('');
    });
}
fillMathUnits();

function renderMathSummary() {
    const unit = document.getElementById('math-unit-summary').value;
    const data = mathData[unit];
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
    const data = mathData[unit];
    const display = document.getElementById('math-extension-display');
    if (!data) { display.innerHTML = ''; return; }

    display.innerHTML = (data.extensions || []).map(e => `
        <div class="extension-card">
            <div class="ext-title">🏆 ${esc(e.title)}</div>
            <div class="ext-question">❓ ${esc(e.question)}</div>
            <div class="ext-analysis">${esc(e.analysis)}</div>
            <div class="ext-answer">${esc(e.answer)}</div>
        </div>
    `).join('');
}

document.getElementById('math-unit-summary').addEventListener('change', renderMathSummary);
document.getElementById('math-unit-extension').addEventListener('change', renderMathExtension);
renderMathSummary();
renderMathExtension();


/* ================================================================
 * 英语模块
 * ================================================================ */
function fillEnglishUnits() {
    const units = Object.keys(englishData);
    ['english-unit-summary', 'english-unit-sentences', 'english-unit-grammar'].forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = units.map(u => {
            const title = englishData[u].title ? ` (${englishData[u].title})` : '';
            return `<option value="${esc(u)}">${esc(u)}${esc(title)}</option>`;
        }).join('');
    });
}
fillEnglishUnits();

function renderEnglishSummary() {
    const unit = document.getElementById('english-unit-summary').value;
    const data = englishData[unit];
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
    const data = englishData[unit];
    const display = document.getElementById('english-sentences-display');
    if (!data) { display.innerHTML = ''; return; }

    display.innerHTML = (data.keySentences || []).map(s => `
        <div class="en-sentence-card">
            <span class="en-text">${esc(s)}</span>
            <button class="btn-read-small" data-audio="${esc(s)}">🔊 朗读</button>
        </div>
    `).join('');
    display.querySelectorAll('[data-audio]').forEach(btn => {
        btn.onclick = () => speakText(btn.dataset.audio);
    });
}

function renderEnglishGrammar() {
    const unit = document.getElementById('english-unit-grammar').value;
    const data = englishData[unit];
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
    sBox.innerHTML = todayData.sentences.map((item, i) => `
        <div class="sentence-card-box">
            <div class="sentence-text">${i + 1}. ${esc(item.text)}</div>
            <div class="sentence-source">—— ${esc(item.source)}</div>
            <button class="btn-read-small" data-audio="${esc(item.text)}">🔊 朗读</button>
        </div>
    `).join('');
    const wBox = document.getElementById('wordBox');
    wBox.innerHTML = todayData.goodWords.map(item => `
        <div class="word-item-box">
            <span class="word-en">${esc(item.word)}</span>
            <span class="word-example">${esc(item.example)}</span>
            <button class="btn-read-small" data-audio="${esc(item.example)}">🔊 朗读</button>
        </div>
    `).join('');
    document.querySelectorAll('[data-audio]').forEach(btn => {
        btn.onclick = () => speakText(btn.dataset.audio);
    });
}


/* ================================================================
 * 单词背诵
 * ================================================================ */
const nce1Data = (typeof window.nce1Data !== 'undefined') ? window.nce1Data : [];
const primary1000Data = (typeof window.primary1000Data !== 'undefined') ? window.primary1000Data : [];
const wordData = (typeof window.wordData !== 'undefined') ? window.wordData : [];

// 当前教材数据集
function getCurrentWordBook() {
    const bookSel = document.getElementById('book-select-words');
    const book = bookSel ? bookSel.value : 'textbook';
    if (book === 'nce1' && nce1Data.length) return nce1Data;
    if (book === 'primary1000' && primary1000Data.length) return primary1000Data;
    return wordData;
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
