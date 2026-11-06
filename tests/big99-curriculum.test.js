import { test } from 'node:test'
import assert from 'node:assert/strict'

import * as api from '../src/utils/big99Curriculum.js'

test('乘法分类区分小九九、默认掌握、规律和方格颜色', () => {
  assert.equal(api.getCellMeta(9, 3).categoryKey, 'xiao99')
  assert.equal(api.getCellMeta(10, 2).categoryKey, 'moren')
  assert.equal(api.getCellMeta(12, 9).categoryKey, 'guilv')
  assert.equal(api.getCellMeta(12, 12).fontTag, 'red')
  assert.equal(api.getCellMeta(15, 5).fontTag, 'blue')
})

test('口诀和盲背保留既有小九九与大九九格式', () => {
  assert.equal(api.getChantText(3, 2), '二三得六')
  assert.equal(api.getChantText(9, 9), '九九八十一')
  assert.equal(api.getChantText(12, 3), '十二 乘 三 等于 三十六')
  assert.equal(api.getBlindChantPrefix(3, 2), '二三 [ ❓ ]')
  assert.equal(api.numberToChinese(105), '一百零五')
})

test('推荐下一格按既有学习顺序并跳过已掌握内容', () => {
  assert.deepEqual(api.getPedagogicalNextCell({}, false), [1, 1])
  assert.deepEqual(api.getPedagogicalNextCell({ '1x1': 2, '2x1': 3 }, false), [3, 1])
  const completed = Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`${i + 1}x1`, 2]))
  assert.deepEqual(api.getPedagogicalNextCell(completed, true), [2, 2])
})

test('阶梯提示和分组解释包含当前计算结果', () => {
  assert.match(api.getScaffoldBridgeHtml(4, 2), /4 × 2 = 8/)
  assert.match(api.getKidVisualExplanation(4, 2), /<b>8<\/b>/)
})
