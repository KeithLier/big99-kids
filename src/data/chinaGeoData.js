// 中国地理百科核心数据库（涵盖全部 34 个省级行政区，包括台湾省，以及城市四维百科与绘本双图生成引擎）

export const GEO_REGIONS = [
  { id: 'all', name: '全国总览', icon: '🇨🇳', color: '#0EA5E9', fill: '#E0F2FE', stroke: '#0284C7' },
  { id: '华北', name: '华北地区', icon: '🏯', color: '#EF4444', fill: '#FEE2E2', stroke: '#DC2626' },
  { id: '东北', name: '东北地区', icon: '⛄', color: '#3B82F6', fill: '#DBEAFE', stroke: '#2563EB' },
  { id: '华东', name: '华东与台港澳', icon: '🛶', color: '#10B981', fill: '#D1FAE5', stroke: '#059669' },
  { id: '华中', name: '华中地区', icon: '🌾', color: '#F59E0B', fill: '#FEF3C7', stroke: '#D97706' },
  { id: '华南', name: '华南地区', icon: '🌴', color: '#EC4899', fill: '#FCE7F3', stroke: '#DB2777' },
  { id: '西南', name: '西南地区', icon: '🐼', color: '#8B5CF6', fill: '#EDE9FE', stroke: '#7C3AED' },
  { id: '西北', name: '西北地区', icon: '🐪', color: '#D97706', fill: '#FFEDD5', stroke: '#EA580C' }
]

