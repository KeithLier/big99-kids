// 幼小衔接 · 英语启蒙乐园全套数据库（26字母自然拼读 + 8大日常主题单词 + 6大亲子双角色情景剧场 + 3大趣味互动游戏）

export const ALPHABET_LIST = [
  { upper: 'A', lower: 'a', ipa: '/eɪ/', phonics: '/æ/', word: 'Apple', wordCn: '红苹果', emoji: '🍎', chant: 'A is for Apple, a-a-apple, 红红苹果甜又香！', sentence: 'An apple a day!' },
  { upper: 'B', lower: 'b', ipa: '/biː/', phonics: '/b/', word: 'Bear', wordCn: '玩具熊', emoji: '🧸', chant: 'B is for Bear, b-b-bear, 抱抱可爱小熊熊！', sentence: 'A cute brown bear!' },
  { upper: 'C', lower: 'c', ipa: '/siː/', phonics: '/k/', word: 'Cat', wordCn: '小猫咪', emoji: '🐱', chant: 'C is for Cat, c-c-cat, 小猫喵喵爱吃鱼！', sentence: 'A clever little cat!' },
  { upper: 'D', lower: 'd', ipa: '/diː/', phonics: '/d/', word: 'Dog', wordCn: '小狗狗', emoji: '🐶', chant: 'D is for Dog, d-d-dog, 小狗汪汪摇尾巴！', sentence: 'My happy dog!' },
  { upper: 'E', lower: 'e', ipa: '/iː/', phonics: '/e/', word: 'Elephant', wordCn: '大象', emoji: '🐘', chant: 'E is for Elephant, e-e-elephant, 大象鼻子长又长！', sentence: 'A big elephant!' },
  { upper: 'F', lower: 'f', ipa: '/ef/', phonics: '/f/', word: 'Fish', wordCn: '小鱼儿', emoji: '🐟', chant: 'F is for Fish, f-f-fish, 小鱼水中游啊游！', sentence: 'Five little fish!' },
  { upper: 'G', lower: 'g', ipa: '/dʒiː/', phonics: '/ɡ/', word: 'Giraffe', wordCn: '长颈鹿', emoji: '🦒', chant: 'G is for Giraffe, g-g-giraffe, 长颈鹿儿个子高！', sentence: 'A tall giraffe!' },
  { upper: 'H', lower: 'h', ipa: '/eɪtʃ/', phonics: '/h/', word: 'Hat', wordCn: '小帽子', emoji: '🧢', chant: 'H is for Hat, h-h-hat, 戴上帽子去郊游！', sentence: 'Put on your hat!' },
  { upper: 'I', lower: 'i', ipa: '/aɪ/', phonics: '/ɪ/', word: 'Ice cream', wordCn: '冰淇淋', emoji: '🍦', chant: 'I is for Ice cream, i-i-ice cream, 冰冰凉凉真好吃！', sentence: 'Yummy ice cream!' },
  { upper: 'J', lower: 'j', ipa: '/dʒeɪ/', phonics: '/dʒ/', word: 'Juice', wordCn: '鲜果汁', emoji: '🧃', chant: 'J is for Juice, j-j-juice, 酸酸甜甜喝果汁！', sentence: 'Sweet orange juice!' },
  { upper: 'K', lower: 'k', ipa: '/keɪ/', phonics: '/k/', word: 'Kite', wordCn: '花风筝', emoji: '🪁', chant: 'K is for Kite, k-k-kite, 春风吹起小风筝！', sentence: 'Fly a kite high!' },
  { upper: 'L', lower: 'l', ipa: '/el/', phonics: '/l/', word: 'Lion', wordCn: '大狮子', emoji: '🦁', chant: 'L is for Lion, l-l-lion, 森林国王大狮子！', sentence: 'A brave lion!' },
  { upper: 'M', lower: 'm', ipa: '/em/', phonics: '/m/', word: 'Monkey', wordCn: '小猴子', emoji: '🐵', chant: 'M is for Monkey, m-m-monkey, 小猴蹦跳吃香蕉！', sentence: 'A funny monkey!' },
  { upper: 'N', lower: 'n', ipa: '/en/', phonics: '/n/', word: 'Noodles', wordCn: '香面条', emoji: '🍜', chant: 'N is for Noodles, n-n-noodles, 热气腾腾吃面条！', sentence: 'I love noodles!' },
  { upper: 'O', lower: 'o', ipa: '/əʊ/', phonics: '/ɒ/', word: 'Orange', wordCn: '甜橙子', emoji: '🍊', chant: 'O is for Orange, o-o-orange, 圆圆橙子维C多！', sentence: 'A juicy orange!' },
  { upper: 'P', lower: 'p', ipa: '/piː/', phonics: '/p/', word: 'Panda', wordCn: '大熊猫', emoji: '🐼', chant: 'P is for Panda, p-p-panda, 国宝熊猫爱竹子！', sentence: 'Hello, cute panda!' },
  { upper: 'Q', lower: 'q', ipa: '/kjuː/', phonics: '/kw/', word: 'Queen', wordCn: '小女王', emoji: '👑', chant: 'Q is for Queen, q-q-queen, 戴着皇冠真神气！', sentence: 'A kind queen!' },
  { upper: 'R', lower: 'r', ipa: '/ɑːr/', phonics: '/r/', word: 'Rabbit', wordCn: '小白兔', emoji: '🐰', chant: 'R is for Rabbit, r-r-rabbit, 长耳朵兔蹦蹦跳！', sentence: 'Run, little rabbit!' },
  { upper: 'S', lower: 's', ipa: '/es/', phonics: '/s/', word: 'Sun', wordCn: '红太阳', emoji: '☀️', chant: 'S is for Sun, s-s-sun, 阳光灿烂笑眯眯！', sentence: 'The bright warm sun!' },
  { upper: 'T', lower: 't', ipa: '/tiː/', phonics: '/t/', word: 'Tiger', wordCn: '大老虎', emoji: '🐯', chant: 'T is for Tiger, t-t-tiger, 老虎额头有个王！', sentence: 'A strong tiger!' },
  { upper: 'U', lower: 'u', ipa: '/juː/', phonics: '/ʌ/', word: 'Umbrella', wordCn: '小雨伞', emoji: '☂️', chant: 'U is for Umbrella, u-u-umbrella, 下雨撑起小花伞！', sentence: 'Open the umbrella!' },
  { upper: 'V', lower: 'v', ipa: '/viː/', phonics: '/v/', word: 'Violin', wordCn: '小提琴', emoji: '🎻', chant: 'V is for Violin, v-v-violin, 奏出美妙交响乐！', sentence: 'Play the violin!' },
  { upper: 'W', lower: 'w', ipa: '/ˈdʌbəl.juː/', phonics: '/w/', word: 'Watermelon', wordCn: '大西瓜', emoji: '🍉', chant: 'W is for Watermelon, w-w-watermelon, 绿皮红瓤大西瓜！', sentence: 'Sweet watermelon!' },
  { upper: 'X', lower: 'x', ipa: '/eks/', phonics: '/ks/', word: 'Fox', wordCn: '小狐狸', emoji: '🦊', chant: 'X is in Fox, x-x-fox, 聪明机灵小狐狸！', sentence: 'A clever red fox!' },
  { upper: 'Y', lower: 'y', ipa: '/waɪ/', phonics: '/j/', word: 'Yellow', wordCn: '亮黄色', emoji: '🌼', chant: 'Y is for Yellow, y-y-yellow, 金黄迎春花儿开！', sentence: 'Bright yellow star!' },
  { upper: 'Z', lower: 'z', ipa: '/ziː/', phonics: '/z/', word: 'Zebra', wordCn: '小斑马', emoji: '🦓', chant: 'Z is for Zebra, z-z-zebra, 黑白条纹小斑马！', sentence: 'Look at the zebra!' }
]

export const ENGLISH_WORD_CATEGORIES = [
  { id: 'animals', name: '萌宠动物', enName: 'Animals', icon: '🐾', color: '#ff7043' },
  { id: 'fruits', name: '水果美食', enName: 'Fruits & Food', icon: '🍎', color: '#ec407a' },
  { id: 'colors', name: '缤纷颜色', enName: 'Colors', icon: '🎨', color: '#ab47bc' },
  { id: 'numbers', name: '趣味数字', enName: 'Numbers', icon: '🔢', color: '#29b6f6' },
  { id: 'family', name: '温暖家人', enName: 'My Family', icon: '👨‍👩‍👧', color: '#ffa726' },
  { id: 'school', name: '小学生文具', enName: 'School Bag', icon: '🎒', color: '#66bb6a' },
  { id: 'nature', name: '天气与自然', enName: 'Nature', icon: '🌈', color: '#26a69a' },
  { id: 'vehicles', name: '交通工具', enName: 'Vehicles', icon: '🚗', color: '#5c6bc0' }
]

