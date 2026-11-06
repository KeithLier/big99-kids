export function createProjector(bbox, width, height, pad = 28) {
  const { minLng, maxLng, minLat, maxLat } = bbox
  const midLatRad = ((minLat + maxLat) / 2) * (Math.PI / 180)
  const cosLat = Math.max(0.45, Math.cos(midLatRad))
  const lngSpan = Math.max(0.05, (maxLng - minLng) * cosLat)
  const latSpan = Math.max(0.05, maxLat - minLat)

  const availW = width - pad * 2
  const availH = height - pad * 2
  const scale = Math.min(availW / lngSpan, availH / latSpan)

  const actualW = lngSpan * scale
  const actualH = latSpan * scale
  const offsetX = (width - actualW) / 2
  const offsetY = (height - actualH) / 2

  return function project([lng, lat]) {
    const x = offsetX + (lng - minLng) * cosLat * scale
    const y = offsetY + (maxLat - lat) * scale
    return [Number(x.toFixed(1)), Number(y.toFixed(1))]
  }
}

export function geometryToSvgPath(geom, project, clipLatMin = -90) {
  if (!geom) return ''
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : (geom.type === 'MultiPolygon' ? geom.coordinates : [])
  const parts = []
  for (const poly of polys) {
    for (const ring of poly) {
      if (!ring || ring.length < 3) continue
      let sumLat = 0
      for (const pt of ring) sumLat += pt[1]
      const avgLat = sumLat / ring.length
      if (avgLat < clipLatMin) continue

      const projected = ring.map(project)
      const cmds = projected.map((pt, idx) => `${idx === 0 ? 'M' : 'L'}${pt[0]},${pt[1]}`)
      cmds.push('Z')
      parts.push(cmds.join(' '))
    }
  }
  return parts.join(' ')
}

