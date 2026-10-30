import { ref, computed } from 'vue'

const DB_NAME = 'kids_voice_studio_db_v1'
const STORE_NAME = 'voice_clips'
const SETTINGS_KEY = 'kids_voice_studio_settings_v2'
const TIMBRE_SAMPLE_KEY = '__timbre_sample__::main'

export const VOICE_ROLES = [
  {
    id: 'kid',
    name: '宝贝自己的声音',
    shortName: '宝贝原声',
    icon: '🧒',
    color: '#ff7043',
    desc: '让宝贝自己当小老师，听着自己的声音自信开口！'
  },
  {
    id: 'mom',
    name: '妈妈的温柔声音',
    shortName: '妈妈领读',
    icon: '👩',
    color: '#ec407a',
    desc: '妈妈录下温柔的领读与夸奖，时刻陪伴宝贝闯关！'
  },
  {
    id: 'dad',
    name: '爸爸的活力声音',
    shortName: '爸爸领读',
    icon: '👨',
    color: '#0288d1',
    desc: '爸爸充满活力的声音，带宝贝一起勇敢挑战！'
  },
  {
    id: 'system',
    name: '浏览器内置发音人',
    shortName: '内置声音',
    icon: '🔊',
    color: '#2e7d32',
    desc: '自由试听并切换浏览器内置的多种中文/英文发音人音色。'
  }
]

// 8条高频亲子鼓励与日常引导语
export const PRAISE_PRESETS = [
  { id: 'praise_1', text: '答对啦！宝贝你真聪明！', category: 'praise', title: '闯关答对夸奖 1', emoji: '🎉' },
  { id: 'praise_2', text: '太棒啦！给你点亮一颗大金星！', category: 'praise', title: '获得金星夸奖 2', emoji: '🌟' },
  { id: 'praise_3', text: '哇，你的发音真标准，再接再厉哦！', category: 'praise', title: '发音标准夸奖 3', emoji: '👍' },
  { id: 'praise_4', text: '没关系，差一点点就对啦，我们再试一次吧！', category: 'encourage', title: '答错温柔鼓励 1', emoji: '🤗' },
  { id: 'praise_5', text: '别灰心，仔细听一听，你一定能行！', category: 'encourage', title: '答错温柔鼓励 2', emoji: '💪' },
  { id: 'praise_6', text: '早上好呀小宝贝，今天想先学拼音还是英语呢？', category: 'greeting', title: '每日欢迎问候', emoji: '☀️' },
  { id: 'praise_7', text: '拼读成功！你已经是拼音小达人啦！', category: 'praise', title: '拼音通关祝贺', emoji: '🔤' },
  { id: 'praise_8', text: 'High five! 我们的英语情景剧演得太默契啦！', category: 'praise', title: '英语亲子剧击掌', emoji: '🙌' }
]

const DEFAULT_SETTINGS = {
  // 全站主导音源模式：
  // 'browser' -> 使用所选的浏览器内置声音
  // 'my_timbre' -> 使用「录入我的一段话」提取/克隆的个人音色播放全站所有音频
  // 'recorded_first' -> 优先使用逐句录制的真人配音，未录制词条使用所选音色
  voiceEngineMode: 'browser',
  activeRole: 'kid',
  fallbackToOtherFamilyRole: true,
  autoPlayPraiseOnSuccess: true,

  // 浏览器内置声音选择与参数
  selectedZhVoiceURI: '',
  selectedEnVoiceURI: '',
  browserRate: 0.92,
  browserPitch: 1.05,
  selectedGender: 'female', // 'female' | 'male'

  // 右下角悬浮录音按钮显示与隐藏
  hideFloatingRecorder: false,

  // 「录入我的一段话」个人声纹音色配置
  timbreSampleText: '嗨宝贝，我是最爱你的爸爸妈妈！今天我们一起开心地学拼音、读英语、背古诗吧，你一定是最棒的！',
  timbreProfile: {
    hasSample: false,
    recordedAt: '',
    duration: 0,
    detectedHz: 210,
    voiceTypeLabel: '未录入样本',
    computedPitch: 1.08,
    computedRate: 0.92,
    matchedZhVoiceURI: '',
    matchedEnVoiceURI: ''
  },

  // AI 零样本高保真声音克隆配置（可选增强）
  aiCloneEnabled: false,
  aiProvider: 'siliconflow', // 'siliconflow' | 'custom'
  aiApiKey: '',
  aiModel: 'FunAudioLLM/CosyVoice2-0.5B',
  aiCustomEndpoint: '',
  aiVoiceUri: '',
  aiRefText: '嗨宝贝，我是最爱你的爸爸妈妈！今天我们一起开心地学拼音、读英语、背古诗吧，你一定是最棒的！'
}

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY) || window.localStorage.getItem('kids_voice_studio_settings_v1')
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        timbreProfile: {
          ...DEFAULT_SETTINGS.timbreProfile,
          ...(parsed.timbreProfile || {})
        }
      }
    }
  } catch (e) {}
  return { ...DEFAULT_SETTINGS }
}

