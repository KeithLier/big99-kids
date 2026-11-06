import test from 'node:test'
import assert from 'node:assert/strict'

test('cloud speech failure shows a helpful message and falls back without exposing input', async () => {
  const originalFetch = globalThis.fetch
  const originalUtterance = globalThis.SpeechSynthesisUtterance
  const spoken = []
  globalThis.SpeechSynthesisUtterance = class { constructor(text) { this.text = text } }
  globalThis.window = {
    localStorage: { getItem: () => null, setItem: () => {} },
    speechSynthesis: {
      cancel() {}, getVoices: () => [], addEventListener() {},
      speak: utterance => spoken.push(utterance.text)
    }
  }
  globalThis.fetch = async () => ({ ok: false, status: 503 })
  try {
    const { useVoiceStudio } = await import('../src/composables/useVoiceStudio.js')
    const { useKidsProfile } = await import('../src/composables/useKidsProfile.js')
    const { useSound } = await import('../src/composables/useSound.js')
    const studio = useVoiceStudio()
    studio.saveVoiceSettings({ voiceEngineMode: 'my_timbre', aiCloneEnabled: true, aiApiKey: 'secret' })
    useSound().speakText('private sample')
    await new Promise(resolve => setImmediate(resolve))
    const toast = useKidsProfile().globalToastMsg.value
    assert.match(toast, /AI 语音暂不可用/)
    assert.doesNotMatch(toast, /secret|private sample/)
    assert.deepEqual(spoken, ['private sample'])
  } finally {
    globalThis.fetch = originalFetch
    globalThis.SpeechSynthesisUtterance = originalUtterance
    delete globalThis.window
  }
})
