import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read the built library content
const libraryContent = readFileSync(join(__dirname, '../dist/index.js'), 'utf-8');

test.describe('Console Success Browser Test', () => {
  test('console.success should work in browser', async ({ page }) => {
    // Listen to console messages
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text());
      }
    });

    // Create a test page with inline script
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <h1>Console Success Test</h1>
        <script>
          ${libraryContent}
        </script>
        <script>
          console.success('Test from browser!');
        </script>
      </body>
      </html>
    `);

    // Wait a bit for the script to execute
    await page.waitForTimeout(100);

    // Check that console.success was called
    const successMessage = consoleMessages.find(msg => msg.includes('✓'));
    expect(successMessage).toBeTruthy();
    expect(successMessage).toContain('Test from browser!');
  });

  test('console.success should be available globally', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <script>
          ${libraryContent}
        </script>
        <script>
          window.hasConsoleSuccess = typeof console.success === 'function';
        </script>
      </body>
      </html>
    `);
    
    // Check that console.success is available
    const hasConsoleSuccess = await page.evaluate(() => {
      return (window as any).hasConsoleSuccess;
    });
    
    expect(hasConsoleSuccess).toBe(true);
  });
});
