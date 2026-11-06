import test from 'node:test'
import assert from 'node:assert/strict'

const values = new Map([
  ['big99_kid_profile_v1', JSON.stringify({ nameText: '小明', avatar: '🐱' })],
  ['kids_poetry_progress_v1', JSON.stringify({ poem1: { readDone: true, gameDone: true, quizDone: true, stars: 3 } })],
  ['kids_pinyin_progress_v1', JSON.stringify({ learnedIds: { b: true }, tonePlayed: 1, spellCount: 0, gameStars: 0 })]
])
globalThis.window = {
  localStorage: {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key)
  }
}
const { useKidsProfile, PINYIN_STORAGE_KEY, POETRY_STORAGE_KEY, GEO_STORAGE_KEY } = await import('../src/composables/useKidsProfile.js')

test('旧档案和学科进度可读取并保留原有字段', () => {
  const profile = useKidsProfile()
  assert.equal(profile.kidProfile.value.name, '小明')
  assert.equal(profile.pinyinProgress.value.learnedIds.b, true)
  profile.recordPinyinProgress({ id: 'p', starDelta: 1 })
  const saved = JSON.parse(values.get(PINYIN_STORAGE_KEY))
  assert.deepEqual(saved.learnedIds, { b: true, p: true })
  assert.equal(saved.tonePlayed, 1)
  assert.equal(saved.gameStars, 1)
})

test('诗词重复记录不会降低已有星级', () => {
  useKidsProfile().recordPoetryProgress('poem1', { readDone: false })
  assert.equal(JSON.parse(values.get(POETRY_STORAGE_KEY)).poem1.stars, 3)
})

test('地理进度合并保存已访问省市', () => {
  const profile = useKidsProfile()
  profile.recordGeoProgress({ provinceAdcode: '110000' })
  profile.recordGeoProgress({ cityKey: '110000_北京' })
  const saved = JSON.parse(values.get(GEO_STORAGE_KEY))
  assert.equal(saved.exploredProvinces['110000'], true)
  assert.equal(saved.exploredCities['110000_北京'], true)
})