// 为每个城市动态生成 2 张高清儿童绘本级 SVG 主题画卷（1. 名胜风景画卷  2. 美食与非遗文化画卷）
export function buildCityIllustrationSvg( {
  cityName,
  provinceName,
  kind = 'scenery', // 'scenery' | 'food'
  title = '',
  subtitle = '',
  emoji = '🏞️',
  subEmoji = '✨',
  theme = 'mountain' // 'palace' | 'water' | 'mountain' | 'coastal' | 'desert' | 'snow' | 'modern'
}) {
  const palettes = {
    palace: { bg1: '#FFF1F2', bg2: '#FFE4E6', hill1: '#FDA4AF', hill2: '#FB7185', accent: '#E11D48', badgeBg: '#881337' },
    water: { bg1: '#ECFDF5', bg2: '#D1FAE5', hill1: '#6EE7B7', hill2: '#34D399', accent: '#059669', badgeBg: '#064E3B' },
    mountain: { bg1: '#F0F9FF', bg2: '#E0F2FE', hill1: '#7DD3FC', hill2: '#38BDF8', accent: '#0284C7', badgeBg: '#0C4A6E' },
    coastal: { bg1: '#ECFEFF', bg2: '#CFFAFE', hill1: '#67E8F9', hill2: '#22D3EE', accent: '#0891B2', badgeBg: '#164E63' },
    desert: { bg1: '#FFFBEB', bg2: '#FEF3C7', hill1: '#FCD34D', hill2: '#F59E0B', accent: '#D97706', badgeBg: '#78350F' },
    snow: { bg1: '#EFF6FF', bg2: '#DBEAFE', hill1: '#93C5FD', hill2: '#60A5FA', accent: '#2563EB', badgeBg: '#1E3A8A' },
    modern: { bg1: '#F5F3FF', bg2: '#EDE9FE', hill1: '#C4B5FD', hill2: '#A78BFA', accent: '#7C3AED', badgeBg: '#4C1D95' }
  }
  const foodPalette = {
    bg1: '#FFF7ED',
    bg2: '#FFEDD5',
    hill1: '#FDBA74',
    hill2: '#FB923C',
    accent: '#EA580C',
    badgeBg: '#7C2D12'
  }
  const p = kind === 'food' ? foodPalette : (palettes[theme] || palettes.mountain)
  const tagLabel = kind === 'food' ? '🍜 特色美食与非遗文化画卷' : '🏞️ 城市名胜风光实景画卷'

  const sceneryArtwork = `
    <!-- 远山与云朵 -->
    <circle cx="670" cy="95" r="42" fill="#FDE047" opacity="0.88" />
    <circle cx="670" cy="95" r="56" fill="#FEF08A" opacity="0.35" />
    <g fill="#FFFFFF" opacity="0.85">
      <ellipse cx="145" cy="88" rx="46" ry="20" />
      <ellipse cx="170" cy="80" rx="34" ry="18" />
      <ellipse cx="520" cy="74" rx="52" ry="20" />
      <ellipse cx="550" cy="68" rx="35" ry="16" />
    </g>
    <path d="M0 330 Q140 210 310 300 T620 265 T800 310 L800 460 L0 460 Z" fill="${p.hill1}" opacity="0.55" />
    <path d="M0 365 Q220 260 430 345 T800 320 L800 460 L0 460 Z" fill="${p.hill2}" opacity="0.72" />
    <!-- 水波纹与地标底座 -->
    <rect x="0" y="385" width="800" height="75" fill="${p.accent}" opacity="0.18" />
    <path d="M60 412 Q180 398 300 412 T540 412 T740 412" stroke="#FFFFFF" stroke-width="4" fill="none" opacity="0.65" stroke-linecap="round" />
    <!-- 古建亭台/地标剪影装饰 -->
    <g transform="translate(560, 210)">
      <polygon points="80,0 15,42 145,42" fill="${p.badgeBg}" opacity="0.85" />
      <polygon points="80,28 25,64 135,64" fill="${p.accent}" />
      <rect x="42" y="64" width="76" height="58" rx="6" fill="#FFFFFF" opacity="0.92" />
      <rect x="68" y="82" width="24" height="40" rx="12" fill="${p.accent}" />
    </g>
  `

  const foodArtwork = `
    <!-- 暖色美食工坊与非遗灯笼装饰 -->
    <circle cx="120" cy="95" r="52" fill="#FED7AA" opacity="0.55" />
    <circle cx="680" cy="110" r="68" fill="#FDE68A" opacity="0.55" />
    <!-- 传统红灯笼 -->
    <g transform="translate(88, 36)">
      <line x1="30" y1="0" x2="30" y2="24" stroke="#B45309" stroke-width="4" />
      <ellipse cx="30" cy="48" rx="28" ry="24" fill="#EF4444" />
      <rect x="18" y="22" width="24" height="6" rx="2" fill="#F59E0B" />
      <rect x="18" y="69" width="24" height="6" rx="2" fill="#F59E0B" />
      <line x1="30" y1="75" x2="30" y2="95" stroke="#EF4444" stroke-width="4" />
    </g>
    <g transform="translate(650, 36)">
      <line x1="30" y1="0" x2="30" y2="24" stroke="#B45309" stroke-width="4" />
      <ellipse cx="30" cy="48" rx="28" ry="24" fill="#EF4444" />
      <rect x="18" y="22" width="24" height="6" rx="2" fill="#F59E0B" />
      <rect x="18" y="69" width="24" height="6" rx="2" fill="#F59E0B" />
      <line x1="30" y1="75" x2="30" y2="95" stroke="#EF4444" stroke-width="4" />
    </g>
    <!-- 团扇与餐盘底座 -->
    <path d="M0 355 Q240 295 480 350 T800 335 L800 460 L0 460 Z" fill="#FDBA74" opacity="0.55" />
    <ellipse cx="400" cy="390" rx="250" ry="42" fill="#FFFFFF" opacity="0.65" />
  `

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.bg1}" />
        <stop offset="100%" stop-color="${p.bg2}" />
      </linearGradient>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.12" />
      </filter>
    </defs>
    <rect width="800" height="460" rx="28" fill="url(#bgGrad)" />
    ${kind === 'food' ? foodArtwork : sceneryArtwork}
    <!-- 顶部省份城市胶囊 -->
    <rect x="28" y="24" width="290" height="42" rx="21" fill="${p.badgeBg}" opacity="0.9" />
    <text x="48" y="51" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="19" font-weight="800" fill="#FFFFFF">${tagLabel}</text>
    <!-- 中心绘本主视觉徽章 -->
    <g filter="url(#cardShadow)">
      <rect x="52" y="112" width="470" height="236" rx="26" fill="#FFFFFF" opacity="0.93" />
      <circle cx="138" cy="212" r="56" fill="${p.bg2}" stroke="${p.accent}" stroke-width="3" />
      <text x="138" y="232" text-anchor="middle" font-size="58">${emoji}</text>
      <circle cx="182" cy="166" r="22" fill="#FFFFFF" />
      <text x="182" y="175" text-anchor="middle" font-size="24">${subEmoji}</text>
      <text x="218" y="168" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${p.accent}">${provinceName} · ${cityName}</text>
      <text x="218" y="212" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="31" font-weight="900" fill="#0F172A">${title}</text>
      <text x="218" y="252" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="17" font-weight="700" fill="#475569">${subtitle.slice(0, 16)}</text>
      <text x="218" y="280" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="17" font-weight="700" fill="#64748B">${subtitle.slice(16, 32)}</text>
      <rect x="218" y="298" width="210" height="28" rx="14" fill="${p.bg2}" />
      <text x="234" y="317" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="14" font-weight="800" fill="${p.badgeBg}">🔊 点击下方喇叭听语音讲解</text>
    </g>
    <!-- 底部装饰印章 -->
    <rect x="556" y="382" width="216" height="50" rx="16" fill="#FFFFFF" opacity="0.92" />
    <text x="664" y="413" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="17" font-weight="900" fill="${p.badgeBg}">📍 中国地理百科 · ${cityName}</text>
  </svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const CHINA_PROVINCES = [
  {
    adcode: '110000',
    name: '北京市',
    shortName: '京',
    capital: '东城区',
    region: '华北',
    icon: '🏯',
    slogan: '祖国首都北京城，天安门前国旗升！',
    overview: '北京市是我们伟大祖国的首都，位于华北平原北部，背靠燕山，有着三千多年的建城史和八百多年的建都史。这里有雄伟的天安门、故宫和万里长城！',
    cities: [
      {
        name: '东城区',
        badge: '首都核心',
        sceneryName: '天安门与故宫博物院',
        sceneryEmoji: '🏯',
        foodName: '北京烤鸭与冰糖葫芦',
        foodEmoji: '🦆',
        cultureName: '京剧国粹与中轴线文化',
        theme: 'palace',
        location: '东城区位于北京市中心城区东部，是北京中轴线穿过的核心区域，地势平坦开阔，属于温带季风气候，四季分明。',
        scenery: '这里有全世界最大的古代宫殿建筑群——故宫（紫禁城），红墙黄瓦气势恢宏！还有庄严的天安门广场和祈求五谷丰登的天坛祈年殿。',
        food: '来这里一定要尝尝外皮酥脆、肥而不腻的正宗北京烤鸭，用荷叶饼卷着葱丝甜面酱吃！冬天还有酸甜可口的老北京冰糖葫芦和炸酱面。',
        culture: '东城区汇聚了京剧国粹、北京四合院与胡同文化。北京中轴线更是被列入了世界文化遗产，展现了中国古代都城对称和谐的智慧。'
      },
      {
        name: '海淀区',
        badge: '皇家园林与科教之城',
        sceneryName: '颐和园与圆明园',
        sceneryEmoji: '🏞️',
        foodName: '宫廷豌豆黄与驴打滚',
        foodEmoji: '🥮',
        cultureName: '三山五园与高校科学精神',
        theme: 'water',
        location: '海淀区位于北京城区西北部，西部为西山山脉，东南部为平原，山水相依，风景秀丽。',
        scenery: '著名的皇家园林颐和园就在这里，昆明湖碧波荡漾，十七孔桥和佛香阁美不胜收；秋天的香山公园更是漫山红叶。',
        food: '海淀有许多精致的京味宫廷糕点，比如入口即化的豌豆黄、撒满黄豆面的驴打滚，还有热气腾腾的老北京铜锅涮肉。',
        culture: '这里是著名的“三山五园”皇家园林文化区，同时坐落着北京大学、清华大学和中国科学院，是全国小朋友向往的科学与知识殿堂！'
      },
      {
        name: '延庆区',
        badge: '长城之都与冬奥赛区',
        sceneryName: '八达岭万里长城',
        sceneryEmoji: '🧱',
        foodName: '延庆火勺与柳沟豆腐宴',
        foodEmoji: '🫓',
        cultureName: '长城戍边与冰雪冬奥精神',
        theme: 'mountain',
        location: '延庆区位于北京市西北部，三面环山、一面临水，平均海拔约500米，夏季凉爽宜人，被称为北京的“夏都”。',
        scenery: '万里长城的精华段——八达岭长城就在延庆！巨龙般的长城在崇山峻岭间蜿蜒盘旋，还有风景如画的龙庆峡。',
        food: '延庆火勺外焦里嫩，刚出炉时香气扑鼻；还有特色柳沟火盆锅豆腐宴，营养又美味。',
        culture: '“不到长城非好汉”，长城凝聚着中华民族坚韧不拔的勤劳智慧；这里还是2022年北京冬奥会高山滑雪赛区！'
      },
      {
        name: '朝阳区',
        badge: '双奥之城现代地标',
        sceneryName: '鸟巢与水立方奥林匹克公园',
        sceneryEmoji: '🏟️',
        foodName: '京味炙子烤肉与京式茶点',
        foodEmoji: '🥩',
        cultureName: '双奥文化与现代国际都市风貌',
        theme: 'modern',
        location: '朝阳区位于北京市主城区东部，面积广阔，地势平坦，亮马河、通惠河穿流而过。',
        scenery: '这里有造型独特的国家体育场“鸟巢”和国家游泳中心“水立方”（冰立方），夜晚灯光亮起时五彩斑斓，非常壮观！',
        food: '除了传统京味炙子烤肉、老北京爆肚，朝阳区还汇聚了全国各地的中华美食与非遗茶点。',
        culture: '朝阳区见证了北京成为全球首个“双奥之城”（2008年夏奥会与2022年冬奥会）的荣耀，展现了古老北京朝气蓬勃的现代活力。'
      }
    ]
  },
  {
    adcode: '120000',
    name: '天津市',
    shortName: '津',
    capital: '和平区',
    region: '华北',
    icon: '🎡',
    slogan: '海河弯弯穿津门，麻花包子笑声甜！',
    overview: '天津市位于华北平原东北部，东临渤海，海河穿城而过，是一座既有传统曲艺相声魅力、又有美丽桥梁与海港风光的直辖市！',
    cities: [
      {
        name: '和平区',
        badge: '津门核心',
        sceneryName: '五大道历史街区与海河风光',
        sceneryEmoji: '🏛️',
        foodName: '狗不理包子与煎饼果子',
        foodEmoji: '🥟',
        cultureName: '津味相声与中西合璧建筑文化',
        theme: 'modern',
        location: '和平区位于天津市中心，依偎在美丽的海河西岸，地势平坦，交通便利。',
        scenery: '五大道街区保存着两千多所风格各异的花园小洋楼，被称为“万国建筑博览苑”，乘船游览海河更能欣赏两岸迷人风光。',
        food: '天津人最爱吃绿豆面摊成的煎饼果子，里面夹着酥脆的果蓖儿！还有十八个褶的狗不理包子和耳朵眼炸糕。',
        culture: '天津是著名的“曲艺之乡”，相声、快板幽默风趣，让人听了哈哈大笑，传递着乐观豁达的生活态度。'
      },
      {
        name: '红桥区',
        badge: '三岔河口发祥地',
        sceneryName: '天津之眼摩天轮',
        sceneryEmoji: '🎡',
        foodName: '桂发祥十八街麻花',
        foodEmoji: '🥨',
        cultureName: '大运河漕运与津门民俗文化',
        theme: 'water',
        location: '红桥区位于天津城区西北部，是京杭大运河与海河交汇的“三岔河口”所在地，也是天津城市的发祥地。',
        scenery: '横跨在永乐桥上的“天津之眼”是世界上少有的建在桥上的摩天轮，升到最高处可以俯瞰整座海河两岸的美景！',
        food: '酥脆香甜的十八街大麻花、茶汤和熟梨糕是这里的代表美味，深受小朋友喜爱。',
        culture: '三岔河口见证了数百年南北大运河漕运的繁华，孕育了热闹非凡的津门民俗技艺。'
      },
      {
        name: '滨海新区',
        badge: '渤海明珠',
        sceneryName: '国家海洋博物馆与滨海图书馆',
        sceneryEmoji: '🐋',
        foodName: '渤海大对虾与海鲜水饺',
        foodEmoji: '🦐',
        cultureName: '海洋科普与妈祖航海文化',
        theme: 'coastal',
        location: '滨海新区位于天津市东部沿海地带，东临渤海湾，拥有漫长的海岸线和北方国际大港。',
        scenery: '国家海洋博物馆被称为“海上故宫”，里面有巨大的鲸鱼标本和远古海洋化石；还有像大眼睛一样的网红滨海图书馆。',
        food: '靠海吃海，这里的清蒸渤海大对虾、梭子蟹和三鲜海鲜水饺鲜美无比！',
        culture: '融合了古老的海洋渔盐文化与现代航空航天、深海探索科普精神，非常适合小朋友探索海洋奥秘。'
      }
    ]
  },
  {
    adcode: '130000',
    name: '河北省',
    shortName: '冀',
    capital: '石家庄市',
    region: '华北',
    icon: '🦁',
    slogan: '燕赵大地环京津，山海关外渤海深！',
    overview: '河北省环抱着北京和天津，北有燕山和坝上草原，西有太行山脉，东临渤海，是全国唯一兼有高原、山地、丘陵、盆地、平原和海滨的省份！',
    cities: [
      {
        name: '石家庄市',
        badge: '河北省会',
        sceneryName: '赵州桥与正定古城',
        sceneryEmoji: '🌉',
        foodName: '正定八大碗与安徽板面/缸炉烧饼',
        foodEmoji: '🫓',
        cultureName: '千年古桥建筑智慧与燕赵文化',
        theme: 'palace',
        location: '石家庄市位于河北省中南部，西依巍峨的太行山，东接广阔的华北平原，是连接南北的重要交通枢纽。',
        scenery: '小学语文课本里的《赵州桥》就在石家庄赵县！这座由隋代工匠李春建造的石拱桥历经1400多年依然坚固如初，还有古色古香的正定古城。',
        food: '酥脆掉渣的缸炉烧饼、香气浓郁的正定八大碗和金凤扒鸡，都是地道的冀中美食。',
        culture: '赵州桥开创了世界敞肩拱桥的先河，展现了中国古代工匠非凡的数学与建筑智慧。'
      },
      {
        name: '秦皇岛市',
        badge: '长城入海处',
        sceneryName: '山海关老龙头与北戴河海滨',
        sceneryEmoji: '🌊',
        foodName: '海鲜蒸饺与四条包子',
        foodEmoji: '🦀',
        cultureName: '天下第一关长城文化与观鸟生态',
        theme: 'coastal',
        location: '秦皇岛市位于河北省东北部，北依燕山，南临渤海，气候温和湿润，是著名的海滨城市。',
        scenery: '“天下第一关”山海关雄伟壮丽，老龙头更是万里长城唯一伸入大海的地方，就像巨龙把头探进渤海戏水！北戴河沙滩平缓，还是鸟类的天堂。',
        food: '刚捕捞上来的皮皮虾、螃蟹和清香四溢的北戴河海鲜蒸饺，让人回味无穷。',
        culture: '长城文化与海洋文化在此交融，每年春秋两季都有成千上万只候鸟在北戴河湿地停歇。'
      },
      {
        name: '承德市',
        badge: '塞外明珠',
        sceneryName: '承德避暑山庄与塞罕坝林场',
        sceneryEmoji: '🦌',
        foodName: '承德杏仁茶与荞麦碗坨',
        foodEmoji: '🍵',
        cultureName: '塞罕坝绿色生态奇迹与多民族融合',
        theme: 'mountain',
        location: '承德市位于河北省东北部，处于华北平原向内蒙古高原的过渡地带，群山环抱，森林茂密。',
        scenery: '承德避暑山庄是中国现存最大的古典皇家园林，融合了江南水乡与北方草原风光；北部的塞罕坝百万亩人工林海更是碧波万顷！',
        food: '承德盛产山杏仁，香甜顺滑的杏仁茶、御土荷叶鸡和南沙饼极具塞外风味。',
        culture: '三代塞罕坝林场建设者把荒漠沙地变成了万里绿洲，创造了举世瞩目的绿色生态奇迹！'
      }
    ]
  },
  {
    adcode: '140000',
    name: '山西省',
    shortName: '晋',
    capital: '太原市',
    region: '华北',
    icon: '🏮',
    slogan: '太行山下一壶醋，刀削面香古建酷！',
    overview: '山西省位于太行山以西、黄河以东，因此得名“山西”，又称“三晋大地”。这里保存着全国最多的唐宋古建筑，还是著名的面食王国！',
    cities: [
      {
        name: '太原市',
        badge: '山西省会·龙城',
        sceneryName: '晋祠博物馆与汾河公园',
        sceneryEmoji: '🏛️',
        foodName: '山西刀削面与老陈醋',
        foodEmoji: '🍜',
        cultureName: '三晋历史文脉与面食非遗技艺',
        theme: 'palace',
        location: '太原市位于山西省中部、太原盆地北端，三面环山，黄河第二大支流汾河自北向南穿城而过。',
        scenery: '晋祠是中国现存最早的皇家祭祀园林，里面有千年不老的周柏、难老泉和精美的宋代彩塑。',
        food: '山西刀削面中厚边薄，柳叶形的下面条筋道爽滑，再淋上一勺醇香的山西老陈醋，好吃极了！',
        culture: '太原有着2500多年建城史，“一面百吃”的山西面食制作技艺更是令人叹为观止的非物质文化遗产。'
      },
      {
        name: '大同市',
        badge: '中国雕塑之都',
        sceneryName: '云冈石窟与恒山悬空寺',
        sceneryEmoji: '🗿',
        foodName: '大同兔头与什锦铜火锅',
        foodEmoji: '🍲',
        cultureName: '北魏石窟艺术与奇巧古建力学',
        theme: 'mountain',
        location: '大同市位于山西省最北端，地处黄土高原东北边缘，自古就是北方边塞重镇。',
        scenery: '世界文化遗产云冈石窟有五万多尊石雕造像，最大的佛像有17米高！还有建在北岳恒山翠屏峰悬崖峭壁上的悬空寺，像挂在半空中一样神奇。',
        food: '大同刀削面、黄糕、百花烧麦和热气腾腾的什锦铜火锅是当地人的最爱。',
        culture: '云冈石窟展现了1500多年前中外文化交流与石雕艺术的巅峰，悬空寺则体现了古人“奇、悬、巧”的建筑智慧。'
      },
      {
        name: '晋中市',
        badge: '晋商故里',
        sceneryName: '平遥古城与绵山风景区',
        sceneryEmoji: '🏯',
        foodName: '平遥牛肉与栲栳栳',
        foodEmoji: '🥩',
        cultureName: '古城完整风貌与诚信晋商文化',
        theme: 'palace',
        location: '晋中市位于山西省中部，东依太行山，西临汾河水，地势东高西低。',
        scenery: '平遥古城是中国保存最为完好的四大古城之一，整座城池像一只大乌龟，被称为“龟城”，城墙、县衙、票号保存得原汁原味。',
        food: '肉质鲜嫩红润的平遥牛肉，还有形状像小竹篓一样的莜面栲栳栳，蘸着西红柿羊肉卤吃特别香。',
        culture: '这里诞生了中国最早的现代银行雏形——“日昇昌”票号，传承着诚实守信、汇通天下的晋商精神。'
      }
    ]
  },
  {
    adcode: '150000',
    name: '内蒙古自治区',
    shortName: '内蒙古',
    capital: '呼和浩特市',
    region: '华北',
    icon: '🐎',
    slogan: '天苍苍野茫茫，风吹草低见牛羊！',
    overview: '内蒙古自治区横跨中国北方，东西长达2400多公里，拥有辽阔的大草原、茂密的大兴安岭森林和浩瀚的沙漠，马头琴声悠扬动听！',
    cities: [
      {
        name: '呼和浩特市',
        badge: '自治区首府·青城',
        sceneryName: '敕勒川草原与大召历史街区',
        sceneryEmoji: '🌿',
        foodName: '内蒙古手把肉与咸香奶茶',
        foodEmoji: '🥛',
        cultureName: '昭君和亲故事与草原游牧文化',
        theme: 'mountain',
        location: '呼和浩特市位于内蒙古中部，北靠阴山山脉（大青山），南濒黄河，蒙语意为“青色的城”。',
        scenery: '北朝民歌《敕勒歌》描绘的“天苍苍，野茫茫，风吹草低见牛羊”就在这里的敕勒川草原！夏季绿草如茵，骏马奔腾。',
        food: '被誉为“中国乳都”，这里的鲜牛奶、奶皮子、奶豆腐奶香浓郁，还有鲜嫩的手把羊肉和稍麦（烧麦）。',
        culture: '昭君博物院讲述了汉代王昭君出塞促进民族团结的动人故事，悠扬的马头琴和呼麦更是草原文化瑰宝。'
      },
      {
        name: '呼伦贝尔市',
        badge: '草原明珠',
        sceneryName: '呼伦贝尔大草原与额尔古纳湿地',
        sceneryEmoji: '🐎',
        foodName: '草原烤羊排与蓝莓果酱',
        foodEmoji: '🍖',
        cultureName: '那达慕大会与森林驯鹿文化',
        theme: 'water',
        location: '呼伦贝尔市位于内蒙古东北部，大兴安岭纵贯南北，因境内的呼伦湖和贝尔湖而得名。',
        scenery: '呼伦贝尔大草原是世界著名的天然牧场，莫日格勒河像一条蓝色绸带在碧绿的草地上九曲十八弯；大兴安岭里还有可爱的驯鹿！',
        food: '外焦里嫩的草原烤羊排、鲜美的呼伦湖全鱼宴，以及大兴安岭野生蓝莓制成的酸甜果干。',
        culture: '每年夏天草原上都会举办盛大的“那达慕”大会，牧民们进行赛马、摔跤和射箭比赛，热闹非凡！'
      },
      {
        name: '阿拉善盟',
        badge: '航天摇篮与胡杨之乡',
        sceneryName: '额济纳胡杨林与巴丹吉林沙漠',
        sceneryEmoji: '🐪',
        foodName: '驼肉馅饼与沙葱炒蛋',
        foodEmoji: '🥟',
        cultureName: '东风航天城飞天精神与金色胡杨',
        theme: 'desert',
        location: '阿拉善盟位于内蒙古最西部，境内分布着巴丹吉林、腾格里、乌兰布和三大沙漠。',
        scenery: '每年秋天，额济纳旗的数十万亩胡杨林变成金黄色，在蓝天映衬下就像童话世界；巴丹吉林沙漠里还有神奇的沙漠湖泊。',
        food: '脆嫩爽口的沙漠野菜“沙葱”炒鸡蛋、蒙古黄油饼和奶酪酥，风味独特。',
        culture: '著名的酒泉卫星发射中心（东风航天城）核心区就在阿拉善额济纳旗境内，神舟飞船从这里飞向太空！'
      }
    ]
  },
  {
    adcode: '210000',
    name: '辽宁省',
    shortName: '辽',
    capital: '沈阳市',
    region: '东北',
    icon: '🚢',
    slogan: '辽河平原粮仓满，渤海黄海浪花翻！',
    overview: '辽宁省位于中国东北地区南部，南临渤海和黄海，既有着深厚的历史文化古迹，又是我国航空母舰“辽宁舰”启航的海滨大省！',
    cities: [
      {
        name: '沈阳市',
        badge: '辽宁省会',
        sceneryName: '沈阳故宫与棋盘山风景区',
        sceneryEmoji: '🏯',
        foodName: '老边饺子与锅包肉',
        foodEmoji: '🥟',
        cultureName: '关东民俗与大国重器工业文化',
        theme: 'palace',
        location: '沈阳市位于辽宁省中部、辽河平原南缘，浑河穿城而过，地势平坦，四季分明。',
        scenery: '沈阳故宫是中国仅存的两大皇家宫殿建筑群之一，大政殿八角重檐造型别具一格；冬天还能在棋盘山冰雪世界滑雪。',
        food: '金黄酥脆、酸甜适口的东北锅包肉是小朋友的最爱！还有皮薄馅大的老边饺子和马家烧麦。',
        culture: '沈阳不仅有融合满汉蒙特色的古建筑艺术，还是新中国航空与装备制造的摇篮，被誉为“共和国长子”。'
      },
      {
        name: '大连市',
        badge: '浪漫海滨之都',
        sceneryName: '星海广场与老虎滩海洋公园',
        sceneryEmoji: '🐬',
        foodName: '大连焖子与海菜包子',
        foodEmoji: '🦑',
        cultureName: '百年有轨电车与海洋生态文化',
        theme: 'coastal',
        location: '大连市位于辽东半岛最南端，三面环海，东濒黄海，西临渤海，冬无严寒，夏无酷暑。',
        scenery: '星海广场海鸥飞翔，跨海大桥气势如虹；在老虎滩海洋公园和圣亚海洋世界，可以看到可爱的白鲸、企鹅和海豚表演！',
        food: '外焦里糯、浇上麻酱蒜汁的大连焖子，还有鲜美多汁的海胆水饺、海凉粉和烤鱿鱼。',
        culture: '大连保留着叮当作响的百年有轨电车，海洋环保意识浓厚，更有着“足球城”的运动活力。'
      }
    ]
  },
  {
    adcode: '220000',
    name: '吉林省',
    shortName: '吉',
    capital: '长春市',
    region: '东北',
    icon: '❄️',
    slogan: '长白山顶天池美，松花江畔雾凇奇！',
    overview: '吉林省位于东北地区中部，东部长白山巍峨壮丽，中部黑土地肥沃高产，西部草原湿地水草丰美，冬天的雾凇更是人间仙境！',
    cities: [
      {
        name: '长春市',
        badge: '吉林省会·北国春城',
        sceneryName: '净月潭国家森林公园与长影世纪城',
        sceneryEmoji: '🌲',
        foodName: '雪衣豆沙与人参汽水锅包肉',
        foodEmoji: '🍡',
        cultureName: '新中国电影摇篮与汽车工业文化',
        theme: 'snow',
        location: '长春市位于吉林省中部、松辽平原腹地，伊通河穿流而过，绿化率极高，森林覆盖广。',
        scenery: '净月潭因弯弯的湖面像一弯新月而得名，夏天绿树成荫，冬天变成银装素裹的冰雪乐园；长影世纪城则充满电影特效乐趣。',
        food: '软绵香甜、像白雪云朵一样的“雪衣豆沙”是吉菜代表，还有喷香的铁锅炖大鹅。',
        culture: '这里诞生了新中国第一家电影制片厂（长影）和第一辆国产汽车（解放牌），被称为“汽车城”与“电影城”。'
      },
      {
        name: '吉林市',
        badge: '雾凇之都',
        sceneryName: '松花江雾凇岛与北大湖滑雪场',
        sceneryEmoji: '❄️',
        foodName: '乌拉满族火锅与煎粉',
        foodEmoji: '🍲',
        cultureName: '中国四大自然奇观雾凇与冰雪运动',
        theme: 'snow',
        location: '吉林市位于吉林省中部偏东，是全国唯一与省同名的城市，松花江呈反“S”形穿城而过。',
        scenery: '每到寒冬，不结冰的松花江水汽蒸腾，在两岸柳树上凝结成洁白晶莹的“吉林雾凇”，千树万树梨花开，是中国四大自然奇观之一！',
        food: '热气腾腾的乌拉满族铜火锅、滑嫩咸香的吉林煎粉和庆岭活鱼，最适合冬天品尝。',
        culture: '这里还珍藏着1976年降落的世界最大石陨石——“吉林一号陨石”，吸引着无数热爱天文的小朋友。'
      },
      {
        name: '延边朝鲜族自治州',
        badge: '长白林海',
        sceneryName: '长白山天池与民俗园',
        sceneryEmoji: '🏔️',
        foodName: '延吉冷面与打糕/石锅拌饭',
        foodEmoji: '🍜',
        cultureName: '朝鲜族长鼓舞与长白山生态文化',
        theme: 'mountain',
        location: '延边位于吉林省东部，地处长白山脉北麓，森林茂密，生态优美，是东北虎和东北豹的家园。',
        scenery: '长白山主峰山顶有一座湛蓝如宝石的火山口湖——长白山天池，湖水清澈见底，四周十六座山峰环绕，美得令人惊叹！',
        food: '酸甜冰爽的延吉荞麦大冷面、软糯Q弹的糯米打糕，还有热乎乎的石锅拌饭。',
        culture: '朝鲜族人民能歌善舞，象帽舞彩带飞舞，荡秋千、跳板和长鼓舞充满了欢快喜庆的民族风情。'
      }
    ]
  },
  {
    adcode: '230000',
    name: '黑龙江省',
    shortName: '黑',
    capital: '哈尔滨市',
    region: '东北',
    icon: '⛄',
    slogan: '祖国最北最东端，冰雪童话大粮仓！',
    overview: '黑龙江省位于祖国版图的最北端和最东端，像是雄鸡高昂的冠冕。这里有神奇的北极光、肥沃的黑土地和举世闻名的哈尔滨冰雪大世界！',
    cities: [
      {
        name: '哈尔滨市',
        badge: '黑龙江省会·冰城',
        sceneryName: '哈尔滨冰雪大世界与太阳岛',
        sceneryEmoji: '⛄',
        foodName: '马迭尔冰棍与红肠/小鸡炖蘑菇',
        foodEmoji: '🍦',
        cultureName: '世界级冰雕艺术与音乐之城',
        theme: 'snow',
        location: '哈尔滨市位于黑龙江省西南部，松花江蜿蜒流过，冬季漫长而银装素裹，夏季凉爽宜人。',
        scenery: '冬天的哈尔滨冰雪大世界就像一座晶莹剔透的水晶童话城堡，有几百米长的超级冰滑梯！还有百年老街中央大街和美丽的太阳岛。',
        food: '奶香浓郁的马迭尔冰棍、蒜香四溢的哈尔滨红肠，还有东北名菜小鸡炖榛蘑、铁锅炖鱼。',
        culture: '哈尔滨被联合国授予“音乐之城”称号，每年冬天的国际冰雪节将采冰、雕冰技艺化作惊艳世界的艺术。'
      },
      {
        name: '齐齐哈尔市',
        badge: '丹顶鹤之乡',
        sceneryName: '扎龙国家级自然保护区',
        sceneryEmoji: '🦩',
        foodName: '齐齐哈尔烤肉与北大仓面食',
        foodEmoji: '🥩',
        cultureName: '湿地生态保护与仙鹤文化',
        theme: 'water',
        location: '齐齐哈尔市位于黑龙江省西部、嫩江中游平原，水草丰美，湿地广阔。',
        scenery: '扎龙自然保护区是世界最大的芦苇湿地之一，栖息着数百只头顶鲜红、姿态优雅的国家一级保护动物——丹顶鹤！',
        food: '被誉为“国际烤肉美食之都”，鲜嫩的牛肉拌上洋葱和紫苏籽，香气扑鼻。',
        culture: '人与丹顶鹤和谐共处的感人故事传遍大江南北，让小朋友懂得爱护湿地与野生鸟类的重要性。'
      },
      {
        name: '大兴安岭地区',
        badge: '神州北极',
        sceneryName: '漠河北极村与黑龙江第一湾',
        sceneryEmoji: '🌌',
        foodName: '大兴安岭蓝莓饮与炖江鱼',
        foodEmoji: '🫐',
        cultureName: '极昼极光天文奇观与林区生态',
        theme: 'snow',
        location: '大兴安岭地区位于中国最北端，其中的漠河市是中国纬度最高的城市，紧邻黑龙江畔。',
        scenery: '漠河北极村有“最北邮局”、“最北哨所”，每年夏至前后白昼特别长，幸运的时候还能在夜空中看到绚丽的北极光！',
        food: '野生蓝莓果干、黑木耳炖土鸡和鲜美的冷水哲罗鱼，都是大森林的馈赠。',
        culture: '在这里找北、寄出来自祖国最北端的明信片，能让小朋友直观感受中国南北跨越近50度纬度的辽阔幅员。'
      }
    ]
  },
  {
    adcode: '310000',
    name: '上海市',
    shortName: '沪',
    capital: '黄浦区',
    region: '华东',
    icon: '🗼',
    slogan: '黄浦江水奔入海，东方明珠放光彩！',
    overview: '上海市位于长江入海口，东临东海，黄浦江与苏州河在城中交汇，是一座充满科技感与江南海派韵味的国际化大都市！',
    cities: [
      {
        name: '黄浦区',
        badge: '海派之心',
        sceneryName: '外滩万国建筑群与豫园',
        sceneryEmoji: '🏛️',
        foodName: '南翔小笼包与排骨年糕',
        foodEmoji: '🥟',
        cultureName: '江南古典园林与海派都市文化',
        theme: 'modern',
        location: '黄浦区位于上海市中心，濒临黄浦江西岸，是上海历史最悠久、商业最繁华的核心城区。',
        scenery: '外滩长廊可以饱览浦江两岸风光；豫园则是已有四百多年历史的明代江南园林，九曲桥和湖心亭精致典雅。',
        food: '豫园的南翔小笼包皮薄汁多，轻轻咬开一个小口先喝汤，鲜美极了！还有梨膏糖、生煎包和排骨年糕。',
        culture: '海纳百川的海派文化将传统江南丝竹、剪纸花灯与现代都市文明巧妙融合。'
      },
      {
        name: '浦东新区',
        badge: '科创与童话高地',
        sceneryName: '东方明珠广播电视塔与上海迪士尼',
        sceneryEmoji: '🗼',
        foodName: '高桥松饼与本帮红烧肉',
        foodEmoji: '🍰',
        cultureName: '现代摩天建筑奇迹与天文科普',
        theme: 'modern',
        location: '浦东新区位于黄浦江以东、长江口西南，三面环水，地势平坦。',
        scenery: '大珠小珠落玉盘的“东方明珠塔”、高耸入云的上海中心大厦，还有全球最大的天文馆——上海天文馆和梦幻的迪士尼乐园！',
        food: '酥皮层层叠叠的高桥松饼、色泽红亮甜咸适中的本帮红烧肉，以及甜糯的南汇水蜜桃。',
        culture: '从阡陌农田到摩天大楼林立的陆家嘴，浦东展现了中国现代科技与城市建设的飞速发展。'
      },
      {
        name: '崇明区',
        badge: '长江门户生态岛',
        sceneryName: '东滩候鸟湿地与西沙明珠湖',
        sceneryEmoji: '🦢',
        foodName: '崇明糕与清水大闸蟹',
        foodEmoji: '🦀',
        cultureName: '沙洲冲积地理奇观与生态农业',
        theme: 'water',
        location: '崇明区位于万里长江入海口，三面环江、一面临海，是中国第三大岛，也是世界上最大的河口冲积岛！',
        scenery: '东滩湿地水草丰美，每年有上百万只候鸟在此迁徙栖息；东平国家森林公园水杉参天，空气清新。',
        food: '松软香甜、嵌满红枣核桃的崇明糕，还有金爪黄毛的崇明清水蟹和崇明金瓜丝。',
        culture: '崇明岛是由长江携带的泥沙历经一千多年冲积而成的，是学习“河流冲积平原与沙洲地貌”最生动的天然课堂！'
      }
    ]
  },
  {
    adcode: '320000',
    name: '江苏省',
    shortName: '苏',
    capital: '南京市',
    region: '华东',
    icon: '🛶',
    slogan: '长江太湖鱼米乡，古典园林美名扬！',
    overview: '江苏省位于长江三角洲，长江横穿东西，京杭大运河纵贯南北，平原辽阔、河湖密布，自古就是富饶美丽的“鱼米之乡”！',
    cities: [
      {
        name: '南京市',
        badge: '江苏省会·六朝古都',
        sceneryName: '夫子庙秦淮河与中山陵',
        sceneryEmoji: '🏮',
        foodName: '南京盐水鸭与鸭血粉丝汤',
        foodEmoji: '🦆',
        cultureName: '世界文学之都与云锦非遗技艺',
        theme: 'palace',
        location: '南京市位于江苏省西南部、长江下游，钟山龙蟠、石城虎踞，山水城林融为一体。',
        scenery: '十里秦淮河画舫凌波，夫子庙灯火辉煌；紫金山绿树成荫，南京明城墙更是世界上最长、保存最完好的古代城垣！',
        food: '皮白肉嫩、咸香可口的南京盐水鸭（桂花鸭），再配上一碗热气腾腾的鸭血粉丝汤和糖芋苗，美味无穷。',
        culture: '南京是“六朝古都、十朝都会”，也是中国首个获评联合国“世界文学之都”的城市，南京云锦更是灿若云霞。'
      },
      {
        name: '苏州市',
        badge: '园林之城',
        sceneryName: '拙政园与周庄江南水乡',
        sceneryEmoji: '🛶',
        foodName: '松鼠桂鱼与苏式汤面',
        foodEmoji: '🐟',
        cultureName: '古典园林造园艺术与苏绣昆曲',
        theme: 'water',
        location: '苏州市位于江苏省东南部，西抱太湖，北依长江，城内河道纵横、小桥流水，被称为“东方水城”。',
        scenery: '“江南园林甲天下，苏州园林甲江南”，拙政园、留园一步一景，把山水浓缩在庭院之中；还有寒山寺和周庄、同里水乡古镇。',
        food: '造型逼真、外脆里嫩、酸甜适口的松鼠桂鱼（松鼠鳜鱼），还有精细考究的苏式细面和碧螺春茶糕点。',
        culture: '细腻传神的四大名绣之首“苏绣”、百戏之祖“昆曲”以及评弹，尽显江南水乡的温婉与匠心。'
      },
      {
        name: '扬州市',
        badge: '运河明珠',
        sceneryName: '瘦西湖五亭桥与大运河博物馆',
        sceneryEmoji: '🌉',
        foodName: '扬州炒饭与蟹粉狮子头',
        foodEmoji: '🍚',
        cultureName: '世界遗产大运河文化与唐诗名城',
        theme: 'water',
        location: '扬州市位于江苏省中部，地处长江与京杭大运河交汇处，风光秀美。',
        scenery: '“烟花三月下扬州”，瘦西湖湖面瘦长清秀，二十四桥和五亭桥亭台倒影如画；中国大运河博物馆更是互动感满满的科普宝库！',
        food: '粒粒分明、色彩丰富的扬州炒饭，入口即化的清炖蟹粉狮子头，还有精致的扬州早茶三丁包。',
        culture: '李白曾写下“故人西辞黄鹤楼，烟花三月下扬州”，扬州见证了千年大运河的繁华与雕版印刷非遗技艺。'
      }
    ]
  },
  {
    adcode: '330000',
    name: '浙江省',
    shortName: '浙',
    capital: '杭州市',
    region: '华东',
    icon: '🪷',
    slogan: '钱塘潮涌西湖美，诗画浙江山海秀！',
    overview: '浙江省地处东南沿海，因境内最大的河流钱塘江（古称浙江）曲折蜿蜒而得名。这里既有淡妆浓抹总相宜的西湖，又有星罗棋布的东海舟山群岛！',
    cities: [
      {
        name: '杭州市',
        badge: '浙江省会·人间天堂',
        sceneryName: '西湖风景名胜区与良渚古城遗址',
        sceneryEmoji: '🪷',
        foodName: '西湖醋鱼与龙井虾仁/定胜糕',
        foodEmoji: '🍤',
        cultureName: '五千年良渚文明与西湖诗词传说',
        theme: 'water',
        location: '杭州市位于浙江省西北部，钱塘江下游，京杭大运河南端，三面云山一面城。',
        scenery: '西湖三潭印月、苏堤春晓、断桥残雪四季皆美，接天莲叶无穷碧！还有见证中华五千年文明史的世界遗产——良渚古城遗址。',
        food: '用清香西湖龙井嫩芽烹制的龙井虾仁、软糯香甜的荷花酥与定胜糕，以及鲜美的片儿川。',
        culture: '苏东坡疏浚西湖修筑苏堤的故事流传千年，杭州既承载着江南诗词韵味，又是充满活力的数字科技之城。'
      },
      {
        name: '嘉兴市',
        badge: '江南水乡古镇之都',
        sceneryName: '乌镇与西塘水乡古镇/海宁观潮',
        sceneryEmoji: '🌊',
        foodName: '嘉兴五芳斋肉粽与南湖菱角',
        foodEmoji: '粽',
        cultureName: '钱塘江大潮奇观与水乡互联网大会',
        theme: 'water',
        location: '嘉兴市位于浙江省东北部、杭嘉湖平原腹地，南濒钱塘江口，河网密布。',
        scenery: '每年农历八月十八，海宁盐官的钱塘江大潮如万马奔腾，气吞山河！乌镇和西塘古镇则是白墙黛瓦、摇橹船轻轻划过的江南水乡。',
        food: '软糯油润、香气扑鼻的嘉兴大肉粽享誉全国，还有没有四角尖刺、圆润甜脆的南湖无角菱。',
        culture: '古老的乌镇如今也是世界互联网大会的永久举办地，传统水乡与未来科技在此奇妙碰撞。'
      },
      {
        name: '宁波市',
        badge: '东海书藏古今港城',
        sceneryName: '天一阁藏书楼与东钱湖',
        sceneryEmoji: '📚',
        foodName: '宁波黑芝麻汤圆与雪菜大黄鱼',
        foodEmoji: '🥣',
        cultureName: '亚洲最古老藏书楼与海上丝绸之路',
        theme: 'coastal',
        location: '宁波市位于浙江省东部沿海，东有舟山群岛作为天然屏障，拥有世界货物吞吐量第一的宁波舟山港。',
        scenery: '天一阁是中国现存最早的私家藏书楼，已有450多年历史，绿树修竹环绕；东钱湖烟波浩渺，风光旖旎。',
        food: '用猪油、黑芝麻和水磨糯米粉做成的宁波汤圆，香甜软糯；还有鲜嫩无比的雪菜大汤黄鱼和年糕。',
        culture: '“书藏古今，港通天下”，天一阁传递着中华民族爱书护书、崇尚知识的优良传统。'
      }
    ]
  },
  {
    adcode: '340000',
    name: '安徽省',
    shortName: '皖',
    capital: '合肥市',
    region: '华东',
    icon: '⛰️',
    slogan: '黄山奇松迎客来，文房四宝传千载！',
    overview: '安徽省跨长江、淮河两大水系，既有“五岳归来不看山，黄山归来不看岳”的奇绝山水，又是宣纸、徽墨、歙砚、宣笔“文房四宝”的故乡！',
    cities: [
      {
        name: '合肥市',
        badge: '安徽省会·科教名城',
        sceneryName: '八百里巢湖与包公园',
        sceneryEmoji: '🌊',
        foodName: '三河米饺与肥西老母鸡汤',
        foodEmoji: '🥟',
        cultureName: '包公清廉故事与现代量子科学岛',
        theme: 'modern',
        location: '合肥市位于安徽省中部，地处江淮之间，环抱五大淡水湖之一的巢湖，因东淝河与南淝河在此汇合而得名。',
        scenery: '八百里巢湖碧波万顷，姥山岛矗立湖心；包公园绿树掩映，还有充满未来科技感的安徽创新馆和科学岛。',
        food: '外皮金黄酥脆的三河米饺、鲜美醇厚的肥西老母鸡汤，以及四大名点麻饼、烘糕、寸金、白切。',
        culture: '合肥既是铁面无私的宋代名臣包拯故里，又是拥有“人造太阳”等大科学装置的现代科学之城。'
      },
      {
        name: '黄山市',
        badge: '天下第一奇山',
        sceneryName: '黄山迎客松与宏村徽派古村落',
        sceneryEmoji: '🌲',
        foodName: '黄山烧饼与徽州毛豆腐/臭鳜鱼',
        foodEmoji: '🥮',
        cultureName: '徽派马头墙建筑与徽墨歙砚非遗',
        theme: 'mountain',
        location: '黄山市位于安徽省最南端，群山连绵，溪流清澈，森林覆盖率极高。',
        scenery: '黄山以“奇松、怪石、云海、温泉、冬雪”五绝闻名世界，好客的迎客松在悬崖上张开双臂欢迎大家！山脚下的宏村、西递粉墙黛瓦倒映水中，宛如水墨画。',
        food: '层层酥脆的黄山梅干菜烧饼、闻着微臭吃着蒜瓣肉般鲜香的徽州臭鳜鱼，以及长满白色绒毛的美味毛豆腐。',
        culture: '徽派建筑的白墙、青瓦、马头墙独树一帜，徽墨与歙砚更是书画艺术不可或缺的国宝。'
      },
      {
        name: '宣城市',
        badge: '中国文房四宝之城',
        sceneryName: '敬亭山与桃花潭风景区',
        sceneryEmoji: '🖌️',
        foodName: '绩溪一品锅与宁国粑粑',
        foodEmoji: '🍲',
        cultureName: '千年宣纸制作技艺与李白诗踪',
        theme: 'water',
        location: '宣城市位于安徽省东南部，南倚黄山、天目山，北临长江平原，山水清幽。',
        scenery: '李白写下“相看两不厌，只有敬亭山”的敬亭山，以及“桃花潭水深千尺，不及汪伦送我情”的泾县桃花潭都在这里！',
        food: '层层铺满蛋饺、豆腐包、笋干的绩溪胡适一品锅，还有香软可口的宣城水东蜜枣。',
        culture: '泾县宣纸享有“纸寿千年，墨韵万变”的美誉，一百多道手工工序被列入人类非物质文化遗产。'
      }
    ]
  },
  {
    adcode: '350000',
    name: '福建省',
    shortName: '闽',
    capital: '福州市',
    region: '华东',
    icon: '🏝️',
    slogan: '武夷山水茶飘香，鼓浪屿对宝岛望！',
    overview: '福建省位于中国东南沿海，与台湾省隔台湾海峡相望。“八山一水一分田”让这里森林覆盖率居全国第一，土楼与海岛风光奇妙迷人！',
    cities: [
      {
        name: '福州市',
        badge: '福建省会·有福之州',
        sceneryName: '三坊七巷古街区与鼓山',
        sceneryEmoji: '🏮',
        foodName: '福州鱼丸与佛跳墙/肉燕',
        foodEmoji: '🥣',
        cultureName: '古厝建筑文化与船政海洋精神',
        theme: 'palace',
        location: '福州市位于福建省东部、闽江下游及入海口，盆地四周群山环抱，城内古榕树参天，又称“榕城”。',
        scenery: '三坊七巷保存着大片明清古建筑，被称为“里坊制度活化石”，林则徐、冰心等许多历史名人都曾住在这里；平潭岛更有梦幻的海岸风车。',
        food: 'Q弹爆汁的福州鲨鱼丸、把瘦肉捶打成薄如纸张的燕皮包成的同利肉燕，以及闽菜之王“佛跳墙”。',
        culture: '马尾船政学堂是中国近代海军与造船工业的摇篮，福州脱胎漆器与油纸伞更是精美的“榕城三绝”。'
      },
      {
        name: '厦门市',
        badge: '海上花园琴岛',
        sceneryName: '鼓浪屿与环岛路海滨',
        sceneryEmoji: '🎹',
        foodName: '厦门沙茶面与花生汤/海蛎煎',
        foodEmoji: '🍜',
        cultureName: '世界遗产鼓浪屿音乐文化与闽南风情',
        theme: 'coastal',
        location: '厦门市位于福建省东南沿海，由厦门本岛、鼓浪屿及内陆部分组成，隔海与金门相望，四季繁花似锦。',
        scenery: '小巧美丽的鼓浪屿没有汽车喧嚣，随处可听悠扬的钢琴声，岛上有高耸的日光岩和郑成功雕像；厦门大学依山傍海，风景如画。',
        food: '汤头浓郁鲜香的厦门沙茶面、外酥里嫩的海蛎煎（蚵仔煎），还有香甜绵密的花生汤。',
        culture: '鼓浪屿被誉为“钢琴之岛”，中西合璧的八卦楼与闽南红砖古厝共同诉说着海洋交流的历史。'
      },
      {
        name: '南平市',
        badge: '双世遗山水茶乡',
        sceneryName: '武夷山九曲溪与天游峰',
        sceneryEmoji: '🎋',
        foodName: '武夷熏鹅与光饼/大红袍茶糕',
        foodEmoji: '🍵',
        cultureName: '世界文化与自然双重遗产及乌龙茶道',
        theme: 'mountain',
        location: '南平市位于福建省北部、闽江源头，武夷山脉北段，是福建面积最大的设区市。',
        scenery: '武夷山拥有典型的丹霞地貌，乘坐竹筏顺着清澈的九曲溪漂流而下，抬头可见奇峰怪石与玉女峰，美不胜收！',
        food: '茶香浓郁的武夷岩茶（大红袍）、紫溪粉和焦香酥脆的建瓯光饼。',
        culture: '武夷山是世界文化与自然双重遗产，不仅是朱熹讲学之地，更是世界乌龙茶和红茶的发源地。'
      },
      {
        name: '龙岩市',
        badge: '神奇客家土楼',
        sceneryName: '永定福建土楼群（承启楼）',
        sceneryEmoji: '⭕',
        foodName: '客家酿豆腐与盐焗鸡',
        foodEmoji: '🍲',
        cultureName: '客家聚族而居土楼建筑智慧',
        theme: 'palace',
        location: '龙岩市位于福建省西部，地处闽粤赣三省交界山区，山林葱郁。',
        scenery: '永定客家土楼造型像一个个巨大的圆形飞碟或大蘑菇，最大的“土楼王”承启楼一圈套一圈共有四环，几百间房子围在一起，冬暖夏凉！',
        food: '鲜嫩多汁的客家酿豆腐、清甜的牛肉丸和花生脆糖，充满浓郁客家风味。',
        culture: '土楼就地取材用生土夯筑而成，历经数百年风雨依然坚固，体现了客家人团结友爱、互帮互助的大家庭文化。'
      }
    ]
  },
  {
    adcode: '360000',
    name: '江西省',
    shortName: '赣',
    capital: '南昌市',
    region: '华东',
    icon: '🏺',
    slogan: '庐山瀑布挂前川，景德镇瓷美天下！',
    overview: '江西省位于长江中下游南岸，因省内最大河流赣江而简称“赣”。这里有中国第一大淡水湖鄱阳湖、云雾缭绕的庐山和千年瓷都景德镇！',
    cities: [
      {
        name: '南昌市',
        badge: '江西省会·英雄城',
        sceneryName: '滕王阁与鄱阳湖候鸟保护区',
        sceneryEmoji: '🏯',
        foodName: '南昌拌粉与瓦罐汤',
        foodEmoji: '🍜',
        cultureName: '初唐名篇《滕王阁序》与红色摇篮',
        theme: 'palace',
        location: '南昌市位于江西省中部偏北，赣江穿城而过，东北濒临中国第一大淡水湖——鄱阳湖。',
        scenery: '屹立在赣江畔的江南三大名楼之一“滕王阁”，飞檐斗拱气势非凡，登楼可看“落霞与孤鹜齐飞，秋水共长天一色”！',
        food: '南昌人早晨最爱来一碗爽滑筋道的南昌拌粉，再配上一小盅文火慢煨的莲藕排骨瓦罐汤！',
        culture: '少年才子王勃在滕王阁写下千古名篇，南昌更是著名的“英雄城”，兼具书香底蕴与红色荣光。'
      },
      {
        name: '景德镇市',
        badge: '世界瓷都',
        sceneryName: '景德镇中国陶瓷博物馆与古窑民俗区',
        sceneryEmoji: '🏺',
        foodName: '景德镇冷粉与碱水粑/饺子粑',
        foodEmoji: '🥟',
        cultureName: '千年制瓷匠心与青花瓷国宝艺术',
        theme: 'modern',
        location: '景德镇市位于江西省东北部，昌江穿流而过，四周青山盛产优质高岭土。',
        scenery: '在中国陶瓷博物馆和古窑博览区，可以看到宋元明清各朝代的精美瓷器，还能亲手体验拉坯、画青花瓷的乐趣！',
        food: '粗润爽滑、拌着橘皮末的景德镇冷粉，还有用薄面皮包着萝卜丝或韭菜豆腐蒸熟的饺子粑。',
        culture: '中国的英文名“China”就与景德镇瓷器息息相关，“白如玉、明如镜、薄如纸、声如磬”的景德镇瓷器惊艳了全世界！'
      },
      {
        name: '九江市',
        badge: '江西北大门',
        sceneryName: '庐山风景名胜区与三叠泉瀑布',
        sceneryEmoji: '🏞️',
        foodName: '九江茶饼与庐山石鸡炖石耳',
        foodEmoji: '🥮',
        cultureName: '千古山水诗山与白鹿洞书院文化',
        theme: 'mountain',
        location: '九江市位于江西省最北端，北濒万里长江，东依浩瀚鄱阳湖，南靠雄奇庐山，是山水交汇的绝佳之地。',
        scenery: '李白笔下“飞流直下三千尺，疑是银河落九天”和苏轼笔下“不识庐山真面目，只缘身在此山中”写的都是九江庐山！',
        food: '小巧酥香、带有桂花与茶油清香的九江茶饼，曾被苏东坡赋诗称赞；还有鲜美的鄱阳湖银鱼羹。',
        culture: '庐山脚下的白鹿洞书院是中国四大书院之首，历经千年书声琅琅，传承着尊师重教的文化传统。'
      }
    ]
  },
  {
    adcode: '370000',
    name: '山东省',
    shortName: '鲁',
    capital: '济南市',
    region: '华东',
    icon: '⛰️',
    slogan: '五岳独尊泰山高，泉城海滨齐鲁娇！',
    overview: '山东省位于黄河下游，太行山以东，东临渤海和黄海。这里是孔子故里“齐鲁大地”，有五岳之首泰山、天下第一泉趵突泉和美丽的海滨青岛！',
    cities: [
      {
        name: '济南市',
        badge: '山东省会·泉城',
        sceneryName: '趵突泉与大明湖/千佛山',
        sceneryEmoji: '⛲',
        foodName: '九转大肠与糖醋黄河鲤鱼/把子肉',
        foodEmoji: '🐟',
        cultureName: '七十二名泉地理奇观与李清照辛弃疾诗词',
        theme: 'water',
        location: '济南市位于山东省中部，南依泰山山脉，北跨黄河，南部山区的地下水顺着岩层汇聚到市区喷涌而出，形成无数清泉。',
        scenery: '“天下第一泉”趵突泉三股清泉日夜咕嘟咕嘟向上喷涌，清澈见底；大明湖四面荷花三面柳，一城山色半城湖！',
        food: '翘着尾巴、外脆里嫩的糖醋黄河鲤鱼，甜咸醇厚的九转大肠，还有酥脆的油旋和甜沫。',
        culture: '济南是宋代大词人李清照和辛弃疾的故乡，“济南二安”让这座泉水之城流淌着满满的诗词气息。'
      },
      {
        name: '青岛市',
        badge: '帆船之都',
        sceneryName: '栈桥回澜阁与崂山/五四广场',
        sceneryEmoji: '⛵',
        foodName: '鲅鱼水饺与青岛海鲜锅贴',
        foodEmoji: '🥟',
        cultureName: '海洋科考名城与奥帆运动精神',
        theme: 'coastal',
        location: '青岛市位于山东半岛东南部沿海，濒临黄海，环抱胶州湾，山海城相依，红瓦绿树、碧海蓝天。',
        scenery: '伸入海湾的百年栈桥海鸥环绕，五四广场上火红的“五月的风”雕塑迎风矗立；海上第一名山崂山云海浩渺。',
        food: '个头大如巴掌、鲜嫩多汁的青岛鲅鱼水饺，还有现蒸的海星、扇贝和酥脆的海鲜锅贴。',
        culture: '青岛聚集了中国顶尖的海洋大学与“蛟龙号”深海科考基地，是探索蓝色海洋科学的先锋城市！'
      },
      {
        name: '泰安市',
        badge: '五岳独尊',
        sceneryName: '泰山十八盘与玉皇顶日出',
        sceneryEmoji: '🌅',
        foodName: '泰山煎饼卷大葱与泰山三美豆腐汤',
        foodEmoji: '🥞',
        cultureName: '世界首例文化与自然双遗产及国泰民安祈福',
        theme: 'mountain',
        location: '泰安市位于山东省中部，因境内雄伟的泰山而得名，寓意“国泰民安”。',
        scenery: '泰山是“五岳之首”，沿着陡峭的十八盘石阶拾级而上，登上南天门和玉皇顶，看一轮红日从云海中喷薄而出，真正体会杜甫“会当凌绝顶，一览众山小”的豪情！',
        food: '用小米玉米杂粮摊成、薄如蝉翼的山东泰山煎饼，还有用白菜、豆腐和泰山泉水炖出的“泰山三美汤”。',
        culture: '泰山是世界第一个文化与自然双重遗产，满山摩崖石刻记录着中华几千年的历史书法瑰宝。'
      },
      {
        name: '济宁市',
        badge: '孔孟之乡·运河之都',
        sceneryName: '曲阜三孔（孔庙、孔府、孔林）与微山湖',
        sceneryEmoji: '📜',
        foodName: '孔府糕点与甏肉干饭',
        foodEmoji: '🍱',
        cultureName: '儒家礼乐文化与尊师好学传统',
        theme: 'palace',
        location: '济宁市位于山东省西南部，京杭大运河穿城而过，南有烟波浩渺的微山湖。',
        scenery: '曲阜“三孔”是纪念我国古代伟大思想家、教育家孔子的古建筑群，古柏参天，大成殿金碧辉煌；微山湖上万亩荷花盛开。',
        food: '精致讲究的孔府诗礼银杏、孔府糕点，以及肥而不腻、汤汁浓郁的济宁甏（bèng）肉干饭。',
        culture: '“三人行，必有我师焉”、“温故而知新”，孔子提出的教育智慧启发了一代又一代中华学子。'
      }
    ]
  },
  {
    adcode: '410000',
    name: '河南省',
    shortName: '豫',
    capital: '郑州市',
    region: '华中',
    icon: '🥋',
    slogan: '黄河奔流中原地，少林甲骨古都奇！',
    overview: '河南省位于中国中东部、黄河中下游，因为大部分土地在古九州的“豫州”且在黄河之南而得名。这里有洛阳、开封、安阳、郑州四大古都，是华夏文明的重要发祥地！',
    cities: [
      {
        name: '郑州市',
        badge: '河南省会·天地之中',
        sceneryName: '嵩山少林寺与河南博物院',
        sceneryEmoji: '🥋',
        foodName: '郑州烩面与胡辣汤',
        foodEmoji: '🍜',
        cultureName: '中华武术少林功夫与黄帝故里文化',
        theme: 'palace',
        location: '郑州市位于河南省中部偏北，北临万里黄河，西依中岳嵩山，是全国铁路米字形交汇的心脏枢纽。',
        scenery: '中岳嵩山脚下的少林寺古树参天，武僧们练功矫健有力；河南博物院里珍藏着贾湖骨笛、妇好鸮尊等国宝文物！',
        food: '宽宽的面片在浓白羊汤里翻滚的郑州羊肉烩面，还有早晨配油饼吃、香辣暖胃的逍遥镇胡辣汤。',
        culture: '嵩山“天地之中”历史建筑群包含中国最古老的登封观星台，见证了古代天文学家测日影定节气的科学智慧。'
      },
      {
        name: '洛阳市',
        badge: '十三朝古都·牡丹花城',
        sceneryName: '龙门石窟与白马寺/老君山',
        sceneryEmoji: '🌺',
        foodName: '洛阳水席与牡丹燕菜',
        foodEmoji: '🍲',
        cultureName: '盛唐丝路古都与国色天香牡丹文化',
        theme: 'palace',
        location: '洛阳市位于河南省西部，横跨黄河中游两岸，因地处洛河之北（水北为阳）而得名“洛阳”。',
        scenery: '世界遗产龙门石窟沿伊河两岸山崖开凿，卢舍那大佛面容慈祥端庄；每年四月牡丹花会期间，全城牡丹竞相盛开，国色天香！',
        food: '一道接一道如行云流水般上菜的“洛阳水席”，把萝卜丝切得细如燕窝、摆成牡丹花朵的“牡丹燕菜”堪称一绝。',
        culture: '洛阳曾是十三个朝代的都城，隋唐大运河以洛阳为中心，展现了“若问古今兴废事，请君只看洛阳城”的厚重历史。'
      },
      {
        name: '开封市',
        badge: '八朝古都·汴京',
        sceneryName: '清明上河园与开封铁塔',
        sceneryEmoji: '🏮',
        foodName: '开封灌汤包与鲤鱼焙面/花生糕',
        foodEmoji: '🥟',
        cultureName: '《清明上河图》宋代文化与汴绣艺术',
        theme: 'water',
        location: '开封市位于河南省东部、豫东平原腹地，北依黄河，城内湖泊众多，享有“北方水城”的美誉。',
        scenery: '清明上河园按照北宋画家张择端的《清明上河图》1:1复原，走进去就像穿越回了热闹的宋朝汴京城，有虹桥、杂技和民俗表演！',
        food: '“轻轻提、慢慢移、先开窗、后喝汤”的开封第一楼小笼灌汤包，还有细如发丝的龙须焙面盖在糖醋鲤鱼上。',
        culture: '北宋时期的开封（东京汴梁）是当时世界上最繁华的城市之一，活字印刷术、指南针都在这一时期蓬勃发展。'
      },
      {
        name: '安阳市',
        badge: '文字之都',
        sceneryName: '殷墟博物馆与红旗渠',
        sceneryEmoji: '🐢',
        foodName: '安阳扁粉菜与道口烧鸡',
        foodEmoji: '🍗',
        cultureName: '汉字源头甲骨文与红旗渠奋斗精神',
        theme: 'palace',
        location: '安阳市位于河南省最北端，西依太行山，东接华北平原，洹水穿流而过。',
        scenery: '世界文化遗产“安阳殷墟”出土了十五万片刻在龟甲和兽骨上的甲骨文，还有重达832.84公斤的青铜器之王“后母戊鼎”！太行山绝壁上的“人工天河”红旗渠更是气势磅礴。',
        food: '滑嫩入味的道口烧鸡、热气腾腾的安阳扁粉菜和三不沾（不沾盘、不沾勺、不沾牙）。',
        culture: '一片甲骨惊天下！甲骨文是我们今天使用的汉字的直接祖先，安阳中国文字博物馆是认识汉字演变最好的课堂。'
      }
    ]
  },
  {
    adcode: '420000',
    name: '湖北省',
    shortName: '鄂',
    capital: '武汉市',
    region: '华中',
    icon: '🦢',
    slogan: '黄鹤楼上看长江，千湖之省三峡长！',
    overview: '湖北省位于长江中游、洞庭湖以北，故名“湖北”。这里江河纵横、湖泊上千，被称为“千湖之省”，既有千古名楼黄鹤楼，又有举世瞩目的三峡大坝！',
    cities: [
      {
        name: '武汉市',
        badge: '湖北省会·九省通衢',
        sceneryName: '黄鹤楼与东湖生态风景区/长江大桥',
        sceneryEmoji: '🏯',
        foodName: '武汉热干面与三鲜豆皮/武昌鱼',
        foodEmoji: '🍜',
        cultureName: '曾侯乙编钟礼乐国宝与知音文化',
        theme: 'water',
        location: '武汉市位于湖北省东部、长江与最大支流汉江交汇处，形成武昌、汉口、汉阳三镇鼎立的壮丽格局。',
        scenery: '屹立在蛇山之巅的“天下江山第一楼”黄鹤楼，让崔颢和李白留下千古名句；万里长江第一桥——武汉长江大桥飞架南北；湖北省博物馆里还有能演奏音乐的2400年前曾侯乙编钟！',
        food: '武汉人把吃早餐叫“过早”！淋上浓郁芝麻酱的热干面、金黄酥脆的三鲜豆皮、排骨莲藕汤和清蒸武昌鱼让人百吃不厌。',
        culture: '汉阳古琴台流传着伯牙与钟子期“高山流水遇知音”的千古佳话，曾侯乙编钟更是展现了中国古代高超的青铜铸造与音乐声学成就。'
      },
      {
        name: '宜昌市',
        badge: '世界水电之都',
        sceneryName: '三峡大坝与三峡人家风景区',
        sceneryEmoji: '🌊',
        foodName: '宜昌凉虾与长江肥鱼火锅',
        foodEmoji: '🍧',
        cultureName: '大国水利工程奇迹与屈原故里文化',
        theme: 'water',
        location: '宜昌市位于湖北省西南部，地处长江上游与中游的分界点、西陵峡出口处，素有“三峡门户”之称。',
        scenery: '宏伟的三峡大坝是当今世界最大的水利水电工程，既有五级船闸让万吨巨轮“坐电梯”翻坝，还有壮观的升船机！西陵峡两岸青山夹江，风景绝美。',
        food: '用大米制成的甜品“宜昌凉虾”形状像小虾米，泡在红糖冰水里清甜爽滑；还有酥脆的萝卜饺子。',
        culture: '宜昌秭归是伟大爱国诗人屈原的故里，端午节赛龙舟、包粽子纪念屈原的习俗在这里尤为隆重。'
      },
      {
        name: '十堰市',
        badge: '仙山秀水汽车城',
        sceneryName: '武当山金顶与丹江口水库',
        sceneryEmoji: '⛰️',
        foodName: '丹江口翘嘴鲌与武当素斋',
        foodEmoji: '🐟',
        cultureName: '武当太极文化与南水北调水源地奉献',
        theme: 'mountain',
        location: '十堰市位于湖北省西北部，秦巴山区腹地，汉江自西向东穿境而过。',
        scenery: '世界文化遗产武当山七十二峰朝大顶，天柱峰上的太和宫金顶由铜铸鎏金而成；丹江口水库一碧万顷，是“南水北调”中线工程的源头大水缸！',
        food: '肉质洁白细嫩的丹江口水库大鱼、三合汤和清淡健康的武当道家素斋。',
        culture: '北京、天津、河北、河南许多小朋友喝到的甘甜自来水，就是从十堰丹江口水库一路千里北上送达的，让我们懂得珍惜每一滴水！'
      }
    ]
  },
  {
    adcode: '430000',
    name: '湖南省',
    shortName: '湘',
    capital: '长沙市',
    region: '华中',
    icon: '🌶️',
    slogan: '洞庭波涌湘江北，张家界奇岳阳楼！',
    overview: '湖南省因大部分地区在洞庭湖以南而得名“湖南”，因最大河流湘江流贯全境而简称“湘”。这里有奇峰三千的张家界、千古名楼岳阳楼和书院文化浓厚的长沙！',
    cities: [
      {
        name: '长沙市',
        badge: '湖南省会·星城',
        sceneryName: '橘子洲头与岳麓山/岳麓书院',
        sceneryEmoji: '🍁',
        foodName: '长沙臭豆腐与糖油粑粑',
        foodEmoji: '🍢',
        cultureName: '千年学府岳麓书院与马王堆汉墓国宝',
        theme: 'palace',
        location: '长沙市位于湖南省东北部、湘江下游，湘江穿城而过，江心有狭长的橘子洲，“山水洲城”格局独一无二。',
        scenery: '橘子洲头百舸争流，岳麓山爱晚亭枫叶似火（杜牧“停车坐爱枫林晚，霜叶红于二月花”）；湖南博物院里珍藏着薄如蝉翼、仅重49克的马王堆素纱单衣！',
        food: '“闻起来臭、吃起来香”的黑色长沙火宫殿臭豆腐，还有圆滚滚、甜糯拉丝的糖油粑粑和口味虾。',
        culture: '岳麓书院是中国四大书院之一，历经千年弦歌不绝，湘绣更是中国四大名绣之一。'
      },
      {
        name: '张家界市',
        badge: '奇峰仙境',
        sceneryName: '武陵源天子山与天门山国家森林公园',
        sceneryEmoji: '⛰️',
        foodName: '土家三下锅与葛根粉/蒿子粑粑',
        foodEmoji: '🍲',
        cultureName: '世界自然遗产石英砂岩峰林与土家族歌舞',
        theme: 'mountain',
        location: '张家界市位于湖南省西北部，地处武陵山脉腹地，是中国第一个国家森林公园所在地。',
        scenery: '武陵源有着三千多座拔地而起的石英砂岩峰柱，云雾缭绕时就像漂浮在空中的仙山！天门山还有天然穿山溶洞“天门洞”和惊险的盘山公路。',
        food: '香辣浓郁的土家三下锅、清凉爽滑的野生葛根粉，以及清香软糯的蒿子粑粑。',
        culture: '这里是土家族、白族、苗族聚居地，欢快的土家族摆手舞和桑植民歌充满大山的热情。'
      },
      {
        name: '岳阳市',
        badge: '洞庭明珠',
        sceneryName: '岳阳楼与浩瀚八百里洞庭湖/君山岛',
        sceneryEmoji: '🏯',
        foodName: '洞庭银鱼蒸蛋与君山银针茶糕',
        foodEmoji: '🐟',
        cultureName: '《岳阳楼记》忧乐精神与江豚生态保护',
        theme: 'water',
        location: '岳阳市位于湖南省最北端，怀抱八百里洞庭湖，北依万里长江，是通江达海的江南名城。',
        scenery: '江南三大名楼之一的岳阳楼俯瞰洞庭湖，纯木结构不用一钉一铆，楼顶造型像古代将军的头盔！洞庭湖中还能看到微笑天使“长江江豚”。',
        food: '晶莹剔透、无骨无刺的洞庭湖银鱼炖蛋，还有巴陵全鱼席和清香的君山银针名茶。',
        culture: '范仲淹在《岳阳楼记》中写下“先天下之忧而忧，后天下之乐而乐”，激励着中华儿女胸怀天下。'
      },
      {
        name: '湘西土家族苗族自治州',
        badge: '诗意边城',
        sceneryName: '凤凰古城与矮寨特大悬索桥',
        sceneryEmoji: '🌉',
        foodName: '湘西腊肉与血粑鸭/米豆腐',
        foodEmoji: '🦆',
        cultureName: '苗族银饰蜡染非遗与吊脚楼建筑',
        theme: 'water',
        location: '湘西州位于湖南省西北部，武陵山脉纵贯全境，沱江、酉水清澈流淌。',
        scenery: '凤凰古城里清澈的沱江水穿城而过，两岸是古色古香的百年木质吊脚楼；横跨大峡谷云端之上的矮寨大桥更是世界桥梁工程奇迹！',
        food: '软糯入味的凤凰血粑鸭、果木熏制的湘西腊肉，还有酸甜脆爽的湘西泡菜和米豆腐。',
        culture: '苗族鼓舞、土家族织锦（西兰卡普）和精美的苗族手工银饰，展现了湘西多彩的民族艺术。'
      }
    ]
  },
  {
    adcode: '440000',
    name: '广东省',
    shortName: '粤',
    capital: '广州市',
    region: '华南',
    icon: '🦁',
    slogan: '珠江奔流南海宽，醒狮早茶港珠澳！',
    overview: '广东省位于中国大陆最南部，南临南海，珠江水系蜿蜒入海。这里四季常青、花果飘香，既有千年商都广州、科创之都深圳，又有连接三地的港珠澳大桥！',
    cities: [
      {
        name: '广州市',
        badge: '广东省会·花城羊城',
        sceneryName: '广州塔（小蛮腰）与陈家祠/白云山',
        sceneryEmoji: '🗼',
        foodName: '广式早茶水晶虾饺与双皮奶/肠粉',
        foodEmoji: '🥟',
        cultureName: '粤剧岭南建筑与广东醒狮非遗',
        theme: 'modern',
        location: '广州市位于广东省中南部、珠江三角洲北缘，珠江穿城而过，属南亚热带季风气候，四季鲜花盛开，故称“花城”。',
        scenery: '高耸秀丽的广州塔（小蛮腰）与珠江新城交相辉映；陈家祠屋脊上布满了栩栩如生的石湾陶塑，长隆野生动物世界里更有可爱的考拉和三胞胎大熊猫！',
        food: '“食在广州”，晶莹剔透的广式水晶虾饺、滑嫩爽口的布拉肠粉、叉烧包、艇仔粥和香滑双皮奶让人垂涎欲滴。',
        culture: '传说五位仙人骑着五只口衔稻穗的仙羊降临广州，因此广州又称“羊城”或“穗”；威武灵动的广东醒狮更是喜庆吉祥的象征。'
      },
      {
        name: '深圳市',
        badge: '科技创新之都·鹏城',
        sceneryName: '深圳湾公园与莲花山/世界之窗',
        sceneryEmoji: '🚀',
        foodName: '光明乳鸽与沙井生蚝/椰子鸡',
        foodEmoji: '🥥',
        cultureName: '拓荒牛改革精神与无人机机器人科技',
        theme: 'modern',
        location: '深圳市位于广东省南部沿海、珠江口东岸，南与香港特别行政区山水相连，大鹏湾与深圳湾环抱两侧。',
        scenery: '深圳湾红树林湿地里黑脸琵鹭展翅飞翔，莲花山顶可以俯瞰现代化摩天楼群，夜空中经常有上千架无人机组成绚丽的科技灯光秀！',
        food: '用清甜椰青水烹煮的海南文昌鸡（深圳特色椰子鸡）、皮脆肉嫩的光明红烧乳鸽和鲜美生蚝。',
        culture: '深圳在短短四十多年间从小渔村变成世界级科技创新中心，激励着小朋友敢想敢试、勇于探索科学！'
      },
      {
        name: '珠海市',
        badge: '百岛浪漫之城',
        sceneryName: '港珠澳大桥与珠海长隆海洋王国',
        sceneryEmoji: '🌉',
        foodName: '横琴蚝与斗门重壳蟹/海鲜肠粉',
        foodEmoji: '🦀',
        cultureName: '跨海大桥超级工程与海洋科普',
        theme: 'coastal',
        location: '珠海市位于广东省珠江口西岸，东与香港隔海相望，南与澳门陆地相连，拥有大小岛屿一百多个，被称为“百岛之市”。',
        scenery: '全长55公里的港珠澳大桥像一条巨龙横卧在伶仃洋海面上，桥岛隧一体堪称世界桥梁奇迹！还有浪漫的情侣路日月贝大剧院和海洋王国鲸鲨馆。',
        food: '肥美鲜甜的横琴生蚝、膏满肉实的斗门重壳蟹和唐家湾茶果。',
        culture: '珠海还是中国国际航空航天博览会（珠海航展）的举办地，国产大飞机C919和歼-20战机曾在此翱翔蓝天！'
      },
      {
        name: '潮州市',
        badge: '岭东首邑·千年古府',
        sceneryName: '广济桥（湘子桥）与潮州古城牌坊街',
        sceneryEmoji: '🌉',
        foodName: '潮汕手打牛肉丸与蚝烙/鸭母捻',
        foodEmoji: '🍡',
        cultureName: '启闭式古桥智慧与潮绣工夫茶非遗',
        theme: 'palace',
        location: '潮州市位于广东省最东端，韩江自北向南穿城而过，气候温润。',
        scenery: '横跨韩江的广济桥是中国四大古桥之一，最神奇的是江心由十八艘木船连成浮桥，“十八梭船廿四洲”白天连起来通行，傍晚拆开让大船通过，是世界上最早的启闭式桥梁！',
        food: 'Q弹得能当乒乓球弹跳的潮汕手打牛肉丸、外酥里嫩的潮州蚝烙，还有形状像白母鸭游水一样可爱的汤圆“鸭母捻”。',
        culture: '气势磅礴的潮州大锣鼓、英歌舞，以及精雕细琢的潮州木雕和工夫茶艺，处处彰显千年古城底蕴。'
      }
    ]
  },
  {
    adcode: '450000',
    name: '广西壮族自治区',
    shortName: '桂',
    capital: '南宁市',
    region: '华南',
    icon: '🏞️',
    slogan: '桂林山水甲天下，壮乡歌海三月三！',
    overview: '广西壮族自治区位于华南西部，南临北部湾，是我国少数民族人口最多的自治区。这里的喀斯特溶洞峰林与漓江山水美如画卷！',
    cities: [
      {
        name: '南宁市',
        badge: '自治区首府·中国绿城',
        sceneryName: '青秀山风景区与广西民族博物馆',
        sceneryEmoji: '🌺',
        foodName: '南宁老友粉与酸嘢/五色糯米饭',
        foodEmoji: '🍜',
        cultureName: '壮族三月三歌圩与铜鼓文化',
        theme: 'water',
        location: '南宁市位于广西南部偏西，邕江穿城而过，北回归线以南，终年绿树常青，“半城绿树半城楼”，被称为“中国绿城”。',
        scenery: '青秀山苏铁园、兰园四季花开不败；广西民族博物馆收藏着世界上数量最多、体型最大的古代铜鼓！',
        food: '酸辣鲜香、用酸笋豆豉爆炒的南宁老友粉，还有用植物天然染成红、黄、紫、黑、白五种颜色的壮族五色糯米饭！',
        culture: '广西是“刘三姐”传说的故乡，每年农历“三月三”，各族同胞都会唱山歌、抛绣球、跳竹竿舞，欢乐无比。'
      },
      {
        name: '桂林市',
        badge: '山水甲天下',
        sceneryName: '漓江百里画廊与象鼻山/阳朔遇龙河',
        sceneryEmoji: '🐘',
        foodName: '桂林米粉与阳朔啤酒鱼/荔浦芋扣肉',
        foodEmoji: '🍜',
        cultureName: '世界遗产中国南方喀斯特地貌与山水诗画',
        theme: 'water',
        location: '桂林市位于广西东北部，地处世界最典型的岩溶（喀斯特）峰林地带，漓江自北向南纵贯全境。',
        scenery: '语文课本里的《桂林山水》就在这里！城徽“象鼻山”就像一头大象把长长的鼻子伸进漓江喝水，20元人民币背面的山水风光就在桂林阳朔兴坪！',
        food: '先干拌吃、再加骨头汤喝的正宗桂林米粉，粉糯香甜的荔浦芋头，还有鲜嫩入味的阳朔漓江啤酒鱼。',
        culture: '“舟行碧波上，人在画中游”，桂林山水让小朋友亲眼见证大自然的鬼斧神工——石灰岩经过亿万年流水溶蚀形成的喀斯特奇观。'
      },
      {
        name: '柳州市',
        badge: '奇石工业名城',
        sceneryName: '百里柳江画廊与程阳八寨永济桥',
        sceneryEmoji: '🌉',
        foodName: '柳州螺蛳粉与露水汤圆',
        foodEmoji: '🍜',
        cultureName: '侗族风雨桥建筑奇迹与现代工业',
        theme: 'water',
        location: '柳州市位于广西中部偏北，清澈的柳江呈一个大大的“U”字形壶城绕流，又称“龙城”与“壶城”。',
        scenery: '百里柳江水清岸绿，春天的城市街头开满粉色的紫荆花；三江侗族自治县的程阳永济桥不用一颗铁钉，是世界四大历史名桥之一！',
        food: '风靡全国的“柳州螺蛳粉”就发源于此！螺蛳骨汤鲜美浓郁，配上酸笋、腐竹、花生米和木耳，让人欲罢不能。',
        culture: '柳州不仅有侗族大歌和鼓楼、风雨桥建筑艺术，还是充满活力的汽车与智造基地。'
      },
      {
        name: '北海市',
        badge: '南珠之乡',
        sceneryName: '北海银滩与涠洲岛火山地质公园',
        sceneryEmoji: '🏖️',
        foodName: '北海虾饼与籺/海鲜清补凉',
        foodEmoji: '🦐',
        cultureName: '千年合浦海上丝绸之路始发港与南珠文化',
        theme: 'coastal',
        location: '北海市位于广西最南端、北部湾东北岸，三面环海，阳光充足，海水温暖洁净。',
        scenery: '北海银滩的沙子由高纯度石英砂组成，在阳光下洁白如银、细腻如粉；涠洲岛则是中国最年轻的火山岛，能看到奇妙的火山岩层与珊瑚礁！',
        food: '用鲜活小海虾裹上面糊现炸的北海老街虾饼，还有甜润爽口的沙蟹汁、桂圆干和椰奶清补凉。',
        culture: '两千多年前的汉代，北海合浦就是“海上丝绸之路”最早的始发港之一，合浦南珠更是享誉古今。'
      }
    ]
  },
  {
    adcode: '460000',
    name: '海南省',
    shortName: '琼',
    capital: '海口市',
    region: '华南',
    icon: '🥥',
    slogan: '椰风海韵宝岛南，文昌火箭冲云天！',
    overview: '海南省位于中国最南端，包括海南岛和西沙群岛、中沙群岛、南沙群岛的岛礁及其海域，是我国陆地面积最小、海洋面积最大的热带省份！',
    cities: [
      {
        name: '海口市',
        badge: '海南省会·椰城',
        sceneryName: '骑楼老街与雷琼世界地质公园火山口',
        sceneryEmoji: '🌴',
        foodName: '海南清补凉与海南粉/文昌鸡饭',
        foodEmoji: '🥥',
        cultureName: '南洋骑楼建筑文化与热带火山科普',
        theme: 'coastal',
        location: '海口市位于海南岛最北端，北濒琼州海峡，与广东省雷州半岛隔海相望，气候温暖湿润，椰树成林。',
        scenery: '海口骑楼老街融合了南洋与岭南风情，遮阳挡雨十分精巧；石山火山群国家地质公园则保存着几十座万年休眠火山口和奇特的熔岩隧道！',
        food: '放满椰肉、红豆、芋头、西瓜、通心粉的冰爽海南椰奶清补凉，还有皮脆骨香的海南四大名菜之首“文昌鸡”。',
        culture: '琼剧与海南椰雕（用天然椰子壳雕刻出精美工艺品）是国家级非物质文化遗产。'
      },
      {
        name: '三亚市',
        badge: '热带滨海乐园',
        sceneryName: '亚龙湾与天涯海角/蜈支洲岛',
        sceneryEmoji: '🏖️',
        foodName: '海南抱罗粉与椰子饭/和乐蟹',
        foodEmoji: '🦀',
        cultureName: '黎族织锦非遗与南繁育种“水稻国家公园”',
        theme: 'coastal',
        location: '三亚市位于海南岛最南端，北靠高山，南临南海，全年阳光明媚，海水能见度极高。',
        scenery: '亚龙湾沙白水清，天涯海角巨石耸立海畔；在热带天堂森林公园还能漫步雨林，认识各种奇特的热带植物！',
        food: '把糯米装进天然椰子壳里蒸熟的“海南椰子饭”，椰香扑鼻；还有汤汁鲜甜的抱罗粉和膏满黄肥的和乐蟹。',
        culture: '袁隆平爷爷等科学家每年冬天都来三亚培育杂交水稻良种（南繁硅谷），黎族同胞的传统纺染织绣技艺更是有着三千年历史。'
      },
      {
        name: '文昌市',
        badge: '滨海航天城',
        sceneryName: '文昌航天发射场与东郊椰林',
        sceneryEmoji: '🚀',
        foodName: '正宗文昌鸡与抱罗粉/糟粕醋',
        foodEmoji: '🍗',
        cultureName: '中国深空探测航天发射基地与椰乡文化',
        theme: 'coastal',
        location: '文昌市位于海南岛东北部，三面临海，纬度低，海运便利，是中国唯一的滨海卫星发射基地所在地。',
        scenery: '“海南椰子半文昌，文昌椰子半东郊”，东郊椰林有几十万株椰子树；而在龙楼镇海边，可以看到长征五号“胖五”大火箭拔地而起飞向月球、火星和中国空间站！',
        food: '文昌是文昌鸡和抱罗粉的正宗发源地，酸辣开胃的铺前糟粕醋火锅也极具特色。',
        culture: '天问一号火星探测器、嫦娥五号/六号探月工程和天宫空间站核心舱都是从文昌发射升空的，是小朋友圆梦航天的必游之地！'
      },
      {
        name: '三沙市',
        badge: '南海璀璨明珠',
        sceneryName: '西沙永兴岛与七连屿珊瑚海',
        sceneryEmoji: '🏝️',
        foodName: '南海深海石斑鱼与椰香海味',
        foodEmoji: '🐠',
        cultureName: '祖国南疆海洋主权守护与珊瑚礁生态',
        theme: 'coastal',
        location: '三沙市位于中国南海中南部，管辖西沙群岛、中沙群岛、南沙群岛的岛礁及其海域，是中国位置最南、总面积最大（含海域）、陆地面积最小的地级市。',
        scenery: '小学语文课本里的《富饶的西沙群岛》就写在这里！海水五光十色，海底有像花朵一样的珊瑚、懒洋洋的海参和成群结队的彩色热带鱼！',
        food: '清澈深海里的天然海鱼与热带椰林果实，展现了海洋大自然的慷慨馈赠。',
        culture: '三沙市见证了中华民族世代开发和守护南海的历史，让小朋友牢记祖国神圣领土与蓝色国土一寸都不能少！'
      }
    ]
  },
  {
    adcode: '500000',
    name: '重庆市',
    shortName: '渝',
    capital: '渝中区',
    region: '西南',
    icon: '🚝',
    slogan: '嘉陵长江两江汇，山城轻轨穿楼飞！',
    overview: '重庆市位于中国西南部、长江上游，是全国面积最大、人口最多的直辖市。这里群山环抱、两江交汇，是一座充满奇幻立体交通与热情火锅的“8D山城”！',
    cities: [
      {
        name: '渝中区',
        badge: '山城母城半岛',
        sceneryName: '洪崖洞吊脚楼与李子坝穿楼轻轨/朝天门',
        sceneryEmoji: '🚝',
        foodName: '重庆九宫格火锅与重庆小面/酸辣粉',
        foodEmoji: '🍲',
        cultureName: '巴渝吊脚楼建筑智慧与两江航运文化',
        theme: 'modern',
        location: '渝中区位于长江与嘉陵江交汇形成的狭长半岛上，三面环水，依山而建，道路高低错落。',
        scenery: '朝天门广场可以看到碧绿的嘉陵江与浑厚的长江交汇成“鸳鸯锅”奇观！洪崖洞11层巴渝传统吊脚楼依山临江，夜晚灯火辉煌；李子坝单轨列车直接从居民楼6至8层中间穿过，神奇极了！',
        food: '热辣鲜香的重庆九宫格老火锅（涮毛肚、鸭肠、黄喉、山城小汤圆），还有早晨必不可少的一碗重庆小面！',
        culture: '特殊的山地地形造就了重庆穿楼轻轨、过江索道、皇冠大扶梯等全国独一无二的立体交通文化。'
      },
      {
        name: '大足区',
        badge: '石刻艺术之乡',
        sceneryName: '大足石刻（宝顶山与北山摩崖造像）',
        sceneryEmoji: '🗿',
        foodName: '大足冬菜扣肉与丁家坡洋芋',
        foodEmoji: '🥔',
        cultureName: '世界文化遗产唐宋石窟艺术巅峰',
        theme: 'palace',
        location: '大足区位于重庆市西部、四川盆地东南部浅丘地带，山清水秀，物产丰饶。',
        scenery: '世界文化遗产“大足石刻”共有五万多尊石窟造像，其中宝顶山千手观音造像在88平方米的崖壁上雕出1007只真金贴面的手臂，金光闪闪，震撼人心！',
        food: '用坛子密封发酵三年的大足冬菜蒸扣肉，咸香回甜；还有外酥里糯的狼牙土豆。',
        culture: '大足石刻用生动的连环画石雕讲述孝敬父母、心地善良的传统美德故事，贴近百姓生活。'
      },
      {
        name: '奉节县',
        badge: '中华诗城·三峡门户',
        sceneryName: '白帝城与长江三峡之瞿塘峡（夔门）',
        sceneryEmoji: '⛵',
        foodName: '奉节脐橙与夔州盬子鸡',
        foodEmoji: '🍊',
        cultureName: '李白杜甫千古诗篇与三国白帝城文化',
        theme: 'mountain',
        location: '奉节县位于重庆市东北部、长江三峡西首，扼守瞿塘峡口，自古被称为“夔州”。',
        scenery: '李白《早发白帝城》“朝辞白帝彩云间，千里江陵一日还”写的就是奉节白帝城！10元人民币背面的图案正是奉节雄奇险峻的瞿塘峡“夔门天下雄”！',
        food: '汁多味甜、果肉脆嫩的“奉节脐橙”享誉全国，还有用陶制盬（gǔ）子汽蒸而成的盬子鸡。',
        culture: '李白、杜甫、刘禹锡、苏轼等大诗人在奉节留下了一万多首诗篇，让这里成为名副其实的“中华诗城”。'
      },
      {
        name: '武隆区',
        badge: '喀斯特自然奇观',
        sceneryName: '天生三桥与仙女山高山草原',
        sceneryEmoji: '🏞️',
        foodName: '武隆碗碗羊肉与羊角豆干',
        foodEmoji: '🍲',
        cultureName: '世界自然遗产天坑地缝地质科普',
        theme: 'mountain',
        location: '武隆区位于重庆市东南部，地处四川盆地与云贵高原过渡地带，乌江穿境而过。',
        scenery: '世界自然遗产“天生三桥”（天龙桥、青龙桥、黑龙桥）是三座高度超过200米的天然巨大石拱桥横跨在两个天坑之上，壮观得像科幻电影场景！还有碧草连天的仙女山。',
        food: '鲜香暖胃的武隆碗碗羊肉，以及卤香浓郁、有嚼劲的羊角镇豆腐干。',
        culture: '芙蓉洞、天生三桥和后坪天坑共同构成了立体的地下暗河与岩溶坍塌地质博物馆。'
      }
    ]
  },
  {
    adcode: '510000',
    name: '四川省',
    shortName: '川',
    capital: '成都市',
    region: '西南',
    icon: '🐼',
    slogan: '天府之国大熊猫，九寨峨眉三星堆！',
    overview: '四川省位于中国西南腹地，东部是富饶温暖的四川盆地（天府之国），西部是巍峨的川西雪山高原。这里是国宝大熊猫的故乡，还有神秘的三星堆和梦幻九寨沟！',
    cities: [
      {
        name: '成都市',
        badge: '四川省会·熊猫之都',
        sceneryName: '成都大熊猫繁育研究基地与都江堰水利工程',
        sceneryEmoji: '🐼',
        foodName: '麻婆豆腐与担担面/龙抄手/钟水饺',
        foodEmoji: '🍜',
        cultureName: '川剧变脸非遗与两千年前都江堰治水智慧',
        theme: 'water',
        location: '成都市位于四川盆地西部、成都平原腹地，岷江支流穿城而过，土地肥沃，气候温润，自古享有“天府之国”的美誉。',
        scenery: '在大熊猫基地可以看到圆滚滚的大熊猫吃竹子、爬树打滚！还有2200多年前李冰父子修建、至今仍在灌溉农田的无坝水利工程奇迹——都江堰，以及杜甫草堂和武侯祠。',
        food: '成都被联合国评为“世界美食之都”，麻辣鲜香的麻婆豆腐、夫妻肺片、担担面、三大炮和赖汤圆让人回味无穷。',
        culture: '一挥扇子瞬间变换不同脸谱的“川剧变脸”神奇无比，金沙遗址出土的“太阳神鸟”金饰更是中国文化遗产标志！'
      },
      {
        name: '乐山市',
        badge: '山水佛都',
        sceneryName: '乐山大佛与峨眉山金顶',
        sceneryEmoji: '⛰️',
        foodName: '乐山甜皮鸭与跷脚牛肉/钵钵鸡',
        foodEmoji: '🦆',
        cultureName: '世界文化与自然双遗产及摩崖造像排水科学',
        theme: 'mountain',
        location: '乐山市位于四川盆地西南部，岷江、青衣江、大渡河三江在此汇流。',
        scenery: '通高71米的乐山大佛依凌云山栖霞峰临江峭壁凿造而成，是世界上最高的古代石刻弥勒佛坐像，光是一只脚背就能坐下一百多人！西侧的峨眉山云海日出与金顶更是一绝。',
        food: '表皮挂着一层晶莹麦芽糖卤汁的乐山甜皮鸭、汤鲜肉嫩的跷脚牛肉，还有竹签串起的红油钵钵鸡和豆腐脑。',
        culture: '乐山大佛的发髻、衣领和耳后藏着一套精巧的隐蔽排水系统，保护大佛历经1300年风雨不被侵蚀，体现了唐代工匠的非凡科学智慧！'
      },
      {
        name: '阿坝藏族羌族自治州',
        badge: '童话仙境',
        sceneryName: '九寨沟五花海与黄龙五彩池',
        sceneryEmoji: '💎',
        foodName: '藏式小火锅与青稞饼/洋芋糍粑',
        foodEmoji: '🍲',
        cultureName: '钙华彩池地质奇观与藏羌非遗文化',
        theme: 'water',
        location: '阿坝州位于四川省西北部，地处青藏高原东南缘，横断山脉北端与川西北高山峡谷区。',
        scenery: '“九寨归来不看水”，九寨沟的五花海、镜海、诺日朗瀑布湖水呈现出蓝宝石、翡翠绿等梦幻色彩；黄龙景区的五彩池就像几千块碧玉镶嵌在雪山森林间！',
        food: '酥香可口的青稞烙饼、手打洋芋糍粑，以及暖身滋补的牦牛肉菌菇汤锅。',
        culture: '羌族的碉楼建筑艺术、羌笛演奏，以及藏族的锅庄舞，与高原雪山彩池共同构成了人与自然和谐共生的画卷。'
      },
      {
        name: '德阳市',
        badge: '古蜀之源',
        sceneryName: '三星堆博物馆（广汉）',
        sceneryEmoji: '🎭',
        foodName: '广汉缠丝兔与连山回锅肉/什邡板鸭',
        foodEmoji: '🥩',
        cultureName: '沉睡数千年一醒惊天下的古蜀青铜文明',
        theme: 'palace',
        location: '德阳市位于成都平原东北部，地处龙门山脉向四川盆地过渡地带，鸭子河、绵远河穿流而过。',
        scenery: '广汉三星堆博物馆里展出了距今三千多年的青铜大立人、高达3.96米的青铜神树、戴着黄金面具的青铜人头像，还有眼睛高高凸起的青铜纵目面具！',
        food: '肉质紧实鲜香的广汉缠丝兔、大片过瘾的连山回锅肉，还有中江手工挂面（细如发丝且中空）。',
        culture: '“沉睡数千年，一醒惊天下”，三星堆遗址有力证明了长江流域与黄河流域一样，同属中华文明的母体源头！'
      }
    ]
  },
  {
    adcode: '520000',
    name: '贵州省',
    shortName: '黔',
    capital: '贵阳市',
    region: '西南',
    icon: '🔭',
    slogan: '黄果树下飞瀑响，中国天眼探星光！',
    overview: '贵州省地处云贵高原东部，素有“八山一水一分田”之说。这里有亚洲第一大瀑布黄果树瀑布、能够倾听宇宙深处声音的“中国天眼”FAST，以及世界级的跨峡谷高桥！',
    cities: [
      {
        name: '贵阳市',
        badge: '贵州省会·爽爽林城',
        sceneryName: '甲秀楼与青岩古镇/黔灵山公园',
        sceneryEmoji: '🏯',
        foodName: '贵阳肠旺面与丝娃娃/青岩卤猪脚',
        foodEmoji: '🍜',
        cultureName: '知行合一阳明文化与中国数谷大数据中心',
        theme: 'water',
        location: '贵阳市位于贵州省中部，海拔约1100米，四周环绕着茂密的环城林带，夏季平均气温仅23℃左右，是著名的“中国避暑之都”。',
        scenery: '矗立在南明河巨石上的甲秀楼已有四百多年历史；拥有六百年历史的青岩古镇全部由青石板铺就，状元街充满书香。',
        food: '用薄薄的面皮包进十几种爽脆蔬菜丝、再浇上酸辣蘸水的贵阳“丝娃娃”，还有色泽红亮的肠旺面和软糯状元蹄。',
        culture: '天然凉爽的气候和稳定的地质结构，让贵阳成为存放全国海量数据的“中国数谷”！'
      },
      {
        name: '安顺市',
        badge: '瀑布之乡',
        sceneryName: '黄果树大瀑布与龙宫溶洞/北盘江大桥',
        sceneryEmoji: '🌊',
        foodName: '安顺裹卷与破酥包/夺夺粉',
        foodEmoji: '🌯',
        cultureName: '世界喀斯特大瀑布水帘洞奇观与屯堡地戏',
        theme: 'water',
        location: '安顺市位于贵州省中西部，是世界上喀斯特地貌最集中、溶洞和瀑布最密集的区域之一。',
        scenery: '黄果树大瀑布高77.8米、宽101米，奔腾的白水河从悬崖倾泻而下，水声震耳欲聋，阳光下常有七彩彩虹！更神奇的是瀑布半腰有一条134米长的天然“水帘洞”，人可以从瀑布里面走过并伸手触摸飞瀑！',
        food: '晶莹米皮卷着豆芽海带丝的安顺小裹卷、层次分明的安顺破酥包，还有小竹签插着吃的夺夺粉。',
        culture: '安顺天龙屯堡保存着六百年前明朝江南军民的生活习俗与头戴木雕面具表演的“安顺地戏”。'
      },
      {
        name: '黔南布依族苗族自治州',
        badge: '天眼之城·绿宝石',
        sceneryName: '中国天眼（FAST）科普基地与荔波小七孔',
        sceneryEmoji: '🔭',
        foodName: '都匀毛尖茶点与荔波酸肉/虾酸牛肉',
        foodEmoji: '🍵',
        cultureName: '世界最大单口径射电望远镜南仁东科学精神',
        theme: 'modern',
        location: '黔南州位于贵州省中南部，平塘县拥有世界上独一无二的天然圆形喀斯特洼地（大窝凼），荔波县则拥有喀斯特原始森林。',
        scenery: '平塘大窝凼里坐落着口径达500米、相当于30个足球场大的“中国天眼”（FAST），是世界最大最灵敏的单口径射电望远镜！荔波小七孔古桥横跨碧绿的响水河，被誉为“地球腰带上的绿宝石”。',
        food: '中国十大名茶之一的都匀毛尖清香回甘，还有布依族特色五色花米饭和酸汤鱼。',
        culture: '天眼总工程师南仁东爷爷带着团队用22年时间在大山深处建成了中国天眼，目前已发现超过900颗新脉冲星，激励小朋友仰望星空、探索宇宙！'
      },
      {
        name: '黔东南苗族侗族自治州',
        badge: '歌舞之州',
        sceneryName: '西江千户苗寨与肇兴侗寨鼓楼群',
        sceneryEmoji: '🏮',
        foodName: '凯里红酸汤鱼与牛瘪火锅/糯米糍粑',
        foodEmoji: '🐟',
        cultureName: '人类非遗侗族大歌与苗族百鸟衣刺绣',
        theme: 'palace',
        location: '黔东南州位于贵州省东南部，雷公山巍峨耸立，清水江、都柳江蜿蜒流淌，森林覆盖率极高。',
        scenery: '西江千户苗寨由十余个依山而建的自然村寨相连成片，上千座木质吊脚楼从山脚一直铺到山顶，夜晚万家灯火亮起如漫天繁星！肇兴侗寨则以五座雄伟的仁义礼智信鼓楼闻名。',
        food: '用野生小西红柿自然发酵熬煮的凯里红酸汤鱼，酸鲜开胃，鱼肉嫩滑！',
        culture: '不需乐器伴奏、多声部自然和声的“侗族大歌”宛如天籁之音，被列入人类非物质文化遗产代表作名录。'
      }
    ]
  },
  {
    adcode: '530000',
    name: '云南省',
    shortName: '云',
    capital: '昆明市',
    region: '西南',
    icon: '🦚',
    slogan: '彩云之南四季春，苍山洱海雨林深！',
    overview: '云南省位于中国西南边陲，被称为“彩云之南”（简称云或滇）。这里从热带雨林到终年积雪的梅里雪山应有尽有，是全国植物、动物和少数民族种类最多的省份！',
    cities: [
      {
        name: '昆明市',
        badge: '云南省会·春城花都',
        sceneryName: '石林世界地质公园与滇池海埂大坝',
        sceneryEmoji: '🌷',
        foodName: '云南过桥米线与鲜花饼/汽锅鸡',
        foodEmoji: '🍜',
        cultureName: '四季如春高原气候与亚洲最大斗南花市',
        theme: 'water',
        location: '昆明市位于云贵高原中部，海拔约1890米，三面环山，南濒高原明珠滇池，冬无严寒、夏无酷暑，鲜花常年不谢，享誉“春城”。',
        scenery: '世界自然遗产“昆明石林”千峰竞秀，石头森林里还有美丽的阿诗玛石峰；每年冬天，成千上万只红嘴鸥从西伯利亚飞来滇池过冬，与小朋友亲密互动！',
        food: '滚烫鸡汤锁住鲜味、依次下入生肉片和米线的“过桥米线”，还有用可食用玫瑰花瓣做馅、刚出炉酥香扑鼻的云南鲜花饼！',
        culture: '昆明斗南花卉市场是亚洲最大的鲜切花交易中心，每天有几千万枝鲜花从这里送往全国和世界各地。'
      },
      {
        name: '大理白族自治州',
        badge: '风花雪月',
        sceneryName: '苍山洱海与大理古城/崇圣寺三塔',
        sceneryEmoji: '⛵',
        foodName: '大理烤乳扇与喜洲破酥粑粑/砂锅鱼',
        foodEmoji: '🧀',
        cultureName: '白族扎染非遗技艺与三道茶待客礼仪',
        theme: 'water',
        location: '大理州位于云南省中部偏西，苍山十九峰雄峙于西，形如耳朵的高原湖泊洱海荡漾于东，构成“苍山不墨千秋画，洱海无弦万古琴”的美景。',
        scenery: '“下关风，上关花，苍山雪，洱海月”合称大理风花雪月四景！崇圣寺三塔巍然屹立千年，喜洲古镇金黄的稻田与白墙青瓦相映成趣。',
        food: '用鲜牛奶制成薄片、烤得金黄再抹上玫瑰酱的“大理烤乳扇”，甜咸双味的喜洲粑粑和鲜美的大理砂锅鱼。',
        culture: '周城白族扎染用板蓝根植物染出蓝底白花的美丽图案，白族“一苦二甜三回味”的三道茶更蕴含着人生哲理。'
      },
      {
        name: '丽江市',
        badge: '雪山古城',
        sceneryName: '丽江古城（大研古镇）与玉龙雪山蓝月谷',
        sceneryEmoji: '🏔️',
        foodName: '丽江腊排骨火锅与鸡豆凉粉/丽江粑粑',
        foodEmoji: '🍲',
        cultureName: '世界记忆遗产纳西族东巴象形文字与古乐',
        theme: 'snow',
        location: '丽江市位于云南省西北部，地处青藏高原与云贵高原衔接处，金沙江在境内拐出壮观的“长江第一湾”与虎跳峡。',
        scenery: '世界文化遗产丽江古城没有城墙，家家流水、户户垂柳，抬头就能望见终年积雪、银光闪耀的十三峰“玉龙雪山”！山脚下的蓝月谷湖水湛蓝如玉。',
        food: '浓香四溢的丽江腊排骨火锅、用高原特产黑鸡豆做成的煎鸡豆凉粉和酥脆的丽江粑粑。',
        culture: '纳西族的“东巴文”是世界上唯一仍在活着的图画象形文字，看到画着的小太阳、小鸟和流水就能猜出字义，非常受小朋友欢迎！'
      },
      {
        name: '西双版纳傣族自治州',
        badge: '热带雨林动物王国',
        sceneryName: '中科院西双版纳热带植物园与野象谷',
        sceneryEmoji: '🐘',
        foodName: '傣味菠萝紫米饭与香茅草烤鱼',
        foodEmoji: '🍍',
        cultureName: '傣族泼水节祝福习俗与亚洲象雨林生态',
        theme: 'water',
        location: '西双版纳位于云南省最南端，北回归线以南，澜沧江穿流而过，拥有中国唯一成片保存完好的热带雨林。',
        scenery: '在中科院热带植物园里，巨大的“王莲”叶子浮在水面上能稳稳托起一个小朋友！还有会跟着歌声跳舞的跳舞草、高耸入云的望天树，野象谷里更生活着野生亚洲象家族！',
        food: '把紫糯米和菠萝果肉一起装在掏空的整个菠萝里蒸熟的“菠萝紫米饭”，酸甜软糯，果香四溢！',
        culture: '每年四月中旬的傣历新年“泼水节”，人们互相泼洒清澈的水花，送去健康、吉祥与幸福的美好祝福。'
      }
    ]
  },
  {
    adcode: '540000',
    name: '西藏自治区',
    shortName: '藏',
    capital: '拉萨市',
    region: '西南',
    icon: '🏔️',
    slogan: '世界屋脊珠峰高，布达拉宫阳光照！',
    overview: '西藏自治区位于青藏高原西南部，平均海拔在4000米以上，素有“世界屋脊”和“地球第三极”之称。这里有世界第一高峰珠穆朗玛峰和雄伟的布达拉宫！',
    cities: [
      {
        name: '拉萨市',
        badge: '自治区首府·日光城',
        sceneryName: '布达拉宫与罗布林卡/纳木错',
        sceneryEmoji: '🏯',
        foodName: '藏式甜茶与糌粑/牦牛酸奶',
        foodEmoji: '🥛',
        cultureName: '世界遗产布达拉宫藏式建筑与藏戏唐卡',
        theme: 'palace',
        location: '拉萨市位于西藏中部、雅鲁藏布江支流拉萨河畔，全年日照时间长达3000小时以上，因此被称为“日光城”。',
        scenery: '世界文化遗产“布达拉宫”依红山而建，红宫白墙与金顶在高原湛蓝的天空下熠熠生辉；北面的高原圣湖纳木错湖水清澈湛蓝，远眺念青唐古拉雪山。',
        food: '用青稞炒熟磨成的“糌粑”（zān ba）捏成小团吃，再喝上一碗香浓的酥油茶或清甜的拉萨甜茶，还有表面结着厚厚黄奶皮、撒上白糖吃的牦牛酸奶！',
        culture: '色彩绚丽、矿物颜料千年不褪色的“唐卡”绘画，以及历史悠久的藏戏，展现了灿烂的雪域高原文化。'
      },
      {
        name: '日喀则市',
        badge: '珠峰之乡·高原粮仓',
        sceneryName: '珠穆朗玛峰自然保护区与扎什伦布寺',
        sceneryEmoji: '🏔️',
        foodName: '朋必（豌豆凉粉）与亚东鲑鱼/青稞饼',
        foodEmoji: '🫓',
        cultureName: '人类攀登测量世界最高峰8848.86米精神',
        theme: 'snow',
        location: '日喀则市位于西藏西南部，雅鲁藏布江与年楚河在此交汇，南部耸立着喜马拉雅山脉。',
        scenery: '世界第一高峰——珠穆朗玛峰（最新精确高程8848.86米）就坐落在这里！金字塔般的雪山之巅直插云霄，日照金山景象壮丽非凡。',
        food: '日喀则独有的特色小吃“朋必”（用豌豆汁熬制的浓香豆糊凉粉），还有营养丰富的青稞面和风干牦牛肉。',
        culture: '中国登山队与测绘队员克服极寒缺氧登顶珠峰、精确测量珠峰“身高”的故事，传递着勇攀科学高峰的伟大精神！'
      },
      {
        name: '林芝市',
        badge: '西藏江南',
        sceneryName: '雅鲁藏布大峡谷与南迦巴瓦峰/波密桃花沟',
        sceneryEmoji: '🌸',
        foodName: '鲁朗石锅鸡与藏香猪/松茸汤',
        foodEmoji: '🍲',
        cultureName: '世界第一大峡谷垂直自然带与工布民俗',
        theme: 'mountain',
        location: '林芝市位于西藏东南部、雅鲁藏布江中下游，来自印度洋的暖湿气流顺着峡谷北上，让这里森林茂密、气候温润，被称为“西藏江南”。',
        scenery: '雅鲁藏布大峡谷是世界最深、最长的峡谷，从谷底的热带季雨林到7782米南迦巴瓦峰顶的冰川雪山，浓缩了从海南岛到北极的植物景观！春天更有漫山遍野的百年野生桃花盛开。',
        food: '用墨脱天然皂石手工凿成的石锅，慢炖手掌参、松茸和藏土鸡而成的“鲁朗石锅鸡”，汤汁鲜美无比！',
        culture: '这里是门巴族、珞巴族和藏族工布人世代居住的家园，墨脱天然石锅制作技艺更是珍贵的非遗文化。'
      }
    ]
  },
  {
    adcode: '610000',
    name: '陕西省',
    shortName: '陕',
    capital: '西安市',
    region: '西北',
    icon: '🗿',
    slogan: '秦岭淮河分南北，兵马俑守长安城！',
    overview: '陕西省纵跨黄河中游与长江支流汉江流域，南部的秦岭山脉是中国地理南北方的天然分界线！省会西安（古称长安）曾是周、秦、汉、唐等十三朝古都！',
    cities: [
      {
        name: '西安市',
        badge: '陕西省会·十三朝古都',
        sceneryName: '秦始皇兵马俑博物馆与大雁塔/西安城墙',
        sceneryEmoji: '🗿',
        foodName: '西安肉夹馍与羊肉泡馍/Biángbiáng面',
        foodEmoji: '🥙',
        cultureName: '世界第八大奇迹兵马俑与丝绸之路起点长安',
        theme: 'palace',
        location: '西安市位于陕西省中部的关中平原（八百里秦川）腹地，北临渭河，南依巍峨的秦岭山脉。',
        scenery: '被誉为“世界第八大奇迹”的秦始皇兵马俑，数千尊真人大小的陶俑、陶马排列成威武军阵，每一张脸孔都不一样！还有保存最完整的西安明城墙（可以在城墙上骑自行车）和千年大雁塔。',
        food: '酥脆白吉馍夹着浓香腊汁肉的“西安肉夹馍”、自己动手把馍掰成黄豆粒大小的“牛羊肉泡馍”，还有笔画最多、宽如皮带的Biángbiáng面和冰峰汽水！',
        culture: '汉代张骞从长安（西安）出发开辟了古丝绸之路，盛唐时期的长安更是万国来朝的诗歌与文化中心。'
      },
      {
        name: '延安市',
        badge: '革命圣地·黄河壶口',
        sceneryName: '宝塔山与黄河壶口瀑布',
        sceneryEmoji: '🌊',
        foodName: '延安洋芋擦擦与子长煎饼/红枣小米粥',
        foodEmoji: '🥞',
        cultureName: '延安精神、黄河大合唱与陕北安塞腰鼓',
        theme: 'desert',
        location: '延安市位于陕西省北部、黄土高原中南地区，延河与洛河穿流而过。',
        scenery: '延河之畔的宝塔山巍然耸立；在宜川县的“黄河壶口瀑布”，宽阔的黄河水突然收束跌入三十多米深的石槽中，涛声如雷、水雾腾空，“黄河之水天上来”壮观无比！',
        food: '金黄软糯的延安洋芋擦擦、薄如白纸卷着豆腐干和土豆丝吃的子长煎饼，还有香甜的大红枣和黄米馍馍。',
        culture: '气势磅礴的《黄河大合唱》创作于此，小学课文《安塞腰鼓》描绘的陕北后生们擂响腰鼓、红绸飞舞的场面更是振奋人心！'
      },
      {
        name: '渭南市',
        badge: '奇险天下第一山',
        sceneryName: '西岳华山与洽川黄河湿地',
        sceneryEmoji: '⛰️',
        foodName: '潼关肉夹馍与渭南时辰包子/水盆羊肉',
        foodEmoji: '🥙',
        cultureName: '《史记》司马迁故里与华山皮影戏',
        theme: 'mountain',
        location: '渭南市位于陕西省关中平原东部，渭河横贯东西，并在潼关汇入万里黄河。',
        scenery: '“五岳”中的西岳华山由一整块巨大花岗岩构成，以“奇险天下第一山”著称，苍龙岭、长空栈道直插云霄，寇准7岁时写下的《咏华山》“只有天在上，更无山与齐”就写在这里！',
        food: '千层酥皮掉渣的潼关肉夹馍，配上一碗汤清肉烂、加满月牙饼和粉丝的澄城水盆羊肉！',
        culture: '渭南韩城是《史记》作者司马迁的故乡，华州皮影戏“一口叙说千古事，双手对舞百万兵”更是中国皮影艺术的源头。'
      },
      {
        name: '汉中市',
        badge: '秦巴天汉·朱鹮之乡',
        sceneryName: '汉中洋县朱鹮国家级自然保护区与石门栈道',
        sceneryEmoji: '🦩',
        foodName: '汉中热面皮与菜豆腐/核桃馍',
        foodEmoji: '🍜',
        cultureName: '世界濒危神鸟朱鹮拯救奇迹与古栈道文化',
        theme: 'water',
        location: '汉中市位于陕西省西南部，北有秦岭阻挡寒流，南有大巴山屏障，汉江发源于此，气候温暖湿润，酷似江南。',
        scenery: '春天汉中盆地百万亩金黄油菜花海美不胜收；在洋县保护区，可以看到有着“东方宝石”美誉、羽毛白中透粉的国家一级保护鸟类——朱鹮！',
        food: '用大米磨浆蒸制、趁热拌上红油辣子的“汉中热面皮”，搭配一碗清爽解腻的菜豆腐，是绝配早餐！',
        culture: '1981年科学家在汉中洋县发现了全球仅存的7只野生朱鹮，经过四十多年精心保护，如今朱鹮已繁衍到上万只，是世界生态保护史上的伟大奇迹！'
      }
    ]
  },
  {
    adcode: '620000',
    name: '甘肃省',
    shortName: '甘',
    capital: '兰州市',
    region: '西北',
    icon: '🐪',
    slogan: '黄河穿城牛肉面，敦煌飞天丝路长！',
    overview: '甘肃省位于中国西北地区，形状像一柄精美的玉如意，中间狭长的“河西走廊”曾是古丝绸之路的必经之地。这里有莫高窟飞天壁画、七彩丹霞和黄河穿城而过的兰州！',
    cities: [
      {
        name: '兰州市',
        badge: '甘肃省会·黄河明珠',
        sceneryName: '黄河铁桥（中山桥）与甘肃省博物馆/黄河母亲雕像',
        sceneryEmoji: '🌉',
        foodName: '兰州牛肉拉面与甜醅子/牛奶鸡蛋醪糟',
        foodEmoji: '🍜',
        cultureName: '中国旅游标志“铜奔马”与黄河水车文化',
        theme: 'water',
        location: '兰州市位于甘肃省中部，是全国唯一一座万里黄河自西向东穿城而过的省会城市，南北两山对峙。',
        scenery: '建于百年前的“天下黄河第一桥”中山铁桥横跨黄河，岸边有慈祥的黄河母亲石雕和巨大的古代灌溉工具“兰州水车”；甘肃省博物馆里珍藏着脚踏飞燕的国宝——铜奔马（马踏飞燕）！',
        food: '讲究“一清（汤清）、二白（萝卜白）、三红（辣子油红）、四绿（香菜蒜苗绿）、五黄（面条黄亮）”的正宗兰州牛肉面，还有冰凉香甜的甜醅子奶茶！',
        culture: '古老的羊皮筏子与巨大的木制黄河水车，展现了黄河儿女顺应水势、巧借自然力量的生存智慧。'
      },
      {
        name: '酒泉市',
        badge: '飞天圣地·丝路明珠',
        sceneryName: '敦煌莫高窟与鸣沙山月牙泉',
        sceneryEmoji: '🐪',
        foodName: '敦煌驴肉黄面与杏皮水/糊锅',
        foodEmoji: '🍹',
        cultureName: '世界遗产莫高窟壁画艺术与古丝路阳关玉门关',
        theme: 'desert',
        location: '酒泉市位于甘肃省河西走廊最西端，南靠祁连山雪峰，北连戈壁大漠。',
        scenery: '世界文化遗产“敦煌莫高窟”有735个洞窟、4.5万平方米壁画，九层楼大佛与衣带飘舞的“飞天”美轮美奂！鸣沙山沙丘环抱中有一弯千年不涸的清泉——月牙泉，沙水共生奇观举世无双！',
        food: '拉得细如龙须、筋道爽滑的敦煌黄面，再配上一杯用敦煌李广杏熬制、酸甜冰爽的“杏皮水”！',
        culture: '“劝君更尽一杯酒，西出阳关无故人”、“春风不度玉门关”，唐诗里的阳关和玉门关遗址都在酒泉敦煌境内；这里还同时拥有古代飞天壁画与现代酒泉航天发射基地！'
      },
      {
        name: '张掖市',
        badge: '金张掖·塞上江南',
        sceneryName: '张掖七彩丹霞世界地质公园与山丹军马场',
        sceneryEmoji: '🌈',
        foodName: '张掖搓鱼面与炒炮/牛肉小饭',
        foodEmoji: '🍜',
        cultureName: '彩色丘陵丹霞地质奇观与河西走廊绿洲生态',
        theme: 'desert',
        location: '张掖市位于河西走廊中段，祁连山冰雪融水汇成黑河滋润着大片肥沃绿洲，素有“桑麻之地、鱼米之乡”的美称。',
        scenery: '张掖七彩丹霞的山峦层理交错，在阳光照耀下呈现出红、黄、橙、绿、白、青灰等鲜艳色彩，就像大自然打翻了调色盘！祁连山下的山丹军马场更是有着两千多年历史的亚洲最大天然马场。',
        food: '把面团用掌心搓成两头尖、中间粗像小鱼一样的“张掖搓鱼面”，还有切成面丁像小鞭炮一样的“炒炮”！',
        culture: '“不望祁连山顶雪，错把张掖当江南”，这里让小朋友直观理解高山冰雪融水如何孕育沙漠边缘的繁华绿洲。'
      }
    ]
  },
  {
    adcode: '630000',
    name: '青海省',
    shortName: '青',
    capital: '西宁市',
    region: '西北',
    icon: '🦌',
    slogan: '青海湖蓝茶卡白，三江源头活水来！',
    overview: '青海省位于青藏高原东北部，因境内有中国最大的内陆咸水湖——青海湖而得名。这里更是长江、黄河、澜沧江三条大江大河的发源地，被誉为“中华水塔”！',
    cities: [
      {
        name: '西宁市',
        badge: '青海省会·中国夏都',
        sceneryName: '青海藏文化博物院与青藏高原野生动物园/塔尔寺',
        sceneryEmoji: '🐾',
        foodName: '青海手抓羊肉与甜醅/老酸奶/狗浇尿油饼',
        foodEmoji: '🍖',
        cultureName: '世界最长唐卡吉尼斯纪录与雪豹兔狲高原保护',
        theme: 'mountain',
        location: '西宁市位于青海省东部、湟水谷地，平均海拔约2260米，夏季平均气温仅18℃左右，凉爽宜人，被称为“中国夏都”。',
        scenery: '在西宁的青藏高原野生动物园，可以看到高山之王“雪豹”、呆萌的网红“高原兔狲”和荒漠猫！藏文化博物院里还展出一幅长达618米的《中国藏族文化艺术彩绘大观》巨幅唐卡！',
        food: '鲜嫩不膻的青海白条手抓羊肉、金黄酥香的青海老油饼，还有碗面凝结着金黄菜籽油或奶皮的青海老酸奶。',
        culture: '西宁是古丝绸之路南道与唐蕃古道的必经重镇，多民族在此和睦共居。'
      },
      {
        name: '海西蒙古族藏族自治州',
        badge: '天空之镜·聚宝盆',
        sceneryName: '茶卡盐湖与察尔汗盐湖/翡翠湖',
        sceneryEmoji: '🪞',
        foodName: '柴达木枸杞与亢锅羊肉',
        foodEmoji: '🍲',
        cultureName: '盐湖结晶光学反射奇观与万丈盐桥工程',
        theme: 'water',
        location: '海西州主体为著名的中国四大盆地之一——柴达木盆地，富含盐、钾、镁、锂等丰富矿产，被称为“祖国聚宝盆”。',
        scenery: '茶卡盐湖湖面铺满洁白的天然结晶盐层，浅浅的卤水像一面巨大的镜子倒映着蓝天白云和远山，人走在湖面上就像漫步云端，被誉为中国的“天空之镜”！',
        food: '颗粒硕大甘甜的柴达木红枸杞与黑枸杞，以及外焦里嫩的青海亢锅羊排。',
        culture: '察尔汗盐湖上有一条全部用盐块铺成的32公里“万丈盐桥”公路，连火车铁轨都直接架在坚硬的盐盖上！'
      },
      {
        name: '海南藏族自治州',
        badge: '碧海流云·光伏绿洲',
        sceneryName: '青海湖（二郎剑/断崖）与塔拉滩光伏园',
        sceneryEmoji: '🌊',
        foodName: '青海湖畔糌粑与高原牦牛火锅',
        foodEmoji: '🍲',
        cultureName: '中国最大湖泊候鸟天堂与清洁能源光伏羊',
        theme: 'water',
        location: '海南州位于中国最大湖泊——青海湖之南，故名“海南州”，共和盆地地势开阔，日照极其充沛。',
        scenery: '面积达4600多平方公里的青海湖浩瀚如大海，每年盛夏湖畔盛开万亩金黄油菜花，与湛蓝湖水、远方雪山交相辉映；共和塔拉滩上更有全球最大的蓝色光伏发电海洋！',
        food: '酥香的青稞发糕、高原蘑菇炖土鸡和香浓奶茶。',
        culture: '在塔拉滩光伏电站，太阳能板挡风减少水分蒸发，板下长出茂盛青草，牧民放牧“光伏羊”，实现了“发电+治沙+牧羊”一举三得的生态科学奇迹！'
      },
      {
        name: '玉树藏族自治州',
        badge: '中华水塔·三江之源',
        sceneryName: '三江源国家公园与可可西里自然保护区',
        sceneryEmoji: '🦌',
        foodName: '玉树手抓牦牛肉与人参果米饭',
        foodEmoji: '🍚',
        cultureName: '长江黄河澜沧江源头生态保护与藏羚羊家园',
        theme: 'snow',
        location: '玉树州位于青海省西南部、青藏高原腹地，是长江、黄河、澜沧江三大水系的发源地核心区。',
        scenery: '三江源国家公园冰川雪山连绵、星宿海湖泊密布，孕育了滋养半个中国的滚滚江河！世界自然遗产“可可西里”更是国家一级保护动物“藏羚羊”自由奔跑的美丽家园。',
        food: '用高原特有的甜糯小红果“蕨麻”（高原人参果）拌上白米饭和酥油白糖做成的“人参果饭”。',
        culture: '无数生态管护员和科学家常年守护着三江源与可可西里，让小朋友明白保护高原一草一木就是保护祖国母亲河的源头。'
      }
    ]
  },
  {
    adcode: '640000',
    name: '宁夏回族自治区',
    shortName: '宁',
    capital: '银川市',
    region: '西北',
    icon: '🍇',
    slogan: '贺兰山下塞上江南，黄河灌溉稻花香！',
    overview: '宁夏回族自治区位于黄河上游，西有巍峨的贺兰山挡住腾格里沙漠的风沙，东有黄河水自流灌溉，在西北大漠旁造就了鱼米丰饶的“塞上江南”！',
    cities: [
      {
        name: '银川市',
        badge: '自治区首府·塞上湖城',
        sceneryName: '贺兰山岩画与镇北堡西部影城/沙湖',
        sceneryEmoji: '⛰️',
        foodName: '宁夏手抓羊肉与八宝茶/蒿子面',
        foodEmoji: '🍵',
        cultureName: '远古贺兰山太阳神岩画与引黄古灌区遗产',
        theme: 'desert',
        location: '银川市位于宁夏平原中部，西倚贺兰山，东临黄河，城内湖泊湿地星罗棋布，素有“七十二连湖”之称。',
        scenery: '贺兰山岩画记录了三千至一万年前远古先民凿刻在岩石上的太阳神、奔鹿和放牧图；沙湖景区更是将江南水乡芦苇荡与大漠金沙融为一幅画卷！',
        food: '放了红枣、枸杞、核桃仁、桂圆、芝麻、葡萄干和冰糖的“宁夏盖碗八宝茶”，香甜滋润；还有软烂鲜美的宁夏滩羊手抓肉。',
        culture: '两千多年来宁夏人民开凿秦渠、汉渠、唐徕渠引黄河水灌溉农田，宁夏引黄古灌区已被列入世界灌溉工程遗产。'
      },
      {
        name: '中卫市',
        badge: '沙漠水城·枸杞之乡',
        sceneryName: '沙坡头国家级自然保护区与66号公路黄河大峡谷',
        sceneryEmoji: '🐪',
        foodName: '中宁红枸杞糕点与中卫蒿子面/黄河鲤鱼',
        foodEmoji: '🍒',
        cultureName: '“麦草方格”治沙世界奇迹与王维千古边塞诗',
        theme: 'desert',
        location: '中卫市位于宁夏中西部，处于腾格里沙漠东南缘与黄河交汇处。',
        scenery: '在沙坡头景区，一边是浩瀚无垠的腾格里金色大沙漠，一边是奔流不息的母亲河黄河！唐代大诗人王维在这里写下了千古名句“大漠孤烟直，长河落日圆”！',
        food: '中卫中宁县是举世闻名的“中国枸杞之乡”，粒大肉厚、甘甜如蜜；还有寓意长寿吉祥的民间传统中卫蒿子面。',
        culture: '为了防止流沙掩埋包兰铁路，治沙英雄和科学家们发明了1米×1米的“麦草方格”固沙法，用普通麦草牢牢锁住流动沙漠，获得了联合国“全球500佳”环境奖！'
      }
    ]
  },
  {
    adcode: '650000',
    name: '新疆维吾尔自治区',
    shortName: '新',
    capital: '乌鲁木齐市',
    region: '西北',
    icon: '🍇',
    slogan: '三山夹两盆地宽，天山南北瓜果甜！',
    overview: '新疆维吾尔自治区位于祖国西北边陲，面积约166万平方公里，占中国陆地总面积的六分之一，是我国面积最大的省级行政区！地形呈现神奇的“三山夹两盆”（阿尔泰山、准噶尔盆地、天山、塔里木盆地、昆仑山）！',
    cities: [
      {
        name: '乌鲁木齐市',
        badge: '自治区首府·亚心之都',
        sceneryName: '新疆国际大巴扎与天山大峡谷/新疆博物馆',
        sceneryEmoji: '🕌',
        foodName: '新疆大盘鸡与烤馕/手抓饭/烤羊肉串',
        foodEmoji: '🥙',
        cultureName: '五星出东方利中国汉代织锦国宝与丝路歌舞',
        theme: 'desert',
        location: '乌鲁木齐市位于新疆中部、天山北麓、准噶尔盆地南缘，是全世界距离海洋最远的内陆大城市，也是亚洲大陆地理中心所在地。',
        scenery: '热闹非凡的新疆国际大巴扎摆满了精美的艾德莱斯绸、冬不拉琴、手鼓和上百种葡萄干巴旦木干果！新疆博物馆里更珍藏着绣有汉字的汉代国宝“五星出东方利中国”锦护膊。',
        food: '金黄焦香、撒满芝麻的新疆烤馕，用胡萝卜、洋葱、羊肉焖出的喷香手抓饭，还有土豆软糯、皮带面筋道的新疆大盘鸡！',
        culture: '“乌鲁木齐”意为“优美的牧场”，维吾尔族木卡姆艺术、哈萨克族阿肯弹唱等各族文化在此绚丽绽放。'
      },
      {
        name: '吐鲁番市',
        badge: '火洲葡萄城',
        sceneryName: '葡萄沟与火焰山/坎儿井民俗园',
        sceneryEmoji: '🍇',
        foodName: '无核白葡萄与吐鲁番烤包子/桑葚干',
        foodEmoji: '🥟',
        cultureName: '中国古代三大工程之一“地下万里长城”坎儿井',
        theme: 'desert',
        location: '吐鲁番市位于天山东部山间盆地，其中的艾丁湖湖面低于海平面154.31米，是中国陆地海拔最低的地方！这里日照极强、昼夜温差大，瓜果糖分极高。',
        scenery: '小学语文课本里的《葡萄沟》就在吐鲁番！一串串五光十色的葡萄挂满绿叶凉棚，晾房里制成的葡萄干甜如蜜；旁边的赤红色火焰山正是《西游记》孙悟空三借芭蕉扇故事的取景地！',
        food: '晶莹翠绿、没有籽的吐鲁番无核白葡萄，还有在馕坑里烤得外皮金黄酥脆、里面羊肉洋葱爆汁的吐鲁番烤包子！',
        culture: '为了不让珍贵的天山融水在炎热的沙漠地面蒸发，古代劳动人民在地下挖出总长5000多公里的暗渠——“坎儿井”，把雪水引到农田，与万里长城、京杭大运河并称中国古代三大工程！'
      },
      {
        name: '伊犁哈萨克自治州',
        badge: '塞外江南·天马之乡',
        sceneryName: '那拉提空中草原与喀拉峻花海/赛里木湖',
        sceneryEmoji: '🐎',
        foodName: '伊犁手工冰淇淋与熏马肉/奶茶包尔萨克',
        foodEmoji: '🍦',
        cultureName: '天山世界自然遗产与昭苏天马文化',
        theme: 'mountain',
        location: '伊犁河谷位于天山山脉西部，三面环山向西敞开，承接来自大西洋的湿润气流，雨水充沛、森林草原辽阔，被誉为“瀚海湿岛”与“塞外江南”。',
        scenery: '那拉提“空中草原”和喀拉峻草原绿草如茵、野花遍地，雪峰下云杉挺拔；紧邻的高山湖泊赛里木湖清澈湛蓝，被称为“大西洋最后一滴眼泪”，夏天还有浪漫的紫色薰衣草花田！',
        food: '用纯鲜牛奶、鸡蛋和伊犁野生蜂蜜手工搅拌制成的“伊犁老味冰淇淋”，还有金黄蓬松的炸果子“包尔萨克”配咸奶茶。',
        culture: '昭苏草原被誉为“中国天马之乡”，万马奔腾踏水而过的场景气势如虹，展现了草原民族豪迈进取的精神。'
      },
      {
        name: '阿勒泰地区',
        badge: '人类滑雪起源地',
        sceneryName: '喀纳斯湖与禾木童话木屋村/可可托海',
        sceneryEmoji: '🎿',
        foodName: '冷水狗鱼与布尔津格瓦斯/大尾羊手抓肉',
        foodEmoji: '🐟',
        cultureName: '万年彩绘滑雪岩画与功勋矿坑科学传奇',
        theme: 'snow',
        location: '阿勒泰地区位于新疆最北部，阿尔泰山脉南麓，额尔齐斯河自东向西流过，是中国唯一流入北冰洋水系的河流！',
        scenery: '喀纳斯湖像一颗变色翡翠镶嵌在泰加林深处，秋天金黄的白桦林与禾木村尖顶小木屋美如童话；冬天这里粉雪绵密，是世界级的滑雪天堂！',
        food: '肉质紧实少刺的额尔齐斯河冷水烤狗鱼，以及用蜂蜜和啤酒花发酵的酸甜饮品“格瓦斯”。',
        culture: '在阿勒泰墩德布拉克洞穴发现了距今一万多年的古人脚踏毛皮滑雪板狩猎岩画，证实阿勒泰是“人类滑雪最早起源地”！可可托海三号矿坑更为我国“两弹一星”航天事业立下了汗马功劳。'
      }
    ]
  },
  {
    adcode: '710000',
    name: '台湾省',
    shortName: '台',
    capital: '台北市',
    region: '华东',
    icon: '🏝️',
    slogan: '宝岛台湾隔海望，日月潭美阿里山！',
    overview: '台湾省位于祖国东南海域，隔台湾海峡与福建省相望，包括台湾本岛及兰屿、绿岛、钓鱼岛等附属岛屿和澎湖列岛，是中国第一大岛！北回归线横穿宝岛中南部，森林茂密，物产富饶，自古就是祖国不可分割的神圣宝岛！',
    cities: [
      {
        name: '台北市',
        badge: '台湾省会·宝岛都会',
        sceneryName: '台北故宫博物院与台北101摩天大楼/阳明山',
        sceneryEmoji: '🏙️',
        foodName: '台湾卤肉饭与珍珠奶茶/红烧牛肉面',
        foodEmoji: '🧋',
        cultureName: '翠玉白菜毛公鼎中华国宝与夜市美食民俗',
        theme: 'modern',
        location: '台北市位于台湾岛北部的台北盆地中央，淡水河及其支流基隆河、新店溪穿流而过，四周有大屯火山群（阳明山）环绕。',
        scenery: '高达508米的“台北101大楼”造型像一节节向上生长的劲竹，寓意节节高升，楼内还有一颗重达660吨的金色大铁球（风阻尼器）用来抵抗台风和地震！台北故宫博物院里珍藏着巧夺天工的“翠玉白菜”、“肉形石”和西周“毛公鼎”等中华国宝。',
        food: '淋上慢火熬制香浓肉燥的台湾卤肉饭、Q弹黑糖珍珠配鲜奶的珍珠奶茶，还有汤浓肉烂的台北红烧牛肉面和凤梨酥！',
        culture: '台北的大街小巷以大陆各省市命名（如长安东路、南京东路、重庆南路、成都路），春节舞龙舞狮、元宵放天灯等习俗与大陆血脉相连、一脉相承。'
      },
      {
        name: '新北市',
        badge: '山海传奇',
        sceneryName: '野柳地质公园（女王头）与平溪十分瀑布/九份山城',
        sceneryEmoji: '🪨',
        foodName: '九份芋圆与淡水阿给/铁蛋',
        foodEmoji: '🍧',
        cultureName: '海蚀地貌科学奇观与平溪元宵天灯祈福',
        theme: 'coastal',
        location: '新北市环绕台北市四周，北临东海，拥有漫长曲折的海岸线与秀丽的山地溪谷。',
        scenery: '野柳地质公园的海边岩石经过千万年海浪拍打和海风侵蚀，形成了惟妙惟肖的“女王头”、“仙女鞋”和“烛台石”！平溪的十分大瀑布水雾弥漫，山城九份石阶蜿蜒、红灯笼高挂。',
        food: '用槟榔心芋头和地瓜粉手工揉制、软糯Q弹的“九份芋圆”，还有淡水老街特色的“阿给”（油豆腐包粉丝）和香Q铁蛋。',
        culture: '每年元宵节，平溪都会举行盛大的放天灯（孔明灯）活动，人们在纸灯上写下平安团圆的心愿升向夜空。'
      },
      {
        name: '台中市',
        badge: '宝岛之心·日月明珠',
        sceneryName: '日月潭风景区（南投紧邻）与高美湿地',
        sceneryEmoji: '🏞️',
        foodName: '台中太阳饼与大甲芋头酥/珍珠奶茶发源地',
        foodEmoji: '🥮',
        cultureName: '小学课文《日月潭》光华岛与湿地生态保护',
        theme: 'water',
        location: '台中市位于台湾岛中西部，东依雄伟的中央山脉，西临台湾海峡，气候温和晴朗，是台湾中部交通与文化枢纽。',
        scenery: '小学语文课本里的《日月潭》就在台湾中部山区！湖中央的小岛（光华岛/拉鲁岛）把湖水分成两半，北边像圆圆的太阳叫“日潭”，南边像弯弯的月亮叫“月潭”！海边的高美湿地更有浪漫的大风车与落日倒影。',
        food: '外皮多层酥脆、麦芽糖内馅香甜不粘牙的“台中太阳饼”，紫香绵密的大甲芋头酥，台中更是风靡全球的珍珠奶茶发源地之一！',
        culture: '日月潭畔世代生活着勤劳善良的高山族（邵族等）同胞，杵音歌舞清脆悦耳，传递着对大自然的敬畏与热爱。'
      },
      {
        name: '嘉义市',
        badge: '阿里山门户',
        sceneryName: '阿里山国家森林游乐区与北回归线标志塔',
        sceneryEmoji: '🚂',
        foodName: '嘉义火鸡肉饭与阿里山爱玉冰/方块酥',
        foodEmoji: '🍚',
        cultureName: '阿里山高山森林小火车与神木云海五奇',
        theme: 'mountain',
        location: '嘉义位于台湾省中南部、嘉南平原北端，东接阿里山山脉，北回归线（北纬23°26′）正好从嘉义穿过！',
        scenery: '享誉中外的阿里山以“日出、云海、晚霞、森林、高山铁路”五奇闻名！乘坐红色复古森林小火车穿梭在千年红桧巨木林间，清晨在祝山看云海日出，美得像仙境一样；嘉义还建有世界上第一座北回归线标志塔。',
        food: '铺满细嫩火鸡肉丝、淋上香葱鸡油卤汁的“嘉义火鸡肉饭”，还有用高山野生爱玉籽搓洗凝结而成的清凉柠檬爱玉冰！',
        culture: '“高山青，涧水蓝”，阿里山的森林生态与高山茶文化闻名遐迩，北回归线天文地理科普馆更是小朋友认识太阳直射点移动规律的好去处。'
      },
      {
        name: '台南市',
        badge: '文化古都',
        sceneryName: '赤嵌楼与安平古堡/亿载金城',
        sceneryEmoji: '🏯',
        foodName: '台南担仔面与棺材板/虱目鱼粥',
        foodEmoji: '🍜',
        cultureName: '民族英雄郑成功收复台湾历史与闽南古庙文化',
        theme: 'palace',
        location: '台南市位于台湾岛西南部、嘉南平原南端，西临台湾海峡，土地肥沃，是台湾最早开发的历史名城。',
        scenery: '赤嵌楼飞檐雕栏古色古香，安平古堡和延平郡王祠庄严肃穆，共同铭记着1662年民族英雄郑成功驱逐荷兰殖民者、收复宝岛台湾的伟大功绩！',
        food: '鲜虾熬汤、放上肉燥和甜虾的“度小月台南担仔面”，把厚吐司炸得金黄酥脆、挖空装入奶油海鲜浓汤的趣味小吃“棺材板”，还有鲜美的虱目鱼肚粥。',
        culture: '台南保留着全台最早的孔庙（“全台首学”），传统剪粘工艺、南管音乐与福建泉州、漳州一模一样，见证了两岸同根同源的深厚历史。'
      },
      {
        name: '高雄市',
        badge: '宝岛南都·海港明珠',
        sceneryName: '西子湾与莲池潭龙虎塔/爱河风光',
        sceneryEmoji: '🚢',
        foodName: '高雄木瓜牛奶与海之冰水果船/旗津烤小卷',
        foodEmoji: '🥭',
        cultureName: '世界级天然良港航运文化与美浓油纸伞非遗',
        theme: 'coastal',
        location: '高雄市位于台湾本岛西南部沿海，扼守台湾海峡南口，阳光充足，是台湾最大的港口城市。',
        scenery: '爱河穿城而过，莲池潭上的龙虎双塔色彩鲜艳；傍晚在西子湾和旗津半岛欣赏台湾海峡金色夕阳与万吨巨轮进出高雄港，气势壮阔！',
        food: '用熟透的高雄红肉木瓜加鲜奶打成的浓醇木瓜牛奶，铺满芒果、莲雾、凤梨、芭乐等宝岛热带水果的超大碗刨冰，还有现烤旗津鲜鱿鱼（小卷）。',
        culture: '高雄美浓客家村传承着精致的传统手工油纸伞技艺，寓意“早生贵子、团圆美满”。'
      },
      {
        name: '花莲县',
        badge: '大山大海·峡谷奇观',
        sceneryName: '太鲁阁大峡谷与清水断崖/七星潭',
        sceneryEmoji: '🌊',
        foodName: '花莲麻糬与扁食（馄饨）/剥皮辣椒鸡汤',
        foodEmoji: '🍡',
        cultureName: '太平洋板块碰撞地理奇观与阿美族丰年祭',
        theme: 'coastal',
        location: '花莲县位于台湾省东部海岸，西靠高耸的中央山脉，东临浩瀚的太平洋，是台湾面积最大的县。',
        scenery: '清水断崖绝壁高达上千米，直插蔚蓝色的太平洋海面，海水呈现出深蓝、浅蓝与翠绿的渐变层次！太鲁阁大峡谷则是立雾溪历经百万年切穿厚厚的大理石岩层形成的壮丽峡谷。',
        food: '用花莲优质糯米手工捣制、包满花生红豆芝麻馅的软糯“花莲麻糬（mó jí）”，还有皮薄馅鲜的液香扁食。',
        culture: '花莲让小朋友直观看到地质板块挤压抬升造就的“高山紧贴深海”奇观，当地阿美族同胞的丰年祭歌舞更是热情洋溢。'
      },
      {
        name: '屏东县',
        badge: '宝岛最南端·恒春半岛',
        sceneryName: '鹅銮鼻灯塔与垦丁国家公园/国立海洋生物博物馆',
        sceneryEmoji: '🗼',
        foodName: '屏东黑珍珠莲雾与恒春绿豆蒜/爱文芒果',
        foodEmoji: '🍎',
        cultureName: '东亚之光百年白色灯塔与热带珊瑚礁海洋科普',
        theme: 'coastal',
        location: '屏东县位于台湾岛最南端，三面临海（西临台湾海峡、南临巴士海峡、东临太平洋），恒春半岛四季如夏。',
        scenery: '矗立在台湾最南端岬角上的“鹅銮鼻灯塔”通体洁白，守望着巴士海峡与太平洋，被称为“东亚之光”！屏东海生馆更有巨型海底隧道和可爱的白鲸、企鹅。',
        food: '色泽暗红发亮、清脆多汁的“屏东黑珍珠莲雾”，香甜浓郁的枋山爱文芒果，还有去皮绿豆熬煮的甜汤“恒春绿豆蒜”（里面没有大蒜，只因绿豆仁像蒜末而得名）！',
        culture: '恒春古城四座城门保存完好，民谣《思想起》伴着月琴声传唱百年，诉说着先民渡海垦荒的奋斗故事。'
      },
      {
        name: '桃园市',
        badge: '千塘之乡·航空门户',
        sceneryName: '大溪老街与石门水库/拉拉山巨木群',
        sceneryEmoji: '✈️',
        foodName: '大溪豆干与龙冈米干/水蜜桃',
        foodEmoji: '🍑',
        cultureName: '埤塘水利灌溉智慧与木艺雕刻文化',
        theme: 'water',
        location: '桃园市位于台湾岛西北部台地，因早年遍植桃花而得名，台地上分布着上千口人工蓄水池塘，被称为“千塘之乡”。',
        scenery: '石门水库山水相映，秋季枫林如火；拉拉山保护区里生长着树龄上千年的红桧巨木群，大溪老街则保存着精美的巴洛克式牌楼。',
        food: '卤得乌黑发亮、豆香浓郁的“大溪黑豆干”，还有拉拉山香甜多汁的高山水蜜桃。',
        culture: '先民在桃园台地上开挖数千口“埤塘”蓄水灌溉农田，展现了因地制宜的水利工程智慧。'
      },
      {
        name: '新竹市',
        badge: '科技风城',
        sceneryName: '新竹都城隍庙与十七公里海岸线/科学园区',
        sceneryEmoji: '🌬️',
        foodName: '新竹米粉与新竹贡丸汤/柿饼',
        foodEmoji: '🍜',
        cultureName: '九降风天然风干美食智慧与现代半导体科技',
        theme: 'coastal',
        location: '新竹市位于台湾岛西北部海岸，地形呈喇叭口朝向台湾海峡，秋冬季节东北季风（九降风）强劲，故有“风城”之称。',
        scenery: '十七公里海岸线有美丽的红树林生态公园、彩虹桥和香山湿地招潮蟹；新竹科学园区则是闻名的科技研发高地。',
        food: '利用新竹强劲天然秋风吹干的“新竹炊粉（米粉）”筋道爽滑，再配上一碗弹性十足的“新竹贡丸汤”和金黄甘い的新埔柿饼！',
        culture: '新竹人把强劲的“九降风”变成了晒米粉、晒柿饼的天然帮手，体现了顺应自然的民间生活智慧。'
      },
      {
        name: '宜兰县',
        badge: '兰阳平原·龟山岛',
        sceneryName: '龟山岛赏鲸与兰阳博物馆/太平山森林',
        sceneryEmoji: '🐋',
        foodName: '宜兰三星葱油饼与牛舌饼/包心粉圆',
        foodEmoji: '🥞',
        cultureName: '海底温泉活火山岛科普与歌仔戏发源地',
        theme: 'coastal',
        location: '宜兰县位于台湾岛东北部，三面环山、东临太平洋，中间是三角形的肥沃兰阳平原。',
        scenery: '太平洋海面上浮着一座形状酷似大乌龟的火山岛——“龟山岛”，周围海域常有成群的海豚跳跃伴游！造型像海边单面山岩石的兰阳博物馆也极具建筑美感。',
        food: '用葱白修长、清甜多汁的“宜兰三星葱”现烙的三星葱油饼，还有薄脆香甜的宜兰牛舌饼和罗东包心粉圆。',
        culture: '宜兰是闽南传统曲艺“歌仔戏”的发源地之一，与福建芗剧同根同源，深受两岸长辈与戏迷喜爱。'
      },
      {
        name: '台东县',
        badge: '太平洋日出之乡',
        sceneryName: '三仙台跨海八拱桥与伯朗大道金色稻田/绿岛',
        sceneryEmoji: '🌾',
        foodName: '池上便当（池上米）与台东释迦果/洛神花茶',
        foodEmoji: '🍱',
        cultureName: '花东纵谷优质稻米农耕文化与热气球嘉年华',
        theme: 'coastal',
        location: '台东县位于台湾省东南部，介于中央山脉与海岸山脉之间（花东纵谷南段），东临太平洋，阳光纯净。',
        scenery: '三仙台海边有一座像波浪巨龙一样的八拱跨海步桥连接离岸珊瑚礁小岛；池上乡一望无际的金色稻田与鹿野高台五彩斑斓的热气球嘉年华美如画卷！',
        food: '用纯净山泉水灌溉、木盒盛装的“池上米便当”米粒饱满Q弹，还有形状像佛头、果肉如冰淇淋般香甜的台东番荔枝（释迦果）！',
        culture: '花东纵谷肥沃的冲积土壤孕育了宝岛最香甜的稻米，让小朋友体会“一粥一饭，当思来处不易”的农耕文化。'
      }
    ]
  },
  {
    adcode: '810000',
    name: '香港特别行政区',
    shortName: '港',
    capital: '中西区',
    region: '华东',
    icon: '🌺',
    slogan: '紫荆花开维港美，东方之珠放光辉！',
    overview: '香港特别行政区位于南海之滨、珠江口东侧，北接广东省深圳市，由香港岛、九龙、新界和周围260多个岛屿组成。市花是鲜艳的紫荆花，被誉为璀璨的“东方之珠”！',
    cities: [
      {
        name: '中西区',
        badge: '维港核心·太平山巅',
        sceneryName: '太平山顶缆车与维多利亚港/金紫荆广场',
        sceneryEmoji: '🌃',
        foodName: '港式丝袜奶茶与菠萝油/云吞面',
        foodEmoji: '🍍',
        cultureName: '1997香港回归祖国金紫荆雕塑与百年叮叮车',
        theme: 'modern',
        location: '中西区位于香港岛西北部，北临水深港阔的天然良港——维多利亚港，背靠太平山。',
        scenery: '乘坐拥有百余年历史的红色山顶缆车登上太平山凌霄阁，可以将维多利亚港两岸摩天大楼与穿梭的天星小轮尽收眼底！湾仔海畔的金紫荆广场上，盛开的永远盛开的紫荆花雕塑迎风闪耀。',
        food: '外皮酥脆金黄、夹着冰镇黄油片的“港式菠萝油”（里面没有菠萝，因酥皮格纹像菠萝而得名！），还有弹牙鲜虾云吞面和鸡蛋仔。',
        culture: '1997年7月1日中华人民共和国恢复对香港行使主权，港岛街头双层“叮叮车”与中式茶楼、现代金融中心交织出独特的香港风采。'
      },
      {
        name: '油尖旺区',
        badge: '九龙活力之窗',
        sceneryName: '香港太空馆与星光大道/香港故宫文化博物馆',
        sceneryEmoji: '🪐',
        foodName: '咖喱鱼蛋与港式碗仔翅/杨枝甘露',
        foodEmoji: '🥭',
        cultureName: '西九文化区故宫国宝展与功夫电影文化',
        theme: 'modern',
        location: '油尖旺区位于九龙半岛南端，三面临海，与香港岛隔维多利亚港相望。',
        scenery: '尖沙咀海滨长廊上有外形像半颗巨大白鸡蛋的“香港太空馆”天象厅，西九文化区里新落成的“香港故宫文化博物馆”展出大量来自北京故宫的珍贵文物！',
        food: 'Q弹入味的街头咖喱鱼蛋，还有用芒果、西柚、西米和椰奶调制的经典港式甜品“杨枝甘露”！',
        culture: '香港科学馆、太空馆与香港故宫文化博物馆紧邻维港，是小朋友体验天文科学与中华传统文化的热门课堂。'
      },
      {
        name: '离岛区',
        badge: '山海生态大屿山',
        sceneryName: '大屿山昂坪360缆车与香港迪士尼乐园',
        sceneryEmoji: '🎢',
        foodName: '大澳山水豆腐花与炭烤鸡蛋仔',
        foodEmoji: '🍮',
        cultureName: '大澳百年水上棚屋渔村与中华白海豚保护',
        theme: 'coastal',
        location: '离岛区包括香港最大岛屿——大屿山及南丫岛、长洲等二十多个岛屿，也是港珠澳大桥香港口岸和香港国际机场所在地。',
        scenery: '在大屿山可以畅玩奇妙的香港迪士尼乐园，或搭乘水晶缆车俯瞰碧海青山；大澳渔村保留着建在水道上的高脚棚屋，近海还能看到粉红色的“中华白海豚”！',
        food: '滑嫩清甜的大澳山水豆腐花、软糯的茶果和长洲大鱼蛋。',
        culture: '长洲太平清醮等国家级非物质文化遗产民俗活动热闹非凡，展现了香港深厚的传统渔村与海岛文化根基。'
      }
    ]
  },
  {
    adcode: '820000',
    name: '澳门特别行政区',
    shortName: '澳',
    capital: '大堂区',
    region: '华东',
    icon: '🪷',
    slogan: '盛世莲花映濠江，大三巴前蛋挞香！',
    overview: '澳门特别行政区位于珠江口西侧，北邻广东省珠海市，东与香港隔海相望，由澳门半岛、氹仔岛、路环岛和路氹城组成。区花是纯洁高雅的莲花！',
    cities: [
      {
        name: '花王堂区',
        badge: '世遗历史城区',
        sceneryName: '大三巴牌坊与大炮台/澳门博物馆',
        sceneryEmoji: '🏛️',
        foodName: '澳门葡式蛋挞与猪扒包/杏仁饼',
        foodEmoji: '🥧',
        cultureName: '世界遗产澳门历史城区中西建筑交融',
        theme: 'palace',
        location: '花王堂区（圣安多尼堂区）位于澳门半岛西部，地势起伏，古老街巷纵横交错。',
        scenery: '世界文化遗产“大三巴牌坊”是澳门最著名的标志性建筑，上面不仅有西方浮雕，还刻有中文汉字和象征中国的牡丹花与菊花图案！旁边的大炮台山顶则是澳门博物馆。',
        food: '刚出炉焦香酥脆、蛋奶内馅嫩滑的“澳门葡式蛋挞”，夹着整块香煎猪排的脆皮猪扒包，还有绿豆粉制成的炭烧杏仁饼！',
        culture: '四百多年来中西建筑、饮食与民俗在澳门和平共处、交相辉映，大三巴牌坊正是东西方文化交流的活见证。'
      },
      {
        name: '大堂区',
        badge: '金莲花广场·科学馆',
        sceneryName: '金莲花广场与澳门科学馆/澳门旅游塔',
        sceneryEmoji: '🪷',
        foodName: '木糠布甸与竹升虾子捞面',
        foodEmoji: '🍜',
        cultureName: '1999澳门回归祖国盛世莲花与“澳科一号”卫星',
        theme: 'modern',
        location: '大堂区位于澳门半岛东南部，濒临珠江口海湾，视野开阔。',
        scenery: '金莲花广场中央屹立着1999年国务院赠送的“盛世莲花”大型铸铜贴金雕塑，寓意澳门永远繁荣昌盛；海边由建筑大师贝聿铭设计的银色海螺形“澳门科学馆”更是科普胜地！',
        food: '用玛丽饼干碎和淡奶油层层冷冻而成的甜品“木糠布甸”，还有用大竹竿压面制成的传统竹升云吞面。',
        culture: '1999年12月20日澳门回到祖国怀抱，《七子之歌》感人至深；如今澳门还与内地联合研制发射了“澳科一号”科学卫星！'
      },
      {
        name: '风顺堂区',
        badge: '妈阁寻源',
        sceneryName: '妈阁庙与郑家大屋/海事博物馆',
        sceneryEmoji: '🏮',
        foodName: '水蟹粥与双皮炖奶/凤凰卷',
        foodEmoji: '🦀',
        cultureName: '五百年妈祖航海文化与《盛世危言》郑家大屋',
        theme: 'coastal',
        location: '风顺堂区位于澳门半岛西南部南湾湖畔，依山傍海，风光秀丽。',
        scenery: '已有五百多年历史的“妈阁庙”是澳门现存最古老的庙宇，背山面海、古树参天；郑家大屋则是岭南风格与西方装饰完美结合的百年大宅。',
        food: '用膏蟹、肉蟹、水蟹三种螃蟹同熬的鲜甜“澳门水蟹粥”，还有酥脆的紫菜肉松凤凰卷。',
        culture: '澳门的葡文名称“Macau”就源于渔民对“妈阁”（Maa Gok）的称呼，证明中华海洋文化自古在此扎根繁衍。'
      }
    ]
  }
]

