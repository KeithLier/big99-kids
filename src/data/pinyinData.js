// 幼小衔接 · 汉语拼音启蒙全量数据库
// 完整覆盖：23个声母 + 24个韵母 + 16个整体认读音节 = 63个核心拼音
// 所有语音播报字段 (readSound / chantSpeak / tones.speak / spell.speak) 均采用 100% 纯正中文同音呼读字，彻底杜绝 TTS 误读为英文字母！

// 拼音代码 -> 标准中文呼读音映射表（用于将任何拼音代码转为标准普通话发音）
export const PINYIN_SOUND_MAP = {
  // 23个声母
  b: '播', p: '坡', m: '摸', f: '佛',
  d: '得', t: '特', n: '讷', l: '勒',
  g: '哥', k: '科', h: '喝',
  j: '鸡', q: '七', x: '西',
  zh: '知', ch: '吃', sh: '诗', r: '日',
  z: '资', c: '雌', s: '思',
  y: '衣', w: '乌',
  // 24个韵母
  a: '阿', o: '喔', e: '鹅', i: '衣', u: '乌', ü: '迂', v: '迂',
  ai: '挨', ei: '杯', ui: '威', ao: '熬', ou: '欧', iu: '优', ie: '耶', üe: '约', ve: '约', er: '儿',
  an: '安', en: '恩', in: '音', un: '温', ün: '晕', vn: '晕',
  ang: '昂', eng: '鞥', ing: '英', ong: '轰',
  // 16个整体认读音节
  zhi: '知', chi: '吃', shi: '诗', ri: '日',
  zi: '资', ci: '雌', si: '思',
  yi: '衣', wu: '乌', yu: '迂',
  ye: '耶', yue: '月', yuan: '冤',
  yin: '音', yun: '晕', ying: '英'
}

export function getPinyinReadSound(code) {
  if (!code) return ''
  const clean = String(code).trim().toLowerCase()
  return PINYIN_SOUND_MAP[clean] || code
}

