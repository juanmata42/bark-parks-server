"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const user_1 = __importDefault(require("../models/user"));
jest.mock('../models/user');
describe('given the user controller', () => {
    let req;
    const res = {};
    beforeEach(() => {
        req = {
            body: {
                _id: '123',
                name: 'test',
                email: 'test',
                password: 'test',
            },
        };
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
    });
    describe('when signup', () => {
        it('should return 400 if anything is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {};
            yield (0, user_controller_1.signUp)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        }));
        it('should return 400 if user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            user_1.default.findOne = jest.fn().mockReturnValue({});
            yield (0, user_controller_1.signUp)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        }));
        it('should return 201 if user is created', () => __awaiter(void 0, void 0, void 0, function* () {
            user_1.default.findOne = jest.fn().mockReturnValue(null);
            user_1.default.create = jest.fn().mockReturnValue({});
            yield (0, user_controller_1.signUp)(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        }));
    });
    describe('when signin', () => {
        it('should return 400 if anything is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {};
            yield (0, user_controller_1.signIn)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        }));
        it('should return 400 if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            user_1.default.findOne = jest.fn().mockReturnValue(null);
            yield (0, user_controller_1.signIn)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        }));
        // this test and the next can't be done because i don't know how to mock the .comparepassword method for user
        it('should return 200 if user is found', () => __awaiter(void 0, void 0, void 0, function* () {
            user_1.default.findOne = jest
                .fn()
                .mockReturnValue({ email: 'test', password: 'test', comparePassword: jest.fn().mockReturnValue(true) });
            yield (0, user_controller_1.signIn)(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        }));
        it('should return 400 if password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            user_1.default.findOne = jest
                .fn()
                .mockReturnValue({
                email: 'test',
                password: 'test',
                comparePassword: jest.fn().mockReturnValue(false),
            });
            yield (0, user_controller_1.signIn)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
});