// 针对各省非省会/其他地级市或区县的特色补充字典，保证地图上任何一个城市点开都有地道准确的专属风物
export const EXTRA_CITY_HIGHLIGHTS = {
  // 河北
  '唐山市': { scenery: '清东陵与南湖生态旅游区', food: '唐山棋子烧饼与迁西板栗', culture: '评剧发源地与唐山皮影非遗', emoji: '🌰' },
  '邯郸市': { scenery: '娲皇宫与广府古城/武灵丛台', food: '一篓油水饺与大名烧饼', culture: '中国成语典故之都（邯郸学步、完璧归赵等上千条成语源于此）', emoji: '📖' },
  '保定市': { scenery: '白洋淀万亩荷花大观园与野三坡', food: '保定驴肉火烧与白洋淀咸鸭蛋', culture: '直隶总督署历史与雄安新区未来之城', emoji: '🪷' },
  '张家口市': { scenery: '崇礼冬奥滑雪场与大境门长城', food: '柴沟堡熏肉与莜面窝窝', culture: '北京冬奥会雪上项目赛区与张库大道文化', emoji: '🎿' },
  // 山东
  '烟台市': { scenery: '蓬莱阁景区与长岛国家级自然保护区', food: '烟台大苹果与蓬莱小面/鲅鱼水饺', culture: '八仙过海神话传说与北方水果之乡', emoji: '🍎' },
  '威海市': { scenery: '刘公岛与成山头海滨公园', food: '威海海菜包子与葱烧海参', culture: '千里山海生态海岸与精致海滨人居文化', emoji: '🌊' },
  '潍坊市': { scenery: '世界风筝博物馆与十笏园/青州古城', food: '潍坊肉火烧与朝天锅/青州蜜桃', culture: '世界风筝之都与杨家埠木版年画非遗', emoji: '🪁' },
  '淄博市': { scenery: '周村古商城与齐文化博物馆', food: '淄博小饼卷烧烤与周村烧饼/博山酥锅', culture: '春秋战国齐国故都与蹴鞠（古代足球）起源地', emoji: '⚽' },
  // 江苏
  '无锡市': { scenery: '太湖鼋头渚樱花谷与惠山古镇', food: '无锡酱排骨与太湖三白/小笼包', culture: '阿炳《二泉映月》二胡名曲与惠山泥人非遗', emoji: '🌸' },
  '徐州市': { scenery: '云龙湖风景区与汉文化景区', food: '徐州地锅鸡与把子肉/烙馍卷馓子', culture: '两汉文化发源地与大风歌历史遗迹', emoji: '🏛️' },
  '常州市': { scenery: '中华恐龙园与天目湖山水园', food: '天目湖砂锅鱼头与常州大麻糕/银丝面', culture: '常州梳篦非遗技艺与智造名城', emoji: '🦖' },
  '南通市': { scenery: '狼山风景区与濠河环城风光带', food: '南通文蛤饼与如皋蟹黄包', culture: '中国近代第一城（张謇创办中国第一座公共博物馆南通博物苑）', emoji: '🏛️' },
  // 浙江
  '温州市': { scenery: '雁荡山世界地质公园与楠溪江/江心屿', food: '温州瘦肉丸与灯盏糕/鱼饼', culture: '东南第一山雁荡奇峰与南戏故里文化', emoji: '⛰️' },
  '绍兴市': { scenery: '鲁迅故里（百草园与三味书屋）与兰亭', food: '绍兴茴香豆与梅干菜焖肉/奶油小攀', culture: '书圣王羲之《兰亭集序》与大文豪鲁迅童年故乡', emoji: '🖋️' },
  '金华市': { scenery: '横店影视城与双龙洞（叶圣陶课文《记金华的双龙洞》）', food: '金华酥饼与东阳沃面/义乌红糖麻花', culture: '课本名篇双龙洞溶洞奇观与义乌世界小商品之都', emoji: '🕳️' },
  '舟山市': { scenery: '普陀山海岛风光与朱家尖十里金沙', food: '舟山海鲜面与清蒸东海带鱼', culture: '千岛之城与东海海洋渔业文化', emoji: '🏝️' },
  // 福建
  '泉州市': { scenery: '清源山老君岩与开元寺东西塔/洛阳桥', food: '泉州面线糊与四果汤/肉粽', culture: '世界遗产“宋元中国的世界海洋商贸中心”与提线木偶戏', emoji: '⛵' },
  '漳州市': { scenery: '东山岛风动石与南靖云水谣土楼', food: '漳州卤面与片仔癀甘蔗汁/手抓面', culture: '中国水仙花之乡与漳州木偶雕刻非遗', emoji: '🌼' },
  // 河南
  '南阳市': { scenery: '南阳卧龙岗武侯祠与老界岭自然保护区', food: '南阳新野板面与方城烩面', culture: '诸葛亮躬耕南阳故事与医圣张仲景故里', emoji: '🌿' },
  '焦作市': { scenery: '云台山世界地质公园红石峡', food: '温县铁棍山药糕与闹汤驴肉', culture: '愚公移山故事发源地与太极拳发源地', emoji: '⛰️' },
  // 湖北
  '襄阳市': { scenery: '古隆中景区与襄阳古城墙/唐城', food: '襄阳牛肉面与孔明菜', culture: '刘备三顾茅庐历史佳话与孟浩然《春晓》创作地', emoji: '🏯' },
  '荆州市': { scenery: '荆州古城墙与荆州博物馆/洪湖湿地', food: '荆州鱼糕与公安锅盔', culture: '楚文化中心与三国文化名城', emoji: '🛡️' },
  '恩施土家族苗族自治州': { scenery: '恩施大峡谷（一炷香）与屏山峡谷悬浮船', food: '恩施合渣与炕小土豆/土家酱香饼', culture: '世界硒都与土家族民歌《龙船调》故乡', emoji: '🏞️' },
  // 广东
  '佛山市': { scenery: '佛山祖庙与顺德清晖园/西樵山', food: '顺德双皮奶与伦教糕/陈村粉', culture: '世界美食之都（顺德）、南派武术与醒狮陶艺之乡', emoji: '🦁' },
  '东莞市': { scenery: '虎门林则徐纪念馆与松山湖科学城', food: '东莞烧鹅濑粉与道滘裹蒸粽', culture: '虎门销烟爱国历史遗址与中国散裂中子源科学大装置', emoji: '🔬' },
  '汕头市': { scenery: '南澳岛青澳湾北回归线自然之门与小公园开埠区', food: '潮汕牛肉火锅与汕头肠粉/甘草水果', culture: '百载商埠骑楼文化与海岛风力发电生态', emoji: '🏝️' },
  // 四川
  '绵阳市': { scenery: '江油李白纪念馆与越王楼/七曲山', food: '绵阳米粉与梓潼片粉/酥饼', culture: '中国科技城（两弹城）与诗仙李白青少年成长故里', emoji: '🚀' },
  '自贡市': { scenery: '自贡恐龙博物馆与中华彩灯大世界', food: '自贡冷吃兔与火边子牛肉', culture: '世界级侏罗纪恐龙化石宝库与“天下第一灯”自贡灯会', emoji: '🦕' },
  '甘孜藏族自治州': { scenery: '稻城亚丁三神山与泸定桥/贡嘎雪山', food: '甘孜酥油茶与松茸炖鸡', culture: '课本《飞夺泸定桥》红色英雄传奇与康巴高原风情', emoji: '🏔️' },
  '凉山彝族自治州': { scenery: '西昌卫星发射中心与泸沽湖/邛海湿地', food: '西昌火盆烧烤与苦荞饼', culture: '嫦娥探月与北斗卫星发射摇篮及彝族火把节', emoji: '🛰️' }
}

