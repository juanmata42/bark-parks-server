"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authUser_controller_1 = require("../controllers/authUser.controller");
const router = (0, express_1.Router)();
// when user wants to change something in his profile
router.patch('/user/update', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.updateUser);
router.delete('/user/delete/:id', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.deleteUser);
// when user wants to change something about posts
router.get('/user/post/all', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.getPosts);
router.post('/user/post/create', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.createPost);
router.delete('/user/post/delete/:postid/:userid', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.deletePost);
/* /* this will not be used on V1
router.patch(
  '/user/post/like',
  passport.authenticate('jwt', { session: false }),
  likePost
); */
// when user interacts with dogspots
router.post('/user/dogspot/create', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.createDogSpot);
router.patch('/user/dogspot/rate', authUser_controller_1.rateDogspot);
router.patch('/user/dogspot/fav', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.favDogspot);
router.patch('/user/dogspot/location', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.tellLocation);
// when user interacts with groups
router.get('/groups', authUser_controller_1.getGroups);
router.post('/user/group/create', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.createGroup);
router.delete('/user/group/delete', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.deleteGroup);
router.patch('/user/group/join', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.joinGroup);
router.patch('/user/group/leave', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.leaveGroup);
router.patch('/user/group/invite', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.inviteUser);
router.patch('/user/group/reject', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.rejectInvite);
router.patch('/user/group/meetups', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.editMeetups);
router.get('/group/:id', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.getGroupById);
// when user interacts with users
router.get('/user/:id', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.getUserById);
router.get('/users', authUser_controller_1.getUsers);
router.patch('/user/addfriend', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.addFriend);
router.patch('/user/sendfriendrequest', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.sendFriendRequest);
router.patch('/user/acceptFfiendrequest', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.acceptFriendRequest);
router.patch('/user/rejectfriendrequest', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.rejectFriendRequest);
router.patch('/user/deletefriend', passport_1.default.authenticate('jwt', { session: false }), authUser_controller_1.deleteFriend);
exports.default = router;
