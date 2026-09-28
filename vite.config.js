import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// NOTE: kept minimal on purpose — the current UI uses src/styles.css only
// (no tailwind) and has no service-worker registration, so tailwindcss and
// vite-plugin-pwa were removed. They are also absent from package.json, and
// keeping the imports broke `npm run build` on a fresh install.
export default defineConfig({
  plugins: [react()],
})
