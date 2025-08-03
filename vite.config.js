import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        solutions: 'solutions.html',
        'context-engineering': 'context-engineering.html',
        contact: 'contact.html'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/abstracts/variables"; @import "./src/styles/abstracts/mixins";`
      }
    }
  }
})