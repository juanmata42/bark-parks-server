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
/* eslint-disable spaced-comment */
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
/* import {
  initialDogspots,
  initialUsers,
  initialShelters,
  initialPosts,
  initialGroups,
} from './mocks'; */
const api = (0, supertest_1.default)(app_1.default);
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
    mongoose_1.default.connection.close();
    app_1.default.listen(app_1.default.get('port')).close();
});
describe('app', () => {
    describe('GET /', () => {
        test('should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
            yield api.get('/').expect(200);
        }));
    });
});
