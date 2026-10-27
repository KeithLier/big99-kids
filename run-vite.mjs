import crypto from 'node:crypto'

if (crypto.webcrypto?.getRandomValues && !crypto.getRandomValues) {
  crypto.getRandomValues = crypto.webcrypto.getRandomValues.bind(crypto.webcrypto)
}
if (!globalThis.crypto) {
  globalThis.crypto = crypto.webcrypto
}

await import('./node_modules/vite/bin/vite.js')
