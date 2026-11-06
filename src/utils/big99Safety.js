// Values stored by the profile and history features are untrusted when inserted into HTML.
export function escapeHistoryText(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character])
}

export function safeSignatureDataUrl(value) {
  return typeof value === 'string' && /^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/.test(value)
    ? value
    : ''
}

export function bindPosterResize(target, update, delay = 150) {
  let pending = null
  const onOrientationChange = () => {
    clearTimeout(pending)
    pending = setTimeout(update, delay)
  }
  target.addEventListener('resize', update)
  target.addEventListener('orientationchange', onOrientationChange)
  return () => {
    clearTimeout(pending)
    target.removeEventListener('resize', update)
    target.removeEventListener('orientationchange', onOrientationChange)
  }
}
