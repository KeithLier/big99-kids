import { test } from 'node:test'
import assert from 'node:assert/strict'
import { settingsForStorage, settingsFromBackup, validatedSpeechEndpoint, speechCredential } from '../src/composables/voiceSecurity.js'

test('voice settings never persist either provider credential', () => {
  const saved = settingsForStorage({ aiApiKey: 'silicon-key', aiCustomApiKey: 'custom-key', aiProvider: 'custom', aiCustomEndpoint: 'https://custom.example/v1', browserRate: 1 })
  assert.equal('aiApiKey' in saved, false)
  assert.equal('aiCustomApiKey' in saved, false)
  assert.equal(saved.browserRate, 1)
})

test('backup import discards credentials and disables imported custom endpoint', () => {
  const restored = settingsFromBackup({ aiApiKey: 'secret', aiCustomApiKey: 'other', aiProvider: 'custom', aiCloneEnabled: true, aiCustomEndpoint: 'https://other.example' })
  assert.equal('aiApiKey' in restored, false)
  assert.equal('aiCustomApiKey' in restored, false)
  assert.equal(restored.aiCloneEnabled, false)
  assert.equal(restored.aiCustomEndpoint, 'https://other.example')
})

test('custom endpoint requires HTTPS except on loopback and disallows embedded credentials', () => {
  assert.equal(validatedSpeechEndpoint('https://example.com/v1/speech'), 'https://example.com/v1/speech')
  assert.equal(validatedSpeechEndpoint('http://127.0.0.1:8000/v1'), 'http://127.0.0.1:8000/v1')
  assert.equal(validatedSpeechEndpoint('http://localhost:8000/v1'), 'http://localhost:8000/v1')
  assert.equal(validatedSpeechEndpoint('http://example.com/v1'), null)
  assert.equal(validatedSpeechEndpoint('https://u:p@example.com/v1'), null)
  assert.equal(validatedSpeechEndpoint('javascript:alert(1)'), null)
})

test('custom providers never receive the SiliconFlow credential', () => {
  assert.equal(speechCredential({ aiProvider: 'siliconflow', aiApiKey: 'silicon-key', aiCustomApiKey: 'custom-key' }), 'silicon-key')
  assert.equal(speechCredential({ aiProvider: 'custom', aiApiKey: 'silicon-key', aiCustomApiKey: 'custom-key' }), 'custom-key')
  assert.equal(speechCredential({ aiProvider: 'custom', aiApiKey: 'silicon-key' }), '')
})

test('voice studio scrubs legacy keys and only sends custom credentials to validated endpoints', async () => {
  const values = new Map([
    ['kids_voice_studio_settings_v2', JSON.stringify({ aiApiKey: 'old-secret', aiProvider: 'custom', aiCloneEnabled: true, aiCustomEndpoint: 'https://old.example/v1' })],
    ['kids_voice_studio_settings_v1', JSON.stringify({ aiApiKey: 'older-secret' })]
  ])
  globalThis.window = { localStorage: { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) } }
  const { useVoiceStudio } = await import('../src/composables/useVoiceStudio.js')
  const studio = useVoiceStudio()
  assert.equal(studio.voiceSettings.value.aiApiKey, '')
  assert.ok([...values.values()].every(value => !value.includes('secret')))
  assert.equal(studio.voiceSettings.value.aiCloneEnabled, false)
  studio.saveVoiceSettings({ aiProvider: 'custom', aiCustomEndpoint: 'https://safe.example/v1', aiCloneEnabled: true, aiApiKey: 'silicon-key' })
  studio.saveVoiceSettings({ aiCustomApiKey: 'custom-key' })
  let request
  const previousFetch = globalThis.fetch
  globalThis.fetch = async (url, options) => { request = { url, options }; return { ok: false } }
  try {
    await studio.synthesizeWithAiClone('test')
    assert.equal(request.url, 'https://safe.example/v1')
    assert.equal(request.options.headers.Authorization, 'Bearer custom-key')
    assert.equal(request.options.redirect, 'error')
    assert.ok([...values.values()].every(value => !value.includes('silicon-key') && !value.includes('custom-key')))
    studio.saveVoiceSettings({ aiCustomEndpoint: 'http://insecure.example/v1' })
    request = undefined
    await studio.synthesizeWithAiClone('test')
    assert.equal(request, undefined)
    assert.equal(studio.voiceSettings.value.aiCustomApiKey, '')
  } finally {
    globalThis.fetch = previousFetch
    delete globalThis.window
  }
})

test('loads non-secret voice settings even when storage cleanup fails', async () => {
  const raw = JSON.stringify({ browserRate: 1.3, aiApiKey: 'old-secret' })
  globalThis.window = {
    localStorage: {
      getItem: key => key === 'kids_voice_studio_settings_v2' ? raw : null,
      setItem: () => { throw new Error('storage quota exceeded') }
    }
  }
  try {
    const { useVoiceStudio } = await import('../src/composables/useVoiceStudio.js?storage-read-only')
    const studio = useVoiceStudio()
    assert.equal(studio.voiceSettings.value.browserRate, 1.3)
    assert.equal(studio.voiceSettings.value.aiApiKey, '')
  } finally {
    delete globalThis.window
  }
})
