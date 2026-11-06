import test from 'node:test'
import assert from 'node:assert/strict'
import { createProjector, geometryToSvgPath } from '../src/services/geoGeometry.js'

const bbox = { minLng: 100, maxLng: 110, minLat: 20, maxLat: 30 }

test('projects map coordinates with the national and province padding', () => {
  const coordinates = [[100, 20], [110, 30], [105, 25]]
  assert.deepEqual(coordinates.map(createProjector(bbox, 300, 200, 28)), [[84.7, 172], [215.3, 28], [150, 100]])
  assert.deepEqual(coordinates.map(createProjector(bbox, 300, 200, 36)), [[92, 164], [208, 36], [150, 100]])
})

test('builds polygon and multipolygon paths while clipping low latitude rings', () => {
  const low = [[1, 2], [3, 2], [3, 4], [1, 2]]
  const high = [[4, 12], [6, 12], [6, 14], [4, 12]]
  const project = point => point
  assert.equal(geometryToSvgPath({ type: 'Polygon', coordinates: [low, high] }, project, 5), 'M4,12 L6,12 L6,14 L4,12 Z')
  assert.equal(geometryToSvgPath({ type: 'MultiPolygon', coordinates: [[low], [high]] }, project, 5), 'M4,12 L6,12 L6,14 L4,12 Z')
  assert.equal(geometryToSvgPath({ type: 'Polygon', coordinates: [[[1, 2], [3, 4]]] }, project), '')
  assert.equal(geometryToSvgPath({ type: 'Point', coordinates: [1, 2] }, project), '')
  assert.equal(geometryToSvgPath(null, project), '')
})
