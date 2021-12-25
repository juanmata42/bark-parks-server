import { Request, Response } from 'express';
import DogSpot from '../models/dogspot';
import Post from '../models/post';
import Group from '../models/group';
import User from '../models/user';

// when user wants to change something in his profile
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.body;
  const {
    friends,
    notifications,
    friendRequests,
    friendRequestsSent,
    bark,
    location,
    description,
    name,
    profilePhoto,
  } = req.body;
  const user = await User.findById(userId);
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

  await user.save();
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
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  await user.remove();
  return res.status(200).json({
    message: 'User deleted',
  });
};
export const tellLocation = async (req: Request, res: Response) => {
  const { userId, location } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  user.location = location;
  await user.save();
  return res.status(200).json({
    message: 'Location sent',
  });
};

// when user wants to change something about posts
export const getPosts = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  const { friends } = user;
  friends.push(userId);
  const friendPosts = await Post.find({
    creator: { $in: friends },
  });
  return res.status(200).json({
    friendPosts,
  });
};

export const createPost = async (req: Request, res: Response) => {
  const { userId, message, tags, likes, comments, createdAt, selectedFile } =
    req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  const creator = userId;
  const post = await Post.create({
    message,
    creator,
    tags,
    likes,
    comments,
    createdAt,
    selectedFile,
  });
  user.posts.push(post);
  await user.save();
  return res.status(200).json({
    message: 'Post created',
    post,
  });
};

export const deletePost = async (req: Request, res: Response) => {
  const { postid, userid } = req.params;
  const post = await Post.findById(postid);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }
  const user = await User.findById(userid);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  await post.remove();
  user.posts.splice(
    user.posts.findIndex((item: any) => item.id === postid),
    1
  );
  await user.save();
  return res.status(200).json({
    message: 'Post deleted',
  });
};
/* this will not be used on V1 */
export const likePost = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
    await post.save();
    return res.status(200).json({
      message: 'Post liked',
    });
  }

  return res.status(400).json({
    message: 'Post already liked',
  });
};

// when user interacts with dogspots
export const createDogSpot = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { name, kind, selectedFile, rating, mapDirections } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  const dogspot = await DogSpot.create({
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
};

export const rateDogspot = async (req: Request, res: Response) => {
  if (!req.body.rating) {
    return res.status(404).json({
      message: 'Rating not provided',
    });
  }
  const { dogspotId, rating } = req.body;
  const dogspot = await DogSpot.findById(dogspotId);
  if (!dogspot) {
    return res.status(404).json({
      message: 'Dogspot not found',
    });
  }
  
  dogspot.rating.push(rating);
  await dogspot.save();
  return res.status(200).json({
    message: 'Dogspot rated',
  });
};
export const favDogspot = async (req: Request, res: Response) => {
  const { dogspotId, userId } = req.body;
  const dogspot = await DogSpot.findById(dogspotId);
  if (!dogspot) {
    return res.status(404).json({
      message: 'Dogspot not found',
    });
  }
  const user = await User.findById(userId);
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
  await user.save();
  return res.status(200).json({
    message: 'Dogspot faved',
  });
};

// when user interacts with groups
export const getGroups = async (req: Request, res: Response) => {
  const groups = await Group.find();
  return res.status(200).json(groups);
};

export const createGroup = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { name, creator, description } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  const members = [userId];
  const group = await Group.create({
    name,
    creator,
    members,
    description,
  });
  user.groups.push(group.id);
  await user.save();
  await group.save();
  return res.status(200).json({
    message: 'Group created',
  });
};
// noteqwerty: one cannot delete a group unless its the last one left
export const deleteGroup = async (req: Request, res: Response) => {
  const { groupId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({
      message: 'Group not found',
    });
  }
  if (group.members.length === 1) {
    await group.remove();
    return res.status(200).json({
      message: 'Group deleted',
    });
  }
  return res.status(400).json({
    message: 'Group with more than one member cannot be deleted',
  });
};
export const joinGroup = async (req: Request, res: Response) => {
  const { groupId, userId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({
      message: 'Group not found',
    });
  }
  const user = await User.findById(userId);
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
  await group.save();
  user.groups.push(groupId);
  await user.save();
  return res.status(200).json({
    message: 'Group joined',
  });
};
export const leaveGroup = async (req: Request, res: Response) => {
  const { groupId, userId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({
      message: 'Group not found',
    });
  }
  const user = await User.findById(userId);
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
  await group.save();
  user.groups = user.groups.filter((groupfilt) => groupfilt !== groupId);
  await user.save();
  return res.status(200).json({
    message: 'Group left',
  });
};
export const inviteUser = async (req: Request, res: Response) => {
  const { groupId, userId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({
      message: 'Group not found',
    });
  }
  const user = await User.findById(userId);
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
  await group.save();
  user.groupRequests.push(groupId);
  await user.save();
  return res.status(200).json({
    message: 'User invited',
  });
};

