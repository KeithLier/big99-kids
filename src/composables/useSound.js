import { ref } from 'vue'
import { speechCredential } from './voiceSecurity.js'
import { useVoiceStudio } from './useVoiceStudio.js'
import { useKidsProfile } from './useKidsProfile.js'
import { diagnostics } from '../utils/diagnostics.js'

const soundEnabled = ref(true)
const isSpeaking = ref(false)
let audioCtx = null
let lastVoiceFailureNotice = 0

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
    hasRecordingFor,
    getVoiceClipRecord,
    playBlobAudio,
    stopCustomAudio,
    synthesizeWithAiClone,
    voiceFailure
  } = useVoiceStudio()
  const { showToast } = useKidsProfile()

  function notifyVoiceFallback(category) {
    if (!category) return
    const now = Date.now()
    if (lastVoiceFailureNotice && now - lastVoiceFailureNotice < 10000) return
    lastVoiceFailureNotice = now
    showToast('AI 语音暂不可用，已尝试使用浏览器声音。请检查声音设置或稍后重试。')
  }

  let ttsKeepAliveTimer = null

  function clearTtsKeepAlive() {
    if (ttsKeepAliveTimer) {
      clearInterval(ttsKeepAliveTimer)
      ttsKeepAliveTimer = null
    }
  }

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
    clearTtsKeepAlive()
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

  function findBestEnglishVoice(voices) {
    if (!voices || voices.length === 0) return null
    const enVoices = voices.filter(v => (v.lang || '').toLowerCase().startsWith('en'))
    if (enVoices.length === 0) return null
    const preferredNames = ['Samantha', 'Ava', 'Allison', 'Victoria', 'Google US English', 'Aria', 'Jenny', 'Guy', 'Alex', 'Daniel', 'Karen']
    for (const kw of preferredNames) {
      const hit = enVoices.find(v => (v.name || '').includes(kw))
      if (hit) return hit
    }
    return (
      enVoices.find(v => (v.lang || '').toLowerCase() === 'en-us' && v.localService) ||
      enVoices.find(v => (v.lang || '').toLowerCase().startsWith('en-us')) ||
      enVoices[0]
    )
  }

  function speakNativeTts(text, lang = 'zh-CN', options = {}) {
    const cfg = voiceSettings.value
    const isEnglish = String(lang || '').toLowerCase().startsWith('en')
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
      clearTtsKeepAlive()
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = isEnglish ? 'en-US' : lang
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

      // 2. 若未指定临时试听声音，按语言分支匹配（英文绝不混用中文发音人）
      if (!targetVoice) {
        if (isEnglish) {
          targetVoice = findBestEnglishVoice(voices)
        } else {
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
              null
          }
        }
      }

      if (isModMale && !isEnglish) {
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

      // Chrome 桌面端长文本 TTS 防休眠保活定时器
      if (text.length > 60) {
        ttsKeepAliveTimer = setInterval(() => {
          if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
            window.speechSynthesis.pause()
            window.speechSynthesis.resume()
          } else {
            clearTtsKeepAlive()
          }
        }, 10000)
      }

      utter.onend = () => {
        clearTtsKeepAlive()
        isSpeaking.value = false
        if (onEnd) onEnd()
      }
      utter.onerror = () => {
        clearTtsKeepAlive()
        isSpeaking.value = false
        if (onEnd) onEnd()
      }
      window.speechSynthesis.speak(utter)
    } catch (e) {
      clearTtsKeepAlive()
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
    if (cfg.aiCloneEnabled && speechCredential(cfg)) {
      isSpeaking.value = true
      const aiBlob = await synthesizeWithAiClone(sampleText)
      if (aiBlob) {
        const played = await playBlobAudio(aiBlob, () => {
          isSpeaking.value = false
        })
        if (played) return
        diagnostics.report('voice_playback')
        notifyVoiceFallback('voice_playback')
      } else {
        notifyVoiceFallback(voiceFailure.value)
      }
    }

    // 使用从录入语音提取出的声纹参数 (computedPitch / computedRate / 匹配基底声线) 试听
    speakNativeTts(sampleText, lang, {
      useTimbreProfile: true,
      rate: cfg.timbreProfile?.computedRate || 0.92,
      pitch: cfg.timbreProfile?.computedPitch || 1.08
    })
  }

  async function dispatchAsyncCustomSpeech(text, lang, options, cfg, mode, targetRole) {
    const { onEnd = null } = options

    if (mode === 'my_timbre' || mode === 'recorded_first') {
      if (targetRole && targetRole !== 'system' && hasRecordingFor(text, targetRole)) {
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

      if (cfg.aiCloneEnabled && speechCredential(cfg)) {
        isSpeaking.value = true
        const aiBlob = await synthesizeWithAiClone(text)
        if (aiBlob) {
          const played = await playBlobAudio(aiBlob, () => {
            isSpeaking.value = false
            if (onEnd) onEnd()
          })
          if (played) return
          diagnostics.report('voice_playback')
          notifyVoiceFallback('voice_playback')
        } else {
          notifyVoiceFallback(voiceFailure.value)
        }
      }
    }

    const useTimbre = mode === 'my_timbre'
    speakNativeTts(text, lang, {
      ...options,
      useTimbreProfile: useTimbre,
      rate: options.rate ?? (useTimbre ? (cfg.timbreProfile?.computedRate || 0.92) : (cfg.browserRate || 0.92)),
      pitch: options.pitch ?? (useTimbre ? (cfg.timbreProfile?.computedPitch || 1.08) : (cfg.browserPitch || 1.05))
    })
  }

  function dispatchSmartSpeech(text, lang = 'zh-CN', options = {}) {
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
    const targetRole = preferredRole || cfg.activeRole
    const hasLocalRecording =
      !forceSystem &&
      (mode === 'my_timbre' || mode === 'recorded_first') &&
      targetRole &&
      targetRole !== 'system' &&
      hasRecordingFor(text, targetRole)
    const hasCloudAi =
      !forceSystem &&
      (mode === 'my_timbre' || mode === 'recorded_first') &&
      Boolean(cfg.aiCloneEnabled && speechCredential(cfg))

    // 若存在本地真人录音或开启了云端 AI 克隆，走异步音频流播放
    if (hasLocalRecording || hasCloudAi) {
      dispatchAsyncCustomSpeech(text, lang, options, cfg, mode, targetRole)
      return
    }

    // 同步直通通道：保持 100% 处于用户点击手势栈内，防止 iOS Safari / 微信 WebView 静默拦截
    const useTimbre = !forceSystem && mode === 'my_timbre'
    speakNativeTts(text, lang, {
      ...options,
      useTimbreProfile: useTimbre,
      rate: options.rate ?? (useTimbre ? (cfg.timbreProfile?.computedRate || 0.92) : (cfg.browserRate || 0.92)),
      pitch: options.pitch ?? (useTimbre ? (cfg.timbreProfile?.computedPitch || 1.08) : (cfg.browserPitch || 1.05))
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
