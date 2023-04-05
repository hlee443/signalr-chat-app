import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5181', // Update this to your ASP.NET Core backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      '/chathub': {
        target: 'http://localhost:5181', // Update this to your ASP.NET Core backend URL
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
