import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@monorepo-base/components': path.resolve(__dirname, '../../packages/components/src'),
      '@monorepo-base/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@monorepo-base/utils': path.resolve(__dirname, '../../packages/utils/src')
    }
  }
})