export const rejectInvite = async (req: Request, res: Response) => {
  const { groupId, userId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({
      message: 'Group not found',
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  group.invitations = group.invitations.filter((invite) => invite !== userId);
  await group.save();
  user.groupRequests = user.groupRequests.filter(
    (request) => request !== groupId
  );
  await user.save();
  return res.status(200).json({
    message: 'Invite rejected',
  });
};
export const getGroupById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = await Group.findById(id);
  if (!group) {
    return res.status(404).json({
      message: 'Group not found',
    });
  }
  return res.status(200).json({
    message: 'Group found',
    group,
  });
};
export const editMeetups = async (req: Request, res: Response) => {
  const { groupId, userId, meetup } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({
      message: 'Group not found',
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  group.meetups.push(meetup);
  await group.save();
  return res.status(200).json({
    message: 'Meetups changed',
    group,
  });
};
// when user interacts with users
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  return res.status(200).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  return res.status(200).json(users);
};
export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  const friend = await User.findById(friendId);
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
  await user.save();
  friend.friends.push(userId);
  await friend.save();
  return res.status(200).json({
    message: 'Friend added',
  });
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  const friend = await User.findById(friendId);
  const user = await User.findById(userId);
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
  await user.save();
  friend.friendRequests.push(userId);
  await friend.save();
  return res.status(200).json({
    message: 'Friend request sent',
  });
};
export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  const friend = await User.findById(friendId);
  const user = await User.findById(userId);
  if (!user || !friend) {
    return res.status(404).json({
      message: 'User or friend not found',
    });
  }
  user.friends.push(friendId);
  friend.friends.push(userId);
  user.friendRequestsSent = user.friendRequestsSent.filter(
    (request) => request !== friendId
  );
  friend.friendRequests = friend.friendRequests.filter(
    (request) => request !== userId
  );
  await user.save();
  await friend.save();
  return res.status(200).json({
    message: 'Friend request accepted',
  });
};
export const rejectFriendRequest = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  const friend = await User.findById(friendId);
  const user = await User.findById(userId);
  if (!user || !friend) {
    return res.status(404).json({
      message: 'User or friend not found',
    });
  }
  user.friendRequests = user.friendRequests.filter(
    (request) => request !== friendId
  );
  friend.friendRequests = friend.friendRequests.filter(
    (request) => request !== userId
  );
  await user.save();
  await friend.save();
  return res.status(200).json({
    message: 'Friend request rejected',
  });
};
export const deleteFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  const friend = await User.findById(friendId);
  const user = await User.findById(userId);
  if (!user || !friend) {
    return res.status(404).json({
      message: 'User or friend not found',
    });
  }
  user.friends = user.friends.filter((newfriend) => newfriend !== friendId);
  friend.friends = friend.friends.filter((newfriend) => newfriend !== userId);
  await user.save();
  await friend.save();
  return res.status(200).json({
    message: 'Friend deleted',
  });
};
