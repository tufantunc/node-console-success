import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'console.success',
      fileName: 'index',
      formats: ['umd']
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Ensure the UMD global name matches the original
        name: 'console.success'
      }
    },
    // Minify the output to match the original compressed size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console statements
        drop_debugger: true
      }
    }
  },
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './vitest-coverage'
    },
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts']
  }
})
