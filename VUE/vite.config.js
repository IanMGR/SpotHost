import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        //target: 'http://192.168.1.26:8000',
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,      
        ws: true,
      }
    }
  }
})
