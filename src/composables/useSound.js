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

  function findVoiceByUriOrName(voices, uriOrName) {
    if (!uriOrName || !voices || voices.length === 0) return null
    return voices.find(v => v.voiceURI === uriOrName || v.name === uriOrName) || null
  }

  function speakNativeTts(text, lang = 'zh-CN', options = {}) {
    const cfg = voiceSettings.value
    const isMyTimbreMode = options.useTimbreProfile ?? (cfg.voiceEngineMode === 'my_timbre' && cfg.timbreProfile?.hasSample)

    const defaultRate = isMyTimbreMode
      ? (cfg.timbreProfile?.computedRate || 0.92)
      : (cfg.browserRate || 0.92)
    const defaultPitch = isMyTimbreMode
      ? (cfg.timbreProfile?.computedPitch || 1.08)
      : (cfg.browserPitch || 1.05)

    const {
      rate = defaultRate,
      pitch = defaultPitch,
      voiceURI = '',
      onEnd = null,
      onBoundary = null
    } = options

    if (!soundEnabled.value || !('speechSynthesis' in window)) {
      if (onEnd) setTimeout(onEnd, 300)
      return
    }

    try {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang
      utter.rate = Math.max(0.5, Math.min(1.8, Number(rate) || 0.92))
      utter.pitch = Math.max(0.5, Math.min(1.8, Number(pitch) || 1.05))

      const voices = window.speechSynthesis.getVoices() || []
      let targetVoice = null
      let isModMale = false

      // 1. 若显式传入了 voiceURI（例如在设置页面点击某一个内置声音的「试听」按钮）
      if (voiceURI) {
        if (voiceURI.includes('__male_mod') || voiceURI === '__default_zh_male__') {
          isModMale = true
          const cleanURI = voiceURI.replace('__male_mod', '')
          targetVoice = findVoiceByUriOrName(voices, cleanURI)
        } else {
          targetVoice = findVoiceByUriOrName(voices, voiceURI)
        }
      }

      // 2. 若未指定临时试听声音，检查用户选中的中文发音人
      if (!targetVoice) {
        const preferredZhURI = isMyTimbreMode
          ? (cfg.timbreProfile?.matchedZhVoiceURI || cfg.selectedZhVoiceURI)
          : cfg.selectedZhVoiceURI

        if (preferredZhURI && preferredZhURI.includes('__male_mod')) {
          isModMale = true
          const cleanURI = preferredZhURI.replace('__male_mod', '')
          targetVoice = findVoiceByUriOrName(voices, cleanURI)
        } else if (preferredZhURI) {
          targetVoice = findVoiceByUriOrName(voices, preferredZhURI)
        }

        if (!targetVoice) {
          targetVoice =
            voices.find(v => (v.lang || '').includes('zh-CN') && ((v.name || '').includes('Ting') || (v.name || '').includes('Meijia') || (v.name || '').includes('Xiaoxiao'))) ||
            voices.find(v => (v.lang || '').includes('zh') || (v.lang || '').includes('cmn')) ||
            voices[0]
        }
      }

      if (isModMale) {
        utter.pitch = 0.82
        utter.rate = Math.max(0.75, Math.min(1.2, (Number(rate) || 0.92) * 0.96))
      }

      if (targetVoice) {
        utter.voice = targetVoice
        if (targetVoice.lang) {
          utter.lang = targetVoice.lang
        }
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

  // 在设置页面试听任意指定的浏览器内置声音
  function previewBrowserVoice(voiceURI, sampleText, lang = 'zh-CN', customRate = null, customPitch = null) {
    stopSpeech()
    const cfg = voiceSettings.value
    speakNativeTts(sampleText, lang, {
      voiceURI,
      useTimbreProfile: false,
      rate: customRate !== null ? customRate : (cfg.browserRate || 0.92),
      pitch: customPitch !== null ? customPitch : (cfg.browserPitch || 1.05)
    })
  }

  // 在设置页面使用「录入的一段话」提取/克隆的音色试听任意句子
  async function previewMyTimbreVoice(sampleText, lang = 'zh-CN') {
    if (!sampleText) return
    stopSpeech()
    const cfg = voiceSettings.value

    // 若开启了 AI 零样本克隆且有 API Key，优先调用 AI 克隆合成试听
    if (cfg.aiCloneEnabled && cfg.aiApiKey) {
      isSpeaking.value = true
      const aiBlob = await synthesizeWithAiClone(sampleText)
      if (aiBlob) {
        const played = await playBlobAudio(aiBlob, () => {
          isSpeaking.value = false
        })
        if (played) return
      }
    }

    // 使用从录入语音提取出的声纹参数 (computedPitch / computedRate / 匹配基底声线) 试听
    speakNativeTts(sampleText, lang, {
      useTimbreProfile: true,
      rate: cfg.timbreProfile?.computedRate || 0.92,
      pitch: cfg.timbreProfile?.computedPitch || 1.08
    })
  }

  async function dispatchSmartSpeech(text, lang = 'zh-CN', options = {}) {
    if (!text) return
    const {
      forceSystem = false,
      preferredRole = null,
      label = '',
      onEnd = null
    } = options

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
    const cfg = voiceSettings.value
    const mode = cfg.voiceEngineMode || 'browser'

    if (!forceSystem) {
      // 模式 A：使用录入一段话的个人音色播放全站所有音频 ('my_timbre')
      if (mode === 'my_timbre') {
        // 1. 如果同时录过该句真人原声，也可直接播
        const targetRole = preferredRole || cfg.activeRole
        if (targetRole && targetRole !== 'system') {
          const customRec = await getVoiceClipRecord(text, targetRole)
          if (customRec && customRec.blob) {
            isSpeaking.value = true
            const played = await playBlobAudio(customRec.blob, () => {
              isSpeaking.value = false
              if (onEnd) onEnd()
            })
            if (played) return
          }
        }

        // 2. 如果配置了 AI 零样本克隆，使用录入的那段话克隆合成播放
        if (cfg.aiCloneEnabled && cfg.aiApiKey) {
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

        // 3. 使用从用户录入的那段话中提取出的声纹参数播放全站音频
        speakNativeTts(text, lang, {
          ...options,
          useTimbreProfile: true,
          rate: options.rate ?? (cfg.timbreProfile?.computedRate || 0.92),
          pitch: options.pitch ?? (cfg.timbreProfile?.computedPitch || 1.08)
        })
        return
      }

      // 模式 B：逐句真人配音优先 ('recorded_first')
      if (mode === 'recorded_first') {
        const targetRole = preferredRole || cfg.activeRole
        if (targetRole && targetRole !== 'system') {
          const customRec = await getVoiceClipRecord(text, targetRole)
          if (customRec && customRec.blob) {
            isSpeaking.value = true
            const played = await playBlobAudio(customRec.blob, () => {
              isSpeaking.value = false
              if (onEnd) onEnd()
            })
            if (played) return
          }
        }
        if (cfg.aiCloneEnabled && cfg.aiApiKey) {
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
    }

    // 模式 C（或兜底）：使用用户在设置页试听选中的浏览器内置声音播放
    speakNativeTts(text, lang, {
      ...options,
      useTimbreProfile: false,
      rate: options.rate ?? (cfg.browserRate || 0.92),
      pitch: options.pitch ?? (cfg.browserPitch || 1.05)
    })
  }

  function speakText(text, options = {}) {
    dispatchSmartSpeech(text, 'zh-CN', options)
  }

  function speakEnglish(text, options = {}) {
    dispatchSmartSpeech(text, 'en-US', options)
  }

  function speakSystemOnly(text, lang = 'zh-CN', options = {}) {
    stopSpeech()
    speakNativeTts(text, lang, {
      ...options,
      useTimbreProfile: false
    })
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
    previewBrowserVoice,
    previewMyTimbreVoice,
    stopSpeech,
    toggleSound
  }
}
