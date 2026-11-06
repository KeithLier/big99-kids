import { test } from 'node:test'
import assert from 'node:assert/strict'

const values = new Map()
globalThis.window = {
  localStorage: {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key)
  },
  dispatchEvent() {}
}
const profile = await import('../src/composables/useKidsProfile.js')

const app = profile.useKidsProfile()

test('legacy boolean multiplication progress is normalized on refresh', () => {
  values.clear()
  values.set(profile.MUL_STORAGE_KEY, JSON.stringify({ '2x3': true, '3x4': 3 }))
  app.refreshFromStorage()
  assert.deepEqual(app.mulCompleted.value, { '2x3': 2, '3x4': 3 })
  assert.equal(app.mulLearnedCount.value, 2)
  assert.equal(app.mulGoldCount.value, 1)
})

test('multiplication writes and reset update shared state immediately', () => {
  assert.equal(typeof app.saveCompletedCells, 'function')
  assert.equal(typeof app.clearCompletedCells, 'function')
  const data = { '5x6': 2 }
  app.saveCompletedCells(data)
  data['5x6'] = 3
  assert.equal(app.mulCompleted.value['5x6'], 2)
  assert.deepEqual(JSON.parse(values.get(profile.MUL_STORAGE_KEY)), { '5x6': 2 })
  app.clearCompletedCells()
  assert.equal(values.has(profile.MUL_STORAGE_KEY), false)
  assert.deepEqual(app.mulCompleted.value, {})
})

test('profile and history storage are shared and can be reset together', () => {
  assert.equal(typeof app.readKidProfile, 'function')
  assert.equal(typeof app.writeKidProfile, 'function')
  assert.equal(typeof app.readHistoryData, 'function')
  assert.equal(typeof app.saveHistoryData, 'function')
  assert.equal(typeof app.clearKidProfileAndHistory, 'function')
  app.writeKidProfile({ nameText: '小鹿' })
  assert.equal(app.kidProfile.value.nameText, '小鹿')
  assert.equal(app.readKidProfile().nameText, '小鹿')
  const history = { days: { today: { logs: ['学习'] } }, achievements: {} }
  app.saveHistoryData(history)
  assert.deepEqual(app.readHistoryData(), history)
  app.clearKidProfileAndHistory()
  assert.equal(app.kidProfile.value, null)
  assert.equal(values.has(profile.PROFILE_KEY), false)
  assert.equal(values.has(profile.HISTORY_KEY), false)
})

test('storage changes refresh the visible multiplication grid', async () => {
  const { readFileSync } = await import('node:fs')
  const { runInNewContext } = await import('node:vm')
  const source = readFileSync(new URL('../src/views/Big99View.vue', import.meta.url), 'utf8')
  const start = source.indexOf('  const onGlobalProfileUpdate = () => {')
  const end = source.indexOf('  // Initialize on page load', start)
  assert.ok(start >= 0 && end > start)
  let renders = 0
  runInNewContext(`${source.slice(start, end)}; onGlobalProfileUpdate()`, {
    kidProfile: null, historyData: {}, completedCells: {},
    loadKidProfile: () => null, loadHistoryData: () => ({}), loadCompletedCells: () => ({ '2x3': 3 }),
    updateKidProfileUI() {}, refreshFromStorage() {}, renderGrid() { renders++ }
  })
  assert.equal(renders, 1)
})
