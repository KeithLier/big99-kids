import test from 'node:test'
import assert from 'node:assert/strict'
import { createDiagnostics, installGlobalErrorHandlers } from '../src/utils/diagnostics.js'

test('diagnostics only emits allowed categories and excludes error details', () => {
  const events = []
  const diagnostics = createDiagnostics(event => events.push(event))
  diagnostics.report('voice_http', new Error('secret private text'))
  diagnostics.report('voice_http', { apiKey: 'secret' })
  diagnostics.report('untrusted_category', new Error('private'))
  assert.deepEqual(events, [{ category: 'voice_http' }, { category: 'voice_http' }])
  assert.equal(JSON.stringify(events).includes('secret'), false)
})

test('global error listeners report fixed categories and cleanup', () => {
  const target = new EventTarget()
  const events = []
  const dispose = installGlobalErrorHandlers(target, createDiagnostics(event => events.push(event)))
  target.dispatchEvent(new Event('error'))
  target.dispatchEvent(new Event('unhandledrejection'))
  dispose()
  target.dispatchEvent(new Event('error'))
  assert.deepEqual(events, [{ category: 'window_error' }, { category: 'unhandled_rejection' }])
})

test('voice HTTP failures are classified and cleared after success', async () => {
  globalThis.window = { localStorage: { getItem: () => null, setItem: () => {} } }
  const previousFetch = globalThis.fetch
  const { useVoiceStudio } = await import('../src/composables/useVoiceStudio.js?diagnostics')
  const studio = useVoiceStudio()
  studio.saveVoiceSettings({ aiCloneEnabled: true, aiApiKey: 'secret' })
  try {
    globalThis.fetch = async () => ({ ok: false, status: 503 })
    assert.equal(await studio.synthesizeWithAiClone('private sample'), null)
    assert.equal(studio.voiceFailure.value, 'voice_http')
    globalThis.fetch = async () => { throw new Error('secret in error') }
    assert.equal(await studio.synthesizeWithAiClone('private sample'), null)
    assert.equal(studio.voiceFailure.value, 'voice_network')
    globalThis.fetch = async () => ({ ok: true, blob: async () => new Blob([new Uint8Array(201)], { type: 'audio/mpeg' }) })
    assert.ok(await studio.synthesizeWithAiClone('private sample') instanceof Blob)
    assert.equal(studio.voiceFailure.value, null)
  } finally {
    globalThis.fetch = previousFetch
    delete globalThis.window
  }
})