// 根据省份与城市名，获取完整的城市四维百科数据（含至少 2 张定制绘本 SVG 插画大图）
export function getCityEncyclopedia(province, cityName) {
  if (!province) return null
  const cleanName = (cityName || '').trim() || province.capital
  const found = (province.cities || []).find(
    c => c.name === cleanName || cleanName.includes(c.name) || c.name.includes(cleanName)
  )

  let item
  if (found) {
    item = { ...found }
  } else {
    const extra = EXTRA_CITY_HIGHLIGHTS[cleanName]
    const scName = extra?.scenery || `${cleanName}城市公园与历史文化街区`
    const fdName = extra?.food || `${cleanName}传统特色风味美食与非遗糕点`
    const culName = extra?.culture || `${province.name}地域历史文脉与民俗非遗`
    item = {
      name: cleanName,
      badge: `${province.shortName}地名城`,
      sceneryName: scName,
      sceneryEmoji: extra?.emoji || province.icon || '🏞️',
      foodName: fdName,
      foodEmoji: '🍜',
      cultureName: culName,
      theme: 'mountain',
      location: `${cleanName}位于${province.name}境内，属于${province.region}地区。这里山川秀美、交通便利，与省会${province.capital}共同构成了${province.name}多姿多彩的地理画卷。`,
      scenery: `来到${cleanName}，最值得探访的名胜风景有【${scName}】！这里自然风光与人文景观交相辉映，四季景色宜人，非常适合小朋友和爸爸妈妈一起实地游览探索。`,
      food: `${cleanName}的特色美食让人赞不绝口，代表美味有【${fdName}】！选用当地新鲜食材与传统手艺制作，味道地道醇厚，充满了浓郁的${province.shortName}味烟火气。`,
      culture: `${cleanName}承载着深厚的【${culName}】，既保留了世代相传的民间节庆、传统戏剧与手工艺，又展现出朝气蓬勃的现代城市新风貌。`
    }
  }

  // 生成至少两张对应的精美图片展示（1. 名胜风景图  2. 美食与非遗文化图）
  const img1 = buildCityIllustrationSvg({
    cityName: item.name,
    provinceName: province.name,
    kind: 'scenery',
    title: item.sceneryName.split('与')[0],
    subtitle: item.scenery,
    emoji: item.sceneryEmoji || province.icon || '🏞️',
    subEmoji: '📸',
    theme: item.theme || 'mountain'
  })

  const img2 = buildCityIllustrationSvg({
    cityName: item.name,
    provinceName: province.name,
    kind: 'food',
    title: item.foodName.split('与')[0],
    subtitle: `${item.food.slice(0, 18)} · ${item.cultureName}`,
    emoji: item.foodEmoji || '🍜',
    subEmoji: '🎭',
    theme: 'desert'
  })

  return {
    ...item,
    provinceName: province.name,
    provinceAdcode: province.adcode,
    images: [
      {
        id: 'scenery-img',
        tag: '🏞️ 名胜风景图鉴',
        title: item.sceneryName,
        caption: `${province.name}${item.name} · 代表名胜风光`,
        url: img1
      },
      {
        id: 'food-culture-img',
        tag: '🍜 美食与文化图鉴',
        title: `${item.foodName} · ${item.cultureName}`,
        caption: `${province.name}${item.name} · 地道风味与人文非遗`,
        url: img2
      }
    ]
  }
}

