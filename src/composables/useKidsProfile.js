import { ref, computed } from 'vue'

export const PROFILE_KEY = 'big99_kid_profile_v1'
export const MUL_STORAGE_KEY = 'big99_completed_cells_v3'
export const POETRY_STORAGE_KEY = 'kids_poetry_progress_v1'
export const PINYIN_STORAGE_KEY = 'kids_pinyin_progress_v1'
export const ENGLISH_STORAGE_KEY = 'kids_english_progress_v1'
export const HISTORY_KEY = 'big99_daily_history_v1'

function safeLoadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    return fallback
  }
}

function safeSaveJSON(key, val) {
  try {
    window.localStorage.setItem(key, JSON.stringify(val))
  } catch (e) {}
}

function normalizeProfile(raw) {
  if (!raw || typeof raw !== 'object') return null
  const nameVal = (raw.name || raw.nameText || '').trim()
  return {
    ...raw,
    name: nameVal || '小主人',
    nameText: nameVal || '小主人',
    avatar: raw.avatar || '🐼',
    signatureDataUrl: raw.signatureDataUrl || '',
    strokes: Array.isArray(raw.strokes) ? raw.strokes : []
  }
}

const kidProfile = ref(normalizeProfile(safeLoadJSON(PROFILE_KEY, null)))
const mulCompleted = ref(safeLoadJSON(MUL_STORAGE_KEY, {}))
// Poetry progress: { [poemId]: { readDone: bool, gameDone: bool, quizDone: bool, stars: 0..3, updatedAt: string } }
const poetryProgress = ref(safeLoadJSON(POETRY_STORAGE_KEY, {}))
// Pinyin progress: { learnedIds: { [id]: true }, tonePlayed: number, spellCount: number, gameStars: number }
const pinyinProgress = ref(safeLoadJSON(PINYIN_STORAGE_KEY, { learnedIds: {}, tonePlayed: 0, spellCount: 0, gameStars: 0 }))
// English progress: { learnedLetters: { [l]: true }, learnedWords: { [w]: true }, completedScenes: { [id]: true }, gameStars: number }
const englishProgress = ref(safeLoadJSON(ENGLISH_STORAGE_KEY, { learnedLetters: {}, learnedWords: {}, completedScenes: {}, gameStars: 0 }))
const showProfileModal = ref(false)
const globalToastMsg = ref('')
let toastTimer = null

export const PET_STICKERS = [
  { id: 'pet0', icon: '🐣', name: '破壳萌鸡', reqPoints: 1 },
  { id: 'pet1', icon: '🐶', name: '元气修勾', reqPoints: 3 },
  { id: 'pet2', icon: '🐱', name: '博学喵喵', reqPoints: 6 },
  { id: 'pet3', icon: '🐼', name: '国宝团子', reqPoints: 10 },
  { id: 'pet4', icon: '🦊', name: '机智阿狸', reqPoints: 15 },
  { id: 'pet5', icon: '🐰', name: '月宫玉兔', reqPoints: 22 },
  { id: 'pet6', icon: '🦁', name: '荣耀雄狮', reqPoints: 30 },
  { id: 'pet7', icon: '🦖', name: '霸王龙宝', reqPoints: 40 },
  { id: 'pet8', icon: '🦄', name: '星光独角兽', reqPoints: 55 },
  { id: 'pet9', icon: '🐉', name: '华夏神龙', reqPoints: 75 }
]

