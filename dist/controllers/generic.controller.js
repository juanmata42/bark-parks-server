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
exports.postShelter = exports.getShelters = exports.getDogspots = void 0;
const dogspot_1 = __importDefault(require("../models/dogspot"));
const shelter_1 = __importDefault(require("../models/shelter"));
const getDogspots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dogspots = yield dogspot_1.default.find();
    return res.json(dogspots);
});
exports.getDogspots = getDogspots;
const getShelters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shelters = yield shelter_1.default.find();
    return res.json(shelters);
});
exports.getShelters = getShelters;
const postShelter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.link ||
        !req.body.pnumber ||
        !req.body.name ||
        !req.body.country ||
        !req.body.region) {
        return res.status(400).json({ msg: 'Missing data' });
    }
    const shelter = yield shelter_1.default.findOne({ link: req.body.link });
    if (shelter) {
        return res.status(400).json({ msg: 'The Shelter already exists' });
    }
    const newShelter = yield shelter_1.default.create(req.body);
    return res.status(201).json(newShelter);
});
exports.postShelter = postShelter;
