// 幼小衔接 · 汉语拼音启蒙全套数据库（23个声母 + 24个韵母 + 16个整体认读音节 + 魔法拼读配方 + 趣味闯关题库）

export const SHENGMU_LIST = [
  {
    id: 'sm_b',
    code: 'b',
    category: 'shengmu',
    subGroup: '双唇音/唇齿音',
    readSound: '播',
    emoji: '📻',
    chant: '右下半圆 b b b，拉开天线听广播',
    tip: '双唇紧闭，憋住气再突然放开，声音轻短不送气。',
    word: '菠萝',
    wordPinyin: 'bō luó',
    wordEmoji: '🍍',
    gridPos: 'upper-middle', // 上中格
    tones: [
      { tone: 1, py: 'bā', char: '八', word: '八戒', emoji: '🐷', speak: '一声 bā，八，猪八戒的八' },
      { tone: 2, py: 'bá', char: '拔', word: '拔萝卜', emoji: '🥕', speak: '二声 bá，拔，拔萝卜的拔' },
      { tone: 3, py: 'bǎ', char: '靶', word: '打靶', emoji: '🎯', speak: '三声 bǎ，靶，打靶的靶' },
      { tone: 4, py: 'bà', char: '爸', word: '爸爸', emoji: '👨', speak: '四声 bà，爸，好爸爸的爸' }
    ]
  },
  {
    id: 'sm_p',
    code: 'p',
    category: 'shengmu',
    subGroup: '双唇音/唇齿音',
    readSound: '坡',
    emoji: '💦',
    chant: '右上半圆 p p p，端起水盆把水泼',
    tip: '双唇紧闭再突然放开，有一股明显的气流喷出来。',
    word: '山坡',
    wordPinyin: 'shān pō',
    wordEmoji: '⛰️',
    gridPos: 'middle-lower', // 中下格
    tones: [
      { tone: 1, py: 'pō', char: '坡', word: '山坡', emoji: '⛰️', speak: '一声 pō，坡，爬山坡的坡' },
      { tone: 2, py: 'pó', char: '婆', word: '外婆', emoji: '👵', speak: '二声 pó，婆，好外婆的婆' },
      { tone: 3, py: 'pǒ', char: '笸', word: '笸箩', emoji: '🧺', speak: '三声 pǒ，笸，笸箩的笸' },
      { tone: 4, py: 'pò', char: '破', word: '冲破', emoji: '💥', speak: '四声 pò，破，冲破的破' }
    ]
  },
  {
    id: 'sm_m',
    code: 'm',
    category: 'shengmu',
    subGroup: '双唇音/唇齿音',
    readSound: '摸',
    emoji: '🚪',
    chant: '两个门洞 m m m，蒙上眼睛捉迷藏',
    tip: '双唇紧闭，软腭下垂，气流从鼻腔出来。',
    word: '小猫',
    wordPinyin: 'xiǎo māo',
    wordEmoji: '🐱',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'mā', char: '妈', word: '妈妈', emoji: '👩', speak: '一声 mā，妈，好妈妈的妈' },
      { tone: 2, py: 'má', char: '麻', word: '芝麻', emoji: '🌾', speak: '二声 má，麻，小芝麻的麻' },
      { tone: 3, py: 'mǎ', char: '马', word: '小马', emoji: '🐴', speak: '三声 mǎ，马，大白马的马' },
      { tone: 4, py: 'mà', char: '骂', word: '责骂', emoji: '🙅', speak: '四声 mà，骂，不骂人的骂' }
    ]
  },
  {
    id: 'sm_f',
    code: 'f',
    category: 'shengmu',
    subGroup: '双唇音/唇齿音',
    readSound: '佛',
    emoji: '🦯',
    chant: '一根拐杖 f f f，爷爷拄着上山坡',
    tip: '上牙齿轻轻接触下嘴唇，让气流从缝隙中摩擦出来。',
    word: '飞机',
    wordPinyin: 'fēi jī',
    wordEmoji: '✈️',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'fā', char: '发', word: '出发', emoji: '🚀', speak: '一声 fā，发，出发的发' },
      { tone: 2, py: 'fá', char: '罚', word: '木筏', emoji: '🛶', speak: '二声 fá，筏，划木筏的筏' },
      { tone: 3, py: 'fǎ', char: '法', word: '魔法', emoji: '🪄', speak: '三声 fǎ，法，变魔法的法' },
      { tone: 4, py: 'fà', char: '发', word: '头发', emoji: '💇', speak: '四声 fà，发，黑头发的发' }
    ]
  },
  {
    id: 'sm_d',
    code: 'd',
    category: 'shengmu',
    subGroup: '舌尖中音',
    readSound: '得',
    emoji: '🐎',
    chant: '左下半圆 d d d，小马跑步得得得',
    tip: '舌尖抵住上齿龈，憋住气后突然放开。',
    word: '大象',
    wordPinyin: 'dà xiàng',
    wordEmoji: '🐘',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'dā', char: '搭', word: '搭积木', emoji: '🧱', speak: '一声 dā，搭，搭积木的搭' },
      { tone: 2, py: 'dá', char: '答', word: '回答', emoji: '🙋', speak: '二声 dá，答，回答的答' },
      { tone: 3, py: 'dǎ', char: '打', word: '打鼓', emoji: '🥁', speak: '三声 dǎ，打，敲锣打鼓的打' },
      { tone: 4, py: 'dà', char: '大', word: '大象', emoji: '🐘', speak: '四声 dà，大，大象的大' }
    ]
  },
  {
    id: 'sm_t',
    code: 't',
    category: 'shengmu',
    subGroup: '舌尖中音',
    readSound: '特',
    emoji: '☂️',
    chant: '伞把弯弯 t t t，下雨撑开小花伞',
    tip: '舌尖抵住上齿龈，突然放开并送出较强气流。',
    word: '小兔',
    wordPinyin: 'xiǎo tù',
    wordEmoji: '🐰',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'tā', char: '他', word: '他们', emoji: '👦', speak: '一声 tā，他，他们的他' },
      { tone: 2, py: 'tá', char: '拔', word: '宝塔', emoji: '🗼', speak: '三声 tǎ，塔，高高宝塔的塔' },
      { tone: 3, py: 'tǎ', char: '塔', word: '宝塔', emoji: '🗼', speak: '三声 tǎ，塔，宝塔的塔' },
      { tone: 4, py: 'tà', char: '踏', word: '踏青', emoji: '🌱', speak: '四声 tà，踏，春天踏青的踏' }
    ]
  },
  {
    id: 'sm_n',
    code: 'n',
    category: 'shengmu',
    subGroup: '舌尖中音',
    readSound: '讷',
    emoji: '🌈',
    chant: '一个门洞 n n n，火车钻进山洞里',
    tip: '舌尖抵住上齿龈，气流从鼻腔透出。',
    word: '牛奶',
    wordPinyin: 'niú nǎi',
    wordEmoji: '🥛',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'nā', char: '那', word: '笑纳', emoji: '😊', speak: '一声 nā' },
      { tone: 2, py: 'ná', char: '拿', word: '拿苹果', emoji: '🍎', speak: '二声 ná，拿，手拿苹果的拿' },
      { tone: 3, py: 'nǎ', char: '哪', word: '哪里', emoji: '❓', speak: '三声 nǎ，哪，哪里的哪' },
      { tone: 4, py: 'nà', char: '那', word: '那里', emoji: '👉', speak: '四声 nà，那，那里的那' }
    ]
  },
  {
    id: 'sm_l',
    code: 'l',
    category: 'shengmu',
    subGroup: '舌尖中音',
    readSound: '勒',
    emoji: '✏️',
    chant: '一根小棍 l l l，赶着小猪乐呵呵',
    tip: '舌尖抵住上齿龈，气流从舌头两边流出来。',
    word: '快乐',
    wordPinyin: 'kuài lè',
    wordEmoji: '😄',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'lā', char: '拉', word: '拉手', emoji: '🤝', speak: '一声 lā，拉，手拉手的拉' },
      { tone: 2, py: 'lá', char: 's', word: '喇叭', emoji: '🎺', speak: '三声 lǎ，喇，吹喇叭的喇' },
      { tone: 3, py: 'lǎ', char: '喇', word: '喇叭', emoji: '🎺', speak: '三声 lǎ，喇，小喇叭的喇' },
      { tone: 4, py: 'là', char: '辣', word: '辣椒', emoji: '🌶️', speak: '四声 là，辣，红辣椒的辣' }
    ]
  },
  {
    id: 'sm_g',
    code: 'g',
    category: 'shengmu',
    subGroup: '舌根音',
    readSound: '哥',
    emoji: '🕊️',
    chant: '9字加弯 g g g，白鸽叼着橄榄枝',
    tip: '舌根抬起抵住软腭，憋住气再突然放开。',
    word: '白鸽',
    wordPinyin: 'bái gē',
    wordEmoji: '🕊️',
    gridPos: 'middle-lower',
    tones: [
      { tone: 1, py: 'gū', char: '姑', word: '蘑菇', emoji: '🍄', speak: '一声 gū，菇，小蘑菇的菇' },
      { tone: 2, py: 'gú', char: '骨', word: '骨头', emoji: '🦴', speak: '三声 gǔ，骨，肉骨头的骨' },
      { tone: 3, py: 'gǔ', char: '鼓', word: '大鼓', emoji: '🥁', speak: '三声 gǔ，鼓，敲大鼓的鼓' },
      { tone: 4, py: 'gù', char: '故', word: '故事', emoji: '📖', speak: '四声 gù，故，讲故事的故' }
    ]
  },
  {
    id: 'sm_k',
    code: 'k',
    category: 'shengmu',
    subGroup: '舌根音',
    readSound: '科',
    emoji: '🐸',
    chant: '一挺机枪 k k k，两只蝌蚪咬水草',
    tip: '舌根抵住软腭，突然放开并送出强气流。',
    word: '蝌蚪',
    wordPinyin: 'kē dǒu',
    wordEmoji: '🐸',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'kū', char: '哭', word: '不哭', emoji: '😊', speak: '一声 kū，哭，勇敢不哭的哭' },
      { tone: 2, py: 'kú', char: '苦', word: '苦瓜', emoji: '🥒', speak: '三声 kǔ，苦，苦瓜的苦' },
      { tone: 3, py: 'kǔ', char: '苦', word: '刻苦', emoji: '💪', speak: '三声 kǔ，苦，刻苦学习的苦' },
      { tone: 4, py: 'kù', char: '裤', word: '裤子', emoji: '👖', speak: '四声 kù，裤，穿裤子的裤' }
    ]
  },
  {
    id: 'sm_h',
    code: 'h',
    category: 'shengmu',
    subGroup: '舌根音',
    readSound: '喝',
    emoji: '🪑',
    chant: '一把椅子 h h h，坐着椅子喝水水',
    tip: '舌根接近软腭，气流从窄缝中摩擦出来。',
    word: '荷花',
    wordPinyin: 'hé huā',
    wordEmoji: '🪷',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'hē', char: '喝', word: '喝水', emoji: '🥤', speak: '一声 hē，喝，爱喝水的喝' },
      { tone: 2, py: 'hé', char: '荷', word: '荷花', emoji: '🪷', speak: '二声 hé，荷，粉荷花的荷' },
      { tone: 3, py: 'hě', char: '虎', word: '老虎', emoji: '🐯', speak: '三声 hǔ，虎，大老虎的虎' },
      { tone: 4, py: 'hè', char: '鹤', word: '仙鹤', emoji: '🦩', speak: '四声 hè，鹤，白仙鹤的鹤' }
    ]
  },
  {
    id: 'sm_j',
    code: 'j',
    category: 'shengmu',
    subGroup: '舌面音',
    readSound: '鸡',
    emoji: '🐥',
    chant: '竖弯加点 j j j，小鸡捉虫叽叽叽',
    tip: '舌面前部抵住硬腭前部，气流从窄缝摩擦而出。',
    word: '小鸡',
    wordPinyin: 'xiǎo jī',
    wordEmoji: '🐥',
    gridPos: 'full',
    tones: [
      { tone: 1, py: 'jī', char: '鸡', word: '小鸡', emoji: '🐥', speak: '一声 jī，鸡，小黄鸡的鸡' },
      { tone: 2, py: 'jí', char: '吉', word: '吉祥', emoji: '🧧', speak: '二声 jí，吉，吉祥如意的吉' },
      { tone: 3, py: 'jǐ', char: '几', word: '几个', emoji: '🔢', speak: '三声 jǐ，几，几个苹果的几' },
      { tone: 4, py: 'jì', char: '记', word: '记住', emoji: '📝', speak: '四声 jì，记，牢牢记住的记' }
    ]
  },
  {
    id: 'sm_q',
    code: 'q',
    category: 'shengmu',
    subGroup: '舌面音',
    readSound: '七',
    emoji: '🎈',
    chant: '左上半圆 q q q，五彩气球飞上天',
    tip: '舌面前部贴住硬腭，放开一条缝并送出强气流。',
    word: '气球',
    wordPinyin: 'qì qiú',
    wordEmoji: '🎈',
    gridPos: 'middle-lower',
    tones: [
      { tone: 1, py: 'qī', char: '七', word: '七星', emoji: '7️⃣', speak: '一声 qī，七，七星瓢虫的七' },
      { tone: 2, py: 'qí', char: '棋', word: '下棋', emoji: '♟️', speak: '二声 qí，棋，下象棋的棋' },
      { tone: 3, py: 'qǐ', char: '企', word: '企鹅', emoji: '🐧', speak: '三声 qǐ，企，小企鹅的企' },
      { tone: 4, py: 'qì', char: '气', word: '气球', emoji: '🎈', speak: '四声 qì，气，彩色气球的气' }
    ]
  },
  {
    id: 'sm_x',
    code: 'x',
    category: 'shengmu',
    subGroup: '舌面音',
    readSound: '西',
    emoji: '🍉',
    chant: '一个大叉 x x x，切开西瓜笑嘻嘻',
    tip: '舌面前部接近硬腭前部，气流从窄缝摩擦出来。',
    word: '西瓜',
    wordPinyin: 'xī guā',
    wordEmoji: '🍉',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'xī', char: '西', word: '西瓜', emoji: '🍉', speak: '一声 xī，西，大西瓜的西' },
      { tone: 2, py: 'xí', char: '习', word: '学习', emoji: '📚', speak: '二声 xí，习，爱学习的习' },
      { tone: 3, py: 'xǐ', char: '洗', word: '洗手', emoji: '🧼', speak: '三声 xǐ，洗，勤洗手的洗' },
      { tone: 4, py: 'xì', char: '戏', word: '游戏', emoji: '🎮', speak: '四声 xì，戏，玩游戏的戏' }
    ]
  },
  {
    id: 'sm_zh',
    code: 'zh',
    category: 'shengmu',
    subGroup: '翘舌音',
    readSound: '知',
    emoji: '🧶',
    chant: 'z 加椅子 zh zh zh，妈妈坐着织毛衣',
    tip: '舌尖翘起抵住硬腭前部，注意是翘舌音哦！',
    word: '蜘蛛',
    wordPinyin: 'zhī zhū',
    wordEmoji: '🕷️',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'zhū', char: '猪', word: '小猪', emoji: '🐷', speak: '一声 zhū，猪，粉红小猪的猪' },
      { tone: 2, py: 'zhú', char: '竹', word: '竹子', emoji: '🎍', speak: '二声 zhú，竹，绿竹子的竹' },
      { tone: 3, py: 'zhǔ', char: '煮', word: '煮饭', emoji: '🍲', speak: '三声 zhǔ，煮，煮汤圆的煮' },
      { tone: 4, py: 'zhù', char: '住', word: '居住', emoji: '🏠', speak: '四声 zhù，住，住新房的住' }
    ]
  },
  {
    id: 'sm_ch',
    code: 'ch',
    category: 'shengmu',
    subGroup: '翘舌音',
    readSound: '吃',
    emoji: '🍎',
    chant: 'c 加椅子 ch ch ch，刺猬椅子上吃果子',
    tip: '舌尖翘起抵住硬腭前部，送出强气流。',
    word: '汽车',
    wordPinyin: 'qì chē',
    wordEmoji: '🚗',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'chē', char: '车', word: '汽车', emoji: '🚗', speak: '一声 chē，车，小汽车的车' },
      { tone: 2, py: 'chá', char: '茶', word: '喝茶', emoji: '🍵', speak: '二声 chá，茶，泡香茶的茶' },
      { tone: 3, py: 'chǐ', char: '尺', word: '尺子', emoji: '📏', speak: '三声 chǐ，尺，直尺子的尺' },
      { tone: 4, py: 'chàng', char: '唱', word: '唱歌', emoji: '🎤', speak: '四声 chàng，唱，爱唱歌的唱' }
    ]
  },
  {
    id: 'sm_sh',
    code: 'sh',
    category: 'shengmu',
    subGroup: '翘舌音',
    readSound: '诗',
    emoji: '🦁',
    chant: 's 加椅子 sh sh sh，小狮子威风凛凛',
    tip: '舌尖翘起接近硬腭前部，气流从缝隙摩擦出来。',
    word: '狮子',
    wordPinyin: 'shī zi',
    wordEmoji: '🦁',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'shū', char: '书', word: '看书', emoji: '📖', speak: '一声 shū，书，读好书的书' },
      { tone: 2, py: 'shú', char: '熟', word: '成熟', emoji: '🌾', speak: '二声 shú，熟，果子熟了的熟' },
      { tone: 3, py: 'shǔ', char: '鼠', word: '松鼠', emoji: '🐿️', speak: '三声 shǔ，鼠，小松鼠的鼠' },
      { tone: 4, py: 'shù', char: '树', word: '大树', emoji: '🌳', speak: '四声 shù，树，绿大树的树' }
    ]
  },
  {
    id: 'sm_r',
    code: 'r',
    category: 'shengmu',
    subGroup: '翘舌音',
    readSound: '日',
    emoji: '🌱',
    chant: '小苗发芽 r r r，向着太阳笑眯眯',
    tip: '舌尖翘起接近硬腭，声带振动发音。',
    word: '向日葵',
    wordPinyin: 'xiàng rì kuí',
    wordEmoji: '🌻',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'rēng', char: '扔', word: '扔沙包', emoji: '🤾', speak: '一声 rēng，扔，扔沙包的扔' },
      { tone: 2, py: 'rén', char: '人', word: '大人', emoji: '🧑', speak: '二声 rén，人，好人好事的人' },
      { tone: 3, py: 'rǎn', char: '染', word: '印染', emoji: '🎨', speak: '三声 rǎn，染，染颜色的染' },
      { tone: 4, py: 'rè', char: '热', word: '热闹', emoji: '🔥', speak: '四声 rè，热，热闹非凡的热' }
    ]
  },
  {
    id: 'sm_z',
    code: 'z',
    category: 'shengmu',
    subGroup: '平舌音',
    readSound: '资',
    emoji: '✍️',
    chant: '像个2字 z z z，小熊认真写大字',
    tip: '舌尖平伸抵住上齿背，注意是平舌音哦！',
    word: '写字',
    wordPinyin: 'xiě zì',
    wordEmoji: '✍️',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'zū', char: '租', word: '出租车', emoji: '🚕', speak: '一声 zū，租，出租车的租' },
      { tone: 2, py: 'zú', char: '足', word: '足球', emoji: '⚽', speak: '二声 zú，足，踢足球的足' },
      { tone: 3, py: 'zǔ', char: '祖', word: '祖国', emoji: '🇨🇳', speak: '三声 zǔ，祖，爱祖国的祖' },
      { tone: 4, py: 'zì', char: '字', word: '汉字', emoji: '🀄', speak: '四声 zì，字，写汉字的字' }
    ]
  },
  {
    id: 'sm_c',
    code: 'c',
    category: 'shengmu',
    subGroup: '平舌音',
    readSound: '雌',
    emoji: '🦔',
    chant: '半个圆圈 c c c，小小刺猬弯着腰',
    tip: '舌尖平伸抵住上齿背，突然放开一条缝并送气。',
    word: '刺猬',
    wordPinyin: 'cì wei',
    wordEmoji: '🦔',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'cā', char: '擦', word: '擦桌子', emoji: '🧽', speak: '一声 cā，擦，擦黑板的擦' },
      { tone: 2, py: 'cá', char: '词', word: '词语', emoji: '📘', speak: '二声 cí，词，组词语的词' },
      { tone: 3, py: 'cǎo', char: '草', word: '小草', emoji: '🌿', speak: '三声 cǎo，草，青青小草的草' },
      { tone: 4, py: 'cài', char: '菜', word: '蔬菜', emoji: '🥬', speak: '四声 cài，菜，吃蔬菜的菜' }
    ]
  },
  {
    id: 'sm_s',
    code: 's',
    codeText: 's',
    category: 'shengmu',
    subGroup: '平舌音',
    readSound: '思',
    emoji: '🐛',
    chant: '半个8字 s s s，春蚕吐丝丝丝丝',
    tip: '舌尖平伸接近上齿背，气流从窄缝摩擦而出。',
    word: '雨伞',
    wordPinyin: 'yǔ sǎn',
    wordEmoji: '☂️',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'sān', char: '三', word: '三个', emoji: '3️⃣', speak: '一声 sān，三，一二三的三' },
      { tone: 2, py: 'sú', char: '俗', word: '习俗', emoji: '🏮', speak: '二声 sú，俗，传统习俗的俗' },
      { tone: 3, py: 'sǎn', char: '伞', word: '雨伞', emoji: '☂️', speak: '三声 sǎn，伞，小雨伞的伞' },
      { tone: 4, py: 'sì', char: '四', word: '四季', emoji: '🍀', speak: '四声 sì，四，一年四季的四' }
    ]
  },
  {
    id: 'sm_y',
    code: 'y',
    category: 'shengmu',
    subGroup: '零声母/隔音字母',
    readSound: '衣',
    emoji: '🌳',
    chant: '一根树杈 y y y，树杈上面挂衣服',
    tip: '嘴角向两边展开，声音像韵母 i，但是读得轻短些。',
    word: '衣服',
    wordPinyin: 'yī fu',
    wordEmoji: '👕',
    gridPos: 'middle-lower',
    tones: [
      { tone: 1, py: 'yā', char: '鸭', word: '小鸭', emoji: '🦆', speak: '一声 yā，鸭，小黄鸭的鸭' },
      { tone: 2, py: 'yá', char: '牙', word: '刷牙', emoji: '🪥', speak: '二声 yá，牙，早晚刷牙的牙' },
      { tone: 3, py: 'yǎ', char: '雅', word: '文雅', emoji: '🌸', speak: '三声 yǎ，雅，优雅的雅' },
      { tone: 4, py: 'yà', char: '亚', word: '亚洲', emoji: '🌏', speak: '四声 yà，亚，亚洲的亚' }
    ]
  },
  {
    id: 'sm_w',
    code: 'w',
    category: 'shengmu',
    subGroup: '零声母/隔音字母',
    readSound: '乌',
    emoji: '🏠',
    chant: '屋顶相连 w w w，乌鸦造个小房屋',
    tip: '双唇拢圆，突出成小孔，声音像 u 但更轻短。',
    word: '乌龟',
    wordPinyin: 'wū guī',
    wordEmoji: '🐢',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'wā', char: '蛙', word: '青蛙', emoji: '🐸', speak: '一声 wā，蛙，小青蛙的蛙' },
      { tone: 2, py: 'wá', char: '娃', word: '娃娃', emoji: '👶', speak: '二声 wá，娃，洋娃娃的娃' },
      { tone: 3, py: 'wǎ', char: '瓦', word: '砖瓦', emoji: '🧱', speak: '三声 wǎ，瓦，青砖红瓦的瓦' },
      { tone: 4, py: 'wà', char: '袜', word: '袜子', emoji: '🧦', speak: '四声 wà，袜，穿袜子的袜' }
    ]
  }
]