export function useKidsProfile() {
  function refreshFromStorage() {
    kidProfile.value = normalizeProfile(safeLoadJSON(PROFILE_KEY, null))
    mulCompleted.value = safeLoadJSON(MUL_STORAGE_KEY, {})
    poetryProgress.value = safeLoadJSON(POETRY_STORAGE_KEY, {})
    pinyinProgress.value = safeLoadJSON(PINYIN_STORAGE_KEY, { learnedIds: {}, tonePlayed: 0, spellCount: 0, gameStars: 0 })
    englishProgress.value = safeLoadJSON(ENGLISH_STORAGE_KEY, { learnedLetters: {}, learnedWords: {}, completedScenes: {}, gameStars: 0 })
  }

  function showToast(msg) {
    globalToastMsg.value = msg
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      globalToastMsg.value = ''
    }, 2800)
  }

  function saveProfile(newProfile) {
    const normalized = normalizeProfile({
      ...(kidProfile.value || {}),
      ...newProfile,
      updatedAt: new Date().toISOString()
    })
    kidProfile.value = normalized
    safeSaveJSON(PROFILE_KEY, normalized)

    // Also record sign-in achievement & log in shared daily history
    try {
      const hist = safeLoadJSON(HISTORY_KEY, { days: {}, achievements: {} })
      const now = new Date()
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
      const hm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      if (!hist.days[today]) {
        hist.days[today] = {
          date: today,
          learnedCells: [],
          goldCells: [],
          reviewBattles: 0,
          achievements: [],
          logs: []
        }
      }
      if (!hist.achievements['sign_in']) {
        hist.achievements['sign_in'] = today
        if (!hist.days[today].achievements.includes('sign_in')) {
          hist.days[today].achievements.push('sign_in')
        }
      }
      hist.days[today].logs.unshift(`${hm} ✍️ 小主人「${normalized.name}」保存了专属手写签名`)
      if (hist.days[today].logs.length > 50) hist.days[today].logs.length = 50
      safeSaveJSON(HISTORY_KEY, hist)
    } catch (e) {}

    window.dispatchEvent(new CustomEvent('kid-profile-updated', { detail: normalized }))
    showToast(`🌟 欢迎你，${normalized.name || '小勇士'}！专属签名已保存！`)
  }

  function recordPoetryProgress(poemId, patch = {}) {
    const prev = poetryProgress.value[poemId] || {
      readDone: false,
      gameDone: false,
      quizDone: false,
      stars: 0
    }
    const merged = {
      ...prev,
      ...patch,
      updatedAt: new Date().toISOString()
    }
    let stars = 0
    if (merged.readDone) stars++
    if (merged.gameDone) stars++
    if (merged.quizDone) stars++
    merged.stars = Math.max(prev.stars || 0, stars)

    poetryProgress.value = {
      ...poetryProgress.value,
      [poemId]: merged
    }
    safeSaveJSON(POETRY_STORAGE_KEY, poetryProgress.value)

    try {
      const hist = safeLoadJSON(HISTORY_KEY, { days: {}, achievements: {} })
      const now = new Date()
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
      const hm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      if (!hist.days[today]) {
        hist.days[today] = {
          date: today,
          learnedCells: [],
          goldCells: [],
          reviewBattles: 0,
          achievements: [],
          logs: []
        }
      }
      if (patch.logText) {
        hist.days[today].logs.unshift(`${hm} ${patch.logText}`)
        if (hist.days[today].logs.length > 50) hist.days[today].logs.length = 50
        safeSaveJSON(HISTORY_KEY, hist)
      }
    } catch (e) {}

    return merged
  }

  function recordPinyinProgress(action = {}) {
    const prev = pinyinProgress.value || { learnedIds: {}, tonePlayed: 0, spellCount: 0, gameStars: 0 }
    const nextLearned = { ...(prev.learnedIds || {}) }
    if (action.id) {
      nextLearned[action.id] = true
    }
    const next = {
      learnedIds: nextLearned,
      tonePlayed: (prev.tonePlayed || 0) + (action.toneDelta || 0),
      spellCount: (prev.spellCount || 0) + (action.spellDelta || 0),
      gameStars: (prev.gameStars || 0) + (action.starDelta || 0),
      updatedAt: new Date().toISOString()
    }
    pinyinProgress.value = next
    safeSaveJSON(PINYIN_STORAGE_KEY, next)
    return next
  }

  function recordEnglishProgress(action = {}) {
    const prev = englishProgress.value || { learnedLetters: {}, learnedWords: {}, completedScenes: {}, gameStars: 0 }
    const nextLetters = { ...(prev.learnedLetters || {}) }
    const nextWords = { ...(prev.learnedWords || {}) }
    const nextScenes = { ...(prev.completedScenes || {}) }
    if (action.letter) nextLetters[action.letter] = true
    if (action.word) nextWords[action.word] = true
    if (action.sceneId) nextScenes[action.sceneId] = true
    const next = {
      learnedLetters: nextLetters,
      learnedWords: nextWords,
      completedScenes: nextScenes,
      gameStars: (prev.gameStars || 0) + (action.starDelta || 0),
      updatedAt: new Date().toISOString()
    }
    englishProgress.value = next
    safeSaveJSON(ENGLISH_STORAGE_KEY, next)
    return next
  }

  const mulLearnedCount = computed(() => Object.keys(mulCompleted.value).length)
  const mulGoldCount = computed(() =>
    Object.values(mulCompleted.value).filter(v => v >= 3).length
  )

  const poetryLearnedCount = computed(() =>
    Object.values(poetryProgress.value).filter(p => p && p.stars > 0).length
  )
  const poetryFullStarCount = computed(() =>
    Object.values(poetryProgress.value).filter(p => p && p.stars >= 3).length
  )
  const totalPoetryStars = computed(() =>
    Object.values(poetryProgress.value).reduce((sum, p) => sum + (p?.stars || 0), 0)
  )

  const pinyinLearnedCount = computed(() =>
    Object.keys(pinyinProgress.value?.learnedIds || {}).length
  )
  const pinyinStars = computed(() => pinyinProgress.value?.gameStars || 0)

  const englishLettersCount = computed(() =>
    Object.keys(englishProgress.value?.learnedLetters || {}).length
  )
  const englishWordsCount = computed(() =>
    Object.keys(englishProgress.value?.learnedWords || {}).length
  )
  const englishScenesCount = computed(() =>
    Object.keys(englishProgress.value?.completedScenes || {}).length
  )
  const englishStars = computed(() => englishProgress.value?.gameStars || 0)

  const totalWisdomPoints = computed(() => {
    return (
      mulLearnedCount.value +
      poetryLearnedCount.value * 2 +
      mulGoldCount.value +
      poetryFullStarCount.value +
      pinyinLearnedCount.value +
      pinyinStars.value +
      englishLettersCount.value +
      englishWordsCount.value +
      englishScenesCount.value * 3 +
      englishStars.value
    )
  })

  const unlockedStickers = computed(() => {
    const pts = totalWisdomPoints.value
    return PET_STICKERS.map(s => ({
      ...s,
      unlocked: pts >= s.reqPoints
    }))
  })

  const kidRankTitle = computed(() => {
    const pts = totalWisdomPoints.value
    if (pts >= 80) return '👑 博古通今大状元'
    if (pts >= 50) return '🐉 全科启蒙小宗师'
    if (pts >= 30) return '🦄 智慧闯关小博士'
    if (pts >= 15) return '🦁 勤学敏思小才子'
    if (pts >= 5) return '🐼 快乐探索小达人'
    return '🌱 萌娃智慧小萌新'
  })

  return {
    kidProfile,
    mulCompleted,
    poetryProgress,
    pinyinProgress,
    englishProgress,
    showProfileModal,
    globalToastMsg,
    mulLearnedCount,
    mulGoldCount,
    poetryLearnedCount,
    poetryFullStarCount,
    totalPoetryStars,
    pinyinLearnedCount,
    pinyinStars,
    englishLettersCount,
    englishWordsCount,
    englishScenesCount,
    englishStars,
    totalWisdomPoints,
    unlockedStickers,
    kidRankTitle,
    refreshFromStorage,
    saveProfile,
    recordPoetryProgress,
    recordPinyinProgress,
    recordEnglishProgress,
    showToast
  }
}
