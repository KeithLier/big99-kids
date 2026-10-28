import { ref } from 'vue'
import { useVoiceStudio } from './useVoiceStudio'

const soundEnabled = ref(true)
const isSpeaking = ref(false)
let audioCtx = null

function ensureAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioCtx = new AudioContextClass()
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function useSound() {
  const {
    voiceSettings,
    lastSpokenText,
    lastSpokenLang,
    lastSpokenLabel,
    getVoiceClipRecord,
    playBlobAudio,
    stopCustomAudio,
    synthesizeWithAiClone
  } = useVoiceStudio()

  function playTone(freq = 520, duration = 0.12, type = 'sine', delay = 0) {
    if (!soundEnabled.value) return
    try {
      const ctx = ensureAudioContext()
      if (!ctx) return
      const now = ctx.currentTime + delay
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, now)
      gain.gain.setValueAtTime(0.14, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + duration)
    } catch (e) {}
  }

  function playClickSound() {
    playTone(580, 0.06, 'sine')
  }

  function playSuccessSound() {
    playTone(523.25, 0.1, 'triangle', 0)
    playTone(659.25, 0.1, 'triangle', 0.08)
    playTone(783.99, 0.18, 'triangle', 0.16)
  }

  function playErrorSound() {
    playTone(240, 0.15, 'sawtooth', 0)
    playTone(190, 0.2, 'sawtooth', 0.12)
  }

  function playVictoryFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((n, idx) => {
      playTone(n, 0.16, 'triangle', idx * 0.1)
    })
  }

  function stopSpeech() {
    stopCustomAudio()
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    isSpeaking.value = false
  }

  function speakNativeTts(text, lang = 'zh-CN', options = {}) {
    const { rate = 0.9, pitch = 1.08, onEnd = null, onBoundary = null } = options
    if (!soundEnabled.value || !('speechSynthesis' in window)) {
      if (onEnd) setTimeout(onEnd, 300)
      return
    }
    try {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang
      utter.rate = rate
      utter.pitch = pitch

      const voices = window.speechSynthesis.getVoices()
      if (lang.startsWith('en')) {
        const enVoice =
          voices.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && (v.name.includes('Samantha') || v.name.includes('Ava') || v.name.includes('Victoria') || v.name.includes('Google') || v.name.includes('Jenny'))) ||
          voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en_US')) ||
          voices.find(v => v.lang.startsWith('en'))
        if (enVoice) utter.voice = enVoice
      } else {
        const zhVoice =
          voices.find(v => v.lang.includes('zh-CN') && (v.name.includes('Ting') || v.name.includes('Meijia') || v.name.includes('Xiaoxiao'))) ||
          voices.find(v => v.lang.includes('zh'))
        if (zhVoice) utter.voice = zhVoice
      }

      isSpeaking.value = true
      if (onBoundary) {
        utter.onboundary = onBoundary
      }
      utter.onend = () => {
        isSpeaking.value = false
        if (onEnd) onEnd()
      }
      utter.onerror = () => {
        isSpeaking.value = false
        if (onEnd) onEnd()
      }
      window.speechSynthesis.speak(utter)
    } catch (e) {
      isSpeaking.value = false
      if (onEnd) onEnd()
    }
  }

  async function dispatchSmartSpeech(text, lang = 'zh-CN', options = {}) {
    if (!text) return
    const {
      forceSystem = false,
      preferredRole = null,
      label = '',
      onEnd = null
    } = options

    // Record as current active phrase for the "边学边录" floating capsule
    if (!options.ignoreTracker) {
      lastSpokenText.value = text
      lastSpokenLang.value = lang
      lastSpokenLabel.value = label || text
    }

    if (!soundEnabled.value) {
      if (onEnd) setTimeout(onEnd, 300)
      return
    }

    stopSpeech()

    const targetRole = preferredRole || voiceSettings.value.activeRole
    if (!forceSystem && targetRole !== 'system') {
      // 1. Priority 1: Check local IndexedDB recorded human voice
      const customRec = await getVoiceClipRecord(text, targetRole)
      if (customRec && customRec.blob) {
        isSpeaking.value = true
        const played = await playBlobAudio(customRec.blob, () => {
          isSpeaking.value = false
          if (onEnd) onEnd()
        })
        if (played) return
      }

      // 2. Priority 2: Check AI Zero-shot Voice Cloning if enabled
      if (voiceSettings.value.aiCloneEnabled && voiceSettings.value.aiApiKey) {
        isSpeaking.value = true
        const aiBlob = await synthesizeWithAiClone(text)
        if (aiBlob) {
          const played = await playBlobAudio(aiBlob, () => {
            isSpeaking.value = false
            if (onEnd) onEnd()
          })
          if (played) return
        }
      }
    }

    // 3. Priority 3: Seamless fallback to browser native TTS
    speakNativeTts(text, lang, options)
  }

  function speakText(text, options = {}) {
    dispatchSmartSpeech(text, 'zh-CN', {
      rate: 0.9,
      pitch: 1.08,
      ...options
    })
  }

  function speakEnglish(text, options = {}) {
    dispatchSmartSpeech(text, 'en-US', {
      rate: 0.85,
      pitch: 1.05,
      ...options
    })
  }

  function speakSystemOnly(text, lang = 'zh-CN', options = {}) {
    stopSpeech()
    speakNativeTts(text, lang, options)
  }

  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
    if (!soundEnabled.value) {
      stopSpeech()
    } else {
      playSuccessSound()
    }
  }

  return {
    soundEnabled,
    isSpeaking,
    playTone,
    playClickSound,
    playSuccessSound,
    playErrorSound,
    playVictoryFanfare,
    speakText,
    speakEnglish,
    speakSystemOnly,
    stopSpeech,
    toggleSound
  }
}