export const YUNMU_LIST = [
  // 单韵母 (6个)
  {
    id: 'ym_a',
    code: 'a',
    category: 'yunmu',
    subGroup: '单韵母',
    readSound: '阿',
    emoji: '👧',
    chant: '圆圆脸蛋扎小辫，张大嘴巴 a a a',
    tip: '嘴巴张大，舌头放平，声音响亮不走样。',
    word: '阿姨',
    wordPinyin: 'ā yí',
    wordEmoji: '👩',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'ā', char: '阿', word: '阿姨', emoji: '👩', speak: '一声平 ā，阿姨的阿' },
      { tone: 2, py: 'á', char: '啊', word: '啊？真的吗', emoji: '😮', speak: '二声扬 á，表示惊讶的啊' },
      { tone: 3, py: 'ǎ', char: '啊', word: '啊，原来这样', emoji: '🤔', speak: '三声拐弯 ǎ' },
      { tone: 4, py: 'à', char: '啊', word: '啊！真美呀', emoji: '🤩', speak: '四声降 à，赞叹真美呀' }
    ]
  },
  {
    id: 'ym_o',
    code: 'o',
    category: 'yunmu',
    subGroup: '单韵母',
    readSound: '喔',
    emoji: '🐓',
    chant: '太阳出来红通通，公鸡打鸣 o o o',
    tip: '嘴巴拢圆，舌头往后缩，发出洪亮的圆唇音。',
    word: '公鸡喔喔',
    wordPinyin: 'ō ō tí',
    wordEmoji: '🐓',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'ō', char: '喔', word: '喔喔叫', emoji: '🐓', speak: '一声平 ō，公鸡喔喔叫' },
      { tone: 2, py: 'ó', char: '哦', word: '哦？是吗', emoji: '🧐', speak: '二声扬 ó，哦，是这样吗' },
      { tone: 3, py: 'ǒ', char: '嚄', word: '原来如此', emoji: '💡', speak: '三声拐弯 ǒ' },
      { tone: 4, py: 'ò', char: '哦', word: '哦！明白了', emoji: '👌', speak: '四声降 ò，哦，我明白啦' }
    ]
  },
  {
    id: 'ym_e',
    code: 'e',
    category: 'yunmu',
    subGroup: '单韵母',
    readSound: '鹅',
    emoji: '🦢',
    chant: '清清池塘一只鹅，水中倒影 e e e',
    tip: '嘴巴扁扁，嘴角向两边展，舌头后缩。',
    word: '白鹅',
    wordPinyin: 'bái é',
    wordEmoji: '🦢',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'ē', char: '阿', word: '阿胶', emoji: '🍯', speak: '一声平 ē' },
      { tone: 2, py: 'é', char: '鹅', word: '大白鹅', emoji: '🦢', speak: '二声扬 é，大白鹅的鹅' },
      { tone: 3, py: 'ě', char: '恶', word: '恶心', emoji: '😣', speak: '三声拐弯 ě' },
      { tone: 4, py: 'è', char: '鳄', word: '鳄鱼', emoji: '🐊', speak: '四声降 è，小鳄鱼的鳄' }
    ]
  },
  {
    id: 'ym_i',
    code: 'i',
    category: 'yunmu',
    subGroup: '单韵母',
    readSound: '衣',
    emoji: '👕',
    chant: '牙齿对齐 i i i，漂亮衣服穿整齐',
    tip: '上下牙齿对齐，嘴角向两边展开像微笑。',
    word: '蚂蚁',
    wordPinyin: 'mǎ yǐ',
    wordEmoji: '🐜',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'yī', char: '一', word: '第一', emoji: '1️⃣', speak: '一声平 yī，一二三的一' },
      { tone: 2, py: 'yí', char: '姨', word: '阿姨', emoji: '👩', speak: '二声扬 yí，好阿姨的姨' },
      { tone: 3, py: 'yǐ', char: '椅', word: '椅子', emoji: '🪑', speak: '三声拐弯 yǐ，小椅子的椅' },
      { tone: 4, py: 'yì', char: '亿', word: '记忆', emoji: '🧠', speak: '四声降 yì，好记忆的忆' }
    ]
  },
  {
    id: 'ym_u',
    code: 'u',
    category: 'yunmu',
    subGroup: '单韵母',
    readSound: '乌',
    emoji: '🚂',
    chant: '嘴巴突出 u u u，小火车开呜呜呜',
    tip: '双唇拢圆，向前突出，只留一个小圆孔。',
    word: '房屋',
    wordPinyin: 'fáng wū',
    wordEmoji: '🏠',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'wū', char: '屋', word: '小屋', emoji: '🏠', speak: '一声平 wū，小木屋的屋' },
      { tone: 2, py: 'wú', char: '吴', word: '蜈蚣', emoji: '🐛', speak: '二声扬 wú，小蜈蚣的蜈' },
      { tone: 3, py: 'wǔ', char: '五', word: '五个', emoji: '5️⃣', speak: '三声拐弯 wǔ，一二三四五的五' },
      { tone: 4, py: 'wù', char: '雾', word: '云雾', emoji: '🌫️', speak: '四声降 wù，大雾的雾' }
    ]
  },
  {
    id: 'ym_v',
    code: 'ü',
    category: 'yunmu',
    subGroup: '单韵母',
    readSound: '迂',
    emoji: '🐟',
    chant: '小鱼吐泡 ü ü ü，嘴吹口哨笑嘻嘻',
    tip: '双唇拢成扁圆小孔，像吹笛子一样。遇到 j q x y 要摘掉墨镜两点哦！',
    word: '金鱼',
    wordPinyin: 'jīn yú',
    wordEmoji: '🐟',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'yū', char: '迂', word: '蜿蜒', emoji: '🛣️', speak: '一声平 yū' },
      { tone: 2, py: 'yú', char: '鱼', word: '小鱼', emoji: '🐟', speak: '二声扬 yú，小金鱼的鱼' },
      { tone: 3, py: 'yǔ', char: '雨', word: '下雨', emoji: '🌧️', speak: '三声拐弯 yǔ，下春雨的雨' },
      { tone: 4, py: 'yù', char: '玉', word: '玉米', emoji: '🌽', speak: '四声降 yù，甜玉米的玉' }
    ]
  },
  // 复韵母 (9个)
  {
    id: 'ym_ai',
    code: 'ai',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '挨',
    emoji: '❤️',
    chant: 'a 在前 i 在后，姐弟挨着 ai ai ai',
    tip: '先发 a 的音，然后舌位迅速滑向 i。',
    word: '友爱',
    wordPinyin: 'yǒu ài',
    wordEmoji: '🤗',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'āi', char: '挨', word: '挨着', emoji: '👫', speak: '一声 āi，挨在一起的挨' },
      { tone: 2, py: 'ái', char: '皑', word: '白雪皑皑', emoji: '❄️', speak: '二声 ái，白雪皑皑的皑' },
      { tone: 3, py: 'ǎi', char: '矮', word: '高矮', emoji: '📏', speak: '三声 ǎi，比高矮的矮' },
      { tone: 4, py: 'ài', char: '爱', word: '爱心', emoji: '❤️', speak: '四声 ài，有爱心的爱' }
    ]
  },
  {
    id: 'ym_ei',
    code: 'ei',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '杯',
    emoji: '🥛',
    chant: '用力砍柴 ei ei ei，拿起水杯喝美味',
    tip: '从 e 滑向 i，气流不断，一气呵成。',
    word: '水杯',
    wordPinyin: 'shuǐ bēi',
    wordEmoji: '🥛',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'bēi', char: '杯', word: '水杯', emoji: '🥛', speak: '一声 bēi，小水杯的杯' },
      { tone: 2, py: 'féi', char: '肥', word: '肥皂', emoji: '🧼', speak: '二声 féi，香肥皂的肥' },
      { tone: 3, py: 'měi', char: '美', word: '美丽', emoji: '🌺', speak: '三声 měi，真美丽的美' },
      { tone: 4, py: 'mèi', char: '妹', word: '妹妹', emoji: '👧', speak: '四声 mèi，小妹妹的妹' }
    ]
  },
  {
    id: 'ym_ui',
    code: 'ui',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '威',
    emoji: '🧣',
    chant: '小女孩戴围巾，脖子暖和 ui ui ui',
    tip: '先发 u 音，迅速滑向 ei，声调标在 i 上面。',
    word: '乌龟',
    wordPinyin: 'wū guī',
    wordEmoji: '🐢',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'guī', char: '龟', word: '乌龟', emoji: '🐢', speak: '一声 guī，小乌龟的龟' },
      { tone: 2, py: 'kuí', char: '葵', word: '向日葵', emoji: '🌻', speak: '二声 kuí，向日葵的葵' },
      { tone: 3, py: 'shuǐ', char: '水', word: '泉水', emoji: '💧', speak: '三声 shuǐ，喝清水的的水' },
      { tone: 4, py: 'shuì', char: '睡', word: '睡觉', emoji: '😴', speak: '四声 shuì，乖乖睡觉的睡' }
    ]
  },
  {
    id: 'ym_ao',
    code: 'ao',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '熬',
    emoji: '🧥',
    chant: '冬天穿上小棉袄，暖暖和和 ao ao ao',
    tip: '先发 a 的音，嘴唇逐渐拢圆滑向 o。',
    word: '小猫',
    wordPinyin: 'xiǎo māo',
    wordEmoji: '🐱',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'māo', char: '猫', word: '小猫', emoji: '🐱', speak: '一声 māo，小花猫的猫' },
      { tone: 2, py: 'táo', char: '桃', word: '桃子', emoji: '🍑', speak: '二声 táo，甜桃子的桃' },
      { tone: 3, py: 'niǎo', char: '鸟', word: '小鸟', emoji: '🐦', speak: '三声 niǎo，飞翔小鸟的鸟' },
      { tone: 4, py: 'mào', char: '帽', word: '帽子', emoji: '🧢', speak: '四声 mào，戴帽子的帽' }
    ]
  },
  {
    id: 'ym_ou',
    code: 'ou',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '欧',
    emoji: '🕊️',
    chant: '大海上面飞海鸥，展翅高飞 ou ou ou',
    tip: '先发 o 的音，嘴唇更加拢圆滑向 u。',
    word: '海鸥',
    wordPinyin: 'hǎi ōu',
    wordEmoji: '🕊️',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'ōu', char: '鸥', word: '海鸥', emoji: '🕊️', speak: '一声 ōu，白海鸥的鸥' },
      { tone: 2, py: 'hóu', char: '猴', word: '小猴', emoji: '🐵', speak: '二声 hóu，小猴子的猴' },
      { tone: 3, py: 'gǒu', char: '狗', word: '小狗', emoji: '🐶', speak: '三声 gǒu，哈巴狗的狗' },
      { tone: 4, py: 'dòu', char: '豆', word: '豌豆', emoji: '🫛', speak: '四声 dòu，圆豌豆的豆' }
    ]
  },
  {
    id: 'ym_iu',
    code: 'iu',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '优',
    emoji: '🏊',
    chant: '夏天戏水游啊游，优秀宝宝 iu iu iu',
    tip: '从 i 滑向 ou，注意声调帽子戴在后面的 u 上！',
    word: '气球',
    wordPinyin: 'qì qiú',
    wordEmoji: '🎈',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'qiū', char: '秋', word: '秋天', emoji: '🍂', speak: '一声 qiū，金秋天的秋' },
      { tone: 2, py: 'niú', char: '牛', word: '水牛', emoji: '🐮', speak: '二声 niú，大水牛的牛' },
      { tone: 3, py: 'jiǔ', char: '九', word: '九个', emoji: '9️⃣', speak: '三声 jiǔ，数字九的九' },
      { tone: 4, py: 'liù', char: '六', word: '六个', emoji: '6️⃣', speak: '四声 liù，数字六的六' }
    ]
  },
  {
    id: 'ym_ie',
    code: 'ie',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '耶',
    emoji: '🥥',
    chant: '圆圆月亮一棵椰，树叶飘落 ie ie ie',
    tip: '先发 i 音，迅速滑向 ê。',
    word: '蝴蝶',
    wordPinyin: 'hú dié',
    wordEmoji: '🦋',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'yē', char: '椰', word: '椰子', emoji: '🥥', speak: '一声 yē，大椰子的椰' },
      { tone: 2, py: 'dié', char: '蝶', word: '蝴蝶', emoji: '🦋', speak: '二声 dié，花蝴蝶的蝶' },
      { tone: 3, py: 'xiě', char: '写', word: '写字', emoji: '✍️', speak: '三声 xiě，写作业的写' },
      { tone: 4, py: 'yè', char: '叶', word: '树叶', emoji: '🍃', speak: '四声 yè，绿树叶的叶' }
    ]
  },
  {
    id: 'ym_ve',
    code: 'üe',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '约',
    emoji: '🌙',
    chant: '弯弯月儿上高空，喜鹊唱歌 üe üe üe',
    tip: '从 ü 滑向 ê，和 j q x 相拼时要去掉 ü 上两点。',
    word: '月亮',
    wordPinyin: 'yuè liang',
    wordEmoji: '🌙',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'yuē', char: '约', word: '约定', emoji: '🤙', speak: '一声 yuē，拉勾约定的约' },
      { tone: 2, py: 'xué', char: '学', word: '学习', emoji: '🎒', speak: '二声 xué，上学堂的学' },
      { tone: 3, py: 'xuě', char: '雪', word: '雪人', emoji: '⛄', speak: '三声 xuě，堆雪人的雪' },
      { tone: 4, py: 'yuè', char: '月', word: '月亮', emoji: '🌙', speak: '四声 yuè，弯月亮的月' }
    ]
  },
  {
    id: 'ym_er',
    code: 'er',
    category: 'yunmu',
    subGroup: '复韵母',
    readSound: '儿',
    emoji: '👂',
    chant: '小小耳朵听声音，特殊韵母 er er er',
    tip: '发 e 的同时把舌尖向后卷起，它从不和声母相拼，自己独立成音节！',
    word: '耳朵',
    wordPinyin: 'ěr duo',
    wordEmoji: '👂',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'ēr', char: '儿', word: '花儿', emoji: '🌸', speak: '一声 ēr，红花儿' },
      { tone: 2, py: 'ér', char: '儿', word: '儿童', emoji: '🧒', speak: '二声 ér，好儿童的儿' },
      { tone: 3, py: 'ěr', char: '耳', word: '耳朵', emoji: '👂', speak: '三声 ěr，小耳朵的耳' },
      { tone: 4, py: 'èr', char: '二', word: '二月', emoji: '2️⃣', speak: '四声 èr，一二三的二' }
    ]
  },
  // 前鼻韵母 (5个)
  {
    id: 'ym_an',
    code: 'an',
    category: 'yunmu',
    subGroup: '前鼻韵母',
    readSound: '安',
    emoji: '🏯',
    chant: '天安门前看升旗，平平安安 an an an',
    tip: '先发 a 音，接着舌尖抵住上齿龈发前鼻音 n。',
    word: '天安门',
    wordPinyin: 'tiān ān mén',
    wordEmoji: '🏯',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'shān', char: '山', word: '高山', emoji: '⛰️', speak: '一声 shān，大高山的山' },
      { tone: 2, py: 'lán', char: '蓝', word: '蓝天', emoji: '🌤️', speak: '二声 lán，蓝天白云的蓝' },
      { tone: 3, py: 'sǎn', char: '伞', word: '雨伞', emoji: '☂️', speak: '三声 sǎn，花雨伞的伞' },
      { tone: 4, py: 'fàn', char: '饭', word: '米饭', emoji: '🍚', speak: '四声 fàn，香米饭的饭' }
    ]
  },
  {
    id: 'ym_en',
    code: 'en',
    category: 'yunmu',
    subGroup: '前鼻韵母',
    readSound: '恩',
    emoji: '🔔',
    chant: '小手按门铃，叮咚开门 en en en',
    tip: '先发 e，然后舌尖抬起抵住上牙床发鼻音。',
    word: '大门',
    wordPinyin: 'dà mén',
    wordEmoji: '🚪',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'ēn', char: '恩', word: '感恩', emoji: '🙏', speak: '一声 ēn，感恩的心' },
      { tone: 2, py: 'mén', char: '门', word: '大门', emoji: '🚪', speak: '二声 mén，开大门的门' },
      { tone: 3, py: 'běn', char: '本', word: '书本', emoji: '📓', speak: '三声 běn，作业本的本' },
      { tone: 4, py: 'rèn', char: '认', word: '认真', emoji: '💯', speak: '四声 rèn，真认真的认' }
    ]
  },
  {
    id: 'ym_in',
    code: 'in',
    category: 'yunmu',
    subGroup: '前鼻韵母',
    readSound: '音',
    emoji: '🌳',
    chant: '大树底下好乘凉，绿树成荫 in in in',
    tip: '先发 i，舌尖抵住上齿龈发前鼻音 n。',
    word: '音乐',
    wordPinyin: 'yīn yuè',
    wordEmoji: '🎵',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'xīn', char: '心', word: '开心', emoji: '❤️', speak: '一声 xīn，真开心的心' },
      { tone: 2, py: 'lín', char: '林', word: '森林', emoji: '🌲', speak: '二声 lín，大森林的林' },
      { tone: 3, py: 'yǐn', char: '饮', word: '饮料', emoji: '🧃', speak: '三声 yǐn，喝饮品的饮' },
      { tone: 4, py: 'xìn', char: '信', word: '书信', emoji: '✉️', speak: '四声 xìn，寄书信的信' }
    ]
  },
  {
    id: 'ym_un',
    code: 'un',
    category: 'yunmu',
    subGroup: '前鼻韵母',
    readSound: '温',
    emoji: '🐬',
    chant: '海豚顶球真聪明，滚来滚去 un un un',
    tip: '先发 u，紧接着舌尖抵住上牙床发 n。',
    word: '春天',
    wordPinyin: 'chūn tiān',
    wordEmoji: '🌸',
    gridPos: 'middle',
    tones: [
      { tone: 1, py: 'chūn', char: '春', word: '春天', emoji: '🌸', speak: '一声 chūn，暖春天的春' },
      { tone: 2, py: 'lún', char: '轮', word: '车轮', emoji: '🛞', speak: '二声 lún，圆车轮的轮' },
      { tone: 3, py: 'gǔn', char: '滚', word: '翻滚', emoji: '🐼', speak: '三声 gǔn，打滚的滚' },
      { tone: 4, py: 'kùn', char: '困', word: '犯困', emoji: '🥱', speak: '四声 kùn' }
    ]
  },
  {
    id: 'ym_vn',
    code: 'ün',
    category: 'yunmu',
    subGroup: '前鼻韵母',
    readSound: '晕',
    emoji: '☁️',
    chant: '蓝蓝天上白云飘，朵朵白云 ün ün ün',
    tip: '先发 ü，舌尖抵住上齿龈发前鼻音 n。',
    word: '白云',
    wordPinyin: 'bái yún',
    wordEmoji: '☁️',
    gridPos: 'upper-middle',
    tones: [
      { tone: 1, py: 'jūn', char: '军', word: '军人', emoji: '🫡', speak: '一声 jūn，解放军的军' },
      { tone: 2, py: 'qún', char: '裙', word: '裙子', emoji: '👗', speak: '二声 qún，花裙子的裙' },
      { tone: 3, py: 'yǔn', char: '允', word: '允许', emoji: '✅', speak: '三声 yǔn' },
      { tone: 4, py: 'yùn', char: '运', word: '运动', emoji: '🏃', speak: '四声 yùn，爱运动的运' }
    ]
  },
  // 后鼻韵母 (4个)
  {
    id: 'ym_ang',
    code: 'ang',
    category: 'yunmu',
    subGroup: '后鼻韵母',
    readSound: '昂',
    emoji: '🐑',
    chant: '小羊抬头昂起胸，大步向前 ang ang ang',
    tip: '先发 a，舌根后缩抵住软腭，气流从鼻腔深处出来。',
    word: '小羊',
    wordPinyin: 'xiǎo yáng',
    wordEmoji: '🐑',
    gridPos: 'middle-lower',
    tones: [
      { tone: 1, py: 'āng', char: '肮', word: '干净', emoji: '✨', speak: '一声 āng' },
      { tone: 2, py: 'yáng', char: '羊', word: '绵羊', emoji: '🐑', speak: '二声 yáng，小绵羊的羊' },
      { tone: 3, py: 'ǎng', char: '仰', word: '仰望', emoji: '🔭', speak: '三声 yǎng，仰望星空的仰' },
      { tone: 4, py: 'chàng', char: '唱', word: '歌唱', emoji: '🎤', speak: '四声 chàng，大声歌唱的唱' }
    ]
  },
  {
    id: 'ym_eng',
    code: 'eng',
    category: 'yunmu',
    subGroup: '后鼻韵母',
    readSound: '鞥',
    emoji: '🏮',
    chant: '中秋佳节挂灯笼，点亮台灯 eng eng eng',
    tip: '先发 e，舌根抬起抵住软腭发后鼻音 ng。',
    word: '台灯',
    wordPinyin: 'tái dēng',
    wordEmoji: '🏮',
    gridPos: 'middle-lower',
    tones: [
      { tone: 1, py: 'dēng', char: '灯', word: '灯笼', emoji: '🏮', speak: '一声 dēng，红灯笼的灯' },
      { tone: 2, py: 'péng', char: '朋', word: '朋友', emoji: '👫', speak: '二声 péng，好朋友的朋' },
      { tone: 3, py: 'lěng', char: '冷', word: '寒冷', emoji: '❄️', speak: '三声 lěng，冬天冷的冷' },
      { tone: 4, py: 'mèng', char: '梦', word: '美梦', emoji: '💭', speak: '四声 mèng，做美梦的梦' }
    ]
  },
  {
    id: 'ym_ing',
    code: 'ing',
    category: 'yunmu',
    subGroup: '后鼻韵母',
    readSound: '英',
    emoji: '🦅',
    chant: '老鹰展翅飞蓝天，天上星星 ing ing ing',
    tip: '先发 i，舌根抵住软腭发后鼻音 ng。',
    word: '星星',
    wordPinyin: 'xīng xing',
    wordEmoji: '⭐',
    gridPos: 'full',
    tones: [
      { tone: 1, py: 'xīng', char: '星', word: '星星', emoji: '⭐', speak: '一声 xīng，亮晶晶星星的星' },
      { tone: 2, py: 'píng', char: '苹', word: '苹果', emoji: '🍎', speak: '二声 píng，红苹果的苹' },
      { tone: 3, py: 'yǐng', char: '影', word: '电影', emoji: '🎬', speak: '三声 yǐng，看电影的影' },
      { tone: 4, py: 'jìng', char: '镜', word: '镜子', emoji: '🪞', speak: '四声 jìng，照镜子的镜' }
    ]
  },
  {
    id: 'ym_ong',
    code: 'ong',
    category: 'yunmu',
    subGroup: '后鼻韵母',
    readSound: '轰',
    emoji: '⏰',
    chant: '墙上挂着大挂钟，滴答滴答 ong ong ong',
    tip: '先发 u/o，双唇拢圆，舌根抵住软腭发 ng。',
    word: '彩虹',
    wordPinyin: 'cǎi hóng',
    wordEmoji: '🌈',
    gridPos: 'middle-lower',
    tones: [
      { tone: 1, py: 'zhōng', char: '钟', word: '闹钟', emoji: '⏰', speak: '一声 zhōng，小闹钟的钟' },
      { tone: 2, py: 'hóng', char: '虹', word: '彩虹', emoji: '🌈', speak: '二声 hóng，七彩彩虹的虹' },
      { tone: 3, py: 'dǒng', char: '懂', word: '懂事', emoji: '👍', speak: '三声 dǒng，懂礼貌的懂' },
      { tone: 4, py: 'dòng', char: '动', word: '动物', emoji: '🐾', speak: '四声 dòng，小动物的动' }
    ]
  }
]

