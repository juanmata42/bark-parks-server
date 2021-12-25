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
const authUser_controller_1 = require("../controllers/authUser.controller");
const dogspot_1 = __importDefault(require("../models/dogspot"));
const post_1 = __importDefault(require("../models/post"));
const group_1 = __importDefault(require("../models/group"));
const user_1 = __importDefault(require("../models/user"));
jest.mock('../models/user');
jest.mock('../models/dogspot');
jest.mock('../models/post');
jest.mock('../models/group');
jest.mock('../models/shelter');
describe('given authUser controllers', () => {
    let req;
    const res = {};
    beforeEach(() => {
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
    });
    describe('when User is changing', () => {
        beforeEach(() => {
            req = {
                body: {
                    userId: '123',
                    _id: '123',
                    name: 'test',
                    email: 'test',
                    password: 'test',
                },
            };
        });
        describe('when updateUser is called', () => {
            it("should return a status 404 if id doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.updateUser)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was updated', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest
                    .fn()
                    .mockReturnValue({ save: jest.fn().mockReturnValue({}) });
                yield (0, authUser_controller_1.updateUser)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when deleteUser is called', () => {
            it("should return a status 404 if id doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.deleteUser)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was deleted', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest
                    .fn()
                    .mockReturnValue({ remove: jest.fn().mockReturnValue({}) });
                yield (0, authUser_controller_1.deleteUser)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when tellLocation is called', () => {
            it("should return a status of 404 if id doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.tellLocation)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was updated', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.tellLocation)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
    });
    describe('when user is changing posts', () => {
        beforeEach(() => {
            req = {
                body: {
                    userId: '456',
                    postId: '123',
                    _id: '123',
                    message: 'test',
                    creator: 'test',
                    tags: ['test'],
                    selectedFile: 'test',
                    likes: ['test'],
                    comments: ['test'],
                },
            };
        });
        describe('when createPost is called', () => {
            it("should return a status of 404 if id doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.createPost)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was created', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({});
                post_1.default.create = jest.fn().mockReturnValue({});
                yield (0, authUser_controller_1.createPost)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when deletePost is called', () => {
            it("should return a status of 404 if postid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                post_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.deletePost)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                post_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.deletePost)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was deleted', () => __awaiter(void 0, void 0, void 0, function* () {
                post_1.default.findById = jest
                    .fn()
                    .mockReturnValue({ remove: jest.fn().mockReturnValue({}) });
                user_1.default.findById = jest.fn().mockReturnValue({
                    posts: [1, 2, 3, '123'],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.deletePost)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when likePost is called', () => {
            it("should return a status of 404 if postid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                post_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.likePost)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                post_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.likePost)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was liked', () => __awaiter(void 0, void 0, void 0, function* () {
                post_1.default.findById = jest.fn().mockReturnValue({
                    remove: jest.fn().mockReturnValue({}),
                    save: jest.fn().mockReturnValue({}),
                    likes: ['test'],
                });
                user_1.default.findById = jest.fn().mockReturnValue({
                    posts: [1, 2, 3],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.likePost)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return status 400 if it was already liked", () => __awaiter(void 0, void 0, void 0, function* () {
                post_1.default.findById = jest.fn().mockReturnValue({
                    remove: jest.fn().mockReturnValue({}),
                    save: jest.fn().mockReturnValue({}),
                    likes: ['test', 'test', '456'],
                });
                user_1.default.findById = jest.fn().mockReturnValue({
                    posts: [1, 2, 3, '123'],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.likePost)(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalled();
            }));
        });
    });
    describe('when user is changing dogspots', () => {
        beforeEach(() => {
            req = {
                body: {
                    userId: '456',
                    _id: '123',
                    name: 'test',
                    kind: 'test',
                    selectedFile: 'test',
                    rating: [5, 5, 5, 5, 5],
                    mapDirections: 'test',
                },
            };
        });
        describe('when createDogSpot is called', () => {
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.createDogSpot)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was created', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({});
                dogspot_1.default.create = jest.fn().mockReturnValue({});
                yield (0, authUser_controller_1.createDogSpot)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when rateDogspot is called', () => {
            it('should return a status of 404 if rating is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
                req.body.rating = null;
                yield (0, authUser_controller_1.rateDogspot)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if dogspotid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                dogspot_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.rateDogspot)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                dogspot_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.rateDogspot)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was rated', () => __awaiter(void 0, void 0, void 0, function* () {
                req.body.rating = 6;
                user_1.default.findById = jest.fn().mockReturnValue({});
                dogspot_1.default.findById = jest.fn().mockReturnValue({
                    rating: [5, 5, 5, 5, 5],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.rateDogspot)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when favDogspot is called', () => {
            it("should return a status of 404 if dogspotid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                dogspot_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.favDogspot)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                dogspot_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.favDogspot)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 400 if user.favorites already includes that dogspot id', () => __awaiter(void 0, void 0, void 0, function* () {
                req.body.dogspotId = '123';
                dogspot_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue({ favorites: ['123'] });
                yield (0, authUser_controller_1.favDogspot)(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
            }));
            it('should return a status of 200 if it was added to favs', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({
                    save: jest.fn().mockReturnValue({}),
                    favorites: ['565'],
                });
                dogspot_1.default.create = jest.fn().mockReturnValue({});
                yield (0, authUser_controller_1.favDogspot)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
    });
    describe('when user is changing groups', () => {
        beforeEach(() => {
            req = {
                params: {
                    id: '123',
                },
                body: {
                    userId: '456',
                    groupId: '123',
                    _id: '123',
                    name: 'test',
                    creator: 'test',
                    members: ['test'],
                    invitations: ['test'],
                },
            };
        });
        describe('when createGroup is called', () => {
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.createGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if it was created', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest
                    .fn()
                    .mockReturnValue({ groups: [], save: jest.fn().mockReturnValue({}) });
                group_1.default.create = jest.fn().mockReturnValue({ id: '123' });
                yield (0, authUser_controller_1.createGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when deleteGroup is called', () => {
            it("should return a status of 404 if groupId doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.deleteGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return status 200 if there is only one member in the group and its deleted', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({
                    members: ['123'],
                    remove: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.deleteGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return status 400 if more than 1 member is in the group', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({ members: ['123', '456'] });
                yield (0, authUser_controller_1.deleteGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when joinGroup is called', () => {
            it("should return a status of 404 if groupid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.joinGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.joinGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 400 if user is already in the group', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({ members: ['456'] });
                user_1.default.findById = jest.fn().mockReturnValue({});
                yield (0, authUser_controller_1.joinGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if user is added to the group', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({
                    members: ['123'],
                    save: jest.fn().mockReturnValue({}),
                });
                user_1.default.findById = jest
                    .fn()
                    .mockReturnValue({ groups: [], save: jest.fn().mockReturnValue({}) });
                yield (0, authUser_controller_1.joinGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when leaveGroup is called', () => {
            it("should return a status of 404 if groupid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.leaveGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.leaveGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 404 if user is not in the group', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({ members: ['123'] });
                user_1.default.findById = jest.fn().mockReturnValue({});
                yield (0, authUser_controller_1.leaveGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if user is removed from the group', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({
                    members: ['456'],
                    save: jest.fn().mockReturnValue({}),
                });
                user_1.default.findById = jest.fn().mockReturnValue({
                    groups: ['123'],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.leaveGroup)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when inviteUser is called', () => {
            it("should return a status of 404 if groupid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.inviteUser)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.inviteUser)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return status 400 if user is already in group', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({ members: ['456'] });
                user_1.default.findById = jest.fn().mockReturnValue({});
                yield (0, authUser_controller_1.inviteUser)(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if user is invited to the group', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({
                    invitations: ['456'],
                    members: [],
                    save: jest.fn().mockReturnValue({}),
                });
                user_1.default.findById = jest.fn().mockReturnValue({
                    groupRequests: ['123'],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.inviteUser)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when rejectInvite is called', () => {
            it("should return a status of 404 if groupid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.rejectInvite)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({});
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.rejectInvite)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if user is removed from the group', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({
                    invitations: ['456'],
                    members: [],
                    save: jest.fn().mockReturnValue({}),
                });
                user_1.default.findById = jest.fn().mockReturnValue({
                    groupRequests: ['123'],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.rejectInvite)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when getGroupById is called', () => {
            it("should return a status of 404 if groupid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.getGroupById)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if group is found', () => __awaiter(void 0, void 0, void 0, function* () {
                group_1.default.findById = jest.fn().mockReturnValue({});
                yield (0, authUser_controller_1.getGroupById)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
    });
    describe('when User is interacting with other users', () => {
        beforeEach(() => {
            req = {
                params: {
                    id: '123',
                },
                body: {
                    userId: '123',
                    friendId: '456',
                    _id: '123',
                    name: 'test',
                    email: 'test',
                    password: 'test',
                },
            };
        });
        describe('when getUserById is called', () => {
            it("should return a status of 404 if userid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.getUserById)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if user is found', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({});
                yield (0, authUser_controller_1.getUserById)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when sendFriendRequest is called', () => {
            it("should return a status of 404 if userid or friendid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.sendFriendRequest)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('hould return status 400 if friend is already befriended', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({
                    friendRequestSent: ['456'],
                    friendRequestReceived: ['123'],
                    friends: ['456'],
                });
                yield (0, authUser_controller_1.sendFriendRequest)(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if friend request is sent', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({
                    friendRequestsSent: [],
                    friendRequests: [],
                    friends: [],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.sendFriendRequest)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when acceptFriendRequest is called', () => {
            it("should return a status of 404 if userid or friendid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.acceptFriendRequest)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if friend is found', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({
                    friends: [],
                    friendRequestsSent: [],
                    friendRequests: [],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.acceptFriendRequest)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when rejectFriendRequest is called', () => {
            it("should return a status of 404 if userid or friendid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.rejectFriendRequest)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if friend is found', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({
                    friends: [],
                    friendRequestsSent: [],
                    friendRequests: [],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.rejectFriendRequest)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
        describe('when deleteFriend is called', () => {
            it("should return a status of 404 if userid or friendid doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue(null);
                yield (0, authUser_controller_1.deleteFriend)(req, res);
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalled();
            }));
            it('should return a status of 200 if friend is deleted', () => __awaiter(void 0, void 0, void 0, function* () {
                user_1.default.findById = jest.fn().mockReturnValue({
                    friends: [],
                    save: jest.fn().mockReturnValue({}),
                });
                yield (0, authUser_controller_1.deleteFriend)(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
            }));
        });
    });
});
