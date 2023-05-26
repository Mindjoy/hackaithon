import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: ['favicon.ico', 'pwa-small.png', 'pwa-large.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Seeker',
        short_name: 'Seeker',
        description: 'Pokemon GO for curiosity',
        theme_color: '#7C3AED',
        icons: [
          {
            src: 'pwa-small.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-large.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