export const ZHENGTI_LIST = [
  {
    id: 'zt_zhi',
    code: 'zhi',
    category: 'zhengti',
    subGroup: '翘舌整体认读',
    readSound: '知',
    emoji: '🕷️',
    chant: '织毛衣 zhi zhi zhi，整体认读不用拼',
    tip: '把声母 zh 的音读得长而响亮即可，不能拆开拼读哦！',
    word: '知识',
    wordPinyin: 'zhī shi',
    wordEmoji: '📘',
    tones: [
      { tone: 1, py: 'zhī', char: '知', word: '蜘蛛', emoji: '🕷️', speak: '一声 zhī，小蜘蛛的蜘' },
      { tone: 2, py: 'zhí', char: '直', word: '笔直', emoji: '📏', speak: '二声 zhí，笔直大树的直' },
      { tone: 3, py: 'zhǐ', char: '纸', word: '折纸', emoji: 'origami', speak: '三声 zhǐ，折纸飞机的纸' },
      { tone: 4, py: 'zhì', char: '志', word: '志气', emoji: '🚩', speak: '四声 zhì，有志气的志' }
    ]
  },
  {
    id: 'zt_chi',
    code: 'chi',
    category: 'zhengti',
    subGroup: '翘舌整体认读',
    readSound: '吃',
    emoji: '🍉',
    chant: '吃西瓜 chi chi chi，整体认读记心里',
    tip: '把声母 ch 的音读得长一些、响亮一些。',
    word: '吃饭',
    wordPinyin: 'chī fàn',
    wordEmoji: '🍚',
    tones: [
      { tone: 1, py: 'chī', char: '吃', word: '吃饭', emoji: '🍚', speak: '一声 chī，好好吃饭的吃' },
      { tone: 2, py: 'chí', char: '池', word: '池塘', emoji: '🏞️', speak: '二声 chí，小池塘的池' },
      { tone: 3, py: 'chǐ', char: '齿', word: '牙齿', emoji: '🦷', speak: '三声 chǐ，白牙齿的齿' },
      { tone: 4, py: 'chì', char: '翅', word: '翅膀', emoji: '🪽', speak: '四声 chì，拍翅膀的翅' }
    ]
  },
  {
    id: 'zt_shi',
    code: 'shi',
    category: 'zhengti',
    subGroup: '翘舌整体认读',
    readSound: '诗',
    emoji: '🦁',
    chant: '小狮子 shi shi shi，威风凛凛读古诗',
    tip: '把声母 sh 读长读响，一口气读出。',
    word: '老师',
    wordPinyin: 'lǎo shī',
    wordEmoji: '👩‍🏫',
    tones: [
      { tone: 1, py: 'shī', char: '师', word: '老师', emoji: '👩‍🏫', speak: '一声 shī，好老师的师' },
      { tone: 2, py: 'shí', char: '十', word: '十个', emoji: '🔟', speak: '二声 shí，数字十的十' },
      { tone: 3, py: 'shǐ', char: '史', word: '历史', emoji: '📜', speak: '三声 shǐ，历史故事的史' },
      { tone: 4, py: 'shì', char: '柿', word: '柿子', emoji: '🍅', speak: '四声 shì，红柿子的柿' }
    ]
  },
  {
    id: 'zt_ri',
    code: 'ri',
    category: 'zhengti',
    subGroup: '翘舌整体认读',
    readSound: '日',
    emoji: '☀️',
    chant: '红太阳 ri ri ri，向日葵儿笑眯眯',
    tip: '把 r 的音拖长读响，整体直接认读。',
    word: '日出',
    wordPinyin: 'rì chū',
    wordEmoji: '🌅',
    tones: [
      { tone: 1, py: 'rī', char: '日', word: '红日', emoji: '☀️', speak: '四声 rì，红日初升的日' },
      { tone: 2, py: 'rí', char: '日', word: '值日', emoji: '🧹', speak: '四声 rì，做值日的日' },
      { tone: 3, py: 'rǐ', char: '日', word: '日记', emoji: '📔', speak: '四声 rì，写日记的日' },
      { tone: 4, py: 'rì', char: '日', word: '生日', emoji: '🎂', speak: '四声 rì，过生日的日' }
    ]
  },
  {
    id: 'zt_zi',
    code: 'zi',
    category: 'zhengti',
    subGroup: '平舌整体认读',
    readSound: '资',
    emoji: '💜',
    chant: '紫葡萄 zi zi zi，一串一串甜丝丝',
    tip: '平舌音整体认读，舌尖抵住齿背读响亮。',
    word: '写字',
    wordPinyin: 'xiě zì',
    wordEmoji: '✍️',
    tones: [
      { tone: 1, py: 'zī', char: '姿', word: '姿势', emoji: '🧘', speak: '一声 zī，端正姿势的姿' },
      { tone: 2, py: 'zí', char: '紫', word: '紫色', emoji: '🍇', speak: '三声 zǐ，紫葡萄的紫' },
      { tone: 3, py: 'zǐ', char: '紫', word: '紫色', emoji: '🟣', speak: '三声 zǐ，紫色的紫' },
      { tone: 4, py: 'zì', char: '字', word: '识字', emoji: '🔤', speak: '四声 zì，认识汉字的字' }
    ]
  },
  {
    id: 'zt_ci',
    code: 'ci',
    category: 'zhengti',
    subGroup: '平舌整体认读',
    readSound: '雌',
    emoji: '🦔',
    chant: '小刺猬 ci ci ci，背着果子回家去',
    tip: '把平舌音 c 读长读响。',
    word: '刺猬',
    wordPinyin: 'cì wei',
    wordEmoji: '🦔',
    tones: [
      { tone: 1, py: 'cī', char: '疵', word: '笑嘻嘻', emoji: '😄', speak: '一声 cī' },
      { tone: 2, py: 'cí', char: '词', word: '诗词', emoji: '📜', speak: '二声 cí，古诗词的词' },
      { tone: 3, py: 'cǐ', char: '此', word: '从此', emoji: '✨', speak: '三声 cǐ，从此的此' },
      { tone: 4, py: 'cì', char: '刺', word: '刺猬', emoji: '🦔', speak: '四声 cì，小刺猬的刺' }
    ]
  },
  {
    id: 'zt_si',
    code: 'si',
    category: 'zhengti',
    subGroup: '平舌整体认读',
    readSound: '思',
    emoji: '🐛',
    chant: '蚕吐丝 si si si，考考你的小脑筋',
    tip: '把平舌音 s 读得长而清楚。',
    word: '思考',
    wordPinyin: 'sī kǎo',
    wordEmoji: '🤔',
    tones: [
      { tone: 1, py: 'sī', char: '丝', word: '吐丝', emoji: '🐛', speak: '一声 sī，春蚕吐丝的丝' },
      { tone: 2, py: 'sí', char: '四', word: '四个', emoji: '4️⃣', speak: '四声 sì，数字四的四' },
      { tone: 3, py: 'sǐ', char: '死', word: '死心塌地', emoji: '💪', speak: '三声 sǐ' },
      { tone: 4, py: 'sì', char: '四', word: '四季', emoji: '🍂', speak: '四声 sì，一年四季的四' }
    ]
  },
  {
    id: 'zt_yi',
    code: 'yi',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '衣',
    emoji: '👕',
    chant: '大y带小i，紧密在一起，新衣服 yi yi yi',
    tip: '大 y 和小 i 组成整体认读音节，直接读“衣”。',
    word: '医生',
    wordPinyin: 'yī shēng',
    wordEmoji: '🩺',
    tones: [
      { tone: 1, py: 'yī', char: '医', word: '医生', emoji: '🩺', speak: '一声 yī，白衣医生的医' },
      { tone: 2, py: 'yí', char: '姨', word: '阿姨', emoji: '👩', speak: '二声 yí，阿姨的姨' },
      { tone: 3, py: 'yǐ', char: '蚁', word: '蚂蚁', emoji: '🐜', speak: '三声 yǐ，小蚂蚁的蚁' },
      { tone: 4, py: 'yì', char: '艺', word: '艺术', emoji: '🎨', speak: '四声 yì，才艺的艺' }
    ]
  },
  {
    id: 'zt_wu',
    code: 'wu',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '乌',
    emoji: '🐦‍⬛',
    chant: '大w带小u，乌鸦喝水 wu wu wu',
    tip: '大 w 和小 u 手拉手，直接读“屋”。',
    word: '跳舞',
    wordPinyin: 'tiào wǔ',
    wordEmoji: '💃',
    tones: [
      { tone: 1, py: 'wū', char: '乌', word: '乌鸦', emoji: '🐦‍⬛', speak: '一声 wū，小乌鸦的乌' },
      { tone: 2, py: 'wú', char: '梧', word: '梧桐树', emoji: '🌳', speak: '二声 wú，梧桐树的梧' },
      { tone: 3, py: 'wǔ', char: '舞', word: '跳舞', emoji: '💃', speak: '三声 wǔ，爱跳舞的舞' },
      { tone: 4, py: 'wù', char: '物', word: '动物', emoji: '🦁', speak: '四声 wù，动物园的物' }
    ]
  },
  {
    id: 'zt_yu',
    code: 'yu',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '鱼',
    emoji: '🐟',
    chant: '小ü见大y，擦掉眼泪笑嘻嘻 yu yu yu',
    tip: '小 ü 见到大 y 摘掉了两点，但它还是读 ü 的音哦！',
    word: '小鱼',
    wordPinyin: 'xiǎo yú',
    wordEmoji: '🐟',
    tones: [
      { tone: 1, py: 'yū', char: '淤', word: '淤泥', emoji: '🪷', speak: '一声 yū' },
      { tone: 2, py: 'yú', char: '鱼', word: '小鱼', emoji: '🐟', speak: '二声 yú，小金鱼的鱼' },
      { tone: 3, py: 'yǔ', char: '雨', word: '春雨', emoji: '🌧️', speak: '三声 yǔ，下春雨的雨' },
      { tone: 4, py: 'yù', char: '玉', word: '玉米', emoji: '🌽', speak: '四声 yù，甜玉米的玉' }
    ]
  },
  {
    id: 'zt_ye',
    code: 'ye',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '耶',
    emoji: '🍃',
    chant: '树叶绿油油，椰子甜滋滋 ye ye ye',
    tip: '复韵母 ie 变成整体认读音节 ye。',
    word: '爷爷',
    wordPinyin: 'yé ye',
    wordEmoji: '👴',
    tones: [
      { tone: 1, py: 'yē', char: '椰', word: '椰树', emoji: '🌴', speak: '一声 yē，椰子树的椰' },
      { tone: 2, py: 'yé', char: '爷', word: '爷爷', emoji: '👴', speak: '二声 yé，老爷爷的爷' },
      { tone: 3, py: 'yě', char: '野', word: '田野', emoji: '🌾', speak: '三声 yě，绿田野的野' },
      { tone: 4, py: 'yè', char: '叶', word: '树叶', emoji: '🍃', speak: '四声 yè，小树叶的叶' }
    ]
  },
  {
    id: 'zt_yue',
    code: 'yue',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '月',
    emoji: '🌙',
    chant: '弯弯月亮船，快乐学音乐 yue yue yue',
    tip: '大 y 加上去掉两点的 üe，直接读“月”。',
    word: '月亮',
    wordPinyin: 'yuè liang',
    wordEmoji: '🌙',
    tones: [
      { tone: 1, py: 'yuē', char: '约', word: '节约', emoji: '💧', speak: '一声 yuē，节约用水的约' },
      { tone: 2, py: 'yué', char: '阅', word: '阅读', emoji: '📖', speak: '四声 yuè，爱阅读的阅' },
      { tone: 3, py: 'yuě', char: '月', word: '月饼', emoji: '🥮', speak: '四声 yuè，吃月饼的月' },
      { tone: 4, py: 'yuè', char: '月', word: '月亮', emoji: '🌙', speak: '四声 yuè，圆月亮的月' }
    ]
  },
  {
    id: 'zt_yuan',
    code: 'yuan',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '圆',
    emoji: '⭕',
    chant: '皮球圆又圆，花园真美丽 yuan yuan yuan',
    tip: '整体认读音节 yuan，不用拆开直接读“圆”。',
    word: '花园',
    wordPinyin: 'huā yuán',
    wordEmoji: '🏡',
    tones: [
      { tone: 1, py: 'yuān', char: '鸳', word: '鸳鸯', emoji: '🦆', speak: '一声 yuān，小鸳鸯的鸳' },
      { tone: 2, py: 'yuán', char: '圆', word: '团圆', emoji: '🌕', speak: '二声 yuán，大团圆的圆' },
      { tone: 3, py: 'yuǎn', char: '远', word: '远方', emoji: '🔭', speak: '三声 yuǎn，望远镜的远' },
      { tone: 4, py: 'yuàn', char: '院', word: '庭院', emoji: '🏡', speak: '四声 yuàn，小院子的院' }
    ]
  },
  {
    id: 'zt_yin',
    code: 'yin',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '音',
    emoji: '🎵',
    chant: '小鸟唱音乐，地上一串脚印 yin yin yin',
    tip: '大 y 和前鼻韵母 in 组成整体认读音节 yin。',
    word: '音乐',
    wordPinyin: 'yīn yuè',
    wordEmoji: '🎵',
    tones: [
      { tone: 1, py: 'yīn', char: '音', word: '音乐', emoji: '🎵', speak: '一声 yīn，好听音乐的音' },
      { tone: 2, py: 'yín', char: '银', word: '银河', emoji: '🌌', speak: '二声 yín，亮银河的银' },
      { tone: 3, py: 'yǐn', char: '引', word: '引导', emoji: '🧭', speak: '三声 yǐn' },
      { tone: 4, py: 'yìn', char: '印', word: '脚印', emoji: '🐾', speak: '四声 yìn，小脚印的印' }
    ]
  },
  {
    id: 'zt_yun',
    code: 'yun',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '云',
    emoji: '☁️',
    chant: '天上白朵云，微风吹过来 yun yun yun',
    tip: '大 y 和去掉两点的 ün 组成整体认读音节 yun。',
    word: '白云',
    wordPinyin: 'bái yún',
    wordEmoji: '☁️',
    tones: [
      { tone: 1, py: 'yūn', char: '晕', word: '红晕', emoji: '😊', speak: '一声 yūn' },
      { tone: 2, py: 'yún', char: '云', word: '白云', emoji: '☁️', speak: '二声 yún，大白云的云' },
      { tone: 3, py: 'yǔn', char: '允', word: '允许', emoji: '👍', speak: '三声 yǔn' },
      { tone: 4, py: 'yùn', char: '运', word: '运动', emoji: '⚽', speak: '四声 yùn，做运动的运' }
    ]
  },
  {
    id: 'zt_ying',
    code: 'ying',
    category: 'zhengti',
    subGroup: 'y/w 整体认读',
    readSound: '英',
    emoji: '🦅',
    chant: '雄鹰飞高空，萤火虫提灯笼 ying ying ying',
    tip: '后鼻音整体认读音节 ying，发音响亮饱满。',
    word: '老鹰',
    wordPinyin: 'lǎo yīng',
    wordEmoji: '🦅',
    tones: [
      { tone: 1, py: 'yīng', char: '鹰', word: '老鹰', emoji: '🦅', speak: '一声 yīng，大老鹰的鹰' },
      { tone: 2, py: 'yíng', char: '萤', word: '萤火虫', emoji: '✨', speak: '二声 yíng，萤火虫的萤' },
      { tone: 3, py: 'yǐng', char: '影', word: '手影', emoji: '👐', speak: '三声 yǐng，捉影子的影' },
      { tone: 4, py: 'yìng', char: '硬', word: '坚硬', emoji: '🪨', speak: '四声 yìng，石头硬的硬' }
    ]
  }
]

