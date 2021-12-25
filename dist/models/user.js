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
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-return-await */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, default: 'Pupper' },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true },
    profilePhoto: {
        type: String,
        default: 'https://www.eugeneweekly.com/wp-content/uploads/2020/08/20200820pets-1-lede-1300x844.jpg',
    },
    bark: {
        type: String,
        default: 'https://soundbible.com/mp3/Dog%20Woof-SoundBible.com-457935112.mp3',
    },
    location: { type: String, default: '' },
    description: { type: String, default: '' },
    groups: [String],
    groupRequests: [String],
    posts: [Object],
    favorites: [String],
    friends: [String],
    friendRequests: [Object],
    friendRequestsSent: [Object],
    notifications: { type: Boolean, default: true },
});
// eslint-disable-next-line consistent-return
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hash;
        next();
    });
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
exports.default = (0, mongoose_1.model)('User', userSchema);
