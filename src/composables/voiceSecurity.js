// Credentials live only in memory; backups and persistent settings contain no keys.
/** @typedef {Record<string, unknown> & { aiApiKey?: string, aiCustomApiKey?: string, aiProvider?: string, aiCloneEnabled?: boolean }} VoiceSettings */
/** @param {VoiceSettings | null | undefined} settings */
export function settingsForStorage(settings) {
  const { aiApiKey, aiCustomApiKey, ...safe } = settings || {}
  return safe
}

/** @param {VoiceSettings | null | undefined} settings */
export function settingsFromBackup(settings) {
  const safe = settingsForStorage(settings)
  if (safe.aiProvider === 'custom') safe.aiCloneEnabled = false
  return safe
}

/** @param {string} value */
export function validatedSpeechEndpoint(value) {
  try {
    const url = new URL(value)
    const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
    if (url.username || url.password || (url.protocol !== 'https:' && !(url.protocol === 'http:' && loopback))) return null
    return url.href
  } catch {
    return null
  }
}

/** @param {VoiceSettings} settings */
export function speechCredential(settings) {
  return (settings.aiProvider === 'custom' ? settings.aiCustomApiKey : settings.aiApiKey)?.trim() || ''
}