const voiceSettings = ref(loadSettings())
const recordedClipsIndex = ref({})
const isDbReady = ref(false)

// 浏览器内置语音列表（响应式）
const browserVoices = ref([])
const hasLoadedBrowserVoices = ref(false)

// 用户录入的那一段话（声纹样本 Blob）
const timbreSampleBlob = ref(null)

// 右下角「边学边录」胶囊状态
const lastSpokenText = ref('右下半圆 b b b，拉开天线听广播')
const lastSpokenLang = ref('zh-CN')
const lastSpokenLabel = ref('拼音认读示范')
const isRecordingGlobal = ref(false)
const recordingSeconds = ref(0)
const isPlayingCustomAudio = ref(false)

let dbPromise = null
let activeAudioEl = null
let mediaRecorder = null
let recordingChunks = []
let recordingTimer = null
let voicesListenerBound = false

// 为浏览器内置声音生成对家长和小朋友友好的中文描述标签
export function describeBrowserVoice(voice) {
  if (!voice) return { friendlyName: '系统默认语音', tag: '标准', genderHint: 'standard' }
  const name = voice.name || ''
  const lang = voice.lang || ''

  const knownMap = [
    { match: 'Tingting', friendlyName: '婷婷 (Tingting)', tag: '温暖普通话女声 · 推荐', genderHint: 'female' },
    { match: 'Ting-Ting', friendlyName: '婷婷 (Ting-Ting)', tag: '温暖普通话女声 · 推荐', genderHint: 'female' },
    { match: 'Meijia', friendlyName: '美佳 (Meijia)', tag: '甜美台湾国语女声 · 亲切', genderHint: 'female' },
    { match: 'Sinji', friendlyName: '善怡 (Sinji)', tag: '标准粤语女声', genderHint: 'female' },
    { match: 'Sin-Ji', friendlyName: '善怡 (Sin-Ji)', tag: '标准粤语女声', genderHint: 'female' },
    { match: 'Xiaoxiao', friendlyName: '微软晓晓 (Xiaoxiao)', tag: '超自然少儿绘本女声 · 强烈推荐', genderHint: 'female' },
    { match: 'Xiaoyi', friendlyName: '微软晓伊 (Xiaoyi)', tag: '活泼卡通童声女声 · 推荐', genderHint: 'kid' },
    { match: 'Yunxi', friendlyName: '微软云希 (Yunxi)', tag: '阳光清朗大哥哥声', genderHint: 'male' },
    { match: 'Yunjian', friendlyName: '微软云健 (Yunjian)', tag: '沉稳浑厚男声', genderHint: 'male' },
    { match: 'Yunyang', friendlyName: '微软云扬 (Yunyang)', tag: '新闻播音男声', genderHint: 'male' },
    { match: 'Xiaobei', friendlyName: '微软晓北 (Xiaobei)', tag: '趣味东北话女声', genderHint: 'female' },
    { match: 'HsiaoChen', friendlyName: '晓臻 (HsiaoChen)', tag: '温柔台湾女声', genderHint: 'female' },
    { match: 'WanLung', friendlyName: '云龙 (WanLung)', tag: '粤语男声', genderHint: 'male' },
    { match: 'Lili', friendlyName: '莉莉 (Lili)', tag: '清脆普通话女声', genderHint: 'female' },
    { match: 'Huihui', friendlyName: '慧慧 (Huihui)', tag: '标准普通话女声', genderHint: 'female' },
    { match: 'Kangkang', friendlyName: '康康 (Kangkang)', tag: '标准普通话男声', genderHint: 'male' },
    { match: 'Yaoyao', friendlyName: '瑶瑶 (Yaoyao)', tag: '甜美普通话女声', genderHint: 'female' },
    { match: 'Samantha', friendlyName: '莎曼珊 (Samantha)', tag: '纯正美式英语女声 · 推荐', genderHint: 'female' },
    { match: 'Ava', friendlyName: '艾娃 (Ava)', tag: '自然美式英语女声 · 推荐', genderHint: 'female' },
    { match: 'Allison', friendlyName: '艾莉森 (Allison)', tag: '清晰美式外教女声', genderHint: 'female' },
    { match: 'Victoria', friendlyName: '维多利亚 (Victoria)', tag: '温柔美式女声', genderHint: 'female' },
    { match: 'Alex', friendlyName: '亚历克斯 (Alex)', tag: '磁性美式英语男声', genderHint: 'male' },
    { match: 'Daniel', friendlyName: '丹尼尔 (Daniel)', tag: '纯正英伦绅士男声', genderHint: 'male' },
    { match: 'Karen', friendlyName: '凯伦 (Karen)', tag: '自然澳洲英语女声', genderHint: 'female' },
    { match: 'Moira', friendlyName: '莫伊拉 (Moira)', tag: '温和爱尔兰英语女声', genderHint: 'female' },
    { match: 'Jenny', friendlyName: '微软珍妮 (Jenny)', tag: '亲切美式少儿外教', genderHint: 'female' },
    { match: 'Aria', friendlyName: '微软艾莉亚 (Aria)', tag: '绘本故事美式女声', genderHint: 'female' },
    { match: 'Guy', friendlyName: '微软盖伊 (Guy)', tag: '活力美式男声', genderHint: 'male' },
    { match: 'Eddy', friendlyName: '艾迪 (Eddy)', tag: '轻快男声', genderHint: 'male' },
    { match: 'Flo', friendlyName: '芙洛 (Flo)', tag: '温和女声', genderHint: 'female' },
    { match: 'Grandma', friendlyName: '慈祥奶奶 (Grandma)', tag: '故事老奶奶特色音', genderHint: 'female' },
    { match: 'Grandpa', friendlyName: '慈祥爷爷 (Grandpa)', tag: '故事老爷爷特色音', genderHint: 'male' },
    { match: 'Reed', friendlyName: '里德 (Reed)', tag: '沉稳男声', genderHint: 'male' },
    { match: 'Rocko', friendlyName: '洛克 (Rocko)', tag: '浑厚男声', genderHint: 'male' },
    { match: 'Sandy', friendlyName: '珊迪 (Sandy)', tag: '清脆活泼少年音', genderHint: 'kid' },
    { match: 'Shelley', friendlyName: '雪莉 (Shelley)', tag: '柔和女声', genderHint: 'female' },
    { match: 'Google 普通话', friendlyName: 'Google 标准普通话', tag: '云端清晰普通话', genderHint: 'female' },
    { match: 'Google 國語', friendlyName: 'Google 台湾国语', tag: '云端台湾腔女声', genderHint: 'female' },
    { match: 'Google 粤語', friendlyName: 'Google 粤语发音', tag: '云端粤语发音', genderHint: 'female' },
    { match: 'Google US English', friendlyName: 'Google 美式英语', tag: '云端标准美音', genderHint: 'female' },
    { match: 'Google UK English Female', friendlyName: 'Google 英式女声', tag: '云端标准英音女声', genderHint: 'female' },
    { match: 'Google UK English Male', friendlyName: 'Google 英式男声', tag: '云端标准英音男声', genderHint: 'male' }
  ]

  for (const item of knownMap) {
    if (name.toLowerCase().includes(item.match.toLowerCase())) {
      return {
        friendlyName: `${item.friendlyName}`,
        tag: item.tag,
        genderHint: item.genderHint
      }
    }
  }

  let langLabel = lang
  if (lang.includes('zh-CN') || lang.includes('cmn-Hans')) langLabel = '普通话 (中国大陆)'
  else if (lang.includes('zh-TW') || lang.includes('cmn-Hant')) langLabel = '国语 (中国台湾)'
  else if (lang.includes('zh-HK') || lang.includes('yue')) langLabel = '粤语 (中国香港)'
  else if (lang.includes('en-US')) langLabel = '美式英语 (US)'
  else if (lang.includes('en-GB')) langLabel = '英式英语 (UK)'
  else if (lang.includes('en-AU')) langLabel = '澳式英语 (AU)'

  return {
    friendlyName: name,
    tag: `${langLabel} · ${voice.localService ? '本地内置' : '云端发音'}`,
    genderHint: 'standard'
  }
}

