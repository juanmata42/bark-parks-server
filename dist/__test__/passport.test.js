"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("../middleware/passport"));
describe("given the passportMiddleware", () => {
    describe("when the middleware is called", () => {
        it("should return an object", () => {
            expect(typeof passport_1.default).toBe("object");
        });
    });
});
