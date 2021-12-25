import { Router } from 'express';
import passport from 'passport';

import {
  updateUser,
  deleteUser,
  getPosts,
  createPost,
  deletePost,
  /* this will not be used on V1 likePost, */
  createDogSpot,
  rateDogspot,
  favDogspot,
  tellLocation,
  getGroups,
  createGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
  inviteUser,
  rejectInvite,
  getGroupById,
  editMeetups,
  getUserById,
  addFriend,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
  getUsers,
} from '../controllers/authUser.controller';

const router = Router();
// when user wants to change something in his profile
router.patch(
  '/user/update',
  passport.authenticate('jwt', { session: false }),
  updateUser
);
router.delete(
  '/user/delete/:id',
  passport.authenticate('jwt', { session: false }),
  deleteUser
);
// when user wants to change something about posts
router.get(
  '/user/post/all',
  passport.authenticate('jwt', { session: false }),
  getPosts
);
router.post(
  '/user/post/create',
  passport.authenticate('jwt', { session: false }),
  createPost
);
router.delete(
  '/user/post/delete/:postid/:userid',
  passport.authenticate('jwt', { session: false }),
  deletePost
);
/* /* this will not be used on V1
router.patch(
  '/user/post/like',
  passport.authenticate('jwt', { session: false }),
  likePost
); */

// when user interacts with dogspots
router.post(
  '/user/dogspot/create',
  passport.authenticate('jwt', { session: false }),
  createDogSpot
);
router.patch('/user/dogspot/rate', rateDogspot);
router.patch(
  '/user/dogspot/fav',
  passport.authenticate('jwt', { session: false }),
  favDogspot
);
router.patch(
  '/user/dogspot/location',
  passport.authenticate('jwt', { session: false }),
  tellLocation
);
// when user interacts with groups
router.get('/groups', getGroups);
router.post(
  '/user/group/create',
  passport.authenticate('jwt', { session: false }),
  createGroup
);
router.delete(
  '/user/group/delete',
  passport.authenticate('jwt', { session: false }),
  deleteGroup
);
router.patch(
  '/user/group/join',
  passport.authenticate('jwt', { session: false }),
  joinGroup
);
router.patch(
  '/user/group/leave',
  passport.authenticate('jwt', { session: false }),
  leaveGroup
);
router.patch(
  '/user/group/invite',
  passport.authenticate('jwt', { session: false }),
  inviteUser
);
router.patch(
  '/user/group/reject',
  passport.authenticate('jwt', { session: false }),
  rejectInvite
);
router.patch(
  '/user/group/meetups',
  passport.authenticate('jwt', { session: false }),
  editMeetups
);
router.get(
  '/group/:id',
  passport.authenticate('jwt', { session: false }),
  getGroupById
);
// when user interacts with users
router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  getUserById
);
router.get('/users', getUsers);
router.patch(
  '/user/addfriend',
  passport.authenticate('jwt', { session: false }),
  addFriend
);
router.patch(
  '/user/sendfriendrequest',
  passport.authenticate('jwt', { session: false }),
  sendFriendRequest
);
router.patch(
  '/user/acceptFfiendrequest',
  passport.authenticate('jwt', { session: false }),
  acceptFriendRequest
);
router.patch(
  '/user/rejectfriendrequest',
  passport.authenticate('jwt', { session: false }),
  rejectFriendRequest
);
router.patch(
  '/user/deletefriend',
  passport.authenticate('jwt', { session: false }),
  deleteFriend
);
export default router;
