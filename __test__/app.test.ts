/* eslint-disable spaced-comment */
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

/* import {
  initialDogspots,
  initialUsers,
  initialShelters,
  initialPosts,
  initialGroups,
} from './mocks'; */

const api = supertest(app);

/* this is listed here and it can be used in other tests 
beforeEach(async () => {
  await DogSpot.deleteMany({});
  await Post.deleteMany({});
  await Group.deleteMany({});
  await User.deleteMany({});
  await Shelter.deleteMany({});
  await DogSpot.insertMany(initialDogspots);
  await Post.insertMany(initialPosts);
  await Group.insertMany(initialGroups);
  await User.insertMany(initialUsers);
  await Shelter.insertMany(initialShelters);
}); 
afterAll(() => {
  mongoose.connection.close();
  app.listen(app.get('port')).close();
});*/
afterAll(() => {
  mongoose.connection.close();
  app.listen(app.get('port')).close();
});
describe('app', () => {
  describe('GET /', () => {
    test('should return 200', async () => {
      await api.get('/').expect(200);
    });
  });
});