export const ENGLISH_WORDS = {
  animals: [
    { id: 'w_panda', en: 'Panda', ipa: '/ˈpæn.də/', cn: '大熊猫', emoji: '🐼', exEn: 'I like the cute panda.', exCn: '我喜欢可爱的大熊猫。' },
    { id: 'w_dog', en: 'Dog', ipa: '/dɒɡ/', cn: '小狗', emoji: '🐶', exEn: 'The dog is my good friend.', exCn: '小狗是我的好朋友。' },
    { id: 'w_cat', en: 'Cat', ipa: '/kæt/', cn: '小猫', emoji: '🐱', exEn: 'The little cat says meow.', exCn: '小猫咪喵喵叫。' },
    { id: 'w_rabbit', en: 'Rabbit', ipa: '/ˈræb.ɪt/', cn: '小白兔', emoji: '🐰', exEn: 'The rabbit has long ears.', exCn: '小白兔有长长的耳朵。' },
    { id: 'w_monkey', en: 'Monkey', ipa: '/ˈmʌŋ.ki/', cn: '小猴子', emoji: '🐵', exEn: 'Monkeys love bananas.', exCn: '小猴子最爱吃香蕉。' },
    { id: 'w_elephant', en: 'Elephant', ipa: '/ˈel.ɪ.fənt/', cn: '大象', emoji: '🐘', exEn: 'Look at the big elephant!', exCn: '看那头高大的大象！' },
    { id: 'w_tiger', en: 'Tiger', ipa: '/ˈtaɪ.ɡər/', cn: '大老虎', emoji: '🐯', exEn: 'The tiger can run fast.', exCn: '老虎跑得很快。' },
    { id: 'w_duck', en: 'Duck', ipa: '/dʌk/', cn: '小黄鸭', emoji: '🦆', exEn: 'A yellow duck can swim.', exCn: '小黄鸭会游泳。' },
    { id: 'w_lion', en: 'Lion', ipa: '/ˈlaɪ.ən/', cn: '大狮子', emoji: '🦁', exEn: 'The brave lion roars loudly.', exCn: '勇敢的大狮子吼声震天。' },
    { id: 'w_bear', en: 'Bear', ipa: '/beər/', cn: '小熊', emoji: '🧸', exEn: 'A soft and warm teddy bear.', exCn: '一只软绵绵暖和的玩具熊。' },
    { id: 'w_giraffe', en: 'Giraffe', ipa: '/dʒɪˈrɑːf/', cn: '长颈鹿', emoji: '🦒', exEn: 'The tall giraffe eats leaves.', exCn: '高高的长颈鹿吃树叶。' },
    { id: 'w_zebra', en: 'Zebra', ipa: '/ˈzeb.rə/', cn: '斑马', emoji: '🦓', exEn: 'A zebra has black and white stripes.', exCn: '斑马有黑白相间的漂亮条纹。' },
    { id: 'w_koala', en: 'Koala', ipa: '/kəʊˈɑː.lə/', cn: '考拉', emoji: '🐨', exEn: 'The sweet koala sleeps in the tree.', exCn: '可爱的考拉在树上香甜睡觉。' },
    { id: 'w_bird', en: 'Bird', ipa: '/bɜːd/', cn: '小鸟', emoji: '🐦', exEn: 'The little bird sings in the tree.', exCn: '小鸟在树枝上快乐地唱歌。' },
    { id: 'w_pig', en: 'Pig', ipa: '/pɪɡ/', cn: '小猪', emoji: '🐷', exEn: 'A happy pink pig loves playing.', exCn: '开心的粉红小猪爱玩耍。' },
    { id: 'w_cow', en: 'Cow', ipa: '/kaʊ/', cn: '奶牛', emoji: '🐮', exEn: 'The cow gives us fresh milk.', exCn: '奶牛为我们提供新鲜牛奶。' },
    { id: 'w_sheep', en: 'Sheep', ipa: '/ʃiːp/', cn: '绵羊', emoji: '🐑', exEn: 'The sheep has warm white wool.', exCn: '绵羊身上有暖和的白羊毛。' },
    { id: 'w_horse', en: 'Horse', ipa: '/hɔːs/', cn: '小马', emoji: '🐴', exEn: 'The horse gallops on the grass.', exCn: '小马在青青草地上欢快奔跑。' },
    { id: 'w_frog', en: 'Frog', ipa: '/frɒɡ/', cn: '小青蛙', emoji: '🐸', exEn: 'The green frog jumps into the water.', exCn: '小绿蛙扑通一声跳进水里。' },
    { id: 'w_fish', en: 'Fish', ipa: '/fɪʃ/', cn: '小鱼', emoji: '🐟', exEn: 'Little fish swim happily in the sea.', exCn: '小鱼儿在大海里欢快地游来游去。' }
  ],
  fruits: [
    { id: 'w_apple', en: 'Apple', ipa: '/ˈæp.əl/', cn: '苹果', emoji: '🍎', exEn: 'This is a red apple.', exCn: '这是一个红苹果。' },
    { id: 'w_banana', en: 'Banana', ipa: '/bəˈnɑː.nə/', cn: '香蕉', emoji: '🍌', exEn: 'Peel the sweet yellow banana.', exCn: '剥开甜甜的黄香蕉。' },
    { id: 'w_watermelon', en: 'Watermelon', ipa: '/ˈwɔː.təˌmel.ən/', cn: '西瓜', emoji: '🍉', exEn: 'Sweet and juicy watermelon!', exCn: '又甜又多汁的大西瓜！' },
    { id: 'w_strawberry', en: 'Strawberry', ipa: '/ˈstrɔː.bər.i/', cn: '草莓', emoji: '🍓', exEn: 'I love fresh sweet strawberries.', exCn: '我喜欢吃新鲜甜草莓。' },
    { id: 'w_milk', en: 'Milk', ipa: '/mɪlk/', cn: '牛奶', emoji: '🥛', exEn: 'Drink warm milk every morning.', exCn: '每天早上喝一杯温牛奶。' },
    { id: 'w_bread', en: 'Bread', ipa: '/bred/', cn: '面包', emoji: '🍞', exEn: 'Have some fresh bread for breakfast.', exCn: '早餐吃些新鲜香面包。' },
    { id: 'w_egg', en: 'Egg', ipa: '/eɡ/', cn: '鸡蛋', emoji: '🥚', exEn: 'One egg a day makes me strong.', exCn: '每天一个蛋，身体棒棒哒。' },
    { id: 'w_cake', en: 'Cake', ipa: '/keɪk/', cn: '蛋糕', emoji: '🎂', exEn: 'Happy birthday sweet cake!', exCn: '甜蜜快乐的生日蛋糕！' },
    { id: 'w_orange_f', en: 'Orange', ipa: '/ˈɒr.ɪndʒ/', cn: '橙子', emoji: '🍊', exEn: 'A juicy orange is full of vitamin C.', exCn: '多汁的橙子富含维生素C。' },
    { id: 'w_grape', en: 'Grape', ipa: '/ɡreɪp/', cn: '葡萄', emoji: '🍇', exEn: 'Sweet purple grapes in summer.', exCn: '夏天成熟的甜甜紫葡萄。' },
    { id: 'w_peach', en: 'Peach', ipa: '/piːtʃ/', cn: '水蜜桃', emoji: '🍑', exEn: 'A juicy pink peach smells sweet.', exCn: '粉红多汁的水蜜桃闻起来真香。' },
    { id: 'w_pear', en: 'Pear', ipa: '/peər/', cn: '梨子', emoji: '🍐', exEn: 'I like eating crisp sweet pears.', exCn: '我爱吃脆甜脆甜的雪梨。' },
    { id: 'w_mango', en: 'Mango', ipa: '/ˈmæŋ.ɡəʊ/', cn: '芒果', emoji: '🥭', exEn: 'Ripe yellow mango tastes yummy.', exCn: '熟透的黄芒果真好吃。' },
    { id: 'w_cherry', en: 'Cherry', ipa: '/ˈtʃer.i/', cn: '樱桃', emoji: '🍒', exEn: 'Bright red cherries on the plate.', exCn: '盘子里红通通的小樱桃。' },
    { id: 'w_pineapple', en: 'Pineapple', ipa: '/ˈpaɪnˌæp.əl/', cn: '菠萝', emoji: '🍍', exEn: 'Sweet and golden pineapple.', exCn: '金黄酸甜的美味大菠萝。' },
    { id: 'w_juice', en: 'Juice', ipa: '/dʒuːs/', cn: '鲜果汁', emoji: '🧃', exEn: 'A cup of cool juice in summer.', exCn: '夏天来一杯凉爽的鲜果汁。' },
    { id: 'w_rice', en: 'Rice', ipa: '/raɪs/', cn: '米饭', emoji: '🍚', exEn: 'Warm white rice for family dinner.', exCn: '晚餐吃香喷喷的热米饭。' },
    { id: 'w_noodles', en: 'Noodles', ipa: '/ˈnuː.dəlz/', cn: '面条', emoji: '🍜', exEn: 'Long noodles are warm and delicious.', exCn: '长长的面条暖胃又好吃。' },
    { id: 'w_tomato', en: 'Tomato', ipa: '/təˈmɑː.təʊ/', cn: '西红柿', emoji: '🍅', exEn: 'A fresh red tomato in the salad.', exCn: '沙拉里新鲜红润的西红柿。' },
    { id: 'w_icecream', en: 'Ice cream', ipa: '/ˌaɪs ˈkriːm/', cn: '冰淇淋', emoji: '🍦', exEn: 'Yummy cool ice cream on a sunny day!', exCn: '大晴天吃一口美味凉冰淇淋！' }
  ],
  colors: [
    { id: 'w_red', en: 'Red', ipa: '/red/', cn: '红色', emoji: '🔴', exEn: 'The apple is bright red.', exCn: '苹果是鲜艳的红色。' },
    { id: 'w_yellow', en: 'Yellow', ipa: '/ˈjel.əʊ/', cn: '黄色', emoji: '🟡', exEn: 'A bright yellow star in the sky.', exCn: '天上一颗明亮的黄星星。' },
    { id: 'w_blue', en: 'Blue', ipa: '/bluː/', cn: '蓝色', emoji: '🔵', exEn: 'The wide sky and sea are blue.', exCn: '辽阔的天空与大海是蓝色的。' },
    { id: 'w_green', en: 'Green', ipa: '/ɡriːn/', cn: '绿色', emoji: '🟢', exEn: 'Spring grass is fresh and green.', exCn: '春天的青草鲜绿柔嫩。' },
    { id: 'w_orange_c', en: 'Orange', ipa: '/ˈɒr.ɪndʒ/', cn: '橙色', emoji: '🟠', exEn: 'I bounce my orange basketball.', exCn: '我拍着橙色的篮球。' },
    { id: 'w_purple', en: 'Purple', ipa: '/ˈpɜː.pəl/', cn: '紫色', emoji: '🟣', exEn: 'Sweet grapes are dark purple.', exCn: '甜甜的葡萄是深紫色的。' },
    { id: 'w_pink', en: 'Pink', ipa: '/pɪŋk/', cn: '粉色', emoji: '🌸', exEn: 'Pretty pink blossoms on the branch.', exCn: '枝头盛开漂亮的粉色花朵。' },
    { id: 'w_white', en: 'White', ipa: '/waɪt/', cn: '白色', emoji: '⚪', exEn: 'Fluffy white clouds float by.', exCn: '朵朵白云轻轻飘过。' },
    { id: 'w_black', en: 'Black', ipa: '/blæk/', cn: '黑色', emoji: '⚫', exEn: 'The panda has black circles around its eyes.', exCn: '大熊猫有黑黑的眼圈。' },
    { id: 'w_brown', en: 'Brown', ipa: '/braʊn/', cn: '棕色', emoji: '🟤', exEn: 'A lovely brown teddy bear.', exCn: '一只可爱的棕色泰迪熊。' },
    { id: 'w_gray', en: 'Gray', ipa: '/ɡreɪ/', cn: '灰色', emoji: '🔘', exEn: 'An elephant has gentle gray skin.', exCn: '温和的大象有着灰色的皮肤。' },
    { id: 'w_gold', en: 'Gold', ipa: '/ɡəʊld/', cn: '金色', emoji: '🪙', exEn: 'A shining gold star reward for you!', exCn: '奖给你一颗闪闪发光的金星星！' },
    { id: 'w_silver', en: 'Silver', ipa: '/ˈsɪl.vər/', cn: '银色', emoji: '🥈', exEn: 'The silver crescent moon shines at night.', exCn: '弯弯的银色月牙在夜空闪亮。' },
    { id: 'w_colorful', en: 'Colorful', ipa: '/ˈkʌl.ə.fəl/', cn: '五彩缤纷', emoji: '🎨', exEn: 'Look at the colorful balloons!', exCn: '看那些五彩斑斓的彩色气球！' },
    { id: 'w_lightblue', en: 'Light blue', ipa: '/laɪt bluː/', cn: '浅蓝色', emoji: '🩵', exEn: 'The morning sky is clear light blue.', exCn: '清晨的天空是清澈的浅蓝色。' },
    { id: 'w_darkgreen', en: 'Dark green', ipa: '/dɑːk ɡriːn/', cn: '深绿色', emoji: '🌲', exEn: 'Tall pine trees are dark green.', exCn: '挺拔的松树呈现深绿色。' },
    { id: 'w_brightyellow', en: 'Bright yellow', ipa: '/braɪt ˈjel.əʊ/', cn: '明黄色', emoji: '🌟', exEn: 'Bright yellow sunflowers face the sun.', exCn: '明黄色的向日葵迎着太阳笑。' },
    { id: 'w_rosered', en: 'Rose red', ipa: '/rəʊz red/ ', cn: '玫瑰红', emoji: '🌹', exEn: 'A lovely rose red flower in bloom.', exCn: '一朵盛开的玫瑰红花朵。' },
    { id: 'w_violet', en: 'Violet', ipa: '/ˈvaɪə.lət/', cn: '蓝紫色', emoji: '🪻', exEn: 'Sweet violet flowers in the garden.', exCn: '花园里美丽的蓝紫色小花。' },
    { id: 'w_rainbow_c', en: 'Rainbow', ipa: '/ˈreɪn.bəʊ/', cn: '彩虹色', emoji: '🌈', exEn: 'The rainbow has seven magical colors.', exCn: '彩虹有着神奇美丽的七种颜色。' }
  ],
  numbers: [
    { id: 'w_zero', en: 'Zero', ipa: '/ˈzɪə.rəʊ/', cn: '零 (0)', emoji: '0️⃣', exEn: 'Zero plus five equals five.', exCn: '0 加上 5 等于 5。' },
    { id: 'w_one', en: 'One', ipa: '/wʌn/', cn: '一 (1)', emoji: '1️⃣', exEn: 'One warm sun in the sky.', exCn: '天空中有一个温暖的太阳。' },
    { id: 'w_two', en: 'Two', ipa: '/tuː/', cn: '二 (2)', emoji: '2️⃣', exEn: 'Two hands can clap and wave.', exCn: '两只小巧手能拍手和挥手。' },
    { id: 'w_three', en: 'Three', ipa: '/θriː/', cn: '三 (3)', emoji: '3️⃣', exEn: 'Three little kittens in the basket.', exCn: '篮子里有三只可爱的小猫咪。' },
    { id: 'w_four', en: 'Four', ipa: '/fɔːr/', cn: '四 (4)', emoji: '4️⃣', exEn: 'There are four seasons in a year.', exCn: '一年之中有春夏秋冬四季。' },
    { id: 'w_five', en: 'Five', ipa: '/faɪv/', cn: '五 (5)', emoji: '5️⃣', exEn: 'Give me five! High five!', exCn: '和我击掌庆祝！真棒！' },
    { id: 'w_six', en: 'Six', ipa: '/sɪks/', cn: '六 (6)', emoji: '6️⃣', exEn: 'I am six years old now.', exCn: '我现在已经六岁啦。' },
    { id: 'w_seven', en: 'Seven', ipa: '/ˈsev.ən/', cn: '七 (7)', emoji: '7️⃣', exEn: 'There are seven days in a week.', exCn: '一个星期有七天。' },
    { id: 'w_eight', en: 'Eight', ipa: '/eɪt/', cn: '八 (8)', emoji: '8️⃣', exEn: 'An octopus has eight legs.', exCn: '章鱼有八条长长的触手。' },
    { id: 'w_nine', en: 'Nine', ipa: '/naɪn/', cn: '九 (9)', emoji: '9️⃣', exEn: 'Nine colorful birds on the tree.', exCn: '树上有九只漂亮的小鸟。' },
    { id: 'w_ten', en: 'Ten', ipa: '/ten/', cn: '十 (10)', emoji: '🔟', exEn: 'Ten little fingers on my hands.', exCn: '我的小手上有十根手指。' },
    { id: 'w_eleven', en: 'Eleven', ipa: '/ɪˈlev.ən/', cn: '十一 (11)', emoji: '1️⃣1️⃣', exEn: 'Eleven yellow ducklings in the pond.', exCn: '池塘里有十一只小黄鸭。' },
    { id: 'w_twelve', en: 'Twelve', ipa: '/twelv/', cn: '十二 (12)', emoji: '1️⃣2️⃣', exEn: 'There are twelve months in a year.', exCn: '一年有十二个月份。' },
    { id: 'w_thirteen', en: 'Thirteen', ipa: '/ˌθɜːˈtiːn/', cn: '十三 (13)', emoji: '1️⃣3️⃣', exEn: 'Thirteen sweet strawberries on the plate.', exCn: '盘子里有十三颗甜草莓。' },
    { id: 'w_fourteen', en: 'Fourteen', ipa: '/ˌfɔːˈtiːn/', cn: '十四 (14)', emoji: '1️⃣4️⃣', exEn: 'Fourteen shiny stars twinkle at night.', exCn: '十四颗亮晶晶的星星在夜空闪烁。' },
    { id: 'w_fifteen', en: 'Fifteen', ipa: '/ˌfɪfˈtiːn/', cn: '十五 (15)', emoji: '1️⃣5️⃣', exEn: 'Fifteen minutes of happy game time.', exCn: '十五分钟快乐的游戏时光。' },
    { id: 'w_sixteen', en: 'Sixteen', ipa: '/ˌsɪkˈstiːn/', cn: '十六 (16)', emoji: '1️⃣6️⃣', exEn: 'Sixteen big apples in the basket.', exCn: '篮子里装了十六个大苹果。' },
    { id: 'w_seventeen', en: 'Seventeen', ipa: '/ˌsev.ənˈtiːn/', cn: '十七 (17)', emoji: '1️⃣7️⃣', exEn: 'Seventeen colorful crayons in my box.', exCn: '我的文具盒里有十七支彩色蜡笔。' },
    { id: 'w_eighteen', en: 'Eighteen', ipa: '/ˌeɪˈtiːn/', cn: '十八 (18)', emoji: '1️⃣8️⃣', exEn: 'Eighteen blossoms in the garden.', exCn: '花园里盛开了十八朵花。' },
    { id: 'w_twenty', en: 'Twenty', ipa: '/ˈtwen.ti/', cn: '二十 (20)', emoji: '2️⃣0️⃣', exEn: 'Let us count from one to twenty!', exCn: '让我们一起从一数到二十吧！' }
  ],
  family: [
    { id: 'w_mom', en: 'Mom / Mother', ipa: '/mɒm/', cn: '妈妈', emoji: '👩', exEn: 'I love my sweet mom!', exCn: '我爱我温柔的妈妈！' },
    { id: 'w_dad', en: 'Dad / Father', ipa: '/dæd/', cn: '爸爸', emoji: '👨', exEn: 'My dad is my superhero.', exCn: '爸爸是我的超级英雄。' },
    { id: 'w_grandpa', en: 'Grandpa', ipa: '/ˈɡræn.pɑː/', cn: '爷爷/外公', emoji: '👴', exEn: 'Grandpa tells funny stories.', exCn: '爷爷会讲有趣的故事。' },
    { id: 'w_grandma', en: 'Grandma', ipa: '/ˈɡræn.mɑː/', cn: '奶奶/外婆', emoji: '👵', exEn: 'Grandma cooks yummy food.', exCn: '奶奶做的饭菜真香。' },
    { id: 'w_brother', en: 'Brother', ipa: '/ˈbrʌð.ər/', cn: '哥哥/弟弟', emoji: '👦', exEn: 'Play ball with my brother.', exCn: '和哥哥/弟弟一起玩球。' },
    { id: 'w_sister', en: 'Sister', ipa: '/ˈsɪs.tər/', cn: '姐姐/妹妹', emoji: '👧', exEn: 'Share toys with my sister.', exCn: '和姐姐/妹妹分享玩具。' },
    { id: 'w_baby', en: 'Baby', ipa: '/ˈbeɪ.bi/', cn: '小宝宝/婴儿', emoji: '👶', exEn: 'The cute baby smiles happily.', exCn: '可爱的小婴儿开心地微笑。' },
    { id: 'w_family', en: 'Family', ipa: '/ˈfæm.əl.i/', cn: '全家人/家庭', emoji: '👨‍👩‍👧‍👦', exEn: 'I love my warm and happy family.', exCn: '我爱我温暖幸福的家。' },
    { id: 'w_uncle', en: 'Uncle', ipa: '/ˈʌŋ.kəl/', cn: '叔叔/舅舅', emoji: '👨‍🦰', exEn: 'Uncle plays soccer with me.', exCn: '叔叔在草地上陪我踢足球。' },
    { id: 'w_aunt', en: 'Aunt', ipa: '/ɑːnt/', cn: '阿姨/姑姑', emoji: '👩‍🦰', exEn: 'Aunt brings me sweet cookies.', exCn: '阿姨给我带来了香甜小饼干。' },
    { id: 'w_cousin', en: 'Cousin', ipa: '/ˈkʌz.ən/', cn: '堂表兄弟姐妹', emoji: '🧒', exEn: 'My cousin and I build toy blocks together.', exCn: '我和表兄弟一起拼搭积木。' },
    { id: 'w_son', en: 'Son', ipa: '/sʌn/', cn: '儿子', emoji: '👦', exEn: 'He is a polite and helpful son.', exCn: '他是个懂礼貌、爱帮忙的好儿子。' },
    { id: 'w_daughter', en: 'Daughter', ipa: '/ˈdɔː.tər/', cn: '女儿', emoji: '👧', exEn: 'She is a clever and sweet daughter.', exCn: '她是个聪明又贴心的好女儿。' },
    { id: 'w_parents', en: 'Parents', ipa: '/ˈpeə.rənts/', cn: '父母/双亲', emoji: '👨‍👩‍👧', exEn: 'My parents hug me with warm love.', exCn: '爸爸妈妈用温暖的爱拥抱我。' },
    { id: 'w_grandparents', en: 'Grandparents', ipa: '/ˈɡrænˌpeə.rənts/', cn: '祖父母/外祖父母', emoji: '👵👴', exEn: 'We visit grandparents on holidays.', exCn: '放假时我们去探望爷爷奶奶。' },
    { id: 'w_friend', en: 'Friend', ipa: '/frend/', cn: '好朋友', emoji: '🧑‍🤝‍🧑', exEn: 'We are best friends in kindergarten.', exCn: '我们在幼儿园是最好的好朋友。' },
    { id: 'w_teacher', en: 'Teacher', ipa: '/ˈtiː.tʃər/', cn: '老师', emoji: '👩‍🏫', exEn: 'Teacher teaches us with patience and love.', exCn: '老师充满耐心与关爱地教导我们。' },
    { id: 'w_pet', en: 'Pet', ipa: '/pet/', cn: '宠物', emoji: '🐶', exEn: 'Our pet puppy wags its tail.', exCn: '我们家的小宠物摇着毛茸茸的尾巴。' },
    { id: 'w_boy', en: 'Boy', ipa: '/bɔɪ/', cn: '男孩', emoji: '👦', exEn: 'The brave little boy runs fast.', exCn: '勇敢的小男孩跑得可快啦。' },
    { id: 'w_girl', en: 'Girl', ipa: '/ɡɜːl/', cn: '女孩', emoji: '👧', exEn: 'The happy little girl dances lightly.', exCn: '快乐的小女孩轻盈欢快地跳舞。' }
  ],
  school: [
    { id: 'w_schoolbag', en: 'Schoolbag', ipa: '/ˈskuːl.bæɡ/', cn: '小书包', emoji: '🎒', exEn: 'Pack my tidy schoolbag for class.', exCn: '收拾整齐我的新书包去上学。' },
    { id: 'w_book', en: 'Book', ipa: '/bʊk/', cn: '书本/故事书', emoji: '📖', exEn: 'Open your English storybook, please.', exCn: '请打开你的英语故事书。' },
    { id: 'w_pencil', en: 'Pencil', ipa: '/ˈpen.səl/', cn: '铅笔', emoji: '✏️', exEn: 'Write numbers carefully with a pencil.', exCn: '用铅笔认真地书写数字。' },
    { id: 'w_ruler', en: 'Ruler', ipa: '/ˈruː.lər/', cn: '直尺', emoji: '📏', exEn: 'Draw a straight line with a ruler.', exCn: '用直尺画一条笔直的线。' },
    { id: 'w_eraser', en: 'Eraser', ipa: '/ɪˈreɪ.zər/', cn: '橡皮擦', emoji: '🧼', exEn: 'Use an eraser to clean the paper.', exCn: '用橡皮擦把纸面擦得干干净净。' },
    { id: 'w_crayon', en: 'Crayon', ipa: '/ˈkreɪ.ən/', cn: '彩色蜡笔', emoji: '🖍️', exEn: 'Draw a rainbow with bright crayons.', exCn: '用鲜艳的蜡笔画出美丽的彩虹。' },
    { id: 'w_pen', en: 'Pen', ipa: '/pen/', cn: '钢笔/圆珠笔', emoji: '🖊️', exEn: 'Teacher writes notes with a blue pen.', exCn: '老师用蓝色的笔做记录。' },
    { id: 'w_pencilcase', en: 'Pencil-case', ipa: '/ˈpen.səl keɪs/', cn: '文具盒/铅笔盒', emoji: '👝', exEn: 'Put my pencils in the pencil-case.', exCn: '把我的铅笔收纳进文具盒里。' },
    { id: 'w_scissors', en: 'Scissors', ipa: '/ˈsɪz.əz/', cn: '手工剪刀', emoji: '✂️', exEn: 'Use round safety scissors to cut paper.', exCn: '用圆头安全剪刀剪手工彩纸。' },
    { id: 'w_glue', en: 'Glue', ipa: '/ɡluː/', cn: '胶水/固体胶', emoji: '🧴', exEn: 'Stick the cute picture with glue.', exCn: '用胶水把可爱的图画贴牢。' },
    { id: 'w_desk', en: 'Desk', ipa: '/desk/', cn: '课桌', emoji: '🪑', exEn: 'Keep your school desk clean and tidy.', exCn: '保持课桌整洁干净好习惯。' },
    { id: 'w_chair', en: 'Chair', ipa: '/tʃeər/', cn: '椅子', emoji: '💺', exEn: 'Sit nicely and comfortably on the chair.', exCn: '端正舒适地坐在椅子上。' },
    { id: 'w_blackboard', en: 'Blackboard', ipa: '/ˈblæk.bɔːd/', cn: '黑板', emoji: '📋', exEn: 'Look at the blackboard together.', exCn: '大家一起抬头看黑板。' },
    { id: 'w_classroom', en: 'Classroom', ipa: '/ˈklɑːs.ruːm/', cn: '教室', emoji: '🏫', exEn: 'Our classroom is bright and sunny.', exCn: '我们的教室明亮又充满阳光。' },
    { id: 'w_school', en: 'School', ipa: '/skuːl/', cn: '学校', emoji: '🏫', exEn: 'I love going to primary school!', exCn: '我喜欢去小学上学学知识！' },
    { id: 'w_notebook', en: 'Notebook', ipa: '/ˈnəʊt.bʊk/', cn: '笔记本/练习本', emoji: '📓', exEn: 'Draw lovely stars in your notebook.', exCn: '在笔记本上画下可爱的小星星。' },
    { id: 'w_paper', en: 'Paper', ipa: '/ˈpeɪ.pər/', cn: '纸张/手工纸', emoji: '📄', exEn: 'Fold a paper plane with clean paper.', exCn: '用干净的纸折一架小纸飞机。' },
    { id: 'w_clock', en: 'Clock', ipa: '/klɒk/', cn: '闹钟/时钟', emoji: '⏰', exEn: 'Tick-tock says the classroom clock.', exCn: '教室里的时钟滴答滴答走。' },
    { id: 'w_bell', en: 'Bell', ipa: '/bel/', cn: '上下课铃', emoji: '🔔', exEn: 'Ding-dong! The class bell rings!', exCn: '叮咚！上课的铃声响起来啦！' },
    { id: 'w_playground', en: 'Playground', ipa: '/ˈpleɪ.ɡraʊnd/', cn: '操场/游乐场', emoji: '🛝', exEn: 'Run and laugh on the green playground.', exCn: '在绿茵操场上奔跑与欢笑。' }
  ],
  nature: [
    { id: 'w_sun', en: 'Sun', ipa: '/sʌn/', cn: '太阳', emoji: '☀️', exEn: 'The warm sun is shining high.', exCn: '温暖的太阳公公高高照。' },
    { id: 'w_moon', en: 'Moon', ipa: '/muːn/', cn: '月亮', emoji: '🌙', exEn: 'Good night, bright silver moon.', exCn: '晚安，皎洁明亮的银色月光。' },
    { id: 'w_star', en: 'Star', ipa: '/stɑːr/', cn: '星星', emoji: '⭐', exEn: 'Twinkle, twinkle, little star.', exCn: '一闪一闪小星星，满天都是小精灵。' },
    { id: 'w_rainbow', en: 'Rainbow', ipa: '/ˈreɪn.bəʊ/', cn: '彩虹', emoji: '🌈', exEn: 'Look at the colorful rainbow after rain!', exCn: '快看雨后那道七彩斑斓的美丽彩虹！' },
    { id: 'w_flower', en: 'Flower', ipa: '/ˈflaʊ.ər/', cn: '花朵', emoji: '🌺', exEn: 'Pretty flowers bloom in spring.', exCn: '春天里盛开一朵朵娇艳的小花。' },
    { id: 'w_tree', en: 'Tree', ipa: '/triː/', cn: '大树', emoji: '🌳', exEn: 'Birds rest in the tall green tree.', exCn: '小鸟们在高高的大绿树上休息。' },
    { id: 'w_cloud', en: 'Cloud', ipa: '/klaʊd/', cn: '白云', emoji: '☁️', exEn: 'Fluffy white clouds float in the blue sky.', exCn: '软绵绵的白云在蓝天上缓缓漂浮。' },
    { id: 'w_rain', en: 'Rain', ipa: '/reɪn/', cn: '雨水/下雨', emoji: '🌧️', exEn: 'Pitter-patter falls the gentle rain.', exCn: '淅淅沥沥的春雨从空中落下来。' },
    { id: 'w_snow', en: 'Snow', ipa: '/snəʊ/', cn: '雪花/白雪', emoji: '❄️', exEn: 'Let us build a snowman in the white snow!', exCn: '我们一起在白雪地里堆雪人吧！' },
    { id: 'w_wind', en: 'Wind', ipa: '/wɪnd/', cn: '清风/微风', emoji: '💨', exEn: 'The gentle wind flies my kite high.', exCn: '温柔的微风吹拂着风筝高高飞。' },
    { id: 'w_sky', en: 'Sky', ipa: '/skaɪ/', cn: '天空', emoji: '🌌', exEn: 'The blue sky is so vast and clean.', exCn: '蓝蓝的天空无边无际又纯净。' },
    { id: 'w_grass', en: 'Grass', ipa: '/ɡrɑːs/', cn: '青草/草地', emoji: '🌱', exEn: 'Green grass carpets the gentle hill.', exCn: '绿油油的青草铺满了小山坡。' },
    { id: 'w_leaf', en: 'Leaf', ipa: '/liːf/', cn: '树叶', emoji: '🍃', exEn: 'A golden leaf dances in the autumn breeze.', exCn: '一片金黄色的树叶在秋风中跳舞。' },
    { id: 'w_mountain', en: 'Mountain', ipa: '/ˈmaʊn.tɪn/', cn: '高山', emoji: '⛰️', exEn: 'The majestic mountain stands tall.', exCn: '巍峨的大山高高耸立。' },
    { id: 'w_river', en: 'River', ipa: '/ˈrɪv.ər/', cn: '小河/江河', emoji: '🌊', exEn: 'The clear river flows peacefully.', exCn: '清澈见底的小河欢快奔流。' },
    { id: 'w_sea', en: 'Sea / Ocean', ipa: '/siː/', cn: '大海/海洋', emoji: '🌊', exEn: 'Blue waves lap the sandy seashore.', exCn: '蔚蓝的波浪温柔拍打着金色沙滩。' },
    { id: 'w_rock', en: 'Rock / Stone', ipa: '/rɒk/', cn: '石头/小石子', emoji: '🪨', exEn: 'A smooth round stone by the river bank.', exCn: '河岸边一颗光滑的小圆石。' },
    { id: 'w_forest', en: 'Forest', ipa: '/ˈfɒr.ɪst/', cn: '森林', emoji: '🌲', exEn: 'Cute wild animals live safely in the forest.', exCn: '可爱的野生动物在森林里快乐生活。' },
    { id: 'w_fire', en: 'Fire', ipa: '/ˈfaɪər/', cn: '火焰/篝火', emoji: '🔥', exEn: 'A cozy campfire keeps us warm at camp.', exCn: '露营时温暖的篝火为我们驱走寒冷。' },
    { id: 'w_earth', en: 'Earth', ipa: '/ɜːθ/', cn: '地球家园', emoji: '🌍', exEn: 'Earth is our precious green planet home.', exCn: '地球是我们珍贵美丽的绿色家园。' }
  ],
  vehicles: [
    { id: 'w_car', en: 'Car', ipa: '/kɑːr/', cn: '小汽车', emoji: '🚗', exEn: 'Beep beep! A red family car.', exCn: '滴滴！一辆红色家庭小汽车。' },
    { id: 'w_bus', en: 'Bus', ipa: '/bʌs/', cn: '公共汽车/校车', emoji: '🚌', exEn: 'Take the yellow school bus to school.', exCn: '乘上黄色小校车开开心心上学去。' },
    { id: 'w_train', en: 'Train', ipa: '/treɪn/', cn: '火车/高铁', emoji: '🚄', exEn: 'Choo-choo! The bullet train runs fast!', exCn: '呜呜！高铁列车飞快行驶！' },
    { id: 'w_plane', en: 'Airplane', ipa: '/ˈeə.pleɪn/', cn: '飞机', emoji: '✈️', exEn: 'The big airplane flies high in the sky.', exCn: '大客机在云层上方自由翱翔。' },
    { id: 'w_bike', en: 'Bike / Bicycle', ipa: '/baɪk/', cn: '自行车', emoji: '🚲', exEn: 'I can ride my small two-wheel bike!', exCn: '我会稳稳地骑我的两轮小自行车啦！' },
    { id: 'w_ship', en: 'Ship', ipa: '/ʃɪp/', cn: '大轮船', emoji: '🚢', exEn: 'A big cruise ship sails across the ocean.', exCn: '大游轮在蔚蓝的海面上远航。' },
    { id: 'w_policecar', en: 'Police car', ipa: '/pəˈliːs kɑːr/', cn: '警车', emoji: '🚓', exEn: 'Wee-woo! The brave police car helps people.', exCn: '呜呜！英勇的警车保护着城市的安全。' },
    { id: 'w_firetruck', en: 'Fire truck', ipa: '/ˈfaɪə trʌk/', cn: '消防车', emoji: '🚒', exEn: 'The red fire truck rushes to put out fires.', exCn: '大红消防车赶去扑灭火情。' },
    { id: 'w_ambulance', en: 'Ambulance', ipa: '/ˈæm.bjə.ləns/', cn: '救护车', emoji: '🚑', exEn: 'The ambulance quickly takes patients to the hospital.', exCn: '救护车飞快护送病人去医院。' },
    { id: 'w_taxi', en: 'Taxi', ipa: '/ˈtæk.si/', cn: '出租车/的士', emoji: '🚕', exEn: 'Wave your hand to take a taxi.', exCn: '向出租车招招手，文明乘车出行。' },
    { id: 'w_truck', en: 'Truck', ipa: '/trʌk/', cn: '大卡车/货车', emoji: '🚚', exEn: 'A strong truck carries heavy goods.', exCn: '结实有力的大货车运载着货物。' },
    { id: 'w_helicopter', en: 'Helicopter', ipa: '/ˈhel.ɪˌkɒp.tər/', cn: '直升机', emoji: '🚁', exEn: 'The rescue helicopter hovers in the air.', exCn: '救援直升机在空中悬停执行任务。' },
    { id: 'w_boat', en: 'Boat', ipa: '/bəʊt/', cn: '小帆船/木船', emoji: '⛵', exEn: 'Row, row, row your boat gently down the stream.', exCn: '划呀划，轻轻摇着小木船顺流而下。' },
    { id: 'w_rocket', en: 'Rocket', ipa: '/ˈrɒk.ɪt/', cn: '太空火箭', emoji: '🚀', exEn: 'Three, two, one, blast off into space!', exCn: '三、二、一，太空火箭直冲云霄！' },
    { id: 'w_submarine', en: 'Submarine', ipa: '/ˈsʌb.mə.riːn/', cn: '潜水艇', emoji: '🤿', exEn: 'The yellow submarine dives into the deep ocean.', exCn: '黄色潜水艇探索奇妙的海底世界。' },
    { id: 'w_motorcycle', en: 'Motorcycle', ipa: '/ˈməʊ.təˌsaɪ.kəl/', cn: '摩托车', emoji: '🏍️', exEn: 'Always wear a helmet when riding a motorcycle.', exCn: '乘坐摩托车一定要规范戴好安全头盔。' },
    { id: 'w_scooter', en: 'Scooter', ipa: '/ˈskuː.tər/', cn: '儿童滑板车', emoji: '🛴', exEn: 'I love gliding freely on my kick scooter!', exCn: '我最喜欢踩着小滑板车在公园自由滑行！' },
    { id: 'w_skateboard', en: 'Skateboard', ipa: '/ˈskeɪt.bɔːd/', cn: '滑板', emoji: '🛹', exEn: 'Practice keeping good balance on the skateboard.', exCn: '在滑板上练习平稳的平衡技巧。' },
    { id: 'w_tractor', en: 'Tractor', ipa: '/ˈtræk.tər/', cn: '农用拖拉机', emoji: '🚜', exEn: 'The green tractor works hard on the farm.', exCn: '绿色的拖拉机在农田里勤劳耕作。' },
    { id: 'w_subway', en: 'Subway / Metro', ipa: '/ˈsʌb.weɪ/', cn: '地铁/城铁', emoji: '🚇', exEn: 'The subway is fast, clean and convenient.', exCn: '地下铁道干净、快速又准时。' }
  ]
}

