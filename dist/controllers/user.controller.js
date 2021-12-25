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
exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400,
    });
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ msg: 'Please. Send your email and password' });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: 'The User already Exists' });
    }
    const newUser = yield user_1.default.create(req.body);
    return res.status(201).json({
        token: createToken(newUser),
        user: {
            _id: newUser.id,
            name: newUser.name,
            posts: newUser.posts,
            profilePhoto: newUser.profilePhoto,
            bark: newUser.bark,
            description: newUser.description,
            location: newUser.location,
            favorites: newUser.favorites,
            groups: newUser.groups,
            groupRequests: newUser.groupRequests,
            friends: newUser.friends,
            friendRequests: newUser.friendRequests,
            friendRequestsSent: newUser.friendRequestsSent,
            notifications: true,
        },
    });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ msg: 'Please. Send your email and password' });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: 'The User does not exists' });
    }
    const isMatch = yield user.comparePassword(req.body.password);
    if (isMatch) {
        return res.status(200).json({
            token: createToken(user),
            user: {
                _id: user.id,
                name: user.name,
                posts: user.posts,
                profilePhoto: user.profilePhoto,
                bark: user.bark,
                description: user.description,
                location: user.location,
                favorites: user.favorites,
                groups: user.groups,
                groupRequests: user.groupRequests,
                friends: user.friends,
                friendRequests: user.friendRequests,
                friendRequestsSent: user.friendRequestsSent,
                notifications: true,
            },
        });
    }
    return res.status(400).json({
        msg: 'The email or password are incorrect',
    });
});
exports.signIn = signIn;
