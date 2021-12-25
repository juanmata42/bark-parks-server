"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    jwtSecret: process.env.JWT_SECRET || 'secrettoken',
    DB: {
        URI: process.env.MONGODB_URI ||
            'mongodb+srv://juanmaisdi:isdifinal@cluster0.m480r.mongodb.net/BarkParksDB?retryWrites=true&w=majority',
        USER: process.env.MONGODB_USER || 'juanmaisdi',
        PASSWORD: process.env.MONGODB_PASSWORD || 'isdifinal',
        URI_TEST: process.env.MONGODB_URI_TEST ||
            'mongodb+srv://juanmaisdi:isdifinal@cluster0.m480r.mongodb.net/BarkParksDBTest?retryWrites=true&w=majority',
    },
};