// 统计全站日常单词总数（8大场景 × 20 = 160个单词）
export const TOTAL_ENGLISH_WORDS_COUNT = Object.values(ENGLISH_WORDS).reduce(
  (total, list) => total + list.length,
  0
)

// 6 大亲子情景互动剧场（家长 & 小朋友双角色沟通）
export const PARENT_KID_SCENES = [
  {
    id: 'scene_morning',
    title: '早晨起床问候',
    enTitle: 'Happy Morning Routine',
    icon: '🌅',
    themeBg: 'linear-gradient(135deg, #fff8e1 0%, #ffe0b2 100%)',
    borderColor: '#ffb74d',
    parentTip: '💡 家长锦囊：每天早晨拉开窗帘时，用欢快的语调对宝贝说 "Good morning!"，并伸手和宝贝击掌 (High five)，自然养成英语晨间习惯。',
    keyPhrases: ['Good morning! (早上好)', 'Time to get up! (起床啦)', 'Wash your face. (洗洗脸)'],
    dialogues: [
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👩',
        en: 'Good morning, sweetheart! Time to get up!',
        slowWords: ['Good', 'morning,', 'sweetheart!', 'Time', 'to', 'get', 'up!'],
        cn: '早上好，小宝贝！该起床啦！',
        actionTip: '👋 轻轻拍拍宝贝的肩膀，露出大大的微笑'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'Good morning, Mommy! What a sunny day!',
        slowWords: ['Good', 'morning,', 'Mommy!', 'What', 'a', 'sunny', 'day!'],
        cn: '早上好，妈妈！今天阳光真好呀！',
        actionTip: '🙆‍♂️ 伸个大大的懒腰，指向窗外的太阳'
      },
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👩',
        en: 'Let’s brush teeth and wash your face!',
        slowWords: ['Let’s', 'brush', 'teeth', 'and', 'wash', 'your', 'face!'],
        cn: '咱们一起去刷牙、洗小脸吧！',
        actionTip: '🪥 做刷牙和揉脸蛋的趣味动作'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'OK! Look! My teeth are super clean!',
        slowWords: ['OK!', 'Look!', 'My', 'teeth', 'are', 'super', 'clean!'],
        cn: '好哒！你看！我的小牙齿超级干净！',
        actionTip: '😁 露出整齐的小白牙笑一笑'
      }
    ]
  },
  {
    id: 'scene_meal',
    title: '快乐用餐时光',
    enTitle: 'Yummy Mealtime',
    icon: '🍽️',
    themeBg: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    borderColor: '#f06292',
    parentTip: '💡 家长锦囊：吃早餐或晚餐时，把牛奶、鸡蛋、水果端上桌，用 "Would you like some...?" 提问，引导孩子说出 "Yes, please!" 和 "Thank you!"。',
    keyPhrases: ['I am hungry. (我饿啦)', 'Yes, please! (好的，请给我)', 'It is yummy! (真好吃)'],
    dialogues: [
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'Mom, I am hungry! What is for breakfast?',
        slowWords: ['Mom,', 'I', 'am', 'hungry!', 'What', 'is', 'for', 'breakfast?'],
        cn: '妈妈，我肚子饿啦！早餐吃什么呀？',
        actionTip: '😋 摸摸小肚子，闻一闻香香的饭菜'
      },
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👩',
        en: 'We have bread, eggs and milk. Would you like an egg?',
        slowWords: ['We', 'have', 'bread,', 'eggs', 'and', 'milk.', 'Would', 'you', 'like', 'an', 'egg?'],
        cn: '我们有面包、鸡蛋和牛奶。你想要一个鸡蛋吗？',
        actionTip: '🥚 拿起一个圆圆的鸡蛋递给宝贝'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'Yes, please! Thank you! Mmm, it is so yummy!',
        slowWords: ['Yes,', 'please!', 'Thank', 'you!', 'Mmm,', 'it', 'is', 'so', 'yummy!'],
        cn: '好的，请给我一个！谢谢！嗯～太美味啦！',
        actionTip: '👍 竖起大拇指，开心地品尝美食'
      },
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👩',
        en: 'You are welcome! Eat well and grow strong!',
        slowWords: ['You', 'are', 'welcome!', 'Eat', 'well', 'and', 'grow', 'strong!'],
        cn: '不客气！好好吃饭，身体长高长壮！',
        actionTip: '💪 做出大力士秀肌肉的动作'
      }
    ]
  },
  {
    id: 'scene_market',
    title: '超市购物小帮手',
    enTitle: 'Supermarket Helper',
    icon: '🛒',
    themeBg: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    borderColor: '#66bb6a',
    parentTip: '💡 家长锦囊：带孩子去水果店或超市时，让孩子当“采购小队长”，一边挑水果一边练习颜色、数量和水果名称。',
    keyPhrases: ['What do you like? (你喜欢什么)', 'I like apples. (我喜欢苹果)', 'How many? (多少个)'],
    dialogues: [
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👨',
        en: 'Welcome to the fruit shop! What fruit do you like?',
        slowWords: ['Welcome', 'to', 'the', 'fruit', 'shop!', 'What', 'fruit', 'do', 'you', 'like?'],
        cn: '欢迎来到水果区！宝贝你喜欢什么水果呀？',
        actionTip: '🛒 推着小购物车，指向五颜六色的水果'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'I like red apples and sweet bananas!',
        slowWords: ['I', 'like', 'red', 'apples', 'and', 'sweet', 'bananas!'],
        cn: '我喜欢红苹果和甜香蕉！',
        actionTip: '🍎 指向苹果和香蕉'
      },
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👨',
        en: 'Great choice! How many apples do we need?',
        slowWords: ['Great', 'choice!', 'How', 'many', 'apples', 'do', 'we', 'need?'],
        cn: '选得真棒！我们需要几个苹果呢？',
        actionTip: '🤚 伸出手指询问数量'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'One, two, three! Three apples for our family!',
        slowWords: ['One,', 'two,', 'three!', 'Three', 'apples', 'for', 'our', 'family!'],
        cn: '一、二、三！给我们一家人买三个苹果！',
        actionTip: '✌️ 边数数边把苹果放进购物篮'
      }
    ]
  },
  {
    id: 'scene_zoo',
    title: '动物园奇妙游',
    enTitle: 'At the Animal Zoo',
    icon: '🦒',
    themeBg: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
    borderColor: '#26c6da',
    parentTip: '💡 家长锦囊：看绘本或逛动物园时，可以玩模仿动物动作猜名字的游戏，用 "Look at the..." 和 "What is that?" 激发孩子好奇心。',
    keyPhrases: ['Look at the... (看那个...)', 'So cute! (太可爱啦)', 'It has long ears. (它有长耳朵)'],
    dialogues: [
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👨',
        en: 'Look over there! What is that black and white animal?',
        slowWords: ['Look', 'over', 'there!', 'What', 'is', 'that', 'black', 'and', 'white', 'animal?'],
        cn: '快看那边！那只黑白相间的动物是什么呀？',
        actionTip: '🔭 手搭凉棚望向远处'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'It is a giant panda! It is eating green bamboo!',
        slowWords: ['It', 'is', 'a', 'giant', 'panda!', 'It', 'is', 'eating', 'green', 'bamboo!'],
        cn: '是一只大熊猫！它正在吃绿竹子呢！',
        actionTip: '🐼 学大熊猫双手抱着竹子咔嚓咔嚓吃'
      },
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👨',
        en: 'Yes! And look at the giraffe. It is so tall!',
        slowWords: ['Yes!', 'And', 'look', 'at', 'the', 'giraffe.', 'It', 'is', 'so', 'tall!'],
        cn: '对啦！再看那只长颈鹿，它的个子真高呀！',
        actionTip: '🦒 抬起头往高处看'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'Wow! I love animals! They are our good friends!',
        slowWords: ['Wow!', 'I', 'love', 'animals!', 'They', 'are', 'our', 'good', 'friends!'],
        cn: '哇！我爱小动物！它们是我们的好朋友！',
        actionTip: '❤️ 用双手比一个大大的爱心'
      }
    ]
  },
  {
    id: 'scene_friends',
    title: '社交礼仪：认识新朋友',
    enTitle: 'Making New Friends',
    icon: '🤝',
    themeBg: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
    borderColor: '#ab47bc',
    parentTip: '💡 家长锦囊：升入小学一年级第一周，自我介绍是必不可少的环节。家长可以假装是新同学，和宝贝演练大方介绍自己的名字和年龄。',
    keyPhrases: ['What is your name? (你叫什么名字)', 'How old are you? (你几岁啦)', 'Nice to meet you! (很高兴认识你)'],
    dialogues: [
      {
        role: 'parent',
        speaker: '家长(扮演新同学)',
        avatar: '🧑‍🎓',
        en: 'Hello! Welcome to Primary School! What is your name?',
        slowWords: ['Hello!', 'Welcome', 'to', 'Primary', 'School!', 'What', 'is', 'your', 'name?'],
        cn: '你好呀！欢迎来到小学！你叫什么名字呢？',
        actionTip: '👋 热情地挥挥手打招呼'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'Hi! My name is Super Kid! How old are you?',
        slowWords: ['Hi!', 'My', 'name', 'is', 'Super', 'Kid!', 'How', 'old', 'are', 'you?'],
        cn: '嗨！我是超级小宝贝！你今年几岁啦？',
        actionTip: '😊 拍拍胸脯自信介绍（可把 Super Kid 换成宝贝真名）'
      },
      {
        role: 'parent',
        speaker: '家长(扮演新同学)',
        avatar: '🧑‍🎓',
        en: 'I am six years old! Let’s play together!',
        slowWords: ['I', 'am', 'six', 'years', 'old!', 'Let’s', 'play', 'together!'],
        cn: '我六岁啦！我们一起玩吧！',
        actionTip: '🤙 比出“6”的手势邀请一起玩'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'Great! Nice to meet you, my new friend!',
        slowWords: ['Great!', 'Nice', 'to', 'meet', 'you,', 'my', 'new', 'friend!'],
        cn: '太棒啦！很高兴认识你，我的新朋友！',
        actionTip: '🤝 和爸爸妈妈握握手、击个掌'
      }
    ]
  },
  {
    id: 'scene_bedtime',
    title: '温馨睡前晚安',
    enTitle: 'Sweet Bedtime',
    icon: '🌙',
    themeBg: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)',
    borderColor: '#5c6bc0',
    parentTip: '💡 家长锦囊：睡前是孩子安全感最足、记忆力最温柔的时刻。读完绘本后互道 "Good night" 和 "I love you"，让孩子带着爱意入眠。',
    keyPhrases: ['Time for bed. (该睡觉啦)', 'Good night! (晚安)', 'Sweet dreams! (做个好梦)'],
    dialogues: [
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👩',
        en: 'Look at the moon and stars. It is time for bed.',
        slowWords: ['Look', 'at', 'the', 'moon', 'and', 'stars.', 'It', 'is', 'time', 'for', 'bed.'],
        cn: '看窗外的月亮和星星，到时间上床睡觉啦。',
        actionTip: '🌙 调暗灯光，帮宝贝掖好小被角'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'Can you read me a bedtime story, please?',
        slowWords: ['Can', 'you', 'read', 'me', 'a', 'bedtime', 'story,', 'please?'],
        cn: '可以给我讲一个睡前故事吗，求求你啦？',
        actionTip: '📖 抱起心爱的小绘本'
      },
      {
        role: 'parent',
        speaker: '爸爸/妈妈',
        avatar: '👩',
        en: 'Sure! Now close your eyes. Good night, my little star!',
        slowWords: ['Sure!', 'Now', 'close', 'your', 'eyes.', 'Good', 'night,', 'my', 'little', 'star!'],
        cn: '当然可以！现在闭上眼睛吧。晚安，我的小星星！',
        actionTip: '😘 轻轻亲吻宝贝的额头'
      },
      {
        role: 'kid',
        speaker: '小宝贝',
        avatar: '🧒',
        en: 'Good night, Mom and Dad! I love you! Sweet dreams!',
        slowWords: ['Good', 'night,', 'Mom', 'and', 'Dad!', 'I', 'love', 'you!', 'Sweet', 'dreams!'],
        cn: '晚安，爸爸妈妈！我爱你们！做个甜甜的好梦！',
        actionTip: '🤗 给爸爸妈妈一个温暖的晚安拥抱'
      }
    ]
  }
]

