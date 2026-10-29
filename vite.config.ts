import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

function shilpaApiDevPlugin(): Plugin {
  return {
    name: 'shilpa-api-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/shilpa')) {
          try {
            // @ts-expect-error - server/index.js is an ES module
            const { app } = await import('./server/index.js')
            return app(req, res, next)
          } catch (err: any) {
            console.error('Error in SHILPA Vite API handler:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
            return
          }
        }
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), shilpaApiDevPlugin()],
  server: {
    proxy: {
      // Fallback proxy if external backend is started on 3001
      '/api/external': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
