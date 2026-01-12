import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import "../src/index.js"

describe("Console.success Node.js functionality", () => {
    let consoleSpy;
    
    beforeEach(() => {
        // Spy on console.log to capture the output
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });
    
    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test("should be available on console object", () => {
        expect(typeof console.success).toBe('function');
    });

    test("should call console.log with ANSI colors in Node.js", () => {
        console.success("Test message");
        
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'), // green background
            expect.stringContaining('✓'), // success icon
            expect.stringContaining('\x1b[0m'), // reset
            expect.stringContaining('\x1b[32m'), // green foreground
            "Test message",
            expect.stringContaining('\x1b[0m') // reset
        );
    });

    test("should handle multiple arguments", () => {
        console.success("User", "John", "logged in");
        
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            "User",
            "John", 
            "logged in",
            expect.stringContaining('\x1b[0m')
        );
    });

    test("should handle empty message", () => {
        console.success("");
        
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            "",
            expect.stringContaining('\x1b[0m')
        );
    });

    test("should handle special characters", () => {
        console.success("Special: !@#$%^&*()");
        
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            "Special: !@#$%^&*()",
            expect.stringContaining('\x1b[0m')
        );
    });

    test("should detect Node.js environment correctly", () => {
        // In Node.js, isBrowser should be false
        const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
        expect(isBrowser).toBe(false);
    });

    test("should use ANSI escape codes for colors in Node.js", () => {
        console.success("ANSI test");
        
        const callArgs = consoleSpy.mock.calls[0];
        const ansiCodes = callArgs.join(' ');
        
        // Check for ANSI escape codes
        expect(ansiCodes).toContain('\x1b[42m'); // green background
        expect(ansiCodes).toContain('\x1b[32m'); // green foreground
        expect(ansiCodes).toContain('\x1b[37m'); // white foreground
        expect(ansiCodes).toContain('\x1b[0m');  // reset
    });

    test("should not execute browser-specific code in Node.js", () => {
        // In Node.js, isBrowser should be false, so browser-specific code should not run
        const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
        expect(isBrowser).toBe(false);

        // window.consoleSuccess should not be defined in Node.js
        expect(typeof window).toBe('undefined');
    });

    test("should handle null value", () => {
        console.success(null);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            null,
            expect.stringContaining('\x1b[0m')
        );
    });

    test("should handle undefined value", () => {
        console.success(undefined);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            undefined,
            expect.stringContaining('\x1b[0m')
        );
    });

    test("should handle circular reference object", () => {
        const circularObj = {name: 'test'};
        circularObj.self = circularObj;

        console.success(circularObj);

        expect(consoleSpy).toHaveBeenCalled();
        const callArgs = consoleSpy.mock.calls[0];
        expect(callArgs[4]).toBe(circularObj);
    });

    test("should handle function as argument", () => {
        const testFn = function() { return 42; };

        console.success(testFn);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            testFn,
            expect.stringContaining('\x1b[0m')
        );
    });

    test("should handle number", () => {
        console.success(42);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            42,
            expect.stringContaining('\x1b[0m')
        );
    });

    test("should handle boolean values", () => {
        console.success(true, false);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            true,
            false,
            expect.stringContaining('\x1b[0m')
        );
    });

    test("should handle deeply nested object", () => {
        const nestedObj = {
            level1: {
                level2: {
                    level3: {
                        value: 'deep'
                    }
                }
            }
        };

        console.success(nestedObj);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('\x1b[42m'),
            expect.stringContaining('✓'),
            expect.stringContaining('\x1b[0m'),
            expect.stringContaining('\x1b[32m'),
            nestedObj,
            expect.stringContaining('\x1b[0m')
        );
    });
});