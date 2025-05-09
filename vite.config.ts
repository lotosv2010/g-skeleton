import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { ReactSkeletonPlugin } from './plugins'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ReactSkeletonPlugin({
      staticDir: resolve(__dirname, 'dist'),
      port:6060,
      origin:'http://localhost:6060',
      viewport: {
        width: 640,
        height: 480,
        deviceScaleFactor: 1
      },
      button: {
        color: '#999999'
      },
    }),
  ],
})
