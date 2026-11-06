import { test } from 'node:test'
import assert from 'node:assert/strict'

import * as safety from '../src/utils/big99Safety.js'

test('history text escapes markup, quotes and ampersands', () => {
  assert.equal(typeof safety.escapeHistoryText, 'function')
  assert.equal(safety.escapeHistoryText('<img src="x" onerror=\'run()\'>&'), '&lt;img src=&quot;x&quot; onerror=&#39;run()&#39;&gt;&amp;')
})

test('signature accepts canvas PNG data only and rejects attribute injection', () => {
  assert.equal(typeof safety.safeSignatureDataUrl, 'function')
  assert.equal(safety.safeSignatureDataUrl('data:image/png;base64,aGVsbG8='), 'data:image/png;base64,aGVsbG8=')
  assert.equal(safety.safeSignatureDataUrl('" onerror="alert(1)'), '')
  assert.equal(safety.safeSignatureDataUrl('https://example.org/image.png'), '')
  assert.equal(safety.safeSignatureDataUrl('data:image/svg+xml;base64,PHN2Zz4='), '')
})

test('resize and orientation listeners stop firing after cleanup', async () => {
  assert.equal(typeof safety.bindPosterResize, 'function')
  const target = new EventTarget()
  let calls = 0
  const cleanup = safety.bindPosterResize(target, () => { calls++ }, 5)
  target.dispatchEvent(new Event('resize'))
  target.dispatchEvent(new Event('orientationchange'))
  cleanup()
  target.dispatchEvent(new Event('resize'))
  target.dispatchEvent(new Event('orientationchange'))
  await new Promise(resolve => setTimeout(resolve, 15))
  assert.equal(calls, 1)
})

test('history popup displays hostile stored strings as text and rejects injected image attributes', async () => {
  const { readFileSync } = await import('node:fs')
  const { runInNewContext } = await import('node:vm')
  const source = readFileSync(new URL('../src/views/Big99View.vue', import.meta.url), 'utf8')
  const start = source.indexOf('  function openHistoryModal() {')
  const end = source.indexOf('  function closeHistoryModal()', start)
  assert.ok(start >= 0 && end > start)
  const body = { innerHTML: '' }
  const modal = { classList: { add() {} } }
  const context = {
    evaluateAchievements() {}, document: { getElementById: id => id === 'historyModal' ? modal : body },
    historyData: { days: { '2026-01-01': { learnedCells: [], goldCells: [], logs: ['<img src=x onerror=alert(1)>'] } }, achievements: {} },
    completedCells: {}, ACHIEVEMENTS_DEF: [], getTodayDateStr: () => '2026-01-01',
    kidProfile: { nameText: '<b>A</b>', signatureDataUrl: '" onerror="alert(1)' },
    escapeHistoryText: safety.escapeHistoryText || (value => String(value)),
    safeSignatureDataUrl: safety.safeSignatureDataUrl || (value => value)
  }
  runInNewContext(`${source.slice(start, end)}; openHistoryModal()`, context)
  assert.ok(body.innerHTML.includes('&lt;b&gt;A&lt;/b&gt;'))
  assert.ok(body.innerHTML.includes('&lt;img src=x onerror=alert(1)&gt;'))
  assert.ok(!body.innerHTML.includes('" onerror="alert(1)'))
})