// 地理小博士趣味闯关问答（涵盖全国34个省级行政区与台湾宝岛等核心知识点）
export const GEO_QUIZ_QUESTIONS = [
  {
    id: 'gq1',
    question: '我们伟大祖国的首都，拥有天安门、故宫和八达岭长城的城市是哪里？',
    options: ['北京市', '上海市', '西安市', '南京市'],
    answer: '北京市',
    hint: '它是中国的首都，简称“京”。',
    explain: '答对啦！北京市是我们伟大祖国的首都，简称“京”，拥有天安门广场、故宫博物院和八达岭长城！'
  },
  {
    id: 'gq2',
    question: '中国第一大岛，拥有美丽的日月潭、阿里山和台北101大楼的是哪个省份？',
    options: ['台湾省', '海南省', '福建省', '山东省'],
    answer: '台湾省',
    hint: '它隔着台湾海峡与福建省相望，简称“台”。',
    explain: '太棒了！台湾省是中国第一大岛，宝岛上的日月潭、阿里山和台北故宫博物院举世闻名！'
  },
  {
    id: 'gq3',
    question: '圆滚滚的国宝“大熊猫”最主要的故乡，以及拥有神奇“三星堆”和“都江堰”的是哪个省？',
    options: ['四川省', '云南省', '湖南省', '陕西省'],
    answer: '四川省',
    hint: '省会是成都市，被称为“天府之国”。',
    explain: '完全正确！四川省被称为“天府之国”，省会成都有大熊猫繁育研究基地和两千多年前的都江堰水利工程！'
  },
  {
    id: 'gq4',
    question: '被称为“世界第八大奇迹”的秦始皇兵马俑，位于我国哪个省份的省会西安市？',
    options: ['陕西省', '山西省', '河南省', '甘肃省'],
    answer: '陕西省',
    hint: '西安古称长安，这个省简称“陕”或“秦”。',
    explain: '答对啦！秦始皇兵马俑位于陕西省西安市，西安曾是十三个朝代的古都！'
  },
  {
    id: 'gq5',
    question: '小学语文课本里写着“山水甲天下”，象鼻山和漓江所在的美景城市位于哪个自治区？',
    options: ['广西壮族自治区', '宁夏回族自治区', '内蒙古自治区', '西藏自治区'],
    answer: '广西壮族自治区',
    hint: '桂林山水甲天下，简称“桂”。',
    explain: '真聪明！桂林市位于广西壮族自治区（简称“桂”），漓江的喀斯特峰林山水美如画卷！'
  },
  {
    id: 'gq6',
    question: '我国陆地面积最大（占全国六分之一），拥有天山、吐鲁番葡萄沟和地下水利工程“坎儿井”的是哪里？',
    options: ['新疆维吾尔自治区', '内蒙古自治区', '青海省', '西藏自治区'],
    answer: '新疆维吾尔自治区',
    hint: '它的地形特点是“三山夹两盆”，瓜果特别甜！',
    explain: '太厉害了！新疆维吾尔自治区是我国面积最大的省级行政区，吐鲁番的葡萄和哈密瓜甜如蜜！'
  },
  {
    id: 'gq7',
    question: '世界第一高峰“珠穆朗玛峰”（高8848.86米）和宏伟的布达拉宫位于哪里？',
    options: ['西藏自治区', '青海省', '四川省', '云南省'],
    answer: '西藏自治区',
    hint: '被称为“世界屋脊”，首府是日光城拉萨。',
    explain: '回答正确！西藏自治区位于青藏高原，首府拉萨有布达拉宫，日喀则境内有世界最高峰珠穆朗玛峰！'
  },
  {
    id: 'gq8',
    question: '冬天有晶莹剔透的“冰雪大世界”，且位于祖国版图最北端、最东端的是哪个省？',
    options: ['黑龙江省', '吉林省', '辽宁省', '河北省'],
    answer: '黑龙江省',
    hint: '省会是“冰城”哈尔滨市，最北端有漠河北极村。',
    explain: '答对啦！黑龙江省位于祖国最北和最东端，省会哈尔滨每到冬天就会变成梦幻的冰雕童话世界！'
  },
  {
    id: 'gq9',
    question: '能够倾听宇宙深处脉冲星信号的“中国天眼”（FAST）和壮观的黄果树大瀑布位于哪个省？',
    options: ['贵州省', '云南省', '湖北省', '江西省'],
    answer: '贵州省',
    hint: '省会是爽爽的贵阳市，简称“黔”或“贵”。',
    explain: '棒极了！500米口径球面射电望远镜“中国天眼”和亚洲第一大瀑布黄果树瀑布都在贵州省！'
  },
  {
    id: 'gq10',
    question: '长江、黄河、澜沧江三条大江大河的发源地“三江源”，以及中国最大的湖泊青海湖位于哪个省？',
    options: ['青海省', '甘肃省', '宁夏回族自治区', '四川省'],
    answer: '青海省',
    hint: '被誉为“中华水塔”，简称“青”。',
    explain: '完全正确！青海省因青海湖而得名，南部的三江源地区是长江、黄河、澜沧江的发源地！'
  },
  {
    id: 'gq11',
    question: '“欲把西湖比西子，淡妆浓抹总相宜”，美丽的西湖位于哪个省的省会杭州市？',
    options: ['浙江省', '江苏省', '安徽省', '上海市'],
    answer: '浙江省',
    hint: '因钱塘江（古称浙江）得名，简称“浙”。',
    explain: '答对啦！西湖位于浙江省省会杭州市，这里还有见证五千年文明的良渚古城遗址！'
  },
  {
    id: 'gq12',
    question: '我国海洋面积最大、最南端的热带省份，拥有三亚海湾、文昌航天发射场和西沙群岛的是哪个省？',
    options: ['海南省', '广东省', '福建省', '台湾省'],
    answer: '海南省',
    hint: '简称“琼”，省会是海口市，长征五号大火箭在这里发射。',
    explain: '太棒了！海南省简称“琼”，不仅有美丽的椰林海滩和富饶的西沙群岛，还有发射嫦娥、天问探测器的文昌航天发射场！'
  }
]

