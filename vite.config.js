import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        about: 'src/about.html',
        solutions: 'src/solutions.html',
        'context-engineering': 'src/context-engineering.html',
        contact: 'src/contact.html'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./styles/abstracts/variables"; @import "./styles/abstracts/mixins";`
      }
    }
  }
})