export const ALL_PINYIN_ITEMS = [
  ...SHENGMU_LIST,
  ...YUNMU_LIST,
  ...ZHENGTI_LIST
]

// 魔法拼读实验室配方（两拼音节 & 三拼音节）
export const PINYIN_SPELL_RECIPES = [
  {
    id: 'sp_ba',
    type: '两拼音节',
    sm: 'b',
    ym: 'a',
    ruleTip: '前音轻短后音重，两音相连猛一碰！',
    tones: {
      1: { py: 'bā', char: '八', word: '八爪鱼', emoji: '🐙', sentence: 'b - ā ➔ bā，八爪鱼吐泡泡！' },
      2: { py: 'bá', char: '拔', word: '拔萝卜', emoji: '🥕', sentence: 'b - á ➔ bá，嘿哟嘿哟拔萝卜！' },
      3: { py: 'bǎ', char: '把', word: '雨伞把', emoji: '☂️', sentence: 'b - ǎ ➔ bǎ，小手握住雨伞把！' },
      4: { py: 'bà', char: '爸', word: '好爸爸', emoji: '👨', sentence: 'b - à ➔ bà，我爱我的好爸爸！' }
    }
  },
  {
    id: 'sp_ma',
    type: '两拼音节',
    sm: 'm',
    ym: 'a',
    ruleTip: '双唇音 m 碰上大嘴巴 a，拼出最亲切的声音！',
    tones: {
      1: { py: 'mā', char: '妈', word: '好妈妈', emoji: '👩', sentence: 'm - ā ➔ mā，世上只有妈妈好！' },
      2: { py: 'má', char: '麻', word: '小芝麻', emoji: '🌾', sentence: 'm - á ➔ má，芝麻开门变魔法！' },
      3: { py: 'mǎ', char: '马', word: '大白马', emoji: '🐴', sentence: 'm - ǎ ➔ mǎ，小马过河嗒嗒嗒！' },
      4: { py: 'mà', char: '骂', word: '讲礼貌', emoji: '😊', sentence: 'm - à ➔ mà，好孩子从不骂人！' }
    }
  },
  {
    id: 'sp_hu',
    type: '两拼音节',
    sm: 'h',
    ym: 'u',
    ruleTip: '舌根音 h 加上圆唇音 u，拼出森林之王！',
    tones: {
      1: { py: 'hū', char: '呼', word: '呼啦圈', emoji: '⭕', sentence: 'h - ū ➔ hū，北风吹来呼呼呼！' },
      2: { py: 'hú', char: '狐', word: '小狐狸', emoji: '🦊', sentence: 'h - ú ➔ hú，机智聪明小狐狸！' },
      3: { py: 'hǔ', char: '虎', word: '大老虎', emoji: '🐯', sentence: 'h - ǔ ➔ hǔ，森林之王大老虎！' },
      4: { py: 'hù', char: '护', word: '爱护', emoji: '🌱', sentence: 'h - ù ➔ hù，爱护花草好宝宝！' }
    }
  },
  {
    id: 'sp_mao',
    type: '两拼音节',
    sm: 'm',
    ym: 'ao',
    ruleTip: 'm 和复韵母 ao 相拼，标调标在开口大的 a 上！',
    tones: {
      1: { py: 'māo', char: '猫', word: '小花猫', emoji: '🐱', sentence: 'm - āo ➔ māo，小花猫喵喵叫！' },
      2: { py: 'máo', char: '毛', word: '羽毛球', emoji: '🏸', sentence: 'm - áo ➔ máo，洁白轻盈小羽毛！' },
      3: { py: 'mǎo', char: '卯', word: '卯兔', emoji: '🐰', sentence: 'm - ǎo ➔ mǎo，十二生肖小卯兔！' },
      4: { py: 'mào', char: '帽', word: '太阳帽', emoji: '🧢', sentence: 'm - ào ➔ mào，戴上漂亮太阳帽！' }
    }
  },
  {
    id: 'sp_gua',
    type: '三拼音节',
    sm: 'g',
    jm: 'u',
    ym: 'a',
    ruleTip: '声轻介快韵母响，三音连读很顺当！',
    tones: {
      1: { py: 'guā', char: '瓜', word: '大西瓜', emoji: '🍉', sentence: 'g - u - ā ➔ guā，甜甜的大西瓜！' },
      2: { py: 'guá', char: '呱', word: '顶呱呱', emoji: '👍', sentence: 'g - u - ā ➔ guā，宝贝表现顶呱呱！' },
      3: { py: 'guǎ', char: '寡', word: '笑哈哈', emoji: '😄', sentence: 'g - u - ǎ ➔ guǎ！' },
      4: { py: 'guà', char: '挂', word: '挂灯笼', emoji: '🏮', sentence: 'g - u - à ➔ guà，高高挂起红灯笼！' }
    }
  },
  {
    id: 'sp_hua',
    type: '三拼音节',
    sm: 'h',
    jm: 'u',
    ym: 'a',
    ruleTip: 'h (声母) + u (介母) + a (韵母) ➔ huā！',
    tones: {
      1: { py: 'huā', char: '花', word: '红花朵', emoji: '🌺', sentence: 'h - u - ā ➔ huā，花园盛开红花朵！' },
      2: { py: 'huá', char: '滑', word: '滑滑梯', emoji: '🛝', sentence: 'h - u - á ➔ huá，开开心心玩滑梯！' },
      3: { py: 'huǎ', char: '画', word: '画画', emoji: '🎨', sentence: 'h - u - à ➔ huà，拿起画笔画彩虹！' },
      4: { py: 'huà', char: '画', word: '画图画', emoji: '🎨', sentence: 'h - u - à ➔ huà，我是小小画家！' }
    }
  },
  {
    id: 'sp_xia',
    type: '三拼音节',
    sm: 'x',
    jm: 'i',
    ym: 'a',
    ruleTip: 'x (声母) + i (介母) + a (韵母) ➔ xiā！',
    tones: {
      1: { py: 'xiā', char: '虾', word: '大龙虾', emoji: '🦞', sentence: 'x - i - ā ➔ xiā，弯弯胡须大龙虾！' },
      2: { py: 'xiá', char: '霞', word: '彩霞', emoji: '🌅', sentence: 'x - i - á ➔ xiá，天边飘着红彩霞！' },
      3: { py: 'xiǎ', char: '下', word: '下雨', emoji: '🌧️', sentence: 'x - i - à ➔ xià，轰隆隆下春雨！' },
      4: { py: 'xià', char: '夏', word: '夏天', emoji: '🏖️', sentence: 'x - i - à ➔ xià，夏天海边吃冰棍！' }
    }
  },
  {
    id: 'sp_xiong',
    type: '三拼音节',
    sm: 'x',
    jm: 'i',
    ym: 'ong',
    ruleTip: 'x + i + ong ➔ xióng，国宝大熊猫！',
    tones: {
      1: { py: 'xiōng', char: '胸', word: '挺胸', emoji: '🦸', sentence: 'x - i - ōng ➔ xiōng，抬头挺胸真精神！' },
      2: { py: 'xióng', char: '熊', word: '大熊猫', emoji: '🐼', sentence: 'x - i - óng ➔ xióng，憨态可掬大熊猫！' },
      3: { py: 'xiǒng', char: '熊', word: '玩具熊', emoji: '🧸', sentence: 'x - i - óng ➔ xióng，毛茸茸的泰迪熊！' },
      4: { py: 'xiòng', char: '熊', word: '北极熊', emoji: '🐻‍❄️', sentence: 'x - i - óng ➔ xióng，冰雪王国北极熊！' }
    }
  }
]

