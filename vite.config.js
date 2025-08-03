import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
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
        additionalData: `@import "abstracts/variables"; @import "abstracts/mixins";`
      }
    }
  }
})