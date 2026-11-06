import test from 'node:test'
import assert from 'node:assert/strict'
import { createGeoMapLoader } from '../src/services/geoMap.js'

test('returns usable map data and rejects HTTP failures or invalid GeoJSON', async () => {
  let response = { ok: true, json: async () => ({ type: 'FeatureCollection', features: [] }) }
  const loader = createGeoMapLoader({ fetchMap: async () => response, baseUrl: '/school/' })
  assert.deepEqual(await loader.load('110000'), { type: 'FeatureCollection', features: [] })
  response = { ok: false, status: 404, json: async () => ({}) }
  await assert.rejects(loader.load('110000'), /404/)
  response = { ok: true, json: async () => ({ error: 'bad' }) }
  await assert.rejects(loader.load('110000'), /地图数据/)
})

test('late response and failures from an old route cannot replace the latest result', async () => {
  const pending = []
  const loader = createGeoMapLoader({ fetchMap: (url, options) => new Promise((resolve, reject) => pending.push({ url, options, resolve, reject })) })
  const older = loader.load('110000')
  const newer = loader.load('310000')
  assert.equal(pending[0].options.signal.aborted, true)
  pending[1].resolve({ ok: true, json: async () => ({ type: 'FeatureCollection', features: [{ id: 'new' }] }) })
  assert.equal((await newer).features[0].id, 'new')
  pending[0].resolve({ ok: true, json: async () => ({ type: 'FeatureCollection', features: [{ id: 'old' }] }) })
  assert.equal(await older, null)
})

test('cancel invalidates outstanding response even if fetch ignores abort', async () => {
  let finish
  const loader = createGeoMapLoader({ fetchMap: () => new Promise(resolve => { finish = resolve }) })
  const request = loader.load('110000')
  loader.cancel()
  finish({ ok: true, json: async () => ({ type: 'FeatureCollection', features: [] }) })
  assert.equal(await request, null)
})

test('a superseded request failure is ignored while the current request succeeds', async () => {
  const pending = []
  const loader = createGeoMapLoader({ fetchMap: () => new Promise((resolve, reject) => pending.push({ resolve, reject })) })
  const older = loader.load('110000')
  const newer = loader.load('310000')
  pending[0].reject(new Error('network failure'))
  pending[1].resolve({ ok: true, json: async () => ({ type: 'FeatureCollection', features: [] }) })
  assert.equal(await older, null)
  assert.deepEqual(await newer, { type: 'FeatureCollection', features: [] })
})
