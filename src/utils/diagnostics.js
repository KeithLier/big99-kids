// Only these fixed categories may leave the failing call site. Do not include
// exception messages, text to be spoken, addresses, credentials or user data.
const CATEGORIES = new Set([
  'vue_error', 'window_error', 'unhandled_rejection',
  'voice_config', 'voice_http', 'voice_network', 'voice_response', 'voice_playback', 'voice_cache'
])

export function createDiagnostics(sink) {
  return {
    report(category) {
      if (!CATEGORIES.has(category)) return
      try { sink({ category }) } catch (_) { /* Diagnostics must not break the app. */ }
    }
  }
}

// Local console is the default sink; no telemetry is sent to a third party.
export const diagnostics = createDiagnostics(({ category }) => {
  console.warn(`[kids-study] ${category}`)
})

export function installGlobalErrorHandlers(target, reporter = diagnostics) {
  const onError = () => reporter.report('window_error')
  const onRejection = () => reporter.report('unhandled_rejection')
  target.addEventListener('error', onError)
  target.addEventListener('unhandledrejection', onRejection)
  return () => {
    target.removeEventListener('error', onError)
    target.removeEventListener('unhandledrejection', onRejection)
  }
}
