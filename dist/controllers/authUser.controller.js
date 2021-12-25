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
exports.deleteFriend = exports.rejectFriendRequest = exports.acceptFriendRequest = exports.sendFriendRequest = exports.addFriend = exports.getUsers = exports.getUserById = exports.editMeetups = exports.getGroupById = exports.rejectInvite = exports.inviteUser = exports.leaveGroup = exports.joinGroup = exports.deleteGroup = exports.createGroup = exports.getGroups = exports.favDogspot = exports.rateDogspot = exports.createDogSpot = exports.likePost = exports.deletePost = exports.createPost = exports.getPosts = exports.tellLocation = exports.deleteUser = exports.updateUser = void 0;
const dogspot_1 = __importDefault(require("../models/dogspot"));
const post_1 = __importDefault(require("../models/post"));
const group_1 = __importDefault(require("../models/group"));
const user_1 = __importDefault(require("../models/user"));
// when user wants to change something in his profile
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const { friends, notifications, friendRequests, friendRequestsSent, bark, location, description, name, profilePhoto, } = req.body;
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    user.friends = friends;
    user.notifications = notifications;
    user.friendRequests = friendRequests;
    user.friendRequestsSent = friendRequestsSent;
    user.bark = bark;
    user.location = location;
    user.description = description;
    user.name = name;
    user.profilePhoto = profilePhoto;
    yield user.save();
    return res.status(200).json({
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
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findById(id);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    yield user.remove();
    return res.status(200).json({
        message: 'User deleted',
    });
});
exports.deleteUser = deleteUser;
const tellLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, location } = req.body;
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    user.location = location;
    yield user.save();
    return res.status(200).json({
        message: 'Location sent',
    });
});
exports.tellLocation = tellLocation;
// when user wants to change something about posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    const { friends } = user;
    friends.push(userId);
    const friendPosts = yield post_1.default.find({
        creator: { $in: friends },
    });
    return res.status(200).json({
        friendPosts,
    });
});
exports.getPosts = getPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, message, tags, likes, comments, createdAt, selectedFile } = req.body;
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    const creator = userId;
    const post = yield post_1.default.create({
        message,
        creator,
        tags,
        likes,
        comments,
        createdAt,
        selectedFile,
    });
    user.posts.push(post);
    yield user.save();
    return res.status(200).json({
        message: 'Post created',
        post,
    });
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postid, userid } = req.params;
    const post = yield post_1.default.findById(postid);
    if (!post) {
        return res.status(404).json({
            message: 'Post not found',
        });
    }
    const user = yield user_1.default.findById(userid);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    yield post.remove();
    user.posts.splice(user.posts.findIndex((item) => item.id === postid), 1);
    yield user.save();
    return res.status(200).json({
        message: 'Post deleted',
    });
});
exports.deletePost = deletePost;
/* this will not be used on V1 */
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.body;
    const post = yield post_1.default.findById(postId);
    if (!post) {
        return res.status(404).json({
            message: 'Post not found',
        });
    }
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    if (!post.likes.includes(userId)) {
        post.likes.push(userId);
        yield post.save();
        return res.status(200).json({
            message: 'Post liked',
        });
    }
    return res.status(400).json({
        message: 'Post already liked',
    });
});
exports.likePost = likePost;
// when user interacts with dogspots
const createDogSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const { name, kind, selectedFile, rating, mapDirections } = req.body;
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    const dogspot = yield dogspot_1.default.create({
        name,
        kind,
        selectedFile,
        rating,
        mapDirections,
    });
    return res.status(200).json({
        message: 'Dogspot created',
        dogspot,
    });
});
exports.createDogSpot = createDogSpot;
const rateDogspot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.rating) {
        return res.status(404).json({
            message: 'Rating not provided',
        });
    }
    const { dogspotId, rating } = req.body;
    const dogspot = yield dogspot_1.default.findById(dogspotId);
    if (!dogspot) {
        return res.status(404).json({
            message: 'Dogspot not found',
        });
    }
    dogspot.rating.push(rating);
    yield dogspot.save();
    return res.status(200).json({
        message: 'Dogspot rated',
    });
});
exports.rateDogspot = rateDogspot;
const favDogspot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dogspotId, userId } = req.body;
    const dogspot = yield dogspot_1.default.findById(dogspotId);
    if (!dogspot) {
        return res.status(404).json({
            message: 'Dogspot not found',
        });
    }
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    if (user.favorites.includes(dogspotId)) {
        return res.status(400).json({
            message: 'Dogspot already in favorites',
        });
    }
    user.favorites.push(dogspotId);
    yield user.save();
    return res.status(200).json({
        message: 'Dogspot faved',
    });
});
exports.favDogspot = favDogspot;
// when user interacts with groups
const getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield group_1.default.find();
    return res.status(200).json(groups);
});
exports.getGroups = getGroups;
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const { name, creator, description } = req.body;
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    const members = [userId];
    const group = yield group_1.default.create({
        name,
        creator,
        members,
        description,
    });
    user.groups.push(group.id);
    yield user.save();
    yield group.save();
    return res.status(200).json({
        message: 'Group created',
    });
});
exports.createGroup = createGroup;
// noteqwerty: one cannot delete a group unless its the last one left
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.body;
    const group = yield group_1.default.findById(groupId);
    if (!group) {
        return res.status(404).json({
            message: 'Group not found',
        });
    }
    if (group.members.length === 1) {
        yield group.remove();
        return res.status(200).json({
            message: 'Group deleted',
        });
    }
    return res.status(400).json({
        message: 'Group with more than one member cannot be deleted',
    });
});
exports.deleteGroup = deleteGroup;
const joinGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, userId } = req.body;
    const group = yield group_1.default.findById(groupId);
    if (!group) {
        return res.status(404).json({
            message: 'Group not found',
        });
    }
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    if (group.members.includes(userId)) {
        return res.status(400).json({
            message: 'User already in group',
        });
    }
    group.members.push(userId);
    yield group.save();
    user.groups.push(groupId);
    yield user.save();
    return res.status(200).json({
        message: 'Group joined',
    });
});
exports.joinGroup = joinGroup;
const leaveGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, userId } = req.body;
    const group = yield group_1.default.findById(groupId);
    if (!group) {
        return res.status(404).json({
            message: 'Group not found',
        });
    }
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    if (!group.members.includes(userId)) {
        return res.status(404).json({
            message: 'User not in group',
        });
    }
    group.members = group.members.filter((member) => member !== userId);
    yield group.save();
    user.groups = user.groups.filter((groupfilt) => groupfilt !== groupId);
    yield user.save();
    return res.status(200).json({
        message: 'Group left',
    });
});
exports.leaveGroup = leaveGroup;
const inviteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, userId } = req.body;
    const group = yield group_1.default.findById(groupId);
    if (!group) {
        return res.status(404).json({
            message: 'Group not found',
        });
    }
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    if (group.members.includes(userId)) {
        return res.status(400).json({
            message: 'User already in group',
        });
    }
    group.invitations.push(userId);
    yield group.save();
    user.groupRequests.push(groupId);
    yield user.save();
    return res.status(200).json({
        message: 'User invited',
    });
});
exports.inviteUser = inviteUser;
const rejectInvite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, userId } = req.body;
    const group = yield group_1.default.findById(groupId);
    if (!group) {
        return res.status(404).json({
            message: 'Group not found',
        });
    }
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    group.invitations = group.invitations.filter((invite) => invite !== userId);
    yield group.save();
    user.groupRequests = user.groupRequests.filter((request) => request !== groupId);
    yield user.save();
    return res.status(200).json({
        message: 'Invite rejected',
    });
});
exports.rejectInvite = rejectInvite;
const getGroupById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const group = yield group_1.default.findById(id);
    if (!group) {
        return res.status(404).json({
            message: 'Group not found',
        });
    }
    return res.status(200).json({
        message: 'Group found',
        group,
    });
});
exports.getGroupById = getGroupById;
const editMeetups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, userId, meetup } = req.body;
    const group = yield group_1.default.findById(groupId);
    if (!group) {
        return res.status(404).json({
            message: 'Group not found',
        });
    }
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    group.meetups.push(meetup);
    yield group.save();
    return res.status(200).json({
        message: 'Meetups changed',
        group,
    });
});
exports.editMeetups = editMeetups;
// when user interacts with users
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findById(id);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    return res.status(200).json(user);
});
exports.getUserById = getUserById;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    return res.status(200).json(users);
});
exports.getUsers = getUsers;
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.body;
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    const friend = yield user_1.default.findById(friendId);
    if (!friend) {
        return res.status(404).json({
            message: 'Friend not found',
        });
    }
    if (user.friends.includes(friendId)) {
        return res.status(400).json({
            message: 'Friend already added',
        });
    }
    user.friends.push(friendId);
    yield user.save();
    friend.friends.push(userId);
    yield friend.save();
    return res.status(200).json({
        message: 'Friend added',
    });
});
exports.addFriend = addFriend;
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.body;
    const friend = yield user_1.default.findById(friendId);
    const user = yield user_1.default.findById(userId);
    if (!user || !friend) {
        return res.status(404).json({
            message: 'User or friend not found',
        });
    }
    if (user.friends.includes(friendId)) {
        return res.status(400).json({
            message: 'User already in friends list',
        });
    }
    user.friendRequestsSent.push(friendId);
    yield user.save();
    friend.friendRequests.push(userId);
    yield friend.save();
    return res.status(200).json({
        message: 'Friend request sent',
    });
});
exports.sendFriendRequest = sendFriendRequest;
const acceptFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.body;
    const friend = yield user_1.default.findById(friendId);
    const user = yield user_1.default.findById(userId);
    if (!user || !friend) {
        return res.status(404).json({
            message: 'User or friend not found',
        });
    }
    user.friends.push(friendId);
    friend.friends.push(userId);
    user.friendRequestsSent = user.friendRequestsSent.filter((request) => request !== friendId);
    friend.friendRequests = friend.friendRequests.filter((request) => request !== userId);
    yield user.save();
    yield friend.save();
    return res.status(200).json({
        message: 'Friend request accepted',
    });
});
exports.acceptFriendRequest = acceptFriendRequest;
const rejectFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.body;
    const friend = yield user_1.default.findById(friendId);
    const user = yield user_1.default.findById(userId);
    if (!user || !friend) {
        return res.status(404).json({
            message: 'User or friend not found',
        });
    }
    user.friendRequests = user.friendRequests.filter((request) => request !== friendId);
    friend.friendRequests = friend.friendRequests.filter((request) => request !== userId);
    yield user.save();
    yield friend.save();
    return res.status(200).json({
        message: 'Friend request rejected',
    });
});
exports.rejectFriendRequest = rejectFriendRequest;
const deleteFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.body;
    const friend = yield user_1.default.findById(friendId);
    const user = yield user_1.default.findById(userId);
    if (!user || !friend) {
        return res.status(404).json({
            message: 'User or friend not found',
        });
    }
    user.friends = user.friends.filter((newfriend) => newfriend !== friendId);
    friend.friends = friend.friends.filter((newfriend) => newfriend !== userId);
    yield user.save();
    yield friend.save();
    return res.status(200).json({
        message: 'Friend deleted',
    });
});
exports.deleteFriend = deleteFriend;