export function refreshBrowserVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return []
  const rawList = window.speechSynthesis.getVoices() || []
  if (rawList.length > 0) {
    const mapped = rawList.map(v => {
      const desc = describeBrowserVoice(v)
      return {
        voiceURI: v.voiceURI || v.name,
        name: v.name,
        lang: v.lang || '',
        localService: !!v.localService,
        default: !!v.default,
        friendlyName: desc.friendlyName,
        tag: desc.tag,
        genderHint: desc.genderHint,
        rawVoice: v
      }
    })
    browserVoices.value = mapped
    hasLoadedBrowserVoices.value = true

    // 如果尚未设置默认中/英文语音，自动挑选最优的默认项
    if (!voiceSettings.value.selectedZhVoiceURI) {
      const bestZh =
        mapped.find(v => v.lang.includes('zh-CN') && (v.name.includes('Xiaoxiao') || v.name.includes('Ting') || v.name.includes('Meijia'))) ||
        mapped.find(v => v.lang.includes('zh-CN')) ||
        mapped.find(v => v.lang.toLowerCase().includes('zh'))
      if (bestZh) {
        voiceSettings.value.selectedZhVoiceURI = bestZh.voiceURI
      }
    }
    if (!voiceSettings.value.selectedEnVoiceURI) {
      const bestEn =
        mapped.find(v => v.lang.includes('en-US') && (v.name.includes('Samantha') || v.name.includes('Ava') || v.name.includes('Jenny') || v.name.includes('Google'))) ||
        mapped.find(v => v.lang.startsWith('en-US')) ||
        mapped.find(v => v.lang.startsWith('en'))
      if (bestEn) {
        voiceSettings.value.selectedEnVoiceURI = bestEn.voiceURI
      }
    }
  }
  return browserVoices.value
}

