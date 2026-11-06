import { test } from 'node:test'
import assert from 'node:assert/strict'
import { describeBrowserVoice, normalizeVoiceText, buildVoiceDbKey } from '../src/composables/useVoiceStudio.js'

test('录音键保留现有角色与规范化文本格式，兼容既有录音', () => {
  assert.equal(normalizeVoiceText('  Hello   WORLD \n '), 'hello world')
  assert.equal(normalizeVoiceText(null), '')
  assert.equal(buildVoiceDbKey('mom', '  Hello   WORLD \n '), 'mom::hello world')
  assert.equal(buildVoiceDbKey('kid', '同一句'), 'kid::同一句')
})

test('已知浏览器语音保留原有的中文描述和分类', () => {
  assert.deepEqual(describeBrowserVoice({ name: 'Tingting', lang: 'zh-CN' }), {
    friendlyName: '婷婷 (Tingting)', tag: '温暖普通话女声 · 推荐', genderHint: 'female'
  })
  assert.equal(describeBrowserVoice({ name: 'Google UK English Male', lang: 'en-GB' }).genderHint, 'male')
})

test('未知声音仍展示原始名称、语言与本地服务信息', () => {
  assert.deepEqual(describeBrowserVoice({ name: 'Custom Voice', lang: 'zh-CN', localService: true }), {
    friendlyName: 'Custom Voice', tag: '普通话 (中国大陆) · 本地内置', genderHint: 'standard'
  })
  assert.deepEqual(describeBrowserVoice(null), { friendlyName: '系统默认语音', tag: '标准', genderHint: 'standard' })
})
