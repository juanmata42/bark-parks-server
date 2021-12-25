import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import config from '../config/config';

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400,
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: 'Please. Send your email and password' });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: 'The User already Exists' });
  }

  const newUser = await User.create(req.body);
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
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: 'Please. Send your email and password' });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: 'The User does not exists' });
  }

  const isMatch = await user.comparePassword(req.body.password);
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
};