function initBrowserVoicesListener() {
  if (voicesListenerBound || typeof window === 'undefined' || !('speechSynthesis' in window)) return
  voicesListenerBound = true
  refreshBrowserVoices()
  if ('onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      refreshBrowserVoices()
    })
  }
  // 兼容部分移动端浏览器延迟返回 voices
  setTimeout(refreshBrowserVoices, 300)
  setTimeout(refreshBrowserVoices, 1000)
}

export function normalizeVoiceText(text) {
  if (!text) return ''
  return String(text)
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

export function buildVoiceDbKey(roleId, text) {
  return `${roleId}::${normalizeVoiceText(text)}`
}

function openVoiceDB() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported'))
      return
    }
    const req = window.indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = (e) => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' })
        store.createIndex('roleId', 'roleId', { unique: false })
        store.createIndex('normText', 'normText', { unique: false })
      }
    }
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
  return dbPromise
}

async function refreshClipsIndex() {
  try {
    const db = await openVoiceDB()
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req = store.getAll()
      req.onsuccess = () => {
        const list = req.result || []
        const map = {}
        list.forEach(item => {
          if (item.key === TIMBRE_SAMPLE_KEY) {
            timbreSampleBlob.value = item.blob || null
            return
          }
          map[item.key] = {
            key: item.key,
            roleId: item.roleId,
            normText: item.normText,
            rawText: item.rawText,
            label: item.label || item.rawText,
            category: item.category || 'general',
            mimeType: item.mimeType,
            duration: item.duration || 0,
            updatedAt: item.updatedAt
          }
        })
        recordedClipsIndex.value = map
        isDbReady.value = true
        resolve(map)
      }
      req.onerror = () => {
        isDbReady.value = true
        resolve({})
      }
    })
  } catch (e) {
    isDbReady.value = true
    return {}
  }
}

