// A loader belongs to one view so a later request can supersede an earlier one.
/** @param {{ fetchMap?: typeof fetch, baseUrl?: string }} [options] */
export function createGeoMapLoader({ fetchMap = fetch, baseUrl = '/' } = {}) {
  /** @type {AbortController | null} */
  let controller = null
  let sequence = 0

  function cancel() {
    sequence++
    if (controller) controller.abort()
    controller = null
  }

  /** @param {string | number} code */
  async function load(code) {
    cancel()
    const requestSequence = sequence
    const requestController = new AbortController()
    controller = requestController
    try {
      const response = await fetchMap(`${baseUrl}geo/${encodeURIComponent(code)}.json`, {
        signal: requestController.signal
      })
      if (requestSequence !== sequence) return null
      if (!response.ok) throw new Error(`地图请求失败 (${response.status})`)
      const data = await response.json()
      if (requestSequence !== sequence) return null
      if (!data || data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
        throw new Error('地图数据格式不正确')
      }
      return data
    } catch (error) {
      if (requestSequence !== sequence || requestController.signal.aborted) return null
      throw error
    } finally {
      if (requestSequence === sequence) controller = null
    }
  }

  return { load, cancel }
}
