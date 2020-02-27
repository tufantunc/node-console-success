require("../dist/index");

describe("Console.success must be called", () => {
    test("with Hello!", () => {
        const success = jest.spyOn(console, "success");
        console.success("Hello!");
        expect(success).toHaveBeenCalled();
    })
});