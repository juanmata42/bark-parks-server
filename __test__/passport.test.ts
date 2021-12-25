import passportMiddleware from "../middleware/passport";

describe("given the passportMiddleware", () => {
    describe("when the middleware is called", () => {
        it("should return an object", () => {
        expect(typeof passportMiddleware).toBe("object");
        });
    });
    });
