import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'ConsoleSuccess',
      fileName: 'index',
      formats: ['umd']
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Ensure the UMD global name matches the original
        name: 'ConsoleSuccess',
        // Add proper UMD wrapper
        format: 'umd',
        exports: 'default'
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
      reportsDirectory: './vitest-coverage',
      include: ['src/**/*.js'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/tests/**',
        '**/test-results/**',
        '**/playwright-report/**',
        '**/vitest-coverage/**',
        '**/*.test.js',
        '**/*.test.ts',
        '**/*.config.js',
        '**/*.config.ts',
        '**/playwright.config.ts',
        '**/vite.config.js'
      ]
    },
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts']
  }
})