// 英语乐园 3 大趣味闯关游戏
export const ENGLISH_GAMES = {
  // 游戏1：字母大小写找朋友分组
  letterPairsGroups: [
    ['A', 'B', 'C', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'Z']
  ],
  // 游戏2：听音摘果子（听英文选图案）
  wordListenQuiz: [
    { id: 'ewq1', word: 'Apple', cn: '红苹果', speak: 'Apple! Find the red apple!', answer: 'Apple', options: [
      { word: 'Apple', cn: '苹果', emoji: '🍎' },
      { word: 'Banana', cn: '香蕉', emoji: '🍌' },
      { word: 'Watermelon', cn: '西瓜', emoji: '🍉' },
      { word: 'Strawberry', cn: '草莓', emoji: '🍓' }
    ]},
    { id: 'ewq2', word: 'Panda', cn: '大熊猫', speak: 'Panda! Where is the cute panda?', answer: 'Panda', options: [
      { word: 'Tiger', cn: '老虎', emoji: '🐯' },
      { word: 'Panda', cn: '大熊猫', emoji: '🐼' },
      { word: 'Rabbit', cn: '小兔', emoji: '🐰' },
      { word: 'Monkey', cn: '小猴', emoji: '🐵' }
    ]},
    { id: 'ewq3', word: 'Rainbow', cn: '七色彩虹', speak: 'Rainbow! Look at the colorful rainbow!', answer: 'Rainbow', options: [
      { word: 'Sun', cn: '太阳', emoji: '☀️' },
      { word: 'Moon', cn: '月亮', emoji: '🌙' },
      { word: 'Rainbow', cn: '彩虹', emoji: '🌈' },
      { word: 'Star', cn: '星星', emoji: '⭐' }
    ]},
    { id: 'ewq4', word: 'Schoolbag', cn: '小书包', speak: 'Schoolbag! Pack your schoolbag!', answer: 'Schoolbag', options: [
      { word: 'Schoolbag', cn: '书包', emoji: '🎒' },
      { word: 'Pencil', cn: '铅笔', emoji: '✏️' },
      { word: 'Book', cn: '书本', emoji: '📖' },
      { word: 'Ruler', cn: '尺子', emoji: '📏' }
    ]},
    { id: 'ewq5', word: 'Airplane', cn: '大飞机', speak: 'Airplane! The airplane flies in the sky!', answer: 'Airplane', options: [
      { word: 'Car', cn: '小汽车', emoji: '🚗' },
      { word: 'Bus', cn: '公交车', emoji: '🚌' },
      { word: 'Train', cn: '火车', emoji: '🚄' },
      { word: 'Airplane', cn: '飞机', emoji: '✈️' }
    ]},
    { id: 'ewq6', word: 'Milk', cn: '纯牛奶', speak: 'Milk! Drink milk every morning!', answer: 'Milk', options: [
      { word: 'Bread', cn: '面包', emoji: '🍞' },
      { word: 'Milk', cn: '牛奶', emoji: '🥛' },
      { word: 'Cake', cn: '蛋糕', emoji: '🎂' },
      { word: 'Egg', cn: '鸡蛋', emoji: '🥚' }
    ]}
  ],
  // 游戏3：亲子情景交际问答（爸爸妈妈问，宝贝答）
  dialogueQuiz: [
    {
      id: 'edq1',
      scene: '🌅 早晨起床时',
      parentSay: 'Good morning, sweetheart!',
      parentCn: '早上好，小宝贝！',
      emoji: '☀️',
      answer: 'Good morning, Mommy!',
      options: [
        { en: 'Good morning, Mommy!', cn: '早上好，妈妈！' },
        { en: 'Good night, Mommy!', cn: '晚安，妈妈！' },
        { en: 'Goodbye!', cn: '再见！' }
      ]
    },
    {
      id: 'edq2',
      scene: '🍽️ 早餐吃鸡蛋时',
      parentSay: 'Would you like an egg?',
      parentCn: '你想要吃一个鸡蛋吗？',
      emoji: '🥚',
      answer: 'Yes, please! Thank you!',
      options: [
        { en: 'Yes, please! Thank you!', cn: '好的，请给我一个！谢谢！' },
        { en: 'I am six years old.', cn: '我六岁了。' },
        { en: 'Nice to meet you!', cn: '很高兴认识你！' }
      ]
    },
    {
      id: 'edq3',
      scene: '🤝 认识新同学时',
      parentSay: 'Hello! What is your name?',
      parentCn: '你好！你叫什么名字呀？',
      emoji: '🎒',
      answer: 'Hi! My name is Super Kid!',
      options: [
        { en: 'Hi! My name is Super Kid!', cn: '嗨！我叫超级宝贝！' },
        { en: 'It is a red apple.', cn: '这是一个红苹果。' },
        { en: 'Sweet dreams!', cn: '做个好梦！' }
      ]
    },
    {
      id: 'edq4',
      scene: '🦒 在动物园看到大熊猫',
      parentSay: 'Look! What is that black and white animal?',
      parentCn: '快看！那只黑白相间的动物是什么？',
      emoji: '🐼',
      answer: 'It is a cute panda!',
      options: [
        { en: 'It is a cute panda!', cn: '是一只可爱的大熊猫！' },
        { en: 'Open your schoolbag.', cn: '打开你的小书包。' },
        { en: 'Wash your face.', cn: '洗洗你的脸。' }
      ]
    },
    {
      id: 'edq5',
      scene: '🌙 晚上盖好被子准备睡觉',
      parentSay: 'Time for bed. Good night, my little star!',
      parentCn: '该睡觉啦。晚安，我的小星星！',
      emoji: '🌙',
      answer: 'Good night! I love you!',
      options: [
        { en: 'Good night! I love you!', cn: '晚安！我爱你们！' },
        { en: 'Time to get up!', cn: '该起床啦！' },
        { en: 'How many apples?', cn: '有多少个苹果？' }
      ]
    }
  ]
}
