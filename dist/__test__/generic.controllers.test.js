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
const generic_controller_1 = require("../controllers/generic.controller");
const dogspot_1 = __importDefault(require("../models/dogspot"));
const shelter_1 = __importDefault(require("../models/shelter"));
jest.mock('../models/dogspot');
jest.mock('../models/shelter');
describe('given the shelters controller', () => {
    let req;
    const res = {};
    beforeEach(() => {
        req = {
            body: {
                _id: '123',
                name: 'test',
                link: 'test',
                pnumber: 'test',
                country: 'test',
                region: 'test',
            },
        };
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
    });
    describe('when getShelters is called', () => {
        beforeEach(() => {
            shelter_1.default.find = jest.fn().mockReturnValue([]);
        });
        it('should return the shelters', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, generic_controller_1.getShelters)(req, res);
            expect(res.json).toHaveBeenCalled();
        }));
    });
    describe('when postShelter is called', () => {
        beforeEach(() => {
            shelter_1.default.create = jest.fn().mockReturnValue({});
        });
        it('shoud return 400 because it is missing a parameter', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body.name = undefined;
            yield (0, generic_controller_1.postShelter)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        }));
        it('should return 400 because it already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                link: 'test',
                name: 'test',
                pnumber: 'test',
                country: 'test',
                region: 'test',
            };
            shelter_1.default.findOne = jest.fn().mockReturnValue({});
            yield (0, generic_controller_1.postShelter)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        }));
        it('else should return 201 and have created a new shelter', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                link: 'test',
                name: 'test',
                pnumber: 'test',
                country: 'test',
                region: 'test',
            };
            shelter_1.default.findOne = jest.fn().mockReturnValue(null);
            shelter_1.default.create = jest
                .fn()
                .mockReturnValue({
                link: 'test',
                name: 'test',
                pnumber: 'test',
                country: 'test',
                region: 'test',
            });
            yield (0, generic_controller_1.postShelter)(req, res);
            expect(res.json).toHaveBeenCalled();
        }));
    });
});
describe('given the dogspots controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            send: jest.fn().mockReturnValue(res),
            json: jest.fn().mockReturnValue(res),
            status: jest.fn().mockReturnValue(res),
        };
    });
    describe('when getDogspots is called', () => {
        beforeEach(() => {
            dogspot_1.default.find = jest.fn().mockReturnValue([]);
        });
        it('should return the dogspots', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, generic_controller_1.getDogspots)(req, res);
            expect(res.json).toHaveBeenCalled();
        }));
    });
});
