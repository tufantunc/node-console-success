import { describe, test, expect, vi } from 'vitest'
import "../src/index.js"

describe("Console.success must be called", () => {
    test("with Hello!", () => {
        const success = vi.spyOn(console, "success");
        console.success("Hello!");
        expect(success).toHaveBeenCalled();
    })
});