// 利用 Web Audio API 分析用户录入的一段话，提取真实声纹特征（基频 Hz、音调映射、语速特征）
async function analyzeAudioBlobTimbre(blob, durationSec = 5) {
  let detectedHz = 210
  let activeRatio = 0.65

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      const ctx = new AudioContextClass()
      const arrayBuf = await blob.arrayBuffer()
      const audioBuf = await ctx.decodeAudioData(arrayBuf)
      const channelData = audioBuf.getChannelData(0)
      const sampleRate = audioBuf.sampleRate

      const frameSize = 2048
      const hopSize = 1024
      const pitches = []
      let activeFrames = 0
      let totalFrames = 0

      // 在人声基频范围 (75Hz ~ 380Hz) 内通过时域自相关提取基频 F0
      const minLag = Math.floor(sampleRate / 380)
      const maxLag = Math.floor(sampleRate / 75)

      for (let start = 0; start + frameSize < channelData.length; start += hopSize) {
        totalFrames++
        let rms = 0
        for (let i = 0; i < frameSize; i++) {
          const v = channelData[start + i]
          rms += v * v
        }
        rms = Math.sqrt(rms / frameSize)
        if (rms < 0.018) continue
        activeFrames++

        // 只取最多 60 个高能量语音帧做自相关计算，保证瞬间完成
        if (pitches.length < 60) {
          let bestLag = -1
          let bestCorr = 0
          for (let lag = minLag; lag <= maxLag; lag += 2) {
            let corr = 0
            for (let i = 0; i < frameSize - lag; i += 2) {
              corr += channelData[start + i] * channelData[start + i + lag]
            }
            if (corr > bestCorr) {
              bestCorr = corr
              bestLag = lag
            }
          }
          if (bestLag > 0) {
            const freq = sampleRate / bestLag
            if (freq >= 75 && freq <= 380) {
              pitches.push(freq)
            }
          }
        }
      }

      if (totalFrames > 0) {
        activeRatio = activeFrames / totalFrames
      }
      if (pitches.length > 0) {
        pitches.sort((a, b) => a - b)
        detectedHz = Math.round(pitches[Math.floor(pitches.length / 2)])
      }
      try {
        ctx.close()
      } catch (e) {}
    }
  } catch (e) {
    // 若浏览器不支持解码特定容器格式，采用温和默认声纹
  }

  // 根据检测到的基频 Hz 判定声线类型并映射 TTS 音色参数
  let voiceTypeLabel = '温柔亲切女声'
  let computedPitch = 1.08
  let targetGender = 'female'

  if (detectedHz < 155) {
    voiceTypeLabel = '温暖磁性男声（爸爸声线）'
    // 100Hz ~ 155Hz -> pitch 0.72 ~ 0.90
    computedPitch = Number((0.72 + ((detectedHz - 95) / 60) * 0.18).toFixed(2))
    computedPitch = Math.max(0.68, Math.min(0.92, computedPitch))
    targetGender = 'male'
  } else if (detectedHz <= 245) {
    voiceTypeLabel = '温柔甜美女声（妈妈声线）'
    // 155Hz ~ 245Hz -> pitch 0.98 ~ 1.18
    computedPitch = Number((0.98 + ((detectedHz - 155) / 90) * 0.2).toFixed(2))
    computedPitch = Math.max(0.95, Math.min(1.22, computedPitch))
    targetGender = 'female'
  } else {
    voiceTypeLabel = '清脆元气童声（宝贝声线）'
    // 245Hz+ -> pitch 1.24 ~ 1.42
    computedPitch = Number((1.24 + ((detectedHz - 245) / 110) * 0.18).toFixed(2))
    computedPitch = Math.max(1.22, Math.min(1.45, computedPitch))
    targetGender = 'kid'
  }

  // 根据发音饱满度映射语速
  let computedRate = Number((0.84 + activeRatio * 0.18).toFixed(2))
  computedRate = Math.max(0.8, Math.min(1.08, computedRate))

  // 从当前浏览器可用语音中匹配最契合该声纹基底的中英文发音人
  const voices = refreshBrowserVoices()
  const zhList = voices.filter(v => v.lang.toLowerCase().includes('zh') || v.lang.toLowerCase().includes('cmn'))
  const enList = voices.filter(v => v.lang.toLowerCase().startsWith('en'))

  let matchedZh = zhList.find(v => v.genderHint === targetGender) || zhList[0]
  let matchedEn = enList.find(v => v.genderHint === targetGender) || enList[0]

  return {
    hasSample: true,
    recordedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    duration: durationSec,
    detectedHz,
    voiceTypeLabel,
    computedPitch,
    computedRate,
    matchedZhVoiceURI: matchedZh ? matchedZh.voiceURI : voiceSettings.value.selectedZhVoiceURI,
    matchedEnVoiceURI: matchedEn ? matchedEn.voiceURI : voiceSettings.value.selectedEnVoiceURI
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

async function base64ToBlob(dataUrl) {
  const res = await fetch(dataUrl)
  return await res.blob()
}

export function useVoiceStudio() {
  initBrowserVoicesListener()
  if (!isDbReady.value && typeof window !== 'undefined') {
    refreshClipsIndex()
  }

  function saveVoiceSettings(patch = {}) {
    voiceSettings.value = {
      ...voiceSettings.value,
      ...patch
    }
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(voiceSettings.value))
    } catch (e) {}
  }

  // 严格只筛选支持中文的声音（过滤掉所有英文和其他外语发音人）
  const zhBrowserVoices = computed(() => {
    return browserVoices.value.filter(v => {
      const lang = (v.lang || '').toLowerCase()
      const name = (v.name || '').toLowerCase()
      // 必须是明确的中文语言代码，或名字带明确中文标识
      const isZhLang = lang.includes('zh') || lang.includes('cmn') || lang.includes('yue')
      const isZhName = /chinese|普通话|国语|國語|粤语|粵語|ting|meijia|xiaoxiao|yunxi|yunjian|yunyang|kangkang|wanlung|lili|huihui|yaoyao|xiaoyi/i.test(name)
      return isZhLang || isZhName
    })
  })

  // 中文女声列表（温柔妈妈、亲切少儿绘本女老师）
  const zhFemaleVoices = computed(() => {
    const list = zhBrowserVoices.value.filter(v => v.genderHint !== 'male')
    // 若系统检测到有女声则返回，否则提供系统默认女声配置
    if (list.length > 0) return list
    if (zhBrowserVoices.value.length > 0) {
      return [{
        ...zhBrowserVoices.value[0],
        friendlyName: '标准中文女声 (系统内置)',
        genderHint: 'female',
        tag: '温柔清晰普通话 · 推荐'
      }]
    }
    return [{
      voiceURI: '__default_zh_female__',
      name: '系统标准中文女声',
      lang: 'zh-CN',
      localService: true,
      default: true,
      friendlyName: '温柔中文女声 (系统推荐)',
      tag: '自然亲切 · 适合伴读',
      genderHint: 'female'
    }]
  })

  // 中文男声列表（阳光哥哥、沉稳爸爸）
  const zhMaleVoices = computed(() => {
    const list = zhBrowserVoices.value.filter(v => v.genderHint === 'male')
    if (list.length > 0) return list
    // 若系统声音中未自带独立男声，利用主中文语音结合声学基频调制构建男声音色
    const base = zhBrowserVoices.value[0] || {
      voiceURI: '__default_zh_male__',
      name: '系统标准中文男声',
      lang: 'zh-CN',
      localService: true
    }
    return [{
      ...base,
      voiceURI: base.voiceURI ? `${base.voiceURI}__male_mod` : '__default_zh_male__',
      friendlyName: '沉稳中文男声 (声纹调制)',
      tag: '阳光磁性 · 爸爸声线',
      genderHint: 'male',
      isModulatedMale: true
    }]
  })

  const selectedZhVoiceObj = computed(() => {
    const uri = voiceSettings.value.selectedZhVoiceURI
    const all = [...zhFemaleVoices.value, ...zhMaleVoices.value]
    return (
      all.find(v => v.voiceURI === uri || v.name === uri) ||
      zhFemaleVoices.value[0] ||
      all[0] ||
      null
    )
  })

  const activeVoiceSummaryLabel = computed(() => {
    const mode = voiceSettings.value.voiceEngineMode
    if (mode === 'my_timbre') {
      if (voiceSettings.value.aiCloneEnabled && voiceSettings.value.aiApiKey) {
        return '✨ 我的录入音色 (AI高保真克隆)'
      }
      return `🎙️ 我的录入音色 (${voiceSettings.value.timbreProfile?.voiceTypeLabel || '声纹拟真'})`
    }
    if (mode === 'recorded_first') {
      const r = VOICE_ROLES.find(x => x.id === voiceSettings.value.activeRole)
      return `${r?.icon || '🎙️'} ${r?.shortName || '真人配音'}`
    }
    return `🔊 ${selectedZhVoiceObj.value?.friendlyName || '浏览器内置音'}`
  })

  const currentRoleObj = computed(() => {
    return VOICE_ROLES.find(r => r.id === voiceSettings.value.activeRole) || VOICE_ROLES[0]
  })

  const totalRecordedCount = computed(() => Object.keys(recordedClipsIndex.value).length)

  const roleCounts = computed(() => {
    const counts = { kid: 0, mom: 0, dad: 0 }
    Object.values(recordedClipsIndex.value).forEach(item => {
      if (counts[item.roleId] !== undefined) counts[item.roleId]++
    })
    return counts
  })

  function hasRecordingFor(text, roleId = voiceSettings.value.activeRole) {
    if (!text) return false
    if (roleId && roleId !== 'system') {
      const k = buildVoiceDbKey(roleId, text)
      if (recordedClipsIndex.value[k]) return true
    }
    if (voiceSettings.value.fallbackToOtherFamilyRole) {
      for (const r of ['kid', 'mom', 'dad']) {
        const k = buildVoiceDbKey(r, text)
        if (recordedClipsIndex.value[k]) return true
      }
    }
    return false
  }

  function hasExactRoleRecording(roleId, text) {
    const k = buildVoiceDbKey(roleId, text)
    return !!recordedClipsIndex.value[k]
  }

  // 保存用户录入的一段话（声纹样本），自动分析音色并启用该音色播放全站音频
  async function saveTimbreSampleAndActivate(blob, duration = 5, sampleText = '') {
    const db = await openVoiceDB()
    const record = {
      key: TIMBRE_SAMPLE_KEY,
      roleId: 'timbre_sample',
      normText: '__timbre_sample__',
      rawText: sampleText || voiceSettings.value.timbreSampleText,
      label: '我录入的个人音色样本',
      category: 'timbre_sample',
      blob,
      mimeType: blob.type || 'audio/webm',
      duration,
      updatedAt: new Date().toISOString()
    }
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const req = store.put(record)
      req.onsuccess = () => resolve()
      req.onerror = (e) => reject(e.target.error)
    })
    timbreSampleBlob.value = blob

    const profile = await analyzeAudioBlobTimbre(blob, duration)
    saveVoiceSettings({
      voiceEngineMode: 'my_timbre',
      timbreSampleText: sampleText || voiceSettings.value.timbreSampleText,
      aiRefText: sampleText || voiceSettings.value.timbreSampleText,
      timbreProfile: profile
    })
    return profile
  }

  async function saveVoiceClip({ roleId, text, label = '', category = 'general', blob, duration = 0 }) {
    const targetRole = roleId === 'system' ? 'kid' : (roleId || voiceSettings.value.activeRole || 'kid')
    const normText = normalizeVoiceText(text)
    const key = buildVoiceDbKey(targetRole, text)
    const record = {
      key,
      roleId: targetRole,
      normText,
      rawText: text,
      label: label || text,
      category,
      blob,
      mimeType: blob.type || 'audio/webm',
      duration,
      updatedAt: new Date().toISOString()
    }
    const db = await openVoiceDB()
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const req = store.put(record)
      req.onsuccess = () => resolve()
      req.onerror = (e) => reject(e.target.error)
    })
    recordedClipsIndex.value = {
      ...recordedClipsIndex.value,
      [key]: {
        key,
        roleId: targetRole,
        normText,
        rawText: text,
        label: record.label,
        category,
        mimeType: record.mimeType,
        duration,
        updatedAt: record.updatedAt
      }
    }
    return record
  }

  async function getVoiceClipRecord(text, preferredRole = voiceSettings.value.activeRole) {
    const db = await openVoiceDB()
    const rolesToTry = []
    if (preferredRole && preferredRole !== 'system') {
      rolesToTry.push(preferredRole)
    }
    if (voiceSettings.value.fallbackToOtherFamilyRole) {
      ;['kid', 'mom', 'dad'].forEach(r => {
        if (!rolesToTry.includes(r)) rolesToTry.push(r)
      })
    }

    for (const r of rolesToTry) {
      const key = buildVoiceDbKey(r, text)
      if (recordedClipsIndex.value[key]) {
        const rec = await new Promise((resolve) => {
          const tx = db.transaction(STORE_NAME, 'readonly')
          const store = tx.objectStore(STORE_NAME)
          const req = store.get(key)
          req.onsuccess = () => resolve(req.result || null)
          req.onerror = () => resolve(null)
        })
        if (rec && rec.blob) return rec
      }
    }
    return null
  }

  async function deleteVoiceClip(roleId, text) {
    const key = buildVoiceDbKey(roleId, text)
    const db = await openVoiceDB()
    await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const req = store.delete(key)
      req.onsuccess = () => resolve()
      req.onerror = () => resolve()
    })
    const next = { ...recordedClipsIndex.value }
    delete next[key]
    recordedClipsIndex.value = next
  }

  function stopCustomAudio() {
    if (activeAudioEl) {
      try {
        activeAudioEl.pause()
        activeAudioEl.currentTime = 0
      } catch (e) {}
      activeAudioEl = null
    }
    isPlayingCustomAudio.value = false
  }

  async function playBlobAudio(blob, onEnd = null) {
    if (!blob) return false
    stopCustomAudio()
    return new Promise((resolve) => {
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      activeAudioEl = audio
      isPlayingCustomAudio.value = true
      const cleanup = () => {
        isPlayingCustomAudio.value = false
        URL.revokeObjectURL(url)
        if (activeAudioEl === audio) activeAudioEl = null
        if (onEnd) onEnd()
        resolve(true)
      }
      audio.onended = cleanup
      audio.onerror = () => {
        isPlayingCustomAudio.value = false
        URL.revokeObjectURL(url)
        if (activeAudioEl === audio) activeAudioEl = null
        resolve(false)
      }
      audio.play().catch(() => {
        isPlayingCustomAudio.value = false
        URL.revokeObjectURL(url)
        resolve(false)
      })
    })
  }

  // AI 零样本声音克隆合成 (SiliconFlow CosyVoice2 或自定义接口)
  async function synthesizeWithAiClone(text) {
    const cfg = voiceSettings.value
    if (!cfg.aiCloneEnabled || !cfg.aiApiKey) return null
    try {
      const endpoint =
        cfg.aiProvider === 'custom' && cfg.aiCustomEndpoint
          ? cfg.aiCustomEndpoint
          : 'https://api.siliconflow.cn/v1/audio/speech'

      const voiceParam = cfg.aiVoiceUri
        ? cfg.aiVoiceUri
        : `${cfg.aiModel}:alex`

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cfg.aiApiKey.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: cfg.aiModel || 'FunAudioLLM/CosyVoice2-0.5B',
          input: text,
          voice: voiceParam,
          response_format: 'mp3',
          speed: 1.0
        })
      })
      if (!res.ok) return null
      const blob = await res.blob()
      if (blob && blob.size > 200) {
        await saveVoiceClip({
          roleId: cfg.activeRole === 'system' ? 'mom' : cfg.activeRole,
          text,
          label: `[克隆音色] ${text.slice(0, 24)}`,
          category: 'ai_cache',
          blob
        })
        return blob
      }
    } catch (e) {}
    return null
  }

  async function uploadReferenceVoiceToSiliconFlow(audioBlob, customName = 'my-family-voice') {
    const cfg = voiceSettings.value
    if (!cfg.aiApiKey) {
      throw new Error('请先填写硅基流动 (SiliconFlow) API Key')
    }
    const targetBlob = audioBlob || timbreSampleBlob.value
    if (!targetBlob) {
      throw new Error('请先录入您的一段话作为声音样本')
    }
    const formData = new FormData()
    const ext = targetBlob.type.includes('mp4') ? 'mp4' : targetBlob.type.includes('wav') ? 'wav' : 'webm'
    formData.append('file', targetBlob, `reference.${ext}`)
    formData.append('model', cfg.aiModel || 'FunAudioLLM/CosyVoice2-0.5B')
    formData.append('customName', customName)
    formData.append('text', cfg.timbreSampleText || cfg.aiRefText || '嗨宝贝，我是最爱你的爸爸妈妈！今天我们一起开心地学拼音、读英语、背古诗吧！')

    const res = await fetch('https://api.siliconflow.cn/v1/uploads/audio/voice', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.aiApiKey.trim()}`
      },
      body: formData
    })
    const data = await res.json()
    if (!res.ok || !data.uri) {
      throw new Error(data?.message || data?.error?.message || '上传声纹样本失败，请检查 API Key 或音频格式')
    }
    saveVoiceSettings({
      voiceEngineMode: 'my_timbre',
      aiVoiceUri: data.uri,
      aiCloneEnabled: true
    })
    return data.uri
  }

  async function startRecording() {
    if (isRecordingGlobal.value) return
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('当前浏览器环境不支持麦克风录音，请使用 Chrome / Safari / Edge 访问')
    }
    stopCustomAudio()
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    recordingChunks = []
    const preferredMime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/mp4')
      ? 'audio/mp4'
      : ''

    mediaRecorder = preferredMime
      ? new MediaRecorder(stream, { mimeType: preferredMime })
      : new MediaRecorder(stream)

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        recordingChunks.push(e.data)
      }
    }

    mediaRecorder.start()
    isRecordingGlobal.value = true
    recordingSeconds.value = 0
    if (recordingTimer) clearInterval(recordingTimer)
    recordingTimer = setInterval(() => {
      recordingSeconds.value++
    }, 1000)
  }

  function stopRecordingAndGetBlob() {
    return new Promise((resolve) => {
      if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        isRecordingGlobal.value = false
        if (recordingTimer) clearInterval(recordingTimer)
        resolve(null)
        return
      }
      const duration = Math.max(1, recordingSeconds.value)
      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm'
        const blob = new Blob(recordingChunks, { type: mimeType })
        try {
          mediaRecorder.stream.getTracks().forEach(t => t.stop())
        } catch (e) {}
        isRecordingGlobal.value = false
        if (recordingTimer) clearInterval(recordingTimer)
        resolve({ blob, duration })
      }
      mediaRecorder.stop()
    })
  }

  async function exportAllVoicesBackup() {
    const db = await openVoiceDB()
    const allRecords = await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const req = tx.objectStore(STORE_NAME).getAll()
      req.onsuccess = () => resolve(req.result || [])
      req.onerror = () => resolve([])
    })
    const serialized = []
    for (const rec of allRecords) {
      if (rec.blob) {
        const dataUrl = await blobToBase64(rec.blob)
        serialized.push({
          key: rec.key,
          roleId: rec.roleId,
          normText: rec.normText,
          rawText: rec.rawText,
          label: rec.label,
          category: rec.category,
          mimeType: rec.mimeType,
          duration: rec.duration,
          updatedAt: rec.updatedAt,
          dataUrl
        })
      }
    }
    return JSON.stringify({
      version: 2,
      exportedAt: new Date().toISOString(),
      settings: voiceSettings.value,
      count: serialized.length,
      items: serialized
    })
  }

  async function importVoicesBackup(jsonString) {
    const parsed = JSON.parse(jsonString)
    if (!parsed || !Array.isArray(parsed.items)) {
      throw new Error('备份文件格式不正确')
    }
    if (parsed.settings) {
      saveVoiceSettings(parsed.settings)
    }
    let importedCount = 0
    for (const item of parsed.items) {
      if (item.dataUrl && item.rawText) {
        const blob = await base64ToBlob(item.dataUrl)
        if (item.key === TIMBRE_SAMPLE_KEY) {
          await saveTimbreSampleAndActivate(blob, item.duration || 5, item.rawText)
        } else {
          await saveVoiceClip({
            roleId: item.roleId || 'kid',
            text: item.rawText,
            label: item.label || item.rawText,
            category: item.category || 'general',
            blob,
            duration: item.duration || 1
          })
        }
        importedCount++
      }
    }
    await refreshClipsIndex()
    return importedCount
  }

  return {
    voiceSettings,
    browserVoices,
    zhBrowserVoices,
    zhFemaleVoices,
    zhMaleVoices,
    selectedZhVoiceObj,
    selectedEnVoiceObj,
    activeVoiceSummaryLabel,
    hasLoadedBrowserVoices,
    timbreSampleBlob,
    recordedClipsIndex,
    currentRoleObj,
    totalRecordedCount,
    roleCounts,
    lastSpokenText,
    lastSpokenLang,
    lastSpokenLabel,
    isRecordingGlobal,
    recordingSeconds,
    isPlayingCustomAudio,
    refreshBrowserVoices,
    saveVoiceSettings,
    saveTimbreSampleAndActivate,
    refreshClipsIndex,
    hasRecordingFor,
    hasExactRoleRecording,
    saveVoiceClip,
    getVoiceClipRecord,
    deleteVoiceClip,
    playBlobAudio,
    stopCustomAudio,
    synthesizeWithAiClone,
    uploadReferenceVoiceToSiliconFlow,
    startRecording,
    stopRecordingAndGetBlob,
    exportAllVoicesBackup,
    importVoicesBackup
  }
}
