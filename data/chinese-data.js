// ====================================================================
// 语文数据 - 统编版(五四���)四年级上册
// ====================================================================

const chineseData = {
  // ======== 第一单元：自然之美 ========
  "第一单元": {
    theme: "自然之美",
    lessons: [
      {
        name: "1. 观潮",
        // 1. 生字词
        characters: [
          { word: "潮", pinyin: "cháo", meaning: "潮水，海潮" },
          { word: "据", pinyin: "jù", meaning: "根据，据点" },
          { word: "堤", pinyin: "dī", meaning: "堤坝，大堤" },
          { word: "阔", pinyin: "kuò", meaning: "宽阔，广阔" },
          { word: "盼", pinyin: "pàn", meaning: "盼望，期盼" },
          { word: "滚", pinyin: "gǔn", meaning: "滚动，打滚" },
          { word: "顿", pinyin: "dùn", meaning: "顿时，停顿" },
          { word: "逐", pinyin: "zhú", meaning: "逐渐，追逐" },
          { word: "渐", pinyin: "jiàn", meaning: "渐渐，逐渐" },
          { word: "堵", pinyin: "dǔ", meaning: "堵住，一堵墙" },
          { word: "犹", pinyin: "yóu", meaning: "犹如，犹豫" },
          { word: "崩", pinyin: "bēng", meaning: "崩溃，山崩地裂" },
          { word: "震", pinyin: "zhèn", meaning: "震动，地震" },
          { word: "霎", pinyin: "shà", meaning: "霎时，一阵" },
          { word: "余", pinyin: "yú", meaning: "余波，剩余" }
        ],
        // 2. 重点内容讲解
        keyPoints: [
          "课文按时间顺序描写了钱塘江大潮的壮观景象，分为'潮来前—潮来时—潮去后'三个阶段。",
          "中心思想：通过描写钱塘江大潮的奇观，赞美了祖国壮丽的河山，激发热爱祖国的感情。",
          "写作手法：运用比喻（如'浪潮越来越近，犹如千万匹白色战马齐头并进'）和夸张（如'好像大地都被震得颤动起来'），生动形象。",
          "重点词语理解：'天下奇观'指天底下奇异的景象；'若隐若现'指隐隐约约，好像有又好像没有。"
        ],
        // 3. 好词仿写造句
        goodSentences: [
          { word: "人山人海", example: "节日广场上人山人海，热闹非凡。", pattern: "……人山人海……" },
          { word: "若隐若现", example: "远处的山峰在云雾中若隐若现，美丽极了。", pattern: "……若隐若现……" },
          { word: "漫天卷地", example: "狂风刮起，黄沙漫天卷地般扑面而来。", pattern: "……漫天卷地般……" }
        ]
      },
      {
        name: "2. 走月亮",
        characters: [
          { word: "淘", pinyin: "táo", meaning: "淘洗，淘气" },
          { word: "牵", pinyin: "qiān", meaning: "牵手，牵引" },
          { word: "鹅", pinyin: "é", meaning: "鹅卵石，白鹅" },
          { word: "卵", pinyin: "luǎn", meaning: "卵石，鹅卵石" },
          { word: "坑", pinyin: "kēng", meaning: "水坑，土坑" },
          { word: "洼", pinyin: "wā", meaning: "水洼，低洼" },
          { word: "填", pinyin: "tián", meaning: "填满，填写" },
          { word: "庄", pinyin: "zhuāng", meaning: "庄稼，村庄" },
          { word: "稼", pinyin: "jià", meaning: "庄稼" },
          { word: "俗", pinyin: "sú", meaning: "风俗，习俗" },
          { word: "跃", pinyin: "yuè", meaning: "跳跃，飞跃" },
          { word: "萄", pinyin: "táo", meaning: "葡萄" },
          { word: "萄", pinyin: "táo", meaning: "葡萄" },
          { word: "稻", pinyin: "dào", meaning: "水稻，稻田" },
          { word: "穗", pinyin: "suì", meaning: "稻穗，麦穗" }
        ],
        keyPoints: [
          "课文以'走月亮'为线索，描绘了'我'和阿妈在月光下散步的情景，展现了乡村月夜的宁静优美。",
          "中心思想：表达了作者对家乡的热爱和对母亲的深情。",
          "写作手法：多感官描写——视觉（月光、溪水）、听觉（秋虫鸣叫）、嗅觉（果子的甜香），营造身临其境之感。",
          "'我和阿妈走月亮'在文中多次出现，是贯穿全文的线索，反复出现强化了温馨的母爱主题。"
        ],
        goodSentences: [
          { word: "细细的溪水", example: "细细的溪水流淌着，像一条银色的丝带在山间蜿蜒。", pattern: "……像一条……的……" },
          { word: "月光闪闪", example: "月光闪闪的溪岸上，传来了一阵阵欢笑声。", pattern: "月光闪闪的……" },
          { word: "稻穗低垂", example: "秋天到了，稻穗低垂着头，好像在向人们鞠躬。", pattern: "……低垂着头……" }
        ]
      },
      {
        name: "3. 现代诗二首",
        characters: [
          { word: "巢", pinyin: "cháo", meaning: "鸟巢，巢穴" },
          { word: "苇", pinyin: "wěi", meaning: "芦苇，苇塘" },
          { word: "罗", pinyin: "luó", meaning: "罗列" }
        ],
        keyPoints: [
          "《秋晚的江上》：描写了归鸟、斜阳、江面等意象，展现了一幅倦鸟归巢的秋日傍晚图景，意境优美。",
          "《花牛歌》：通过花牛在草地上的各种姿态（坐、眠、走、做梦），展现了田园生活的悠闲惬意。",
          "现代诗特点：不拘泥于格律，注重意境的营造和情感的抒发，语言清新自然。",
          "修辞手法：拟人——'双翅一翻，把斜阳掉在江上'，赋予鸟儿灵动的姿态。"
        ],
        goodSentences: [
          { word: "倦鸟归巢", example: "傍晚时分，倦鸟归巢，夕阳染红了半边天。", pattern: "……倦鸟归巢……" },
          { word: "芦苇摇曳", example: "微风吹过，芦苇摇曳生姿，好像在跳舞。", pattern: "……摇曳生姿……" },
          { word: "白云悠悠", example: "蓝天上白云悠悠地飘着，像一群洁白的绵羊。", pattern: "……白云悠悠……" }
        ]
      },
      {
        name: "4*. 繁星",
        characters: [
          { word: "昧", pinyin: "mèi", meaning: "暧昧，半明半昧" },
          { word: "坠", pinyin: "zhuì", meaning: "坠落，下坠" },
          { word: "怀", pinyin: "huái", meaning: "怀抱，怀念" }
        ],
        keyPoints: [
          "作者巴金，课文回忆了在不同时期、不同地方观繁星的感受，表达了作者对星空的热爱和对美好生活的向往。",
          "三次看星：从前在家乡庭院→三年前在南京菜园→如今在海上舱面，感受一次比一次深切。",
          "写作手法：由景生情，将星星拟人化（'我望着那许多认识的星，我仿佛看见它们在对我眨眼'），表达亲切温暖之情。",
          "'繁星'意为密密麻麻的星星，象征美好与希望。"
        ],
        goodSentences: [
          { word: "密密麻麻", example: "夜空中的繁星密密麻麻，好像无数颗宝石镶嵌在天幕上。", pattern: "……密密麻麻……" },
          { word: "半明半昧", example: "云层中的星星半明半昧，像顽皮的孩子在捉迷藏。", pattern: "……半明半昧……" },
          { word: "摇摇欲坠", example: "成熟的苹果挂在枝头，摇摇欲坠，等待着被采摘。", pattern: "……摇摇欲坠……" }
        ]
      }
    ]
  },

  // ======== 第二单元：提问策略 ========
  "第二单元": {
    theme: "提问策略",
    lessons: [
      {
        name: "5. 一个豆荚里的五粒豆",
        characters: [
          { word: "荚", pinyin: "jiá", meaning: "豆荚" },
          { word: "按", pinyin: "àn", meaning: "按照，按住" },
          { word: "僵", pinyin: "jiāng", meaning: "僵硬，僵持" },
          { word: "硬", pinyin: "yìng", meaning: "坚硬，强硬" },
          { word: "预", pinyin: "yù", meaning: "预习，预测" },
          { word: "揭", pinyin: "jiē", meaning: "揭示，揭开" },
          { word: "啪", pinyin: "pā", meaning: "啪的一声" },
          { word: "苔", pinyin: "tái", meaning: "青苔，苔藓" },
          { word: "囚", pinyin: "qiú", meaning: "囚犯，囚禁" },
          { word: "框", pinyin: "kuàng", meaning: "窗框，框架" },
          { word: "溢", pinyin: "yì", meaning: "洋溢，溢出" }
        ],
        keyPoints: [
          "作者安徒生（丹麦），课文讲述了一个豆荚里五粒豆的不同命运，赞美了平凡的生活中最有意义的人生。",
          "五粒豆的不同选择：第一粒想飞向世界→落进屋顶水笺；第二、三粒想飞得最远→被鸽子吃掉；第四粒落进臭水沟；第五粒落在窗台裂缝里→发芽开花，给生病的小女孩带来希望和快乐。",
          "中心思想：生命的价值不在于追求虚幻的目标，而在于给他人带来温暖和希望。",
          "写作手法：对比——五粒豆的理想和结局形成鲜明对比，突出第五粒豆的平凡而伟大。"
        ],
        goodSentences: [
          { word: "豆荚", example: "秋天到了，豆荚里的豆子已经成熟，等待着人们来收割。", pattern: "……豆荚……" },
          { word: "洋溢", example: "节日的校园里洋溢着欢乐的笑声，每个孩子的脸上都绽开了笑容。", pattern: "……洋溢着……" },
          { word: "温暖", example: "阳光透过窗户照进来，温暖了整个房间，也温暖了我的心。", pattern: "……温暖了……" }
        ]
      },
      {
        name: "6. 夜间飞行的秘密",
        characters: [
          { word: "即", pinyin: "jí", meaning: "即使，即将" },
          { word: "程", pinyin: "chéng", meaning: "路程，行程" },
          { word: "驾", pinyin: "jià", meaning: "驾驶，驾车" },
          { word: "驶", pinyin: "shǐ", meaning: "行驶，驾驶" },
          { word: "萤", pinyin: "yíng", meaning: "萤火虫" },
          { word: "蚊", pinyin: "wén", meaning: "蚊子，蚊虫" },
          { word: "即", pinyin: "jí", meaning: "即使" },
          { word: "科", pinyin: "kē", meaning: "科学，科目" },
          { word: "横", pinyin: "héng", meaning: "横七竖八" },
          { word: "绳", pinyin: "shéng", meaning: "绳子，绳索" },
          { word: "系", pinyin: "jì", meaning: "系铃铛" },
          { word: "蝇", pinyin: "yíng", meaning: "苍蝇" },
          { word: "证", pinyin: "zhèng", meaning: "证明，证据" },
          { word: "研", pinyin: "yán", meaning: "研究，钻研" },
          { word: "究", pinyin: "jiū", meaning: "研究，究竟" },
          { word: "驾", pinyin: "jià", meaning: "驾驶" }
        ],
        keyPoints: [
          "课文介绍了科学家通过反复研究，揭开了蝙蝠夜间飞行的秘密，并从中得到启示发明了雷达。",
          "科学实验过程：蒙眼→塞耳→封嘴，证明蝙蝠靠耳朵探路→进一步发现蝙蝠靠嘴发出超声波，耳朵接收回声。",
          "蝙蝠和雷达的原理对比：蝙蝠（嘴发出超声波→障碍物反射→耳朵接收）= 雷达（天线发出无线电波→障碍物反射→天线接收）。",
          "中心思想：人类可以从大自然中获得启示，通过科学研究改善生活。"
        ],
        goodSentences: [
          { word: "反复研究", example: "科学家们反复研究这个问题，终于找到了解决的方法。", pattern: "……反复研究……" },
          { word: "灵巧", example: "蝙蝠灵巧地在夜空中飞行，绝不会碰到任何障碍物。", pattern: "……灵巧地……" },
          { word: "配合", example: "雷达的天线和显示屏密切配合，帮助飞机安全飞行。", pattern: "……密切配合……" }
        ]
      },
      {
        name: "7. 呼风唤雨的世纪",
        characters: [
          { word: "唤", pinyin: "huàn", meaning: "呼唤，叫唤" },
          { word: "纪", pinyin: "jì", meaning: "世纪，纪念" },
          { word: "技", pinyin: "jì", meaning: "技术，科技" },
          { word: "核", pinyin: "hé", meaning: "核心，核对" },
          { word: "奥", pinyin: "ào", meaning: "奥妙，深奥" },
          { word: "益", pinyin: "yì", meaning: "日益，利益" },
          { word: "联", pinyin: "lián", meaning: "联系，关联" },
          { word: "质", pinyin: "zhì", meaning: "质量，物质" },
          { word: "哲", pinyin: "zhé", meaning: "哲学，哲人" },
          { word: "任", pinyin: "rèn", meaning: "任何，担任" },
          { word: "善", pinyin: "shàn", meaning: "善于，改善" },
          { word: "超", pinyin: "chāo", meaning: "超越，超过" }
        ],
        keyPoints: [
          "课文介绍了20世纪科学技术给人类生活带来的巨大变化，赞美了科技的巨大力量。",
          "古今对比：古代靠'千里眼''顺风耳'等神话幻想→现代有电视、电话、互联网等科技实现了这些幻想。",
          "'呼风唤雨'本指神仙道士呼唤风雨的法术，课文中比喻人类利用科技来控制和改变自然。",
          "中心思想：科学技术改变了人类的生活，使人类'呼风唤雨'的愿望变成了现实。"
        ],
        goodSentences: [
          { word: "呼风唤雨", example: "现代科技的发展让人类拥有了呼风唤雨般的力量。", pattern: "……呼风唤雨般……" },
          { word: "日新月异", example: "这座城市日新月异，每个月都有新的变化。", pattern: "……日新月异……" },
          { word: "出乎意料", example: "比赛的结果出乎所有人的意料，弱队居然赢了冠军。", pattern: "……出乎意料……" }
        ]
      },
      {
        name: "8*. 蝴蝶的家",
        characters: [
          { word: "避", pinyin: "bì", meaning: "躲避，避开" },
          { word: "撼", pinyin: "hàn", meaning: "震撼，震撼人心" },
          { word: "喧", pinyin: "xuān", meaning: "喧闹，喧哗" },
          { word: "雀", pinyin: "què", meaning: "麻雀，欢呼雀跃" }
        ],
        keyPoints: [
          "课文以问题为线索，描写了'我'为蝴蝶在暴风雨中找家而焦急的心情，表现了作者对弱小生命的关爱。",
          "思考过程：蝴蝶的家在哪里？→麦田？不对，蝴蝶飞不起来→松林？也不对→石头下面？也不像→最终没有找到答案，但充满着美好的牵挂。",
          "中心思想：表达了对小生命的关爱和善良的心地，以及对自然的细腻观察。",
          "提问策略：从不同角度提问——蝴蝶的家到底在哪里？为什么'我'这么关心？"
        ],
        goodSentences: [
          { word: "躲避", example: "下大雨了，小蚂蚁们纷纷躲避到洞穴里去了。", pattern: "……躲避到……" },
          { word: "震撼", example: "狂风暴雨的声音震撼着大地，好像要把一切都吞没。", pattern: "……震撼着……" },
          { word: "雀跃", example: "听到放假的消息，同学们欢呼雀跃，开心极了。", pattern: "……欢呼雀跃……" }
        ]
      }
    ]
  },

  // ======== 第三单元：连续观察 ========
  "第三单元": {
    theme: "连续观察",
    lessons: [
      {
        name: "9. 古诗三首",
        characters: [
          { word: "暮", pinyin: "mù", meaning: "暮色，暮江吟" },
          { word: "瑟", pinyin: "sè", meaning: "瑟瑟" },
          { word: "缘", pinyin: "yuán", meaning: "因为，缘由" },
          { word: "降", pinyin: "xiáng", meaning: "投降" },
          { word: "骚", pinyin: "sāo", meaning: "风骚" },
          { word: "搁", pinyin: "gē", meaning: "搁置" },
          { word: "逊", pinyin: "xùn", meaning: "逊色" }
        ],
        keyPoints: [
          "《暮江吟》（白居易）：'一道残阳铺水中，半江瑟瑟半江红。可怜九月初三夜，露似真珠月似弓。'描绘了从傍晚到夜晚的江面美景。",
          "《题西林壁》（苏轼）：'横看成岭侧成峰，远近高低各不同。不识庐山真面目，只缘身在此山中。'蕴含哲理——当局者迷，旁观者清。",
          "《雪梅》（卢钺）：'梅雪争春未肯降，骚人搁笔费评章。梅须逊雪三分白，雪却输梅一段香。'告诉我们人各有所长，也各有所短。",
          "古诗学习方法：知作者→解诗题→明诗意→悟诗情。"
        ],
        goodSentences: [
          { word: "残阳如血", example: "傍晚时分，残阳如血般染红了天际，美得让人心醉。", pattern: "……残阳如血般……" },
          { word: "当局者迷", example: "做事情要听取别人的意见，因为当局者迷，旁观者清。", pattern: "……当局者迷……" },
          { word: "各有所长", example: "每个人都有自己的优点和缺点，正所谓各有所长，各有所短。", pattern: "……各有所长……" }
        ]
      },
      {
        name: "10. 爬山虎的脚",
        characters: [
          { word: "操", pinyin: "cāo", meaning: "操场" },
          { word: "嫩", pinyin: "nèn", meaning: "嫩绿，嫩芽" },
          { word: "舒", pinyin: "shū", meaning: "舒服，舒展" },
          { word: "顺", pinyin: "shùn", meaning: "顺利，顺眼" },
          { word: "均", pinyin: "jūn", meaning: "均匀，平均" },
          { word: "叠", pinyin: "dié", meaning: "重叠，叠加" },
          { word: "隙", pinyin: "xì", meaning: "空隙，缝隙" },
          { word: "茎", pinyin: "jīng", meaning: "根茎，茎叶" },
          { word: "柄", pinyin: "bǐng", meaning: "叶柄" },
          { word: "萎", pinyin: "wěi", meaning: "枯萎" },
          { word: "瞧", pinyin: "qiáo", meaning: "瞧见" },
          { word: "固", pinyin: "gù", meaning: "牢固，坚固" }
        ],
        keyPoints: [
          "作者叶圣陶，课文通过细致连续的观察，介绍了爬山虎的脚的形状、位置以及它是怎样爬墙的。",
          "爬山虎的脚：长在茎上，长叶柄的地方，反面伸出枝状的六七根细丝（像蜗牛的触角）。",
          "爬墙过程：细丝触墙→变成小圆片（巴住墙）→细丝弯曲→把嫩茎拉一把，使它紧贴在墙上。",
          "写作特色：观察细致，用词准确（如'巴''拉''贴'），按顺序描写（先位置后动作）。"
        ],
        goodSentences: [
          { word: "嫩绿", example: "春天来了，柳枝上冒出了嫩绿的新芽，充满了生机。", pattern: "……嫩绿的……" },
          { word: "均匀", example: "爬山虎的叶子均匀地铺满了整面墙，不留一点儿空隙。", pattern: "……均匀地……" },
          { word: "牢固", example: "这座桥建得非常牢固，已经使用了一百多年了。", pattern: "……牢固……" }
        ]
      },
      {
        name: "11. 蟋蟀的住宅",
        characters: [
          { word: "宅", pinyin: "zhái", meaning: "住宅，宅院" },
          { word: "临", pinyin: "lín", meaning: "临时，面临" },
          { word: "慎", pinyin: "shèn", meaning: "慎重，谨慎" },
          { word: "选", pinyin: "xuǎn", meaning: "选择，挑选" },
          { word: "择", pinyin: "zé", meaning: "选择" },
          { word: "址", pinyin: "zhǐ", meaning: "地址，住址" },
          { word: "良", pinyin: "liáng", meaning: "良好，优良" },
          { word: "穴", pinyin: "xué", meaning: "巢穴，洞穴" },
          { word: "厅", pinyin: "tīng", meaning: "大厅，客厅" },
          { word: "卧", pinyin: "wò", meaning: "卧室" },
          { word: "寸", pinyin: "cùn", meaning: "尺寸，一寸" },
          { word: "卫", pinyin: "wèi", meaning: "卫生，保卫" },
          { word: "较", pinyin: "jiào", meaning: "比较，较量" }
        ],
        keyPoints: [
          "作者法国昆虫学家法布尔，课文介绍了蟋蟀住宅的特点以及它是怎样建造住宅的。",
          "住宅特点：向阳、干燥、隐蔽；有门（出口）、有平台（门口）；内部墙壁光滑、清洁干燥。",
          "建造过程：选择地点→挖掘（用前足扒、用钳子搬）→长时间修整。",
          "中心思想：蟋蟀不利用现成的洞穴，靠自己辛勤劳动建造住宅，体现了它吃苦耐劳、不肯随遇而安的精神。",
          "写作特色：拟人手法（把蟋蟀当作人写，如'建筑大师''大厅'），生动有趣。"
        ],
        goodSentences: [
          { word: "随遇而安", example: "蟋蟀不肯随遇而安，它一定要自己建造一个舒适的住宅。", pattern: "……随遇而安……" },
          { word: "毫不迟疑", example: "面对困难，他毫不迟疑地冲了上去，帮助了需要帮助的人。", pattern: "……毫不迟疑……" },
          { word: "小心翼翼", example: "小蚂蚁小心翼翼地搬运着食物，生怕弄掉了。", pattern: "……小心翼翼地……" }
        ]
      }
    ]
  },

  // ======== 第四单元：神话传说 ========
  "第四单元": {
    theme: "神话传说",
    lessons: [
      {
        name: "12. 盘古开天地",
        characters: [
          { word: "睁", pinyin: "zhēng", meaning: "睁开" },
          { word: "翻", pinyin: "fān", meaning: "翻身，翻动" },
          { word: "斧", pinyin: "fǔ", meaning: "斧头" },
          { word: "劈", pinyin: "pī", meaning: "劈开，劈柴" },
          { word: "缓", pinyin: "huǎn", meaning: "缓慢，缓缓" },
          { word: "浊", pinyin: "zhuó", meaning: "浑浊" },
          { word: "丈", pinyin: "zhàng", meaning: "一丈，丈量" },
          { word: "撑", pinyin: "chēng", meaning: "支撑，撑开" },
          { word: "竭", pinyin: "jié", meaning: "竭力，尽心竭力" },
          { word: "累", pinyin: "lèi", meaning: "劳累" },
          { word: "血", pinyin: "xuè", meaning: "血液" },
          { word: "液", pinyin: "yè", meaning: "液体" },
          { word: "奔", pinyin: "bēn", meaning: "奔腾" },
          { word: "茂", pinyin: "mào", meaning: "茂盛" },
          { word: "滋", pinyin: "zī", meaning: "滋润" }
        ],
        keyPoints: [
          "课文讲述了中国神话故事：盘古开天辟地，用身体化作世间万物的壮举。",
          "故事脉络：宇宙混沌如大鸡蛋→盘古醒来劈开天地→天升高地加厚→盘古顶天立地→盘古倒下，身体化作万物。",
          "身体变化：气息=风云，声音=雷声，双眼=日月，四肢=东西南北四极，肌肤=大地，血液=江河，汗毛=花草树木，汗水=雨露。",
          "中心思想：赞美盘古无私奉献、开创新世界的精神。",
          "想象奇特是神话的最大特点。"
        ],
        goodSentences: [
          { word: "混沌一片", example: "传说很久以前，天地还没有分开，宇宙间混沌一片。", pattern: "……混沌一片……" },
          { word: "顶天立地", example: "盘古顶天立地，用身体支撑着天地整整一万八千年。", pattern: "……顶天立地……" },
          { word: "茂盛", example: "春雨过后，田野里的庄稼长得更加茂盛了。", pattern: "……茂盛……" }
        ]
      },
      {
        name: "13. 精卫填海",
        characters: [
          { word: "帝", pinyin: "dì", meaning: "皇帝，帝王" },
          { word: "曰", pinyin: "yuē", meaning: "叫作，说" },
          { word: "溺", pinyin: "nì", meaning: "溺水，淹没" },
          { word: "返", pinyin: "fǎn", meaning: "返回，往返" },
          { word: "衔", pinyin: "xián", meaning: "衔接，衔着" }
        ],
        // 注：此处保存文言文原文翻译和注释
        keyPoints: [
          "选自《山海经·北山经》，是一篇文言文神话故事。",
          "原文：'炎帝之少女，名曰女娃。女娃游于东海，溺而不返，故为精卫。常衔西山之木石，以堙于东海。'",
          "译文：炎帝的小女儿，名叫女娃。女娃在东海游玩，溺水身亡没有回来，因此变成了精卫鸟。精卫鸟经常衔着西山上的树枝和石子，用来填塞东海。",
          "中心思想：赞美精卫坚韧不拔、不屈不挠的精神，表达了远古人类战胜自然的渴望。",
          "文言文学习：'之'=的；'曰'=叫做；'溺'=溺水淹没；'为'=变成；'以'=用来。"
        ],
        goodSentences: [
          { word: "坚韧不拔", example: "面对困难，我们要有精卫填海般坚韧不拔的意志。", pattern: "……坚韧不拔……" },
          { word: "锲而不舍", example: "他锲而不舍地研究这个问题，终于取得了成功。", pattern: "……锲而不舍地……" },
          { word: "永不放弃", example: "不管遇到多大的困难，我们都永不放弃。", pattern: "……永不放弃……" }
        ]
      },
      {
        name: "14. 普罗米修斯",
        characters: [
          { word: "斯", pinyin: "sī", meaning: "普罗米修斯" },
          { word: "败", pinyin: "bài", meaning: "失败" },
          { word: "惩", pinyin: "chéng", meaning: "惩罚" },
          { word: "佩", pinyin: "pèi", meaning: "敬佩，钦佩" },
          { word: "抗", pinyin: "kàng", meaning: "抵抗，抗争" },
          { word: "锁", pinyin: "suǒ", meaning: "锁住" },
          { word: "既", pinyin: "jì", meaning: "既然" },
          { word: "狠", pinyin: "hěn", meaning: "凶狠，狠心" },
          { word: "著", pinyin: "zhe", meaning: "显著" },
          { word: "愤", pinyin: "fèn", meaning: "愤怒" },
          { word: "获", pinyin: "huò", meaning: "获得" }
        ],
        keyPoints: [
          "希腊神话故事，讲述了普罗米修斯为人类盗取天火，受到宙斯严厉惩罚但绝不屈服的故事。",
          "故事脉络：人类没有火→普罗米修斯盗火→人类文明进步→宙斯惩罚（锁在高加索山上，鹫鹰啄食肝脏）→赫拉克勒斯解救。",
          "中心思想：赞美普罗米修斯为人类幸福不畏强暴、勇于牺牲的英雄精神。",
          "人物形象：普罗米修斯——善良、勇敢、坚强不屈；宙斯——冷酷、残忍、专制。"
        ],
        goodSentences: [
          { word: "气急败坏", example: "看到自己的计划失败了，他气急败坏地摔门而去。", pattern: "……气急败坏……" },
          { word: "决不屈服", example: "面对敌人的威胁，他决不屈服，表现出了英雄气概。", pattern: "……决不屈服……" },
          { word: "毫不犹豫", example: "看到有人落水，他毫不犹豫地跳进了河里救人。", pattern: "……毫不犹豫地……" }
        ]
      },
      {
        name: "15*. 女娲补天",
        characters: [
          { word: "挫", pinyin: "cuò", meaning: "挫折" },
          { word: "措", pinyin: "cuò", meaning: "措施" },
          { word: "惶", pinyin: "huáng", meaning: "惊惶" },
          { word: "煌", pinyin: "huáng", meaning: "辉煌" },
          { word: "熄", pinyin: "xī", meaning: "熄灭" },
          { word: "塌", pinyin: "tā", meaning: "坍塌" },
          { word: "冶", pinyin: "yě", meaning: "冶炼" },
          { word: "炼", pinyin: "liàn", meaning: "炼制" },
          { word: "传", pinyin: "chuán", meaning: "传说" }
        ],
        keyPoints: [
          "课文讲述了女娲为了拯救处于水深火热中的人类，克服重重困难，炼五色石补天的故事。",
          "故事脉络：天塌地裂→大火洪水→女娲难过→炼五色石→斩龟撑天→杀龙治水→芦灰堵水。",
          "中心思想：赞美女娲善良勇敢、甘于奉献的精神，表达了古人征服自然的愿望。",
          "神话特点：想象丰富，充满神奇的色彩（五色石、神龟、恶龙等）。"
        ],
        goodSentences: [
          { word: "欢歌笑语", example: "节日的公园里充满了欢歌笑语，到处洋溢着欢乐的气氛。", pattern: "……欢歌笑语……" },
          { word: "熊熊大火", example: "森林里燃起了熊熊大火，消防员们迅速赶来扑救。", pattern: "……熊熊大火……" },
          { word: "五彩斑斓", example: "雨后天空出现了一道五彩斑斓的彩虹，美丽极了。", pattern: "……五彩斑斓……" }
        ]
      }
    ]
  },

  // ======== 第五单元：生活叙事（习作单元）========
  "第五单元": {
    theme: "生活叙事（习作单元）",
    lessons: [
      {
        name: "16. 麻雀",
        characters: [
          { word: "嗅", pinyin: "xiù", meaning: "嗅觉，嗅到" },
          { word: "呆", pinyin: "dāi", meaning: "发呆，呆住" },
          { word: "奈", pinyin: "nài", meaning: "无可奈何" },
          { word: "巢", pinyin: "cháo", meaning: "鸟巢" },
          { word: "齿", pinyin: "chǐ", meaning: "牙齿" },
          { word: "躯", pinyin: "qū", meaning: "身躯" },
          { word: "掩", pinyin: "yǎn", meaning: "掩护" },
          { word: "幼", pinyin: "yòu", meaning: "幼儿，幼小" },
          { word: "嘶", pinyin: "sī", meaning: "嘶哑" },
          { word: "哑", pinyin: "yǎ", meaning: "哑巴" },
          { word: "搏", pinyin: "bó", meaning: "搏斗" },
          { word: "庞", pinyin: "páng", meaning: "庞大的" },
          { word: "量", pinyin: "liàng", meaning: "力量" },
          { word: "愣", pinyin: "lèng", meaning: "愣住" }
        ],
        keyPoints: [
          "作者俄国屠格涅夫，课文讲述了老麻雀在猎狗面前奋不顾身保护小麻雀的故事。",
          "故事脉络：猎狗发现小麻雀→老麻雀飞下来掩护→猎狗愣住了→'我'唤回猎狗。",
          "中心思想：赞美了伟大的母爱（父爱），弱小的力量在爱的驱动下可以变得无比强大。",
          "写作手法：对比——庞大的猎狗 vs 弱小的麻雀；细节描写——老麻雀'扎煞起全身的羽毛''绝望地尖叫'。",
          "本课是习作���元，重点学习把事情发展中的重要内容写清楚。"
        ],
        goodSentences: [
          { word: "无可奈何", example: "看着风筝飞走了，小明无可奈何地叹了口气。", pattern: "……无可奈何……" },
          { word: "安然无恙", example: "经过一场暴风雨，花园里的花朵依然安然无恙。", pattern: "……安然无恙……" },
          { word: "搏斗", example: "老麻雀为了保护孩子，勇敢地与猎狗搏斗。", pattern: "……与……搏斗……" }
        ]
      },
      {
        name: "17. 爬天都峰",
        characters: [
          { word: "级", pinyin: "jí", meaning: "石级，年级" },
          { word: "链", pinyin: "liàn", meaning: "铁链" },
          { word: "颤", pinyin: "chàn", meaning: "颤抖" },
          { word: "攀", pinyin: "pān", meaning: "攀登" },
          { word: "猴", pinyin: "hóu", meaning: "猴子" },
          { word: "鲫", pinyin: "jì", meaning: "鲫鱼" },
          { word: "念", pinyin: "niàn", meaning: "纪念，思念" },
          { word: "辫", pinyin: "biàn", meaning: "辫子" },
          { word: "呵", pinyin: "hē", meaning: "呵呵笑" }
        ],
        keyPoints: [
          "课文讲述了'我'和爸爸爬天都峰的经历，通过对话和动作描写展现了爬山的过程和感受。",
          "故事脉络：来到山脚仰望→遇到老爷爷互相鼓励→奋力攀爬→到达峰顶合影。",
          "中心思想：面对困难要有克服困难的勇气和信心，在困难面前要互相鼓励。",
          "写作手法：按先后顺序写（爬山前→爬山中→爬山后）；对话推动情节发展。"
        ],
        goodSentences: [
          { word: "笔陡", example: "天都峰的台阶非常笔陡，让人看了都心生畏惧。", pattern: "……笔陡……" },
          { word: "奋力", example: "同学们奋力向山顶爬去，终于到达了最高峰。", pattern: "……奋力……" },
          { word: "鼓舞", example: "老师的话语鼓舞了我，让我重新充满了信心。", pattern: "……鼓舞了……" }
        ]
      }
    ]
  },

  // ======== 第六单元：童年记忆 ========
  "第六单元": {
    theme: "童年记忆",
    lessons: [
      {
        name: "18. 牛和鹅",
        characters: [
          { word: "摸", pinyin: "mō", meaning: "摸一摸" },
          { word: "甚", pinyin: "shèn", meaning: "甚至，甚好" },
          { word: "跪", pinyin: "guì", meaning: "跪下" },
          { word: "捶", pinyin: "chuí", meaning: "捶打" },
          { word: "顽", pinyin: "wán", meaning: "顽皮" },
          { word: "脖", pinyin: "bó", meaning: "脖子" },
          { word: "脱", pinyin: "tuō", meaning: "摆脱" },
          { word: "概", pinyin: "gài", meaning: "大概" },
          { word: "惹", pinyin: "rě", meaning: "惹怒" },
          { word: "昏", pinyin: "hūn", meaning: "昏乱" },
          { word: "握", pinyin: "wò", meaning: "握住" },
          { word: "摔", pinyin: "shuāi", meaning: "摔倒" },
          { word: "凭", pinyin: "píng", meaning: "任凭" },
          { word: "掐", pinyin: "qiā", meaning: "掐住" }
        ],
        keyPoints: [
          "课文讲述了'我'害怕鹅、被鹅追赶，后来在金奎叔帮助下不再怕鹅的故事。",
          "道理：角度不同，结果不同。从牛的角度看人，人比牛大；从鹅的角度看人，人比鹅小。",
          "金奎叔的话改变了'我'的看法：不能因为别人比你弱小就欺负，也不能因为别人强大就害怕。",
          "写作手法：运用动作描写和心理描写，把被鹅追赶时的恐惧写得真实生动。",
          "批注式阅读：课文旁边的批注示范了如何从不同角度做阅读批注。"
        ],
        goodSentences: [
          { word: "无所畏惧", example: "面对困难，我们要有无所畏惧的勇气。", pattern: "……无所畏惧……" },
          { word: "落荒而逃", example: "大鹅追赶着孩子们，他们吓得落荒而逃。", pattern: "……落荒而逃……" },
          { word: "改变看法", example: "听了老师的话，我改变了对这件事的看法。", pattern: "……改变看法……" }
        ]
      },
      {
        name: "19. 一只窝囊的大老虎",
        characters: [
          { word: "念", pinyin: "niàn", meaning: "念叨" },
          { word: "级", pinyin: "jí", meaning: "年级" },
          { word: "段", pinyin: "duàn", meaning: "段落" },
          { word: "排", pinyin: "pái", meaning: "排练" },
          { word: "练", pinyin: "liàn", meaning: "练习" },
          { word: "撤", pinyin: "chè", meaning: "撤换" },
          { word: "堂", pinyin: "táng", meaning: "堂皇" },
          { word: "砸", pinyin: "zá", meaning: "砸锅" },
          { word: "锅", pinyin: "guō", meaning: "砸锅" }
        ],
        keyPoints: [
          "课文回忆了'我'小时候在一次班级演出中扮演老虎的经历，因为不会豁虎跳而演砸了，最后意外地引起了观众的笑声。",
          "情感变化：期待→紧张→委屈→不解。",
          "中心思想：童年生活中的小小挫折也值得回味，成长中的每一段经历都有意义。",
          "写作手法：心理描写非常细腻，将'我'的忐忑不安、委屈等情绪刻画得很到位。"
        ],
        goodSentences: [
          { word: "殷切期待", example: "妈妈殷切期待地看着我，希望我能取得好成绩。", pattern: "……殷切期待……" },
          { word: "哄堂大笑", example: "小丑的表演把观众逗得哄堂大笑。", pattern: "……哄堂大笑……" },
          { word: "垂头丧气", example: "比赛输了以后，他垂头丧气地走回了家。", pattern: "……垂头丧气……" }
        ]
      },
      {
        name: "20. 陀螺",
        characters: [
          { word: "恨", pinyin: "hèn", meaning: "仇恨，悔恨" },
          { word: "帅", pinyin: "shuài", meaning: "帅气，元帅" },
          { word: "彻", pinyin: "chè", meaning: "彻底" },
          { word: "溃", pinyin: "kuì", meaning: "溃败" },
          { word: "誉", pinyin: "yù", meaning: "荣誉" },
          { word: "丑", pinyin: "chǒu", meaning: "丑陋" },
          { word: "毫", pinyin: "háo", meaning: "毫无" },
          { word: "帅", pinyin: "shuài", meaning: "将帅" }
        ],
        keyPoints: [
          "作者高洪波，课文回忆了'我'用叔叔送的陀螺参加比赛并大获全胜的故事。",
          "中心思想：'人不可貌相，海水不可斗量'——外表平凡的事物也可以有非凡的力量，不能以貌取人。",
          "情感变化：想做陀螺（渴望）→得不到（沮丧）→收到叔叔的礼物（欣喜）→比赛获胜（激动自豪）。",
          "写作手法：对比——陀螺长得不伦不类（丑）但旋转起来威力无穷（强），突出主题。"
        ],
        goodSentences: [
          { word: "不动声色", example: "他不动声色地看着比赛，心里其实非常紧张。", pattern: "……不动声色……" },
          { word: "兴致勃勃", example: "孩子们兴致勃勃地玩着陀螺，谁也不肯认输。", pattern: "……兴致勃勃……" },
          { word: "不可貌相", example: "俗话说'人不可貌相，海水不可斗量'，不能只看外表。", pattern: "……不可貌相……" }
        ]
      }
    ]
  },

  // ======== 第七单元：家国情怀 ========
  "第七单元": {
    theme: "家国情怀",
    lessons: [
      {
        name: "21. 古诗三首",
        characters: [
          { word: "塞", pinyin: "sài", meaning: "边塞" },
          { word: "秦", pinyin: "qín", meaning: "秦国" },
          { word: "征", pinyin: "zhēng", meaning: "征途，长征" },
          { word: "词", pinyin: "cí", meaning: "词句" },
          { word: "催", pinyin: "cuī", meaning: "催促" },
          { word: "醉", pinyin: "zuì", meaning: "醉酒" },
          { word: "杰", pinyin: "jié", meaning: "杰出" },
          { word: "亦", pinyin: "yì", meaning: "亦是" },
          { word: "雄", pinyin: "xióng", meaning: "英雄" },
          { word: "项", pinyin: "xiàng", meaning: "项目" },
          { word: "鬼", pinyin: "guǐ", meaning: "鬼雄" }
        ],
        keyPoints: [
          "《出塞》（王昌龄）：'秦时明月汉时关，万里长征人未还。但使龙城飞将在，不教胡马度阴山。'表达了盼望良将保家卫国的愿望。",
          "《凉州词》（王翰）：'葡萄美酒夜光杯，欲饮琵琶马上催。醉卧沙场君莫笑，古来征战几人回？'描写了边塞将士的豪迈与悲壮。",
          "《夏日绝句》（李清照）：'生当作人杰，死亦为鬼雄。至今思项羽，不肯过江东。'借赞美项羽来讽刺南宋朝廷的偏安苟且。",
          "三首诗都表达了家国情怀和保家卫国的决心。"
        ],
        goodSentences: [
          { word: "豪情壮志", example: "读了这些边塞诗，我感受到了将士们的豪情壮志。", pattern: "……豪情壮志……" },
          { word: "保家卫国", example: "战士们怀着保家卫国的信念，奔赴前线。", pattern: "……保家卫国……" },
          { word: "英勇无畏", example: "面对强大的敌人，他们表现得英勇无畏。", pattern: "……英勇无畏……" }
        ]
      },
      {
        name: "22. 为中华之崛起而读书",
        characters: [
          { word: "肃", pinyin: "sù", meaning: "严肃，肃静" },
          { word: "振", pinyin: "zhèn", meaning: "振奋，振动" },
          { word: "胸", pinyin: "xiōng", meaning: "胸膛，胸怀" },
          { word: "怀", pinyin: "huái", meaning: "胸怀，怀念" },
          { word: "赞", pinyin: "zàn", meaning: "赞叹，赞美" },
          { word: "效", pinyin: "xiào", meaning: "效力，效仿" },
          { word: "租", pinyin: "zū", meaning: "租界，租借" },
          { word: "疑", pinyin: "yí", meaning: "疑惑，疑问" },
          { word: "惑", pinyin: "huò", meaning: "疑惑" },
          { word: "凡", pinyin: "fán", meaning: "平凡" },
          { word: "顾", pinyin: "gù", meaning: "回顾" },
          { word: "训", pinyin: "xùn", meaning: "训斥" }
        ],
        keyPoints: [
          "课文讲述了少年周恩来在修身课上立下'为中华之崛起而读书'的志向的故事。",
          "原因：周恩来在租界看到中国人被洋人欺负，巡警反替洋人说话，深刻感受到'中华不振'的屈辱。",
          "三个场景：修身课上立志→租界看到不平事→理解'中华不振'的含义。",
          "中心思想：少年周恩来以国家兴亡为己任的远大志向，激励我们也要有社会责任感。",
          "'崛起'意为突起、兴起，'为中华之崛起'即为了中国的振兴和强大。"
        ],
        goodSentences: [
          { word: "左顾右盼", example: "上课时要专心听讲，不要左顾右盼。", pattern: "……左顾右盼……" },
          { word: "疑惑不解", example: "听了他的话，我疑惑不解，不明白是什么意思。", pattern: "……疑惑不解……" },
          { word: "铿锵有力", example: "他的回答铿锵有力，让在场的人都为之震撼。", pattern: "……铿锵有力……" }
        ]
      },
      {
        name: "23. 梅兰芳蓄须",
        characters: [
          { word: "蓄", pinyin: "xù", meaning: "蓄须，储蓄" },
          { word: "须", pinyin: "xū", meaning: "胡须" },
          { word: "迫", pinyin: "pò", meaning: "被迫" },
          { word: "租", pinyin: "zū", meaning: "租界" },
          { word: "纠", pinyin: "jiū", meaning: "纠缠" },
          { word: "缠", pinyin: "chán", meaning: "纠缠" },
          { word: "邀", pinyin: "yāo", meaning: "邀请" },
          { word: "扰", pinyin: "rǎo", meaning: "打扰，骚扰" },
          { word: "拒", pinyin: "jù", meaning: "拒绝" },
          { word: "签", pinyin: "qiān", meaning: "签订" },
          { word: "订", pinyin: "dìng", meaning: "签订" },
          { word: "荒", pinyin: "huāng", meaning: "荒唐" },
          { word: "唐", pinyin: "táng", meaning: "荒唐" }
        ],
        keyPoints: [
          "课文讲述了京剧艺术大师梅兰芳在抗日战争期间为了拒绝为日本人演出，蓄须明志的故事。",
          "拒演方式：蓄须（不登台）→避居香港→打伤寒预防针（装病）→卖掉北京的房子维持生活。",
          "中心思想：梅兰芳用独特的方式展现了强烈的爱国精神和民族气节。",
          "人物形象：梅兰芳——宁肯忍受生活困难甚至冒着生命危险，��不为敌人演出，是一位有骨气的艺术家。"
        ],
        goodSentences: [
          { word: "斩钉截铁", example: "梅兰芳斩钉截铁地拒绝了日本人的邀请。", pattern: "……斩钉截铁……" },
          { word: "宁死不屈", example: "革命烈士面对敌人的威胁宁死不屈。", pattern: "……宁死不屈……" },
          { word: "深明大义", example: "梅兰芳深明大义，宁愿自己受苦也不为敌人演出。", pattern: "……深明大义……" }
        ]
      },
      {
        name: "24*. 延安，我把你追寻",
        characters: [
          { word: "延", pinyin: "yán", meaning: "延安" },
          { word: "昔", pinyin: "xī", meaning: "昔日" },
          { word: "笋", pinyin: "sǔn", meaning: "春笋" },
          { word: "茅", pinyin: "máo", meaning: "茅屋" },
          { word: "煌", pinyin: "huáng", meaning: "辉煌" }
        ],
        keyPoints: [
          "这是一首现代诗，作者祁念曾，以充满激情的笔触追寻延安精神。",
          "延安精神：自力更生、艰苦奋斗、实事求是、全心全意为人民服务。",
          "诗歌将过去（延安窑洞、纺车）和现在（高楼、电子计算机）对比，强调虽然时代发展了，但延安精神不能丢。",
          "中心思想：追寻延安精神就是追寻革命的理想和信念，这种精神永远不过时。"
        ],
        goodSentences: [
          { word: "毫不犹豫", example: "面对选择，他毫不犹豫地走上了正确的道路。", pattern: "……毫不犹豫……" },
          { word: "雨后春笋", example: "改革开放以来，高楼大厦如雨后春笋般拔地而起。", pattern: "……雨后春笋般……" },
          { word: "辉煌", example: "中华文明有着辉煌的历史，也有灿烂的未来。", pattern: "……辉煌的……" }
        ]
      }
    ]
  },

  // ======== 第八单元：历史智慧 ========
  "第八单元": {
    theme: "历史智慧",
    lessons: [
      {
        name: "25. 王戎不取道旁李",
        characters: [
          { word: "戎", pinyin: "róng", meaning: "王戎" },
          { word: "尝", pinyin: "cháng", meaning: "曾经" },
          { word: "诸", pinyin: "zhū", meaning: "诸位，许多" },
          { word: "竞", pinyin: "jìng", meaning: "竞走（争着跑）" },
          { word: "取", pinyin: "qǔ", meaning: "摘取" },
          { word: "唯", pinyin: "wéi", meaning: "只有" },
          { word: "信", pinyin: "xìn", meaning: "确实" },
          { word: "和", pinyin: "hé", meaning: "平和" }
        ],
        keyPoints: [
          "选自《世说新语·雅量》，是一篇文言文。",
          "原文：'王戎七岁，尝与诸小儿游。看道边李树多子折枝，诸儿竞走取之，唯戎不动。人问之，答曰：树在道边而多子，此必苦李。取之，信然。'",
          "译文：王戎七岁时，曾和小伙伴们玩耍。看到路边的李树结满了果实压弯了树枝，小伙伴们争着跑过去摘，只有王戎不动。有人问他为什么，他回答说：'树长在路边却结了这么多果子，这一定是苦李子。'摘来一尝，果然如此。",
          "中心思想：赞美王戎善于观察、独立思考的品质，告诉我们要多动脑筋。",
          "文言文重点字词：'尝'=曾经；'竞走'=争着跑过去；'唯'=只有；'信然'=确实如此。"
        ],
        goodSentences: [
          { word: "善于思考", example: "王戎善于思考，从路边的李树推断出果实是苦的。", pattern: "……善于思考……" },
          { word: "与众不同", example: "他的想法总是与众不同，常常能提出独到的见解。", pattern: "……与众不同……" },
          { word: "观察入微", example: "侦探观察入微，从蛛丝马迹中找到了破案的线索。", pattern: "……观察入微……" }
        ]
      },
      {
        name: "26. 西门豹治邺",
        characters: [
          { word: "豹", pinyin: "bào", meaning: "西门豹" },
          { word: "魏", pinyin: "wèi", meaning: "魏国" },
          { word: "派", pinyin: "pài", meaning: "派遣" },
          { word: "娶", pinyin: "qǔ", meaning: "娶媳妇" },
          { word: "妇", pinyin: "fù", meaning: "媳妇" },
          { word: "淹", pinyin: "yān", meaning: "淹没" },
          { word: "逼", pinyin: "bī", meaning: "逼迫" },
          { word: "浮", pinyin: "fú", meaning: "漂浮" },
          { word: "旱", pinyin: "hàn", meaning: "干旱" },
          { word: "徒", pinyin: "tú", meaning: "徒弟" },
          { word: "扔", pinyin: "rēng", meaning: "扔进" },
          { word: "饶", pinyin: "ráo", meaning: "饶命" },
          { word: "骗", pinyin: "piàn", meaning: "骗钱" },
          { word: "灌", pinyin: "guàn", meaning: "灌溉" }
        ],
        keyPoints: [
          "课文讲述了战国时期魏王派西门豹管理邺县，西门豹破除迷信、惩治恶人、兴修水利的故事。",
          "三个场景：调查情况→惩治恶人（巫婆和官绅头子）→开凿渠道灌溉。",
          "西门豹的智慧：没有直接杀巫婆，而是以其人之道还治其人之身——借口'麻烦巫婆去跟河伯禀报'，将巫婆投入河中，巧妙地揭穿了迷信。",
          "中心思想：西门豹有勇有谋，破除迷信，为百姓办实事，是古代好官的代表。",
          "写作手法：通过对话和动作描写人物，语言简洁有力。"
        ],
        goodSentences: [
          { word: "将计就计", example: "西门豹将计就计，巧妙地惩治了巫婆和恶霸。", pattern: "……将计就计……" },
          { word: "恍然大悟", example: "听了老师的讲解，我恍然大悟，终于明白了这个道理。", pattern: "……恍然大悟……" },
          { word: "破除迷信", example: "我们要相信科学，破除迷信，做一个有知识的人。", pattern: "……破除迷信……" }
        ]
      },
      {
        name: "27*. 故事二则",
        characters: [
          { word: "拜", pinyin: "bài", meaning: "拜见" },
          { word: "侯", pinyin: "hóu", meaning: "侯爵" },
          { word: "肤", pinyin: "fū", meaning: "皮肤" },
          { word: "剂", pinyin: "jì", meaning: "药剂" },
          { word: "髓", pinyin: "suǐ", meaning: "骨髓" },
          { word: "纪", pinyin: "jì", meaning: "纪昌" },
          { word: "标", pinyin: "biāo", meaning: "目标" },
          { word: "番", pinyin: "fān", meaning: "三番五次" }
        ],
        keyPoints: [
          "《扁鹊治病》：扁鹊四次拜见蔡桓侯，指出其有病但蔡桓侯不听，最终不治身亡。道理：要善于听取别人的意见，防微杜渐。",
          "《纪昌学射》：纪昌向飞卫学射箭，飞卫让他先练眼力——盯住目标不眨眼、把小东西看成大东西。道理：学习要从基本功练起，打好扎实的基础。",
          "两则故事都是通过具体事例说明深刻的道理，属于寓言故事。",
          "成语'讳疾忌医'来源于《扁鹊治病》。"
        ],
        goodSentences: [
          { word: "防微杜渐", example: "发现小问题就要及时解决，做到防微杜渐。", pattern: "……防微杜渐……" },
          { word: "无微不至", example: "妈妈对我照顾得无微不至，让我感到非常温暖。", pattern: "……无微不至……" },
          { word: "持之以恒", example: "学习要持之以恒，不能三天打鱼两天晒网。", pattern: "……持之以恒……" }
        ]
      }
    ]
  }
};
