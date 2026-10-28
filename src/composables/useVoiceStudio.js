import { ref, computed } from 'vue'

const DB_NAME = 'kids_voice_studio_db_v1'
const STORE_NAME = 'voice_clips'
const SETTINGS_KEY = 'kids_voice_studio_settings_v1'

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
    name: '系统标准播音员',
    shortName: '系统标准音',
    icon: '🤖',
    color: '#2e7d32',
    desc: '使用浏览器内置的标准普通话与美式英语发音。'
  }
]

// 10条高频亲子鼓励与日常引导语（录制后在闯关成功、打招呼时自动触发）
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

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (raw) {
      return {
        activeRole: 'kid',
        fallbackToOtherFamilyRole: true,
        autoPlayPraiseOnSuccess: true,
        aiCloneEnabled: false,
        aiProvider: 'siliconflow', // 'siliconflow' | 'custom'
        aiApiKey: '',
        aiModel: 'FunAudioLLM/CosyVoice2-0.5B',
        aiCustomEndpoint: '',
        aiVoiceUri: '', // SiliconFlow 上传参考音频后返回的 uri 或预置音色
        aiRefText: '在一无所知中，梦里的一天结束了，一个新的轮回便会开始。',
        ...JSON.parse(raw)
      }
    }
  } catch (e) {}
  return {
    activeRole: 'kid',
    fallbackToOtherFamilyRole: true,
    autoPlayPraiseOnSuccess: true,
    aiCloneEnabled: false,
    aiProvider: 'siliconflow',
    aiApiKey: '',
    aiModel: 'FunAudioLLM/CosyVoice2-0.5B',
    aiCustomEndpoint: '',
    aiVoiceUri: '',
    aiRefText: '宝贝今天表现真棒，我们一起开心地学拼音和英语吧！'
  }
}

const voiceSettings = ref(loadSettings())
// Memory index of recorded clips metadata: { [dbKey]: { key, roleId, normText, label, category, duration, updatedAt } }
const recordedClipsIndex = ref({})
const isDbReady = ref(false)

// Global state for the Floating Recorder Widget ("边学边录")
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

  // AI Zero-shot Voice Cloning Synthesis via SiliconFlow (CosyVoice2) or Custom OpenAI-compatible TTS
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
        // Cache into IndexedDB so next time it plays instantaneously for free!
        await saveVoiceClip({
          roleId: cfg.activeRole === 'system' ? 'mom' : cfg.activeRole,
          text,
          label: `[AI克隆] ${text.slice(0, 24)}`,
          category: 'ai_cache',
          blob
        })
        return blob
      }
    } catch (e) {}
    return null
  }

  // Upload 10-second reference audio to SiliconFlow to create a zero-shot cloned voice URI
  async function uploadReferenceVoiceToSiliconFlow(audioBlob, customName = 'my-family-voice') {
    const cfg = voiceSettings.value
    if (!cfg.aiApiKey) {
      throw new Error('请先填写硅基流动 (SiliconFlow) API Key')
    }
    const formData = new FormData()
    const ext = audioBlob.type.includes('mp4') ? 'mp4' : audioBlob.type.includes('wav') ? 'wav' : 'webm'
    formData.append('file', audioBlob, `reference.${ext}`)
    formData.append('model', cfg.aiModel || 'FunAudioLLM/CosyVoice2-0.5B')
    formData.append('customName', customName)
    formData.append('text', cfg.aiRefText || '宝贝今天表现真棒，我们一起开心地学拼音和英语吧！')

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
      aiVoiceUri: data.uri,
      aiCloneEnabled: true
    })
    return data.uri
  }

  // Microphone Recording Helpers
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

  // Export & Import all custom voices as JSON backup
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
      version: 1,
      exportedAt: new Date().toISOString(),
      count: serialized.length,
      items: serialized
    })
  }

  async function importVoicesBackup(jsonString) {
    const parsed = JSON.parse(jsonString)
    if (!parsed || !Array.isArray(parsed.items)) {
      throw new Error('备份文件格式不正确')
    }
    let importedCount = 0
    for (const item of parsed.items) {
      if (item.dataUrl && item.rawText) {
        const blob = await base64ToBlob(item.dataUrl)
        await saveVoiceClip({
          roleId: item.roleId || 'kid',
          text: item.rawText,
          label: item.label || item.rawText,
          category: item.category || 'general',
          blob,
          duration: item.duration || 1
        })
        importedCount++
      }
    }
    await refreshClipsIndex()
    return importedCount
  }

  return {
    voiceSettings,
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
    saveVoiceSettings,
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
