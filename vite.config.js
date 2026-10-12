import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
            '/uploads': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      // ডেভেলপমেন্টে ব্যাকএন্ডের সাথে কথা বলার জন্য (এতে CORS লাগে না)
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})