// 趣味闯关游戏题库
export const PINYIN_GAMES = {
  // 游戏1：听音捉迷藏（听语音选正确的拼音）
  listenQuestions: [
    { id: 'lq1', promptText: '拉开天线听广播，右下半圆是什么？', speak: '请找出声母，播，右下半圆 b b b', answer: 'b', options: ['b', 'p', 'd', 'q'], emoji: '📻' },
    { id: 'lq2', promptText: '小马跑步得得得，左下半圆是什么？', speak: '请找出声母，得，左下半圆 d d d', answer: 'd', options: ['b', 'd', 'p', 't'], emoji: '🐎' },
    { id: 'lq3', promptText: '切开西瓜笑嘻嘻，一个大叉是什么？', speak: '请找出声母，西，切开西瓜 x x x', answer: 'x', options: ['j', 'q', 'x', 's'], emoji: '🍉' },
    { id: 'lq4', promptText: '清清池塘一只鹅，水中倒影是什么？', speak: '请找出单韵母，鹅，清清池塘一只鹅', answer: 'e', options: ['a', 'o', 'e', 'u'], emoji: '🦢' },
    { id: 'lq5', promptText: '小鱼吐泡吹口哨，戴着两点墨镜的是谁？', speak: '请找出单韵母，迂，小鱼吐泡 ü ü ü', answer: 'ü', options: ['i', 'u', 'ü', 'er'], emoji: '🐟' },
    { id: 'lq6', promptText: '小羊抬头昂起胸，后鼻韵母选哪个？', speak: '请找出后鼻韵母，昂，小羊抬头 ang ang ang', answer: 'ang', options: ['an', 'ang', 'en', 'ong'], emoji: '🐑' },
    { id: 'lq7', promptText: '小狮子读古诗，翘舌整体认读音节是谁？', speak: '请找出整体认读音节，诗，小狮子 shi shi shi', answer: 'shi', options: ['si', 'shi', 'chi', 'zhi'], emoji: '🦁' },
    { id: 'lq8', promptText: '弯弯月亮船，整体认读音节选哪个？', speak: '请找出整体认读音节，月，弯弯月亮 yue yue yue', answer: 'yue', options: ['ye', 'yu', 'yue', 'yuan'], emoji: '🌙' }
  ],
  // 游戏2：声调小火车（看图看字，选出正确的声调帽子）
  toneQuestions: [
    { id: 'tq1', word: '妈妈', char: '妈', emoji: '👩', speak: '妈妈的妈，是第几声呢？', answer: 'mā', toneNum: 1, options: ['mā (一声)', 'má (二声)', 'mǎ (三声)', 'mà (四声)'] },
    { id: 'tq2', word: '拔萝卜', char: '拔', emoji: '🥕', speak: '拔萝卜的拔，往上扬是第几声呢？', answer: 'bá (二声)', toneNum: 2, options: ['bā (一声)', 'bá (二声)', 'bǎ (三声)', 'bà (四声)'] },
    { id: 'tq3', word: '大老虎', char: '虎', emoji: '🐯', speak: '大老虎的虎，拐个弯是第几声呢？', answer: 'hǔ (三声)', toneNum: 3, options: ['hū (一声)', 'hú (二声)', 'hǔ (三声)', 'hù (四声)'] },
    { id: 'tq4', word: '大白兔', char: '兔', emoji: '🐰', speak: '大白兔的兔，往下降是第几声呢？', answer: 'tù (四声)', toneNum: 4, options: ['tū (一声)', 'tú (二声)', 'tǔ (三声)', 'tù (四声)'] },
    { id: 'tq5', word: '小金鱼', char: '鱼', emoji: '🐟', speak: '小金鱼的鱼，是第几声呢？', answer: 'yú (二声)', toneNum: 2, options: ['yū (一声)', 'yú (二声)', 'yǔ (三声)', 'yù (四声)'] },
    { id: 'tq6', word: '大西瓜', char: '瓜', emoji: '🍉', speak: '大西瓜的瓜，平平的是第几声呢？', answer: 'guā (一声)', toneNum: 1, options: ['guā (一声)', 'guá (二声)', 'guǎ (三声)', 'guà (四声)'] }
  ],
  // 游戏3：拼音拼图大挑战（看图选出正确的声母+韵母组合）
  puzzleQuestions: [
    { id: 'pq1', targetWord: '红花', targetChar: '花', emoji: '🌺', fullPinyin: 'huā', speak: '红花的花，huā，是由哪些拼音积木拼成的？', parts: ['h', 'u', 'ā'], distractors: ['f', 'i', 'ō'] },
    { id: 'pq2', targetWord: '小猫', targetChar: '猫', emoji: '🐱', fullPinyin: 'māo', speak: '小猫的猫，māo，是由哪些拼音积木拼成的？', parts: ['m', 'āo'], distractors: ['n', 'ōu', 'p'] },
    { id: 'pq3', targetWord: '大熊猫', targetChar: '熊', emoji: '🐼', fullPinyin: 'xióng', speak: '大熊猫的熊，xióng，是由哪些拼音积木拼成的？', parts: ['x', 'i', 'óng'], distractors: ['q', 'u', 'áng'] },
    { id: 'pq4', targetWord: '蓝天', targetChar: '蓝', emoji: '🌤️', fullPinyin: 'lán', speak: '蓝天的蓝，lán，是由哪些拼音积木拼成的？', parts: ['l', 'án'], distractors: ['n', 'áng', 'én'] },
    { id: 'pq5', targetWord: '水牛', targetChar: '牛', emoji: '🐮', fullPinyin: 'niú', speak: '水牛的牛，niú，是由哪些拼音积木拼成的？', parts: ['n', 'iú'], distractors: ['l', 'uí', 'ōu'] },
    { id: 'pq6', targetWord: '春天', targetChar: '春', emoji: '🌸', fullPinyin: 'chūn', speak: '春天的春，chūn，是由哪些拼音积木拼成的？', parts: ['ch', 'ūn'], distractors: ['c', 'ēn', 'sh'] }
  ]
}
