import "../../dist/index";

describe("Console.success must be called", () => {
    it("with Hello!", () => {
        const success = cy.spy(console, "success");
        console.success("Hello!");
        expect(success).to.be.called;
    })
});