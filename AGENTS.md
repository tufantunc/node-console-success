# Agent Guidelines for console-success

## Build, Lint, and Test Commands

### Build
- `npm run build` - Build the library using Vite (outputs to dist/index.js)
- `npm run dev` - Build in watch mode for development

### Unit Tests (Vitest)
- `npm run test` - Run all unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test -- <test-file>` - Run a specific test file
  - Example: `npm run test -- tests/console-success.test.js`
- `npm run test -- -t <test-name>` - Run tests matching a name pattern
  - Example: `npm run test -- -t "should be available"`

### E2E Tests (Playwright)
- `npm run test:e2e` - Run all E2E tests
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI
- Note: E2E tests require the library to be built first (run `npm run build`)

### All Tests
- `npm run test:all` - Run both unit and E2E tests

## Code Style Guidelines

### File Structure
- Source code in `src/` directory
- Unit tests in `tests/` directory with `.test.js` or `.test.ts` extension
- E2E tests in `tests/` directory with `.test.ts` extension (Playwright)
- Config files in root directory

### Import/Export Patterns
- Use ES6 module syntax: `import { fn } from 'lib'` and `export default fn`
- For main library: export default the successFunction
- For tests: import from 'vitest' or '@playwright/test'
- Import relative paths with `.js` extension for consistency

### Formatting
- Use 4 spaces for indentation
- Keep lines reasonably lengthed (< 100 chars when possible)
- No trailing whitespace
- Use single quotes for strings by default
- Use template literals for multi-line strings or string interpolation

### Naming Conventions
- Variables and functions: camelCase (e.g., `consoleSpy`, `successFunction`)
- Constants: UPPER_SNAKE_CASE (e.g., `greenBg`, `whiteFg`)
- Classes/constructors: PascalCase (e.g., `ConsoleSuccess`)
- Test descriptions: descriptive, starting with "should" (e.g., "should be available")

### Testing Patterns
- Unit tests use Vitest with `describe`, `test`, `expect`
- E2E tests use Playwright with async/await
- Mock console.log in tests using `vi.spyOn(console, 'log')`
- Use `beforeEach` and `afterEach` for test setup/cleanup
- Test both Node.js and browser environments separately
- Include tests for edge cases (empty strings, special characters, etc.)

### Environment Handling
- Detect browser environment: `typeof window !== 'undefined' && typeof window.document !== 'undefined'`
- Use conditional logic to handle browser vs Node.js differences
- For browser: use CSS styles with `%c` prefix
- For Node.js: use ANSI escape codes

### Error Handling
- Handle edge cases: null, undefined, circular references in objects
- Use try-catch for JSON.stringify to prevent crashes on circular refs
- Test with edge cases: null, undefined, functions, symbols, circular objects

### Cross-Platform Considerations
- Library must work in both Node.js and browser
- Test in both environments (Node.js tests + Playwright browser tests)
- Use ANSI escape codes for Node.js terminal colors
- Use CSS styles for browser console colors
- Export both as ES module and UMD format for broad compatibility

### Code Quality
- Keep the library minimal and lightweight (target: ~500 bytes minified)
- No dependencies in the production bundle
- Zero configuration for end users
- Simple, intuitive API

### Git Workflow
- No explicit lint/typecheck commands configured (no ESLint/TypeScript setup)
- Before committing: run `npm run test:all` to ensure all tests pass
- Build with `npm run build` to verify the library builds correctly

### Documentation
- Update README.md when adding new features
- Keep examples simple and clear
- Include both Node.js and browser usage examples

### Specific Implementation Patterns

#### Environment Detection
Always use this exact pattern: `typeof window !== 'undefined' && typeof window.document !== 'undefined'`

#### Console.log Mocking
Use `vi.spyOn(console, 'log')` with beforeEach/afterEach and expect.stringContaining() for partial matches

#### ANSI Escape Codes (Node.js)
- Green background: `\x1b[42m`
- Green foreground: `\x1b[32m`
- White foreground: `\x1b[37m`
- Reset: `\x1b[0m`

#### CSS Styling (Browser)
- Background: `background-color: green;`
- Text color: `color: green;` or `color: white;`
- Use `%c` prefix in console.log to apply styles

#### Global Assignment Pattern
```javascript
console.success = successFunction;
if (isBrowser && typeof window !== 'undefined') {
    window.consoleSuccess = successFunction;
}
```

### Version Management
- Update version in package.json before publishing (Major.Minor.Patch)
- Semantic versioning: Patch (bug fixes), Minor (features), Major (breaking changes)

### Coverage Requirements
- Aim for >90% test coverage
- Include coverage for both unit and E2E tests
- Exclude config and test files from coverage reports

### Performance & Compatibility
- Target ~780 bytes minified bundle size
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Support Node.js LTS and above
- String concatenation preferred over template literals for bundle size

### Common Pitfalls
- Call `mockRestore()` in afterEach cleanup
- Run `npm run build` before E2E tests
- ANSI codes must be reset at end
- Test with multiple arguments, not just single strings
