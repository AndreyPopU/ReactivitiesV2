import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import mkcert from 'vite-plugin-mkcert'
import type { ServerOptions } from 'node:https'

export default defineConfig({
  server: {
    port: 3000,
    https: true as unknown as ServerOptions
  },
  plugins: [
    react(),
    mkcert(),
    babel({ presets: [reactCompilerPreset()] })
  ]
})