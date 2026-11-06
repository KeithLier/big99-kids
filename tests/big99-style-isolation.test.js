import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import postcss from 'postcss'

const source = readFileSync(new URL('../src/views/Big99View.vue', import.meta.url), 'utf8')
const style = source.match(/<style>([\s\S]*?)<\/style>/)?.[1]

test('大九九样式和动画不会在其他页面产生全局选择器或同名动画', () => {
  assert.ok(style)
  const css = postcss.parse(style)
  const unscoped = []
  const globalKeyframes = []
  css.walkRules(rule => {
    if (rule.parent.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return
    for (const selector of postcss.list.comma(rule.selector)) {
      if (!selector.trim().startsWith('.big99-page-wrapper') && !selector.trim().startsWith(':where(.big99-page-wrapper)')) unscoped.push(selector.trim())
    }
  })
  css.walkAtRules(/keyframes$/i, rule => {
    if (!rule.params.startsWith('big99-')) globalKeyframes.push(rule.params)
  })
  assert.deepEqual(unscoped, [])
  assert.deepEqual(globalKeyframes, [])
})

test('学习和历史弹窗内容可滚动且保留内边距', () => {
  assert.match(source, /class="modal-body"/)
  const css = postcss.parse(style)
  let modalBody
  css.walkRules(rule => {
    if (postcss.list.comma(rule.selector).some(selector => selector.trim() === ':where(.big99-page-wrapper) .modal-body')) modalBody = rule
  })
  assert.ok(modalBody, '弹窗内容必须有 .modal-body 的样式')
  const declarations = Object.fromEntries(modalBody.nodes.filter(node => node.type === 'decl').map(node => [node.prop, node.value]))
  assert.equal(declarations['overflow-y'], 'auto')
  assert.equal(declarations.padding, '14px 20px 18px')
})
