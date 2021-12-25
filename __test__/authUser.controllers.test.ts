import {
  updateUser,
  deleteUser,
  createPost,
  deletePost,
  likePost,
  createDogSpot,
  rateDogspot,
  favDogspot,
  tellLocation,
  createGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
  inviteUser,
  rejectInvite,
  getGroupById,
  getUserById,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
} from '../controllers/authUser.controller';
import DogSpot from '../models/dogspot';
import Post from '../models/post';
import Group from '../models/group';
import User from '../models/user';

jest.mock('../models/user');
jest.mock('../models/dogspot');
jest.mock('../models/post');
jest.mock('../models/group');
jest.mock('../models/shelter');

describe('given authUser controllers', () => {
  let req: any;
  const res: any = {};
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
      it("should return a status 404 if id doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was updated', async () => {
        User.findById = jest
          .fn()
          .mockReturnValue({ save: jest.fn().mockReturnValue({}) });
        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when deleteUser is called', () => {
      it("should return a status 404 if id doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was deleted', async () => {
        User.findById = jest
          .fn()
          .mockReturnValue({ remove: jest.fn().mockReturnValue({}) });
        await deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when tellLocation is called', () => {
      it("should return a status of 404 if id doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await tellLocation(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was updated', async () => {
        User.findById = jest.fn().mockReturnValue({
          save: jest.fn().mockReturnValue({}),
        });
        await tellLocation(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
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
      it("should return a status of 404 if id doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await createPost(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was created', async () => {
        User.findById = jest.fn().mockReturnValue({});
        Post.create = jest.fn().mockReturnValue({});
        await createPost(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when deletePost is called', () => {
      it("should return a status of 404 if postid doesn't exist", async () => {
        Post.findById = jest.fn().mockReturnValue(null);
        await deletePost(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if userid doesn't exist", async () => {
        Post.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue(null);
        await deletePost(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was deleted', async () => {
        Post.findById = jest
          .fn()
          .mockReturnValue({ remove: jest.fn().mockReturnValue({}) });
        User.findById = jest.fn().mockReturnValue({
          posts: [1, 2, 3, '123'],
          save: jest.fn().mockReturnValue({}),
        });
        await deletePost(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when likePost is called', () => {
      it("should return a status of 404 if postid doesn't exist", async () => {
        Post.findById = jest.fn().mockReturnValue(null);
        await likePost(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if userid doesn't exist", async () => {
        Post.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue(null);
        await likePost(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was liked', async () => {
        Post.findById = jest.fn().mockReturnValue({
          remove: jest.fn().mockReturnValue({}),
          save: jest.fn().mockReturnValue({}),
          likes: ['test'],
        });
        User.findById = jest.fn().mockReturnValue({
          posts: [1, 2, 3],
          save: jest.fn().mockReturnValue({}),
        });
        await likePost(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
      it ("should return status 400 if it was already liked", async () => {
        Post.findById = jest.fn().mockReturnValue({
          remove: jest.fn().mockReturnValue({}),
          save: jest.fn().mockReturnValue({}),
          likes: ['test', 'test', '456'],
        });
        User.findById = jest.fn().mockReturnValue({
          posts: [1, 2, 3, '123'],
          save: jest.fn().mockReturnValue({}),
        });
        await likePost(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });
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
      it("should return a status of 404 if userid doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await createDogSpot(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was created', async () => {
        User.findById = jest.fn().mockReturnValue({});
        DogSpot.create = jest.fn().mockReturnValue({});
        await createDogSpot(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when rateDogspot is called', () => {
      it('should return a status of 404 if rating is not provided', async () => {
        req.body.rating = null;
        await rateDogspot(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if dogspotid doesn't exist", async () => {
        DogSpot.findById = jest.fn().mockReturnValue(null);
        await rateDogspot(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if userid doesn't exist", async () => {
        DogSpot.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue(null);
        await rateDogspot(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was rated', async () => {
        req.body.rating = 6;
        User.findById = jest.fn().mockReturnValue({});
        DogSpot.findById = jest.fn().mockReturnValue({
          rating: [5, 5, 5, 5, 5],
          save: jest.fn().mockReturnValue({}),
        });
        await rateDogspot(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when favDogspot is called', () => {
      it("should return a status of 404 if dogspotid doesn't exist", async () => {
        DogSpot.findById = jest.fn().mockReturnValue(null);
        await favDogspot(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if userid doesn't exist", async () => {
        DogSpot.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue(null);
        await favDogspot(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 400 if user.favorites already includes that dogspot id', async () => {
        req.body.dogspotId = '123';
        DogSpot.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue({ favorites: ['123'] });
        await favDogspot(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
      });
      it('should return a status of 200 if it was added to favs', async () => {
        User.findById = jest.fn().mockReturnValue({
          save: jest.fn().mockReturnValue({}),
          favorites: ['565'],
        });
        DogSpot.create = jest.fn().mockReturnValue({});
        await favDogspot(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
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
      it("should return a status of 404 if userid doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await createGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if it was created', async () => {
        User.findById = jest
          .fn()
          .mockReturnValue({ groups: [], save: jest.fn().mockReturnValue({}) });
        Group.create = jest.fn().mockReturnValue({ id: '123' });
        await createGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when deleteGroup is called', () => {
      it("should return a status of 404 if groupId doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue(null);
        await deleteGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return status 200 if there is only one member in the group and its deleted', async () => {
        Group.findById = jest.fn().mockReturnValue({
          members: ['123'],
          remove: jest.fn().mockReturnValue({}),
        });
        await deleteGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return status 400 if more than 1 member is in the group', async () => {
        Group.findById = jest.fn().mockReturnValue({ members: ['123', '456'] });
        await deleteGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when joinGroup is called', () => {
      it("should return a status of 404 if groupid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue(null);
        await joinGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if userid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue(null);
        await joinGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 400 if user is already in the group', async () => {
        Group.findById = jest.fn().mockReturnValue({ members: ['456'] });
        User.findById = jest.fn().mockReturnValue({});
        await joinGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if user is added to the group', async () => {
        Group.findById = jest.fn().mockReturnValue({
          members: ['123'],
          save: jest.fn().mockReturnValue({}),
        });
        User.findById = jest
          .fn()
          .mockReturnValue({ groups: [], save: jest.fn().mockReturnValue({}) });
        await joinGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when leaveGroup is called', () => {
      it("should return a status of 404 if groupid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue(null);
        await leaveGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if userid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue(null);
        await leaveGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 404 if user is not in the group', async () => {
        Group.findById = jest.fn().mockReturnValue({ members: ['123'] });
        User.findById = jest.fn().mockReturnValue({});
        await leaveGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if user is removed from the group', async () => {
        Group.findById = jest.fn().mockReturnValue({
          members: ['456'],
          save: jest.fn().mockReturnValue({}),
        });
        User.findById = jest.fn().mockReturnValue({
          groups: ['123'],
          save: jest.fn().mockReturnValue({}),
        });
        await leaveGroup(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when inviteUser is called', () => {
      it("should return a status of 404 if groupid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue(null);
        await inviteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if userid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue(null);
        await inviteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return status 400 if user is already in group', async () => {
        Group.findById = jest.fn().mockReturnValue({ members: ['456'] });
        User.findById = jest.fn().mockReturnValue({});
        await inviteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if user is invited to the group', async () => {
        Group.findById = jest.fn().mockReturnValue({
          invitations: ['456'],
          members: [],
          save: jest.fn().mockReturnValue({}),
        });
        User.findById = jest.fn().mockReturnValue({
          groupRequests: ['123'],
          save: jest.fn().mockReturnValue({}),
        });
        await inviteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when rejectInvite is called', () => {
      it("should return a status of 404 if groupid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue(null);
        await rejectInvite(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it("should return a status of 404 if userid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue({});
        User.findById = jest.fn().mockReturnValue(null);
        await rejectInvite(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if user is removed from the group', async () => {
        Group.findById = jest.fn().mockReturnValue({
          invitations: ['456'],
          members: [],
          save: jest.fn().mockReturnValue({}),
        });
        User.findById = jest.fn().mockReturnValue({
          groupRequests: ['123'],
          save: jest.fn().mockReturnValue({}),
        });
        await rejectInvite(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when getGroupById is called', () => {
      it("should return a status of 404 if groupid doesn't exist", async () => {
        Group.findById = jest.fn().mockReturnValue(null);
        await getGroupById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if group is found', async () => {
        Group.findById = jest.fn().mockReturnValue({});
        await getGroupById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
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
      it("should return a status of 404 if userid doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await getUserById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if user is found', async () => {
        User.findById = jest.fn().mockReturnValue({});
        await getUserById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when sendFriendRequest is called', () => {
      it("should return a status of 404 if userid or friendid doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await sendFriendRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('hould return status 400 if friend is already befriended', async () => {
        User.findById = jest.fn().mockReturnValue({
          friendRequestSent: ['456'],
          friendRequestReceived: ['123'],
          friends: ['456'],
        });
        await sendFriendRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if friend request is sent', async () => {
        User.findById = jest.fn().mockReturnValue({
          friendRequestsSent: [],
          friendRequests: [],
          friends: [],
          save: jest.fn().mockReturnValue({}),
        });
        await sendFriendRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when acceptFriendRequest is called', () => {
      it("should return a status of 404 if userid or friendid doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await acceptFriendRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if friend is found', async () => {
        User.findById = jest.fn().mockReturnValue({
          friends: [],
          friendRequestsSent: [],
          friendRequests: [],
          save: jest.fn().mockReturnValue({}),
        });
        await acceptFriendRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when rejectFriendRequest is called', () => {
      it("should return a status of 404 if userid or friendid doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await rejectFriendRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if friend is found', async () => {
        User.findById = jest.fn().mockReturnValue({
          friends: [],
          friendRequestsSent: [],
          friendRequests: [],
          save: jest.fn().mockReturnValue({}),
        });
        await rejectFriendRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('when deleteFriend is called', () => {
      it("should return a status of 404 if userid or friendid doesn't exist", async () => {
        User.findById = jest.fn().mockReturnValue(null);
        await deleteFriend(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
      it('should return a status of 200 if friend is deleted', async () => {
        User.findById = jest.fn().mockReturnValue({
          friends: [],
          save: jest.fn().mockReturnValue({}),
        });
        await deleteFriend(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });
    });
  });
});
