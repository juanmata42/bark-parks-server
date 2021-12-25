import { signIn, signUp } from '../controllers/user.controller';
import User from '../models/user';

jest.mock('../models/user');
describe('given the user controller', () => {
  let req: any;
  const res: any = {};
  beforeEach(() => {
    req = {
      body: {
        _id: '123',
        name: 'test',
        email: 'test',
        password: 'test',
      },
    };
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
  });
  describe('when signup', () => {
    it('should return 400 if anything is missing', async () => {
      req.body = {};
      await signUp(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it('should return 400 if user already exists', async () => {
      User.findOne = jest.fn().mockReturnValue({});
      await signUp(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it('should return 201 if user is created', async () => {
      User.findOne = jest.fn().mockReturnValue(null);
      User.create = jest.fn().mockReturnValue({});
      await signUp(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
  describe('when signin', () => {
    it('should return 400 if anything is missing', async () => {
      req.body = {};
      await signIn(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it('should return 400 if user does not exist', async () => {
      User.findOne = jest.fn().mockReturnValue(null);
      await signIn(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    // this test and the next can't be done because i don't know how to mock the .comparepassword method for user
    it('should return 200 if user is found', async () => {
        
      User.findOne = jest
        .fn()
        .mockReturnValue({ email: 'test', password: 'test', comparePassword: jest.fn().mockReturnValue(true) });
      
      await signIn(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should return 400 if password is incorrect', async () => {
      User.findOne = jest
        .fn()
        .mockReturnValue({
          email: 'test',
          password: 'test',
          comparePassword: jest.fn().mockReturnValue(false),
        });

      await signIn(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
