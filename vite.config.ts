import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSkeleton from './plugins/vite-plugin-react-skeleton'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactSkeleton({
      routes: ['/', '/about'],
      skeletonMap: {
        '/': `<div style="padding: 20px;"><div style="background:#eee;height:20px;width:60%;margin-bottom:10px;"></div><div style="background:#eee;height:20px;width:80%;"></div></div>`,
        '/about': `<div style="padding: 20px;"><div style="background:#ddd;height:40px;width:100%;"></div></div>`
      }
    }),
  ],
})