// ==================== 1. 声母表 (23个) ====================
export const SHENGMU_LIST = [
  {
    id: 'sm_b',
    code: 'b',
    category: 'shengmu',
    subGroup: '双唇音',
    readSound: '播',
    emoji: '📻',
    chant: '右下半圆 b b b，拉开天线听广播',
    chantSpeak: '右下半圆 播 播 播，拉开天线听广播',
    tip: '双唇紧闭，憋住气再突然放开，声音轻短不送气。',
    word: '菠萝',
    wordPinyin: 'bō luó',
    wordEmoji: '🍍',
    tones: [
      { tone: 1, py: 'bā', char: '八', word: '八戒', emoji: '🐷', speak: '一声 八，猪八戒的八' },
      { tone: 2, py: 'bá', char: '拔', word: '拔萝卜', emoji: '🥕', speak: '二声 拔，拔萝卜的拔' },
      { tone: 3, py: 'bǎ', char: '靶', word: '打靶', emoji: '🎯', speak: '三声 靶，打靶的靶' },
      { tone: 4, py: 'bà', char: '爸', word: '爸爸', emoji: '👨', speak: '四声 爸，好爸爸的爸' }
    ]
  },
  {
    id: 'sm_p',
    code: 'p',
    category: 'shengmu',
    subGroup: '双唇音',
    readSound: '坡',
    emoji: '💦',
    chant: '右上半圆 p p p，端起水盆把水泼',
    chantSpeak: '右上半圆 坡 坡 坡，端起水盆把水泼',
    tip: '双唇紧闭再突然放开，有一股明显的气流喷出来。',
    word: '山坡',
    wordPinyin: 'shān pō',
    wordEmoji: '⛰️',
    tones: [
      { tone: 1, py: 'pō', char: '坡', word: '山坡', emoji: '⛰️', speak: '一声 坡，爬山坡的坡' },
      { tone: 2, py: 'pó', char: '婆', word: '外婆', emoji: '👵', speak: '二声 婆，好外婆的婆' },
      { tone: 3, py: 'pǒ', char: '叵', word: '笸箩', emoji: '🧺', speak: '三声 叵，竹笸箩的笸' },
      { tone: 4, py: 'pò', char: '破', word: '冲破', emoji: '💥', speak: '四声 破，冲破难关的破' }
    ]
  },
  {
    id: 'sm_m',
    code: 'm',
    category: 'shengmu',
    subGroup: '双唇音',
    readSound: '摸',
    emoji: '🚪',
    chant: '两个门洞 m m m，蒙上眼睛捉迷藏',
    chantSpeak: '两个门洞 摸 摸 摸，蒙上眼睛捉迷藏',
    tip: '双唇紧闭，软腭下垂，气流从鼻腔出来。',
    word: '小猫',
    wordPinyin: 'xiǎo māo',
    wordEmoji: '🐱',
    tones: [
      { tone: 1, py: 'mā', char: '妈', word: '妈妈', emoji: '👩', speak: '一声 妈，好妈妈的妈' },
      { tone: 2, py: 'má', char: '麻', word: '芝麻', emoji: '🌾', speak: '二声 麻，小芝麻的麻' },
      { tone: 3, py: 'mǎ', char: '马', word: '小马', emoji: '🐴', speak: '三声 马，大白马的马' },
      { tone: 4, py: 'mà', char: '骂', word: '笑骂', emoji: '🙅', speak: '四声 骂，懂礼貌不骂人' }
    ]
  },
  {
    id: 'sm_f',
    code: 'f',
    category: 'shengmu',
    subGroup: '唇齿音',
    readSound: '佛',
    emoji: '🦯',
    chant: '一根拐杖 f f f，爷爷拄着上山坡',
    chantSpeak: '一根拐杖 佛 佛 佛，爷爷拄着上山坡',
    tip: '上牙齿轻轻接触下嘴唇，让气流从缝隙中摩擦出来。',
    word: '飞机',
    wordPinyin: 'fēi jī',
    wordEmoji: '✈️',
    tones: [
      { tone: 1, py: 'fā', char: '发', word: '出发', emoji: '🚀', speak: '一声 发，快乐出发的发' },
      { tone: 2, py: 'fá', char: '筏', word: '木筏', emoji: '🛶', speak: '二声 筏，划木筏的筏' },
      { tone: 3, py: 'fǎ', char: '法', word: '魔法', emoji: '🪄', speak: '三声 法，变魔法的法' },
      { tone: 4, py: 'fà', char: '发', word: '头发', emoji: '💇', speak: '四声 发，黑头发的发' }
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
    chantSpeak: '左下半圆 得 得 得，小马跑步得得得',
    tip: '舌尖抵住上齿龈，憋住气后突然放开。',
    word: '大象',
    wordPinyin: 'dà xiàng',
    wordEmoji: '🐘',
    tones: [
      { tone: 1, py: 'dā', char: '搭', word: '搭积木', emoji: '🧱', speak: '一声 搭，搭积木的搭' },
      { tone: 2, py: 'dá', char: '答', word: '回答', emoji: '🙋', speak: '二声 答，大声回答的答' },
      { tone: 3, py: 'dǎ', char: '打', word: '打鼓', emoji: '🥁', speak: '三声 打，敲锣打鼓的打' },
      { tone: 4, py: 'dà', char: '大', word: '大象', emoji: '🐘', speak: '四声 大，大象的大' }
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
    chantSpeak: '伞把弯弯 特 特 特，下雨撑开小花伞',
    tip: '舌尖抵住上齿龈，突然放开并送出较强气流。',
    word: '小兔',
    wordPinyin: 'xiǎo tù',
    wordEmoji: '🐰',
    tones: [
      { tone: 1, py: 'tā', char: '他', word: '他们', emoji: '👦', speak: '一声 他，他们俩的他' },
      { tone: 2, py: 'tá', char: '提', word: '提篮', emoji: '🧺', speak: '二声 提，手提篮子的提' },
      { tone: 3, py: 'tǎ', char: '塔', word: '宝塔', emoji: '🗼', speak: '三声 塔，高高宝塔的塔' },
      { tone: 4, py: 'tù', char: '兔', word: '白兔', emoji: '🐰', speak: '四声 兔，小白兔的兔' }
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
    chantSpeak: '一个门洞 讷 讷 讷，火车钻进山洞里',
    tip: '舌尖抵住上齿龈，气流从鼻腔透出。',
    word: '牛奶',
    wordPinyin: 'niú nǎi',
    wordEmoji: '🥛',
    tones: [
      { tone: 1, py: 'nī', char: '妮', word: '小妮子', emoji: '👧', speak: '一声 妮，小妮子的妮' },
      { tone: 2, py: 'ná', char: '拿', word: '拿苹果', emoji: '🍎', speak: '二声 拿，手拿苹果的拿' },
      { tone: 3, py: 'nǎi', char: '奶', word: '牛奶', emoji: '🥛', speak: '三声 奶，喝牛奶的奶' },
      { tone: 4, py: 'nà', char: '那', word: '那里', emoji: '👉', speak: '四声 那，看那里的那' }
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
    chantSpeak: '一根小棍 勒 勒 勒，赶着小猪乐呵呵',
    tip: '舌尖抵住上齿龈，气流从舌头两边流出来。',
    word: '快乐',
    wordPinyin: 'kuài lè',
    wordEmoji: '😄',
    tones: [
      { tone: 1, py: 'lā', char: '拉', word: '拉手', emoji: '🤝', speak: '一声 拉，手拉手的拉' },
      { tone: 2, py: 'lí', char: '梨', word: '鸭梨', emoji: '🍐', speak: '二声 梨，甜鸭梨的梨' },
      { tone: 3, py: 'lǎ', char: '喇', word: '喇叭', emoji: '🎺', speak: '三声 喇，吹喇叭的喇' },
      { tone: 4, py: 'lè', char: '乐', word: '快乐', emoji: '😄', speak: '四声 乐，真快乐的乐' }
    ]
  },
  {
    id: 'sm_g',
    code: 'g',
    category: 'shengmu',
    subGroup: '舌根音',
    readSound: '哥',
    emoji: '🕊️',
    chant: '九字加弯 g g g，白鸽叼着橄榄枝',
    chantSpeak: '九字加弯 哥 哥 哥，白鸽叼着橄榄枝',
    tip: '舌根抬起抵住软腭，憋住气再突然放开。',
    word: '白鸽',
    wordPinyin: 'bái gē',
    wordEmoji: '🕊️',
    tones: [
      { tone: 1, py: 'gē', char: '鸽', word: '白鸽', emoji: '🕊️', speak: '一声 鸽，和平白鸽的鸽' },
      { tone: 2, py: 'gé', char: '格', word: '方格', emoji: '田', speak: '二声 格，田字格的格' },
      { tone: 3, py: 'gǔ', char: '鼓', word: '大鼓', emoji: '🥁', speak: '三声 鼓，敲大鼓的鼓' },
      { tone: 4, py: 'gù', char: '故', word: '故事', emoji: '📖', speak: '四声 故，讲故事的故' }
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
    chantSpeak: '一挺机枪 科 科 科，两只蝌蚪咬水草',
    tip: '舌根抵住软腭，突然放开并送出强气流。',
    word: '蝌蚪',
    wordPinyin: 'kē dǒu',
    wordEmoji: '🐸',
    tones: [
      { tone: 1, py: 'kē', char: '蝌', word: '蝌蚪', emoji: '🐸', speak: '一声 蝌，小蝌蚪的蝌' },
      { tone: 2, py: 'ké', char: '壳', word: '贝壳', emoji: '🐚', speak: '二声 壳，海边贝壳的壳' },
      { tone: 3, py: 'kǎ', char: '卡', word: '卡片', emoji: '🃏', speak: '三声 卡，拼音卡片的卡' },
      { tone: 4, py: 'kù', char: '裤', word: '裤子', emoji: '👖', speak: '四声 裤，穿裤子的裤' }
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
    chantSpeak: '一把椅子 喝 喝 喝，坐着椅子喝水水',
    tip: '舌根接近软腭，气流从窄缝中摩擦出来。',
    word: '荷花',
    wordPinyin: 'hé huā',
    wordEmoji: '🪷',
    tones: [
      { tone: 1, py: 'hē', char: '喝', word: '喝水', emoji: '🥤', speak: '一声 喝，大口喝水的喝' },
      { tone: 2, py: 'hé', char: '荷', word: '荷花', emoji: '🪷', speak: '二声 荷，粉红荷花的荷' },
      { tone: 3, py: 'hǔ', char: '虎', word: '老虎', emoji: '🐯', speak: '三声 虎，大老虎的虎' },
      { tone: 4, py: 'hè', char: '鹤', word: '仙鹤', emoji: '🦩', speak: '四声 鹤，白仙鹤的鹤' }
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
    chantSpeak: '竖弯加点 鸡 鸡 鸡，小鸡捉虫叽叽叽',
    tip: '舌面前部抵住硬腭前部，气流从窄缝摩擦而出。',
    word: '小鸡',
    wordPinyin: 'xiǎo jī',
    wordEmoji: '🐥',
    tones: [
      { tone: 1, py: 'jī', char: '鸡', word: '小鸡', emoji: '🐥', speak: '一声 鸡，小黄鸡的鸡' },
      { tone: 2, py: 'jí', char: '吉', word: '吉祥', emoji: '🧧', speak: '二声 吉，吉祥如意的吉' },
      { tone: 3, py: 'jǐ', char: '几', word: '几个', emoji: '🔢', speak: '三声 几，几个果子的几' },
      { tone: 4, py: 'jì', char: '记', word: '记住', emoji: '📝', speak: '四声 记，牢牢记住的记' }
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
    chantSpeak: '左上半圆 七 七 七，五彩气球飞上天',
    tip: '舌面前部贴住硬腭，放开一条缝并送出强气流。',
    word: '气球',
    wordPinyin: 'qì qiú',
    wordEmoji: '🎈',
    tones: [
      { tone: 1, py: 'qī', char: '七', word: '七星', emoji: '7️⃣', speak: '一声 七，七星瓢虫的七' },
      { tone: 2, py: 'qí', char: '棋', word: '下棋', emoji: '♟️', speak: '二声 棋，下象棋的棋' },
      { tone: 3, py: 'qǐ', char: '企', word: '企鹅', emoji: '🐧', speak: '三声 企，小企鹅的企' },
      { tone: 4, py: 'qì', char: '气', word: '气球', emoji: '🎈', speak: '四声 气，彩色气球的气' }
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
    chantSpeak: '一个大叉 西 西 西，切开西瓜笑嘻嘻',
    tip: '舌面前部接近硬腭前部，气流从窄缝摩擦出来。',
    word: '西瓜',
    wordPinyin: 'xī guā',
    wordEmoji: '🍉',
    tones: [
      { tone: 1, py: 'xī', char: '西', word: '西瓜', emoji: '🍉', speak: '一声 西，大西瓜的西' },
      { tone: 2, py: 'xí', char: '习', word: '学习', emoji: '📚', speak: '二声 习，爱学习的习' },
      { tone: 3, py: 'xǐ', char: '洗', word: '洗手', emoji: '🧼', speak: '三声 洗，勤洗手的洗' },
      { tone: 4, py: 'xì', char: '戏', word: '游戏', emoji: '🎮', speak: '四声 戏，玩游戏的戏' }
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
    chantSpeak: '资加椅子 知 知 知，妈妈坐着织毛衣',
    tip: '舌尖翘起抵住硬腭前部，注意是翘舌音哦！',
    word: '蜘蛛',
    wordPinyin: 'zhī zhū',
    wordEmoji: '🕷️',
    tones: [
      { tone: 1, py: 'zhū', char: '猪', word: '小猪', emoji: '🐷', speak: '一声 猪，粉红小猪的猪' },
      { tone: 2, py: 'zhú', char: '竹', word: '竹子', emoji: '🎍', speak: '二声 竹，绿竹子的竹' },
      { tone: 3, py: 'zhǔ', char: '煮', word: '煮饭', emoji: '🍲', speak: '三声 煮，煮汤圆的煮' },
      { tone: 4, py: 'zhù', char: '住', word: '居住', emoji: '🏠', speak: '四声 住，住新房的住' }
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
    chantSpeak: '雌加椅子 吃 吃 吃，刺猬椅子上吃果子',
    tip: '舌尖翘起抵住硬腭前部，送出强气流。',
    word: '汽车',
    wordPinyin: 'qì chē',
    wordEmoji: '🚗',
    tones: [
      { tone: 1, py: 'chē', char: '车', word: '汽车', emoji: '🚗', speak: '一声 车，小汽车的车' },
      { tone: 2, py: 'chá', char: '茶', word: '喝茶', emoji: '🍵', speak: '二声 茶，泡香茶的茶' },
      { tone: 3, py: 'chǐ', char: '尺', word: '尺子', emoji: '📏', speak: '三声 尺，直尺子的尺' },
      { tone: 4, py: 'chàng', char: '唱', word: '唱歌', emoji: '🎤', speak: '四声 唱，大声唱歌的唱' }
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
    chantSpeak: '思加椅子 诗 诗 诗，小狮子威风凛凛',
    tip: '舌尖翘起接近硬腭前部，气流从缝隙摩擦出来。',
    word: '狮子',
    wordPinyin: 'shī zi',
    wordEmoji: '🦁',
    tones: [
      { tone: 1, py: 'shū', char: '书', word: '看书', emoji: '📖', speak: '一声 书，读好书的书' },
      { tone: 2, py: 'shú', char: '熟', word: '成熟', emoji: '🌾', speak: '二声 熟，果子熟了的熟' },
      { tone: 3, py: 'shǔ', char: '鼠', word: '松鼠', emoji: '🐿️', speak: '三声 鼠，小松鼠的鼠' },
      { tone: 4, py: 'shù', char: '树', word: '大树', emoji: '🌳', speak: '四声 树，绿大树的树' }
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
    chantSpeak: '小苗发芽 日 日 日，向着太阳笑眯眯',
    tip: '舌尖翘起接近硬腭，声带振动发音。',
    word: '向日葵',
    wordPinyin: 'xiàng rì kuí',
    wordEmoji: '🌻',
    tones: [
      { tone: 1, py: 'rēng', char: '扔', word: '扔沙包', emoji: '🤾', speak: '一声 扔，扔沙包的扔' },
      { tone: 2, py: 'rén', char: '人', word: '大人', emoji: '🧑', speak: '二声 人，好人好事的人' },
      { tone: 3, py: 'rǎn', char: '染', word: '印染', emoji: '🎨', speak: '三声 染，染颜色的染' },
      { tone: 4, py: 'rè', char: '热', word: '热闹', emoji: '🔥', speak: '四声 热，热闹非凡的热' }
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
    chantSpeak: '像个二字 资 资 资，小熊认真写大字',
    tip: '舌尖平伸抵住上齿背，注意是平舌音哦！',
    word: '写字',
    wordPinyin: 'xiě zì',
    wordEmoji: '✍️',
    tones: [
      { tone: 1, py: 'zū', char: '租', word: '出租车', emoji: '🚕', speak: '一声 租，出租车的租' },
      { tone: 2, py: 'zú', char: '足', word: '足球', emoji: '⚽', speak: '二声 足，踢足球的足' },
      { tone: 3, py: 'zǔ', char: '祖', word: '祖国', emoji: '🇨🇳', speak: '三声 祖，爱祖国的祖' },
      { tone: 4, py: 'zì', char: '字', word: '汉字', emoji: '🀄', speak: '四声 字，写汉字的字' }
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
    chantSpeak: '半个圆圈 雌 雌 雌，小小刺猬弯着腰',
    tip: '舌尖平伸抵住上齿背，突然放开一条缝并送气。',
    word: '刺猬',
    wordPinyin: 'cì wei',
    wordEmoji: '🦔',
    tones: [
      { tone: 1, py: 'cā', char: '擦', word: '擦桌子', emoji: '🧽', speak: '一声 擦，擦桌子的擦' },
      { tone: 2, py: 'cí', char: '词', word: '词语', emoji: '📘', speak: '二声 词，组词语的词' },
      { tone: 3, py: 'cǎo', char: '草', word: '小草', emoji: '🌿', speak: '三声 草，青青小草的草' },
      { tone: 4, py: 'cài', char: '菜', word: '蔬菜', emoji: '🥬', speak: '四声 菜，吃蔬菜的菜' }
    ]
  },
  {
    id: 'sm_s',
    code: 's',
    category: 'shengmu',
    subGroup: '平舌音',
    readSound: '思',
    emoji: '🐛',
    chant: '半个8字 s s s，春蚕吐丝丝丝丝',
    chantSpeak: '半个八字 思 思 思，春蚕吐丝丝丝丝',
    tip: '舌尖平伸接近上齿背，气流从窄缝摩擦而出。',
    word: '雨伞',
    wordPinyin: 'yǔ sǎn',
    wordEmoji: '☂️',
    tones: [
      { tone: 1, py: 'sān', char: '三', word: '三个', emoji: '3️⃣', speak: '一声 三，一二三的三' },
      { tone: 2, py: 'sú', char: '俗', word: '习俗', emoji: '🏮', speak: '二声 俗，传统习俗的俗' },
      { tone: 3, py: 'sǎn', char: '伞', word: '雨伞', emoji: '☂️', speak: '三声 伞，小雨伞的伞' },
      { tone: 4, py: 'sì', char: '四', word: '四季', emoji: '🍀', speak: '四声 四，一年四季的四' }
    ]
  },
  {
    id: 'sm_y',
    code: 'y',
    category: 'shengmu',
    subGroup: '隔音声母',
    readSound: '衣',
    emoji: '🌳',
    chant: '一根树杈 y y y，树杈上面挂衣服',
    chantSpeak: '一根树杈 衣 衣 衣，树杈上面挂衣服',
    tip: '嘴角向两边展开，声音像韵母衣，但是读得轻短些。',
    word: '衣服',
    wordPinyin: 'yī fu',
    wordEmoji: '👕',
    tones: [
      { tone: 1, py: 'yā', char: '鸭', word: '小鸭', emoji: '🦆', speak: '一声 鸭，小黄鸭的鸭' },
      { tone: 2, py: 'yá', char: '牙', word: '刷牙', emoji: '🪥', speak: '二声 牙，早晚刷牙的牙' },
      { tone: 3, py: 'yǎ', char: '雅', word: '文雅', emoji: '🌸', speak: '三声 雅，优雅的雅' },
      { tone: 4, py: 'yà', char: '亚', word: '亚洲', emoji: '🌏', speak: '四声 亚，亚洲的亚' }
    ]
  },
  {
    id: 'sm_w',
    code: 'w',
    category: 'shengmu',
    subGroup: '隔音声母',
    readSound: '乌',
    emoji: '🏠',
    chant: '屋顶相连 w w w，乌鸦造个小房屋',
    chantSpeak: '屋顶相连 乌 乌 乌，乌鸦造个小房屋',
    tip: '双唇拢圆，突出成小孔，声音像乌但更轻短。',
    word: '乌龟',
    wordPinyin: 'wū guī',
    wordEmoji: '🐢',
    tones: [
      { tone: 1, py: 'wā', char: '蛙', word: '青蛙', emoji: '🐸', speak: '一声 蛙，小青蛙的蛙' },
      { tone: 2, py: 'wá', char: '娃', word: '娃娃', emoji: '👶', speak: '二声 娃，洋娃娃的娃' },
      { tone: 3, py: 'wǎ', char: '瓦', word: '砖瓦', emoji: '🧱', speak: '三声 瓦，青砖红瓦的瓦' },
      { tone: 4, py: 'wà', char: '袜', word: '袜子', emoji: '🧦', speak: '四声 袜，穿袜子的袜' }
    ]
  }
]

// ==================== 2. 韵母表 (24个) ====================
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
    chantSpeak: '圆圆脸蛋扎小辫，张大嘴巴 阿 阿 阿',
    tip: '嘴巴张大，舌头放平，声音响亮不走样。',
    word: '阿姨',
    wordPinyin: 'ā yí',
    wordEmoji: '👩',
    tones: [
      { tone: 1, py: 'ā', char: '阿', word: '阿姨', emoji: '👩', speak: '一声平 阿，好阿姨的阿' },
      { tone: 2, py: 'á', char: '啊', word: '啊？真的吗', emoji: '😮', speak: '二声扬 啊，真的吗' },
      { tone: 3, py: 'ǎ', char: '啊', word: '啊，原来这样', emoji: '🤔', speak: '三声拐弯 啊，原来是这样' },
      { tone: 4, py: 'à', char: '啊', word: '啊！真美呀', emoji: '🤩', speak: '四声降 啊，风景真美呀' }
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
    chantSpeak: '太阳出来红通通，公鸡打鸣 喔 喔 喔',
    tip: '嘴巴拢圆，舌头往后缩，发出洪亮的圆唇音。',
    word: '公鸡喔喔',
    wordPinyin: 'ō ō tí',
    wordEmoji: '🐓',
    tones: [
      { tone: 1, py: 'ō', char: '喔', word: '喔喔叫', emoji: '🐓', speak: '一声平 喔，公鸡喔喔叫' },
      { tone: 2, py: 'ó', char: '哦', word: '哦？是吗', emoji: '🧐', speak: '二声扬 哦，是这样吗' },
      { tone: 3, py: 'ǒ', char: '嚄', word: '原来如此', emoji: '💡', speak: '三声拐弯 嚄，原来如此' },
      { tone: 4, py: 'ò', char: '哦', word: '哦！明白了', emoji: '👌', speak: '四声降 哦，我明白啦' }
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
    chantSpeak: '清清池塘一只鹅，水中倒影 鹅 鹅 鹅',
    tip: '嘴巴扁扁，嘴角向两边展，舌头后缩。',
    word: '白鹅',
    wordPinyin: 'bái é',
    wordEmoji: '🦢',
    tones: [
      { tone: 1, py: 'ē', char: '阿', word: '阿胶', emoji: '🍯', speak: '一声平 阿，东阿阿胶' },
      { tone: 2, py: 'é', char: '鹅', word: '大白鹅', emoji: '🦢', speak: '二声扬 鹅，大白鹅的鹅' },
      { tone: 3, py: 'ě', char: '恶', word: '讨厌', emoji: '😣', speak: '三声拐弯 恶' },
      { tone: 4, py: 'è', char: '鳄', word: '鳄鱼', emoji: '🐊', speak: '四声降 鳄，小鳄鱼的鳄' }
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
    chantSpeak: '牙齿对齐 衣 衣 衣，漂亮衣服穿整齐',
    tip: '上下牙齿对齐，嘴角向两边展开像微笑。',
    word: '蚂蚁',
    wordPinyin: 'mǎ yǐ',
    wordEmoji: '🐜',
    tones: [
      { tone: 1, py: 'yī', char: '一', word: '第一', emoji: '1️⃣', speak: '一声平 一，一二三的一' },
      { tone: 2, py: 'yí', char: '姨', word: '阿姨', emoji: '👩', speak: '二声扬 姨，好阿姨的姨' },
      { tone: 3, py: 'yǐ', char: '椅', word: '椅子', emoji: '🪑', speak: '三声拐弯 椅，小椅子的椅' },
      { tone: 4, py: 'yì', char: '亿', word: '记忆', emoji: '🧠', speak: '四声降 忆，好记忆的忆' }
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
    chantSpeak: '嘴巴突出 乌 乌 乌，小火车开呜呜呜',
    tip: '双唇拢圆，向前突出，只留一个小圆孔。',
    word: '房屋',
    wordPinyin: 'fáng wū',
    wordEmoji: '🏠',
    tones: [
      { tone: 1, py: 'wū', char: '屋', word: '小屋', emoji: '🏠', speak: '一声平 屋，小木屋的屋' },
      { tone: 2, py: 'wú', char: '蜈', word: '蜈蚣', emoji: '🐛', speak: '二声扬 蜈，小蜈蚣的蜈' },
      { tone: 3, py: 'wǔ', char: '五', word: '五个', emoji: '5️⃣', speak: '三声拐弯 五，一二三四五的五' },
      { tone: 4, py: 'wù', char: '雾', word: '云雾', emoji: '🌫️', speak: '四声降 雾，山间云雾的雾' }
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
    chantSpeak: '小鱼吐泡 迂 迂 迂，嘴吹口哨笑嘻嘻',
    tip: '双唇拢成扁圆小孔，像吹笛子一样。遇到鸡七西衣要摘掉墨镜两点哦！',
    word: '金鱼',
    wordPinyin: 'jīn yú',
    wordEmoji: '🐟',
    tones: [
      { tone: 1, py: 'yū', char: '淤', word: '荷塘', emoji: '🪷', speak: '一声平 淤，荷花池的淤' },
      { tone: 2, py: 'yú', char: '鱼', word: '小鱼', emoji: '🐟', speak: '二声扬 鱼，小金鱼的鱼' },
      { tone: 3, py: 'yǔ', char: '雨', word: '下雨', emoji: '🌧️', speak: '三声拐弯 雨，下春雨的雨' },
      { tone: 4, py: 'yù', char: '玉', word: '玉米', emoji: '🌽', speak: '四声降 玉，甜玉米的玉' }
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
    chantSpeak: '阿在前 衣在后，姐弟挨着 挨 挨 挨',
    tip: '先发阿的音，然后舌位迅速滑向衣。',
    word: '友爱',
    wordPinyin: 'yǒu ài',
    wordEmoji: '🤗',
    tones: [
      { tone: 1, py: 'āi', char: '挨', word: '挨着', emoji: '👫', speak: '一声 挨，挨在一起的挨' },
      { tone: 2, py: 'ái', char: '皑', word: '白雪皑皑', emoji: '❄️', speak: '二声 皑，白雪皑皑的皑' },
      { tone: 3, py: 'ǎi', char: '矮', word: '高矮', emoji: '📏', speak: '三声 矮，比高矮的矮' },
      { tone: 4, py: 'ài', char: '爱', word: '爱心', emoji: '❤️', speak: '四声 爱，有爱心的爱' }
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
    chantSpeak: '用力砍柴 欸 欸 欸，拿起水杯喝美味',
    tip: '从鹅滑向衣，气流不断，一气呵成。',
    word: '水杯',
    wordPinyin: 'shuǐ bēi',
    wordEmoji: '🥛',
    tones: [
      { tone: 1, py: 'bēi', char: '杯', word: '水杯', emoji: '🥛', speak: '一声 杯，小水杯的杯' },
      { tone: 2, py: 'féi', char: '肥', word: '肥皂', emoji: '🧼', speak: '二声 肥，香肥皂的肥' },
      { tone: 3, py: 'měi', char: '美', word: '美丽', emoji: '🌺', speak: '三声 美，真美丽的美' },
      { tone: 4, py: 'mèi', char: '妹', word: '妹妹', emoji: '👧', speak: '四声 妹，小妹妹的妹' }
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
    chantSpeak: '小女孩戴围巾，脖子暖和 威 威 威',
    tip: '先发乌音，迅速滑向杯的韵尾，声调标在后面的衣上。',
    word: '乌龟',
    wordPinyin: 'wū guī',
    wordEmoji: '🐢',
    tones: [
      { tone: 1, py: 'guī', char: '龟', word: '乌龟', emoji: '🐢', speak: '一声 龟，小乌龟的龟' },
      { tone: 2, py: 'kuí', char: '葵', word: '向日葵', emoji: '🌻', speak: '二声 葵，向日葵的葵' },
      { tone: 3, py: 'shuǐ', char: '水', word: '泉水', emoji: '💧', speak: '三声 水，喝清水的的水' },
      { tone: 4, py: 'shuì', char: '睡', word: '睡觉', emoji: '😴', speak: '四声 睡，乖乖睡觉的睡' }
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
    chantSpeak: '冬天穿上小棉袄，暖暖和和 熬 熬 熬',
    tip: '先发阿的音，嘴唇逐渐拢圆滑向喔。',
    word: '小猫',
    wordPinyin: 'xiǎo māo',
    wordEmoji: '🐱',
    tones: [
      { tone: 1, py: 'māo', char: '猫', word: '小猫', emoji: '🐱', speak: '一声 猫，小花猫的猫' },
      { tone: 2, py: 'táo', char: '桃', word: '桃子', emoji: '🍑', speak: '二声 桃，甜桃子的桃' },
      { tone: 3, py: 'niǎo', char: '鸟', word: '小鸟', emoji: '🐦', speak: '三声 鸟，飞翔小鸟的鸟' },
      { tone: 4, py: 'mào', char: '帽', word: '帽子', emoji: '🧢', speak: '四声 帽，戴帽子的帽' }
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
    chantSpeak: '大海上面飞海鸥，展翅高飞 欧 欧 欧',
    tip: '先发喔的音，嘴唇更加拢圆滑向乌。',
    word: '海鸥',
    wordPinyin: 'hǎi ōu',
    wordEmoji: '🕊️',
    tones: [
      { tone: 1, py: 'ōu', char: '鸥', word: '海鸥', emoji: '🕊️', speak: '一声 鸥，白海鸥的鸥' },
      { tone: 2, py: 'hóu', char: '猴', word: '小猴', emoji: '🐵', speak: '二声 猴，小猴子的猴' },
      { tone: 3, py: 'gǒu', char: '狗', word: '小狗', emoji: '🐶', speak: '三声 狗，哈巴狗的狗' },
      { tone: 4, py: 'dòu', char: '豆', word: '豌豆', emoji: '🫛', speak: '四声 豆，圆豌豆的豆' }
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
    chantSpeak: '夏天戏水游啊游，优秀宝宝 优 优 优',
    tip: '从衣滑向欧，注意声调帽子戴在后面的乌上！',
    word: '气球',
    wordPinyin: 'qì qiú',
    wordEmoji: '🎈',
    tones: [
      { tone: 1, py: 'qiū', char: '秋', word: '秋天', emoji: '🍂', speak: '一声 秋，金秋天的秋' },
      { tone: 2, py: 'niú', char: '牛', word: '水牛', emoji: '🐮', speak: '二声 牛，大水牛的牛' },
      { tone: 3, py: 'jiǔ', char: '九', word: '九个', emoji: '9️⃣', speak: '三声 九，数字九的九' },
      { tone: 4, py: 'liù', char: '六', word: '六个', emoji: '6️⃣', speak: '四声 六，数字六的六' }
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
    chantSpeak: '圆圆月亮一棵椰，树叶飘落 耶 耶 耶',
    tip: '先发衣音，迅速滑向椰的韵腹。',
    word: '蝴蝶',
    wordPinyin: 'hú dié',
    wordEmoji: '🦋',
    tones: [
      { tone: 1, py: 'yē', char: '椰', word: '椰子', emoji: '🥥', speak: '一声 椰，大椰子的椰' },
      { tone: 2, py: 'dié', char: '蝶', word: '蝴蝶', emoji: '🦋', speak: '二声 蝶，花蝴蝶的蝶' },
      { tone: 3, py: 'xiě', char: '写', word: '写字', emoji: '✍️', speak: '三声 写，写作业的写' },
      { tone: 4, py: 'yè', char: '叶', word: '树叶', emoji: '🍃', speak: '四声 叶，绿树叶的叶' }
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
    chantSpeak: '弯弯月儿上高空，喜鹊唱歌 约 约 约',
    tip: '从迂滑向椰，和鸡七西相拼时要去掉上面两点。',
    word: '月亮',
    wordPinyin: 'yuè liang',
    wordEmoji: '🌙',
    tones: [
      { tone: 1, py: 'yuē', char: '约', word: '约定', emoji: '🤙', speak: '一声 约，拉勾约定的约' },
      { tone: 2, py: 'xué', char: '学', word: '学习', emoji: '🎒', speak: '二声 学，上学堂的学' },
      { tone: 3, py: 'xuě', char: '雪', word: '雪人', emoji: '⛄', speak: '三声 雪，堆雪人的雪' },
      { tone: 4, py: 'yuè', char: '月', word: '月亮', emoji: '🌙', speak: '四声 月，弯月亮的月' }
    ]
  },
  {
    id: 'ym_er',
    code: 'er',
    category: 'yunmu',
    subGroup: '特殊韵母',
    readSound: '儿',
    emoji: '👂',
    chant: '小小耳朵听声音，特殊韵母 er er er',
    chantSpeak: '小小耳朵听声音，特殊韵母 儿 儿 儿',
    tip: '发鹅的同时把舌尖向后卷起，它从不和声母相拼，自己独立成音节！',
    word: '耳朵',
    wordPinyin: 'ěr duo',
    wordEmoji: '👂',
    tones: [
      { tone: 1, py: 'ēr', char: '儿', word: '花儿', emoji: '🌸', speak: '一声 儿，红花儿朵朵开' },
      { tone: 2, py: 'ér', char: '儿', word: '儿童', emoji: '🧒', speak: '二声 儿，好儿童的儿' },
      { tone: 3, py: 'ěr', char: '耳', word: '耳朵', emoji: '👂', speak: '三声 耳，小耳朵的耳' },
      { tone: 4, py: 'èr', char: '二', word: '二月', emoji: '2️⃣', speak: '四声 二，一二三的二' }
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
    chantSpeak: '天安门前看升旗，平平安安 安 安 安',
    tip: '先发阿音，接着舌尖抵住上齿龈发前鼻音。',
    word: '天安门',
    wordPinyin: 'tiān ān mén',
    wordEmoji: '🏯',
    tones: [
      { tone: 1, py: 'ān', char: '安', word: '平安', emoji: '🏯', speak: '一声 安，天安门的安' },
      { tone: 2, py: 'lán', char: '蓝', word: '蓝天', emoji: '🌤️', speak: '二声 蓝，蓝天白云的蓝' },
      { tone: 3, py: 'sǎn', char: '伞', word: '雨伞', emoji: '☂️', speak: '三声 伞，花雨伞的伞' },
      { tone: 4, py: 'fàn', char: '饭', word: '米饭', emoji: '🍚', speak: '四声 饭，香米饭的饭' }
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
    chantSpeak: '小手按门铃，叮咚开门 恩 恩 恩',
    tip: '先发鹅，然后舌尖抬起抵住上牙床发鼻音。',
    word: '大门',
    wordPinyin: 'dà mén',
    wordEmoji: '🚪',
    tones: [
      { tone: 1, py: 'ēn', char: '恩', word: '感恩', emoji: '🙏', speak: '一声 恩，常怀感恩的恩' },
      { tone: 2, py: 'mén', char: '门', word: '大门', emoji: '🚪', speak: '二声 门，开大门的门' },
      { tone: 3, py: 'běn', char: '本', word: '书本', emoji: '📓', speak: '三声 本，作业本的本' },
      { tone: 4, py: 'rèn', char: '认', word: '认真', emoji: '💯', speak: '四声 认，真认真的认' }
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
    chantSpeak: '大树底下好乘凉，绿树成荫 音 音 音',
    tip: '先发衣，舌尖抵住上齿龈发前鼻音。',
    word: '音乐',
    wordPinyin: 'yīn yuè',
    wordEmoji: '🎵',
    tones: [
      { tone: 1, py: 'xīn', char: '心', word: '开心', emoji: '❤️', speak: '一声 心，真开心的心' },
      { tone: 2, py: 'lín', char: '林', word: '森林', emoji: '🌲', speak: '二声 林，大森林的林' },
      { tone: 3, py: 'pǐn', char: '品', word: '品尝', emoji: '🍰', speak: '三声 品，品尝美食的品' },
      { tone: 4, py: 'xìn', char: '信', word: '书信', emoji: '✉️', speak: '四声 信，寄书信的信' }
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
    chantSpeak: '海豚顶球真聪明，滚来滚去 温 温 温',
    tip: '先发乌，紧接着舌尖抵住上牙床发前鼻音。',
    word: '春天',
    wordPinyin: 'chūn tiān',
    wordEmoji: '🌸',
    tones: [
      { tone: 1, py: 'chūn', char: '春', word: '春天', emoji: '🌸', speak: '一声 春，暖春天的春' },
      { tone: 2, py: 'lún', char: '轮', word: '车轮', emoji: '🛞', speak: '二声 轮，圆车轮的轮' },
      { tone: 3, py: 'gǔn', char: '滚', word: '翻滚', emoji: '🐼', speak: '三声 滚，圆滚滚的滚' },
      { tone: 4, py: 'kùn', char: '困', word: '困倦', emoji: '🥱', speak: '四声 困，想睡觉的困' }
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
    chantSpeak: '蓝蓝天上白云飘，朵朵白云 晕 晕 晕',
    tip: '先发迂，舌尖抵住上齿龈发前鼻音。',
    word: '白云',
    wordPinyin: 'bái yún',
    wordEmoji: '☁️',
    tones: [
      { tone: 1, py: 'jūn', char: '军', word: '军人', emoji: '🫡', speak: '一声 军，解放军的军' },
      { tone: 2, py: 'qún', char: '裙', word: '裙子', emoji: '👗', speak: '二声 裙，花裙子的裙' },
      { tone: 3, py: 'yǔn', char: '允', word: '允许', emoji: '✅', speak: '三声 允，点点头允许的允' },
      { tone: 4, py: 'yùn', char: '运', word: '运动', emoji: '🏃', speak: '四声 运，做运动的运' }
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
    chantSpeak: '小羊抬头昂起胸，大步向前 昂 昂 昂',
    tip: '先发阿，舌根后缩抵住软腭，气流从鼻腔深处出来。',
    word: '小羊',
    wordPinyin: 'xiǎo yáng',
    wordEmoji: '🐑',
    tones: [
      { tone: 1, py: 'bāng', char: '帮', word: '帮忙', emoji: '🤝', speak: '一声 帮，爱帮忙的帮' },
      { tone: 2, py: 'yáng', char: '羊', word: '绵羊', emoji: '🐑', speak: '二声 羊，小绵羊的羊' },
      { tone: 3, py: 'yǎng', char: '仰', word: '仰望', emoji: '🔭', speak: '三声 仰，仰望星空的仰' },
      { tone: 4, py: 'chàng', char: '唱', word: '歌唱', emoji: '🎤', speak: '四声 唱，大声歌唱的唱' }
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
    chantSpeak: '中秋佳节挂灯笼，点亮台灯 鞥 鞥 鞥',
    tip: '先发鹅，舌根抬起抵住软腭发后鼻音。',
    word: '台灯',
    wordPinyin: 'tái dēng',
    wordEmoji: '🏮',
    tones: [
      { tone: 1, py: 'dēng', char: '灯', word: '灯笼', emoji: '🏮', speak: '一声 灯，红灯笼的灯' },
      { tone: 2, py: 'péng', char: '朋', word: '朋友', emoji: '👫', speak: '二声 朋，好朋友的朋' },
      { tone: 3, py: 'lěng', char: '冷', word: '寒冷', emoji: '❄️', speak: '三声 冷，冬天寒冷的冷' },
      { tone: 4, py: 'mèng', char: '梦', word: '美梦', emoji: '💭', speak: '四声 梦，做美梦的梦' }
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
    chantSpeak: '老鹰展翅飞蓝天，天上星星 英 英 英',
    tip: '先发衣，舌根抵住软腭发后鼻音。',
    word: '星星',
    wordPinyin: 'xīng xing',
    wordEmoji: '⭐',
    tones: [
      { tone: 1, py: 'xīng', char: '星', word: '星星', emoji: '⭐', speak: '一声 星，亮晶晶星星的星' },
      { tone: 2, py: 'píng', char: '苹', word: '苹果', emoji: '🍎', speak: '二声 苹，红苹果的苹' },
      { tone: 3, py: 'yǐng', char: '影', word: '电影', emoji: '🎬', speak: '三声 影，看电影的影' },
      { tone: 4, py: 'jìng', char: '镜', word: '镜子', emoji: '🪞', speak: '四声 镜，照镜子的镜' }
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
    chantSpeak: '墙上挂着大挂钟，滴答滴答 轰 轰 轰',
    tip: '双唇拢圆，舌根抵住软腭发洪亮的后鼻音。',
    word: '彩虹',
    wordPinyin: 'cǎi hóng',
    wordEmoji: '🌈',
    tones: [
      { tone: 1, py: 'zhōng', char: '钟', word: '闹钟', emoji: '⏰', speak: '一声 钟，小闹钟的钟' },
      { tone: 2, py: 'hóng', char: '虹', word: '彩虹', emoji: '🌈', speak: '二声 虹，七彩彩虹的虹' },
      { tone: 3, py: 'dǒng', char: '懂', word: '懂事', emoji: '👍', speak: '三声 懂，懂礼貌的懂' },
      { tone: 4, py: 'dòng', char: '动', word: '动物', emoji: '🐾', speak: '四声 动，小动物的动' }
    ]
  }
]

// ==================== 3. 整体认读音节 (16个) ====================
export const ZHENGTI_LIST = [
  {
    id: 'zt_zhi',
    code: 'zhi',
    category: 'zhengti',
    subGroup: '翘舌整体认读',
    readSound: '知',
    emoji: '🕷️',
    chant: '织毛衣 zhi zhi zhi，整体认读不用拼',
    chantSpeak: '织毛衣 知 知 知，整体认读不用拼',
    tip: '把翘舌音声母知的音读得长而响亮即可，不能拆开拼读哦！',
    word: '知识',
    wordPinyin: 'zhī shi',
    wordEmoji: '📘',
    tones: [
      { tone: 1, py: 'zhī', char: '蜘', word: '蜘蛛', emoji: '🕷️', speak: '一声 蜘，小蜘蛛的蜘' },
      { tone: 2, py: 'zhí', char: '直', word: '笔直', emoji: '📏', speak: '二声 直，笔直大树的直' },
      { tone: 3, py: 'zhǐ', char: '纸', word: '折纸', emoji: '📄', speak: '三声 纸，折纸飞机的纸' },
      { tone: 4, py: 'zhì', char: '志', word: '志气', emoji: '🚩', speak: '四声 志，有志气的志' }
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
    chantSpeak: '吃西瓜 吃 吃 吃，整体认读记心里',
    tip: '把声母吃的音读得长一些、响亮一些。',
    word: '吃饭',
    wordPinyin: 'chī fàn',
    wordEmoji: '🍚',
    tones: [
      { tone: 1, py: 'chī', char: '吃', word: '吃饭', emoji: '🍚', speak: '一声 吃，好好吃饭的吃' },
      { tone: 2, py: 'chí', char: '池', word: '池塘', emoji: '🏞️', speak: '二声 池，小池塘的池' },
      { tone: 3, py: 'chǐ', char: '齿', word: '牙齿', emoji: '🦷', speak: '三声 齿，白牙齿的齿' },
      { tone: 4, py: 'chì', char: '翅', word: '翅膀', emoji: '🪽', speak: '四声 翅，拍翅膀的翅' }
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
    chantSpeak: '小狮子 诗 诗 诗，威风凛凛读古诗',
    tip: '把翘舌音诗读长读响，一口气读出。',
    word: '老师',
    wordPinyin: 'lǎo shī',
    wordEmoji: '👩‍🏫',
    tones: [
      { tone: 1, py: 'shī', char: '师', word: '老师', emoji: '👩‍🏫', speak: '一声 师，好老师的师' },
      { tone: 2, py: 'shí', char: '十', word: '十个', emoji: '🔟', speak: '二声 十，数字十的十' },
      { tone: 3, py: 'shǐ', char: '史', word: '历史', emoji: '📜', speak: '三声 史，历史故事的史' },
      { tone: 4, py: 'shì', char: '柿', word: '柿子', emoji: '🍅', speak: '四声 柿，红柿子的柿' }
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
    chantSpeak: '红太阳 日 日 日，向日葵儿笑眯眯',
    tip: '把日的音拖长读响，整体直接认读。',
    word: '日出',
    wordPinyin: 'rì chū',
    wordEmoji: '🌅',
    tones: [
      { tone: 1, py: 'rì', char: '日', word: '红日', emoji: '☀️', speak: '四声 日，红日初升的日' },
      { tone: 2, py: 'rì', char: '日', word: '值日', emoji: '🧹', speak: '四声 日，做值日的日' },
      { tone: 3, py: 'rì', char: '日', word: '日记', emoji: '📔', speak: '四声 日，写日记的日' },
      { tone: 4, py: 'rì', char: '日', word: '生日', emoji: '🎂', speak: '四声 日，过生日的日' }
    ]
  },
  {
    id: 'zt_zi',
    code: 'zi',
    category: 'zhengti',
    subGroup: '平舌整体认读',
    readSound: '资',
    emoji: '🍇',
    chant: '紫葡萄 zi zi zi，一串一串甜丝丝',
    chantSpeak: '紫葡萄 资 资 资，一串一串甜丝丝',
    tip: '平舌音整体认读，舌尖抵住齿背读响亮。',
    word: '写字',
    wordPinyin: 'xiě zì',
    wordEmoji: '✍️',
    tones: [
      { tone: 1, py: 'zī', char: '姿', word: '姿势', emoji: '🧘', speak: '一声 姿，端正姿势的姿' },
      { tone: 2, py: 'zǐ', char: '籽', word: '菜籽', emoji: '🌱', speak: '三声 籽，小花籽的籽' },
      { tone: 3, py: 'zǐ', char: '紫', word: '紫色', emoji: '🍇', speak: '三声 紫，紫葡萄的紫' },
      { tone: 4, py: 'zì', char: '字', word: '识字', emoji: '🔤', speak: '四声 字，认识汉字的字' }
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
    chantSpeak: '小刺猬 雌 雌 雌，背着果子回家去',
    tip: '把平舌音雌读长读响。',
    word: '刺猬',
    wordPinyin: 'cì wei',
    wordEmoji: '🦔',
    tones: [
      { tone: 1, py: 'cī', char: '差', word: '参差', emoji: '🌿', speak: '一声 差，参差不齐的差' },
      { tone: 2, py: 'cí', char: '词', word: '诗词', emoji: '📜', speak: '二声 词，古诗词的词' },
      { tone: 3, py: 'cǐ', char: '此', word: '从此', emoji: '✨', speak: '三声 此，从此以后的此' },
      { tone: 4, py: 'cì', char: '刺', word: '刺猬', emoji: '🦔', speak: '四声 刺，小刺猬的刺' }
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
    chantSpeak: '蚕吐丝 思 思 思，考考你的小脑筋',
    tip: '把平舌音思读得长而清楚。',
    word: '思考',
    wordPinyin: 'sī kǎo',
    wordEmoji: '🤔',
    tones: [
      { tone: 1, py: 'sī', char: '丝', word: '吐丝', emoji: '🐛', speak: '一声 丝，春蚕吐丝的丝' },
      { tone: 2, py: 'sì', char: '寺', word: '古寺', emoji: '🏯', speak: '四声 寺，山间古寺的寺' },
      { tone: 3, py: 'sǐ', char: '死', word: '死记硬背', emoji: '📖', speak: '三声 死，理解记忆不死记' },
      { tone: 4, py: 'sì', char: '四', word: '四季', emoji: '🍂', speak: '四声 四，一年四季的四' }
    ]
  },
  {
    id: 'zt_yi',
    code: 'yi',
    category: 'zhengti',
    subGroup: '一乌迂整体认读',
    readSound: '衣',
    emoji: '👕',
    chant: '大y带小i，紧密在一起，新衣服 yi yi yi',
    chantSpeak: '大衣带小衣，紧密在一起，新衣服 衣 衣 衣',
    tip: '大衣和小衣组成整体认读音节，直接读“衣”。',
    word: '医生',
    wordPinyin: 'yī shēng',
    wordEmoji: '🩺',
    tones: [
      { tone: 1, py: 'yī', char: '医', word: '医生', emoji: '🩺', speak: '一声 医，白衣医生的医' },
      { tone: 2, py: 'yí', char: '姨', word: '阿姨', emoji: '👩', speak: '二声 姨，好阿姨的姨' },
      { tone: 3, py: 'yǐ', char: '蚁', word: '蚂蚁', emoji: '🐜', speak: '三声 蚁，小蚂蚁的蚁' },
      { tone: 4, py: 'yì', char: '艺', word: '艺术', emoji: '🎨', speak: '四声 艺，多才多艺的艺' }
    ]
  },
  {
    id: 'zt_wu',
    code: 'wu',
    category: 'zhengti',
    subGroup: '一乌迂整体认读',
    readSound: '乌',
    emoji: '🐦‍⬛',
    chant: '大w带小u，乌鸦喝水 wu wu wu',
    chantSpeak: '大乌带小乌，乌鸦喝水 乌 乌 乌',
    tip: '大乌和小乌手拉手，直接读“屋”。',
    word: '跳舞',
    wordPinyin: 'tiào wǔ',
    wordEmoji: '💃',
    tones: [
      { tone: 1, py: 'wū', char: '乌', word: '乌鸦', emoji: '🐦‍⬛', speak: '一声 乌，小乌鸦的乌' },
      { tone: 2, py: 'wú', char: '梧', word: '梧桐树', emoji: '🌳', speak: '二声 梧，梧桐树的梧' },
      { tone: 3, py: 'wǔ', char: '舞', word: '跳舞', emoji: '💃', speak: '三声 舞，爱跳舞的舞' },
      { tone: 4, py: 'wù', char: '物', word: '动物', emoji: '🦁', speak: '四声 物，动物园的物' }
    ]
  },
  {
    id: 'zt_yu',
    code: 'yu',
    category: 'zhengti',
    subGroup: '一乌迂整体认读',
    readSound: '鱼',
    emoji: '🐟',
    chant: '小ü见大y，擦掉眼泪笑嘻嘻 yu yu yu',
    chantSpeak: '小迂见大衣，擦掉眼泪笑嘻嘻 迂 迂 迂',
    tip: '小迂见到大衣摘掉了两点，但它还是读迂的音哦！',
    word: '小鱼',
    wordPinyin: 'xiǎo yú',
    wordEmoji: '🐟',
    tones: [
      { tone: 1, py: 'yū', char: '淤', word: '淤泥', emoji: '🪷', speak: '一声 淤，荷塘淤泥的淤' },
      { tone: 2, py: 'yú', char: '鱼', word: '小鱼', emoji: '🐟', speak: '二声 鱼，小金鱼的鱼' },
      { tone: 3, py: 'yǔ', char: '雨', word: '春雨', emoji: '🌧️', speak: '三声 雨，下春雨的雨' },
      { tone: 4, py: 'yù', char: '玉', word: '玉米', emoji: '🌽', speak: '四声 玉，甜玉米的玉' }
    ]
  },
  {
    id: 'zt_ye',
    code: 'ye',
    category: 'zhengti',
    subGroup: '复韵整体认读',
    readSound: '耶',
    emoji: '🍃',
    chant: '树叶绿油油，椰子甜滋滋 ye ye ye',
    chantSpeak: '树叶绿油油，椰子甜滋滋 耶 耶 耶',
    tip: '复韵母耶变成整体认读音节，直接读出。',
    word: '爷爷',
    wordPinyin: 'yé ye',
    wordEmoji: '👴',
    tones: [
      { tone: 1, py: 'yē', char: '椰', word: '椰树', emoji: '🌴', speak: '一声 椰，椰子树的椰' },
      { tone: 2, py: 'yé', char: '爷', word: '爷爷', emoji: '👴', speak: '二声 爷，老爷爷的爷' },
      { tone: 3, py: 'yě', char: '野', word: '田野', emoji: '🌾', speak: '三声 野，绿田野的野' },
      { tone: 4, py: 'yè', char: '叶', word: '树叶', emoji: '🍃', speak: '四声 叶，小树叶的叶' }
    ]
  },
  {
    id: 'zt_yue',
    code: 'yue',
    category: 'zhengti',
    subGroup: '复韵整体认读',
    readSound: '月',
    emoji: '🌙',
    chant: '弯弯月亮船，快乐学音乐 yue yue yue',
    chantSpeak: '弯弯月亮船，快乐学音乐 月 月 月',
    tip: '大衣加上去掉两点的约，直接读“月”。',
    word: '月亮',
    wordPinyin: 'yuè liang',
    wordEmoji: '🌙',
    tones: [
      { tone: 1, py: 'yuē', char: '约', word: '节约', emoji: '💧', speak: '一声 约，节约用水的约' },
      { tone: 2, py: 'yuè', char: '阅', word: '阅读', emoji: '📖', speak: '四声 阅，爱阅读的阅' },
      { tone: 3, py: 'yuè', char: '月', word: '月饼', emoji: '🥮', speak: '四声 月，吃月饼的月' },
      { tone: 4, py: 'yuè', char: '月', word: '月亮', emoji: '🌙', speak: '四声 月，圆月亮的月' }
    ]
  },
  {
    id: 'zt_yuan',
    code: 'yuan',
    category: 'zhengti',
    subGroup: '鼻韵整体认读',
    readSound: '圆',
    emoji: '⭕',
    chant: '皮球圆又圆，花园真美丽 yuan yuan yuan',
    chantSpeak: '皮球圆又圆，花园真美丽 圆 圆 圆',
    tip: '整体认读音节圆，不用拆开直接读。',
    word: '花园',
    wordPinyin: 'huā yuán',
    wordEmoji: '🏡',
    tones: [
      { tone: 1, py: 'yuān', char: '鸳', word: '鸳鸯', emoji: '🦆', speak: '一声 鸳，小鸳鸯的鸳' },
      { tone: 2, py: 'yuán', char: '圆', word: '团圆', emoji: '🌕', speak: '二声 圆，大团圆的圆' },
      { tone: 3, py: 'yuǎn', char: '远', word: '远方', emoji: '🔭', speak: '三声 远，望远镜的远' },
      { tone: 4, py: 'yuàn', char: '院', word: '庭院', emoji: '🏡', speak: '四声 院，小院子的院' }
    ]
  },
  {
    id: 'zt_yin',
    code: 'yin',
    category: 'zhengti',
    subGroup: '鼻韵整体认读',
    readSound: '音',
    emoji: '🎵',
    chant: '小鸟唱音乐，地上一串脚印 yin yin yin',
    chantSpeak: '小鸟唱音乐，地上一串脚印 音 音 音',
    tip: '大衣和前鼻韵母音组成整体认读音节。',
    word: '音乐',
    wordPinyin: 'yīn yuè',
    wordEmoji: '🎵',
    tones: [
      { tone: 1, py: 'yīn', char: '音', word: '音乐', emoji: '🎵', speak: '一声 音，好听音乐的音' },
      { tone: 2, py: 'yín', char: '银', word: '银河', emoji: '🌌', speak: '二声 银，亮银河的银' },
      { tone: 3, py: 'yǐn', char: '饮', word: '饮料', emoji: '🧃', speak: '三声 饮，喝饮品的饮' },
      { tone: 4, py: 'yìn', char: '印', word: '脚印', emoji: '🐾', speak: '四声 印，小脚印的印' }
    ]
  },
  {
    id: 'zt_yun',
    code: 'yun',
    category: 'zhengti',
    subGroup: '鼻韵整体认读',
    readSound: '云',
    emoji: '☁️',
    chant: '天上白朵云，微风吹过来 yun yun yun',
    chantSpeak: '天上白朵云，微风吹过来 云 云 云',
    tip: '大衣和去掉两点的晕组成整体认读音节云。',
    word: '白云',
    wordPinyin: 'bái yún',
    wordEmoji: '☁️',
    tones: [
      { tone: 1, py: 'yūn', char: '晕', word: '红晕', emoji: '😊', speak: '一声 晕，脸蛋红晕的晕' },
      { tone: 2, py: 'yún', char: '云', word: '白云', emoji: '☁️', speak: '二声 云，大白云的云' },
      { tone: 3, py: 'yǔn', char: '允', word: '允许', emoji: '👍', speak: '三声 允，点头允许的允' },
      { tone: 4, py: 'yùn', char: '运', word: '运动', emoji: '⚽', speak: '四声 运，做运动的运' }
    ]
  },
  {
    id: 'zt_ying',
    code: 'ying',
    category: 'zhengti',
    subGroup: '鼻韵整体认读',
    readSound: '英',
    emoji: '🦅',
    chant: '雄鹰飞高空，萤火虫提灯笼 ying ying ying',
    chantSpeak: '雄鹰飞高空，萤火虫提灯笼 英 英 英',
    tip: '后鼻音整体认读音节英，发音响亮饱满。',
    word: '老鹰',
    wordPinyin: 'lǎo yīng',
    wordEmoji: '🦅',
    tones: [
      { tone: 1, py: 'yīng', char: '鹰', word: '老鹰', emoji: '🦅', speak: '一声 鹰，大老鹰的鹰' },
      { tone: 2, py: 'yíng', char: '萤', word: '萤火虫', emoji: '✨', speak: '二声 萤，萤火虫的萤' },
      { tone: 3, py: 'yǐng', char: '影', word: '手影', emoji: '👐', speak: '三声 影，捉影子的影' },
      { tone: 4, py: 'yìng', char: '硬', word: '坚硬', emoji: '🪨', speak: '四声 硬，石头硬的硬' }
    ]
  }
]

export const ALL_PINYIN_ITEMS = [
  ...SHENGMU_LIST,
  ...YUNMU_LIST,
  ...ZHENGTI_LIST
]

// ==================== 4. 魔法拼读实验室：全覆盖配方生成系统 ====================
// 覆盖全部 23 个声母、24 个韵母 与 16 个整体认读音节！
export const PINYIN_SPELL_RECIPES = [
  // --- 覆盖 23 个声母的经典拼读 ---
  { id: 'sp_b_a', group: 'shengmu', keyCode: 'b', type: '两拼音节', sm: 'b', ym: 'a', ruleTip: '前音轻短后音重，两音相连猛一碰！', tones: SHENGMU_LIST[0].tones },
  { id: 'sp_p_o', group: 'shengmu', keyCode: 'p', type: '两拼音节', sm: 'p', ym: 'o', ruleTip: '双唇送气坡 + 圆唇喔 = 山坡的坡！', tones: SHENGMU_LIST[1].tones },
  { id: 'sp_m_a', group: 'shengmu', keyCode: 'm', type: '两拼音节', sm: 'm', ym: 'a', ruleTip: '鼻音摸 + 张大嘴阿 = 妈妈的妈！', tones: SHENGMU_LIST[2].tones },
  { id: 'sp_f_a', group: 'shengmu', keyCode: 'f', type: '两拼音节', sm: 'f', ym: 'a', ruleTip: '唇齿音佛 + 阿 = 出发的发！', tones: SHENGMU_LIST[3].tones },
  { id: 'sp_d_a', group: 'shengmu', keyCode: 'd', type: '两拼音节', sm: 'd', ym: 'a', ruleTip: '舌尖音得 + 阿 = 大象的大！', tones: SHENGMU_LIST[4].tones },
  { id: 'sp_t_u', group: 'shengmu', keyCode: 't', type: '两拼音节', sm: 't', ym: 'u', ruleTip: '舌尖送气特 + 乌 = 白兔的兔！', tones: SHENGMU_LIST[5].tones },
  { id: 'sp_n_ai', group: 'shengmu', keyCode: 'n', type: '两拼音节', sm: 'n', ym: 'ai', ruleTip: '鼻音讷 + 复韵母挨 = 牛奶的奶！', tones: SHENGMU_LIST[6].tones },
  { id: 'sp_l_e', group: 'shengmu', keyCode: 'l', type: '两拼音节', sm: 'l', ym: 'e', ruleTip: '边音勒 + 鹅 = 快乐的乐！', tones: SHENGMU_LIST[7].tones },
  { id: 'sp_g_ua', group: 'shengmu', keyCode: 'g', type: '三拼音节', sm: 'g', jm: 'u', ym: 'a', ruleTip: '声轻介快韵母响，三音连读很顺当！', tones: [
    { tone: 1, py: 'guā', char: '瓜', word: '大西瓜', emoji: '🍉', speak: '哥，乌，阿，一声 瓜，大西瓜的瓜' },
    { tone: 2, py: 'guá', char: '呱', word: '顶呱呱', emoji: '👍', speak: '哥，乌，阿，顶呱呱的呱' },
    { tone: 3, py: 'guǎ', char: '寡', word: '笑哈哈', emoji: '😄', speak: '哥，乌，阿，三声 寡' },
    { tone: 4, py: 'guà', char: '挂', word: '挂灯笼', emoji: '🏮', speak: '哥，乌，阿，四声 挂，挂灯笼的挂' }
  ]},
  { id: 'sp_k_e', group: 'shengmu', keyCode: 'k', type: '两拼音节', sm: 'k', ym: 'e', ruleTip: '舌根音科 + 鹅 = 小蝌蚪的蝌！', tones: SHENGMU_LIST[9].tones },
  { id: 'sp_h_ua', group: 'shengmu', keyCode: 'h', type: '三拼音节', sm: 'h', jm: 'u', ym: 'a', ruleTip: '喝 + 介母乌 + 阿 = 红花朵的花！', tones: [
    { tone: 1, py: 'huā', char: '花', word: '红花朵', emoji: '🌺', speak: '喝，乌，阿，一声 花，红花朵的花' },
    { tone: 2, py: 'huá', char: '滑', word: '滑滑梯', emoji: '🛝', speak: '喝，乌，阿，二声 滑，滑滑梯的滑' },
    { tone: 3, py: 'huǎ', char: '画', word: '画画', emoji: '🎨', speak: '喝，乌，阿，四声 画，画图画的画' },
    { tone: 4, py: 'huà', char: '画', word: '画图画', emoji: '🎨', speak: '喝，乌，阿，四声 画，我是小画家' }
  ]},
  { id: 'sp_j_i', group: 'shengmu', keyCode: 'j', type: '两拼音节', sm: 'j', ym: 'i', ruleTip: '舌面音鸡 + 衣 = 小黄鸡的鸡！', tones: SHENGMU_LIST[11].tones },
  { id: 'sp_q_i', group: 'shengmu', keyCode: 'q', type: '两拼音节', sm: 'q', ym: 'i', ruleTip: '舌面音七 + 衣 = 气球的气！', tones: SHENGMU_LIST[12].tones },
  { id: 'sp_x_ia', group: 'shengmu', keyCode: 'x', type: '三拼音节', sm: 'x', jm: 'i', ym: 'a', ruleTip: '西 + 介母衣 + 阿 = 大龙虾的虾！', tones: [
    { tone: 1, py: 'xiā', char: '虾', word: '大龙虾', emoji: '🦞', speak: '西，衣，阿，一声 虾，大龙虾的虾' },
    { tone: 2, py: 'xiá', char: '霞', word: '红彩霞', emoji: '🌅', speak: '西，衣，阿，二声 霞，红彩霞的霞' },
    { tone: 3, py: 'xiǎ', char: '下', word: '下春雨', emoji: '🌧️', speak: '西，衣，阿，四声 下，下春雨的下' },
    { tone: 4, py: 'xià', char: '夏', word: '夏天', emoji: '🏖️', speak: '西，衣，阿，四声 夏，夏天的夏' }
  ]},
  { id: 'sp_zh_u', group: 'shengmu', keyCode: 'zh', type: '两拼音节', sm: 'zh', ym: 'u', ruleTip: '翘舌音知 + 乌 = 小猪的猪！', tones: SHENGMU_LIST[14].tones },
  { id: 'sp_ch_e', group: 'shengmu', keyCode: 'ch', type: '两拼音节', sm: 'ch', ym: 'e', ruleTip: '翘舌音吃 + 鹅 = 小汽车的车！', tones: SHENGMU_LIST[15].tones },
  { id: 'sp_sh_u', group: 'shengmu', keyCode: 'sh', type: '两拼音节', sm: 'sh', ym: 'u', ruleTip: '翘舌音诗 + 乌 = 看书的书！', tones: SHENGMU_LIST[16].tones },
  { id: 'sp_r_en', group: 'shengmu', keyCode: 'r', type: '两拼音节', sm: 'r', ym: 'en', ruleTip: '翘舌音日 + 前鼻音恩 = 大人的“人”！', tones: SHENGMU_LIST[17].tones },
  { id: 'sp_z_u', group: 'shengmu', keyCode: 'z', type: '两拼音节', sm: 'z', ym: 'u', ruleTip: '平舌音资 + 乌 = 踢足球的足！', tones: SHENGMU_LIST[18].tones },
  { id: 'sp_c_ao', group: 'shengmu', keyCode: 'c', type: '两拼音节', sm: 'c', ym: 'ao', ruleTip: '平舌音雌 + 熬 = 青草的草！', tones: SHENGMU_LIST[19].tones },
  { id: 'sp_s_an', group: 'shengmu', keyCode: 's', type: '两拼音节', sm: 's', ym: 'an', ruleTip: '平舌音思 + 安 = 雨伞的伞！', tones: SHENGMU_LIST[20].tones },
  { id: 'sp_y_a', group: 'shengmu', keyCode: 'y', type: '两拼音节', sm: 'y', ym: 'a', ruleTip: '大衣 + 阿 = 小黄鸭的鸭！', tones: SHENGMU_LIST[21].tones },
  { id: 'sp_w_a', group: 'shengmu', keyCode: 'w', type: '两拼音节', sm: 'w', ym: 'a', ruleTip: '大乌 + 阿 = 小青蛙的蛙！', tones: SHENGMU_LIST[22].tones },

  // --- 覆盖 24 个韵母的经典拼读 ---
  { id: 'sp_ym_a', group: 'yunmu', keyCode: 'a', type: '单韵母拼读', sm: 'b', ym: 'a', ruleTip: '单韵母 a：张大嘴巴阿阿阿，b + a = 爸爸的爸！', tones: SHENGMU_LIST[0].tones },
  { id: 'sp_ym_o', group: 'yunmu', keyCode: 'o', type: '单韵母拼读', sm: 'p', ym: 'o', ruleTip: '单韵母 o：圆圆嘴巴喔喔喔，p + o = 山坡的坡！', tones: SHENGMU_LIST[1].tones },
  { id: 'sp_ym_e', group: 'yunmu', keyCode: 'e', type: '单韵母拼读', sm: 'h', ym: 'e', ruleTip: '单韵母 e：扁扁嘴巴鹅鹅鹅，h + e = 荷花的荷！', tones: SHENGMU_LIST[10].tones },
  { id: 'sp_ym_i', group: 'yunmu', keyCode: 'i', type: '单韵母拼读', sm: 'm', ym: 'i', ruleTip: '单韵母 i：牙齿对齐衣衣衣，m + i = 大米的米！', tones: [
    { tone: 1, py: 'mī', char: '咪', word: '猫咪', emoji: '🐱', speak: '摸，衣，一声 咪，小猫咪的咪' },
    { tone: 2, py: 'mí', char: '迷', word: '迷宫', emoji: '🧩', speak: '摸，衣，二声 迷，走迷宫的迷' },
    { tone: 3, py: 'mǐ', char: '米', word: '大米', emoji: '🍚', speak: '摸，衣，三声 米，香大米的米' },
    { tone: 4, py: 'mì', char: '蜜', word: '蜂蜜', emoji: '🍯', speak: '摸，衣，四声 蜜，甜蜂蜜的蜜' }
  ]},
  { id: 'sp_ym_u', group: 'yunmu', keyCode: 'u', type: '单韵母拼读', sm: 'g', ym: 'u', ruleTip: '单韵母 u：嘴巴突出乌乌乌，g + u = 打鼓的鼓！', tones: SHENGMU_LIST[8].tones },
  { id: 'sp_ym_v', group: 'yunmu', keyCode: 'ü', type: '单韵母拼读', sm: 'l', ym: 'ü', ruleTip: '单韵母 ü：小鱼吐泡迂迂迂，l + ü = 绿色的绿！', tones: [
    { tone: 1, py: 'lū', char: '撸', word: '加油', emoji: '💪', speak: '勒，迂，撸起袖子加油干' },
    { tone: 2, py: 'lǘ', char: '驴', word: '小毛驴', emoji: '🫏', speak: '勒，迂，二声 驴，小毛驴的驴' },
    { tone: 3, py: 'lǚ', char: '旅', word: '旅行', emoji: '🧳', speak: '勒，迂，三声 旅，去旅行的旅' },
    { tone: 4, py: 'lǜ', char: '绿', word: '绿色', emoji: '🌿', speak: '勒，迂，四声 绿，绿叶子的绿' }
  ]},
  { id: 'sp_ym_ai', group: 'yunmu', keyCode: 'ai', type: '复韵母拼读', sm: 'b', ym: 'ai', ruleTip: '复韵母 ai：b + ai = 白云的白！', tones: YUNMU_LIST[6].tones },
  { id: 'sp_ym_ei', group: 'yunmu', keyCode: 'ei', type: '复韵母拼读', sm: 'b', ym: 'ei', ruleTip: '复韵母 ei：b + ei = 水杯的杯！', tones: YUNMU_LIST[7].tones },
  { id: 'sp_ym_ui', group: 'yunmu', keyCode: 'ui', type: '复韵母拼读', sm: 'g', ym: 'ui', ruleTip: '复韵母 ui：g + ui = 乌龟的龟！', tones: YUNMU_LIST[8].tones },
  { id: 'sp_ym_ao', group: 'yunmu', keyCode: 'ao', type: '复韵母拼读', sm: 'm', ym: 'ao', ruleTip: '复韵母 ao：m + ao = 小猫的猫！', tones: YUNMU_LIST[9].tones },
  { id: 'sp_ym_ou', group: 'yunmu', keyCode: 'ou', type: '复韵母拼读', sm: 'g', ym: 'ou', ruleTip: '复韵母 ou：g + ou = 小狗的狗！', tones: YUNMU_LIST[10].tones },
  { id: 'sp_ym_iu', group: 'yunmu', keyCode: 'iu', type: '复韵母拼读', sm: 'n', ym: 'iu', ruleTip: '复韵母 iu：n + iu = 水牛的牛！', tones: YUNMU_LIST[11].tones },
  { id: 'sp_ym_ie', group: 'yunmu', keyCode: 'ie', type: '复韵母拼读', sm: 'd', ym: 'ie', ruleTip: '复韵母 ie：d + ie = 蝴蝶的蝶！', tones: YUNMU_LIST[12].tones },
  { id: 'sp_ym_ve', group: 'yunmu', keyCode: 'üe', type: '复韵母拼读', sm: 'x', ym: 'üe', ruleTip: '小 üe 见了 j q x，摘掉墨镜笑嘻嘻：x + üe = 雪人的雪！', tones: YUNMU_LIST[13].tones },
  { id: 'sp_ym_er', group: 'yunmu', keyCode: 'er', type: '特殊独立韵母', sm: '零声母', ym: 'er', ruleTip: '特殊韵母 er 从不和声母相拼，自己独立成音节：耳朵的耳！', tones: YUNMU_LIST[14].tones },
  { id: 'sp_ym_an', group: 'yunmu', keyCode: 'an', type: '前鼻韵母拼读', sm: 'sh', ym: 'an', ruleTip: '前鼻韵母 an：sh + an = 高山的山！', tones: YUNMU_LIST[15].tones },
  { id: 'sp_ym_en', group: 'yunmu', keyCode: 'en', type: '前鼻韵母拼读', sm: 'm', ym: 'en', ruleTip: '前鼻韵母 en：m + en = 大门的门！', tones: YUNMU_LIST[16].tones },
  { id: 'sp_ym_in', group: 'yunmu', keyCode: 'in', type: '前鼻韵母拼读', sm: 'x', ym: 'in', ruleTip: '前鼻韵母 in：x + in = 开心的心！', tones: YUNMU_LIST[17].tones },
  { id: 'sp_ym_un', group: 'yunmu', keyCode: 'un', type: '前鼻韵母拼读', sm: 'ch', ym: 'un', ruleTip: '前鼻韵母 un：ch + un = 春天的春！', tones: YUNMU_LIST[18].tones },
  { id: 'sp_ym_vn', group: 'yunmu', keyCode: 'ün', type: '前鼻韵母拼读', sm: 'q', ym: 'ün', ruleTip: '前鼻韵母 ün 见 q 去两点：q + ün = 裙子的裙！', tones: YUNMU_LIST[19].tones },
  { id: 'sp_ym_ang', group: 'yunmu', keyCode: 'ang', type: '后鼻韵母拼读', sm: 'y', ym: 'ang', ruleTip: '后鼻韵母 ang：y + ang = 小绵羊的羊！', tones: YUNMU_LIST[20].tones },
  { id: 'sp_ym_eng', group: 'yunmu', keyCode: 'eng', type: '后鼻韵母拼读', sm: 'd', ym: 'eng', ruleTip: '后鼻韵母 eng：d + eng = 红灯笼的灯！', tones: YUNMU_LIST[21].tones },
  { id: 'sp_ym_ing', group: 'yunmu', keyCode: 'ing', type: '后鼻韵母拼读', sm: 'x', ym: 'ing', ruleTip: '后鼻韵母 ing：x + ing = 小星星的星！', tones: YUNMU_LIST[22].tones },
  { id: 'sp_ym_ong', group: 'yunmu', keyCode: 'ong', type: '后鼻韵母拼读', sm: 'x', jm: 'i', ym: 'ong', ruleTip: '后鼻韵母 ong：x + i + ong = 大熊猫的熊！', tones: [
    { tone: 1, py: 'xiōng', char: '胸', word: '挺胸', emoji: '🦸', speak: '西，衣，轰，一声 胸，抬头挺胸的胸' },
    { tone: 2, py: 'xióng', char: '熊', word: '大熊猫', emoji: '🐼', speak: '西，衣，轰，二声 熊，国宝大熊猫的熊' },
    { tone: 3, py: 'dǒng', char: '懂', word: '懂礼貌', emoji: '👍', speak: '三声 懂，懂礼貌好宝宝' },
    { tone: 4, py: 'dòng', char: '动', word: '小动物', emoji: '🐾', speak: '四声 动，可爱小动物的动' }
  ]},

  // --- 覆盖 16 个整体认读音节的直呼配方 ---
  ...ZHENGTI_LIST.map(zt => ({
    id: `sp_${zt.id}`,
    group: 'zhengti',
    keyCode: zt.code,
    type: '整体认读直呼',
    sm: zt.code,
    ym: '整体认读',
    ruleTip: `${zt.chantSpeak}——整体认读音节不用拆开拼，加上声调直接读！`,
    tones: zt.tones
  }))
]

// ==================== 5. 全量 63 拼音动态闯关题库生成器 ====================
// 根据用户所选范围 ('all' | 'shengmu' | 'yunmu' | 'zhengti') 动态生成覆盖所有学习内容的闯关题目！
export function getFilteredPinyinPool(scope = 'all') {
  if (scope === 'shengmu') return SHENGMU_LIST
  if (scope === 'yunmu') return YUNMU_LIST
  if (scope === 'zhengti') return ZHENGTI_LIST
  return ALL_PINYIN_ITEMS
}

// 生成「游戏1：听音捉迷藏」全量题目（覆盖所选分类下的全部拼音）
export function buildListenQuestions(scope = 'all') {
  const pool = getFilteredPinyinPool(scope)
  return pool.map((item, idx) => {
    // Pick 3 distractors from the same category for realistic challenge
    const sameCat = ALL_PINYIN_ITEMS.filter(x => x.category === item.category && x.id !== item.id)
    const step = (idx * 3 + 1) % Math.max(1, sameCat.length - 3)
    const distractors = [
      sameCat[step % sameCat.length]?.code || 'b',
      sameCat[(step + 2) % sameCat.length]?.code || 'a',
      sameCat[(step + 5) % sameCat.length]?.code || 'zhi'
    ]
    const options = Array.from(new Set([item.code, ...distractors])).slice(0, 4)
    // Deterministic shuffle based on idx
    options.sort((a, b) => ((a.charCodeAt(0) + idx) % 5) - ((b.charCodeAt(0) + idx) % 5))

    const catLabel = item.category === 'shengmu' ? '声母' : item.category === 'yunmu' ? '韵母' : '整体认读音节'
    const cleanChant = item.chant.replace(new RegExp(item.code, 'g'), '❓')
    return {
      id: `lq_${item.id}`,
      itemId: item.id,
      category: item.category,
      promptText: `【${catLabel}】${cleanChant} —— 请找出对应的拼音精灵：`,
      speak: `请找出${catLabel}，${item.readSound}。${item.chantSpeak}`,
      answer: item.code,
      options,
      emoji: item.emoji,
      word: item.word
    }
  })
}

// 生成「游戏2：声调小火车」全量题目（覆盖全部 63 个拼音的四声调词语）
export function buildToneQuestions(scope = 'all') {
  const pool = getFilteredPinyinPool(scope)
  const toneNames = { 1: '一声平', 2: '二声扬', 3: '三声拐弯', 4: '四声降' }
  return pool.map((item, idx) => {
    const targetToneIdx = idx % 4
    const targetToneObj = item.tones[targetToneIdx] || item.tones[0]
    const options = item.tones.map((t, i) => `${t.py} (${i + 1}声)`)
    const answer = `${targetToneObj.py} (${targetToneObj.tone}声)`
    return {
      id: `tq_${item.id}`,
      itemId: item.id,
      category: item.category,
      code: item.code,
      word: targetToneObj.word,
      char: targetToneObj.char,
      emoji: targetToneObj.emoji || item.wordEmoji,
      speak: `请听词语：${targetToneObj.word}，${targetToneObj.char}。请问是第几声呢？`,
      answer,
      toneNum: targetToneObj.tone,
      toneTitle: toneNames[targetToneObj.tone],
      options
    }
  })
}

// 生成「游戏3：拼音积木大拼图」全量题目（覆盖全部声母、韵母和整体认读音节）
export function buildPuzzleQuestions(scope = 'all') {
  const recipes = scope === 'all'
    ? PINYIN_SPELL_RECIPES
    : PINYIN_SPELL_RECIPES.filter(r => r.group === scope)

  const distractorPool = ['b', 'p', 'm', 'd', 'g', 'h', 'x', 'zh', 'sh', 'a', 'o', 'e', 'i', 'u', 'ü', 'ai', 'ao', 'an', 'ang', 'ong']

  return recipes.map((rec, idx) => {
    const toneObj = rec.tones[(idx % 4)] || rec.tones[0]
    let parts = []
    if (rec.group === 'zhengti') {
      parts = [rec.keyCode, `${toneObj.tone}声帽`]
    } else if (rec.jm) {
      parts = [rec.sm, rec.jm, rec.ym]
    } else if (rec.sm === '零声母') {
      parts = [rec.ym, `${toneObj.tone}声帽`]
    } else {
      parts = [rec.sm, rec.ym]
    }

    const distractors = distractorPool
      .filter(d => !parts.includes(d))
      .slice((idx * 2) % 10, ((idx * 2) % 10) + 3)

    if (rec.group === 'zhengti' || rec.sm === '零声母') {
      const otherTone = ((toneObj.tone % 4) + 1) + '声帽'
      if (!distractors.includes(otherTone)) distractors[0] = otherTone
    }

    return {
      id: `pq_${rec.id}`,
      keyCode: rec.keyCode,
      group: rec.group,
      targetWord: toneObj.word,
      targetChar: toneObj.char,
      emoji: toneObj.emoji,
      fullPinyin: toneObj.py,
      ruleTip: rec.ruleTip,
      speak: `${toneObj.word}的${toneObj.char}，请按顺序点击积木拼出来吧！`,
      parts,
      distractors
    }
  })
}
