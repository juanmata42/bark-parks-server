import {
  getDogspots,
  getShelters,
  postShelter,
} from '../controllers/generic.controller';

import DogSpot from '../models/dogspot';
import Shelter from '../models/shelter';

jest.mock('../models/dogspot');
jest.mock('../models/shelter');
describe('given the shelters controller', () => {
  let req: any;
  const res: any = {};
  beforeEach(() => {
    req = {
      body: {
        _id: '123',
        name: 'test',
        link: 'test',
        pnumber: 'test',
        country: 'test',
        region: 'test',
      },
    };
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
  });
  describe('when getShelters is called', () => {
    beforeEach(() => {
      Shelter.find = jest.fn().mockReturnValue([]);
    });
    it('should return the shelters', async () => {
      await getShelters(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('when postShelter is called', () => {
    beforeEach(() => {
      Shelter.create = jest.fn().mockReturnValue({});
    });
    it('shoud return 400 because it is missing a parameter', async () => {
      req.body.name = undefined;
      await postShelter(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
    it('should return 400 because it already exists', async () => {
      req.body = {
        link: 'test',
        name: 'test',
        pnumber: 'test',
        country: 'test',
        region: 'test',
      };
      Shelter.findOne = jest.fn().mockReturnValue({});
      await postShelter(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
    it('else should return 201 and have created a new shelter', async () => {
      req.body = {
        link: 'test',
        name: 'test',
        pnumber: 'test',
        country: 'test',
        region: 'test',
      };
      Shelter.findOne = jest.fn().mockReturnValue(null);
      Shelter.create = jest
        .fn()
        .mockReturnValue({
          link: 'test',
          name: 'test',
          pnumber: 'test',
          country: 'test',
          region: 'test',
        });
      await postShelter(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
describe('given the dogspots controller', () => {
  let req: any;
  let res: any;
  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn().mockReturnValue(res),
      json: jest.fn().mockReturnValue(res),
      status: jest.fn().mockReturnValue(res),
    };
  });
  describe('when getDogspots is called', () => {
    beforeEach(() => {
      DogSpot.find = jest.fn().mockReturnValue([]);
    });
    it('should return the dogspots', async () => {
      await getDogspots(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
