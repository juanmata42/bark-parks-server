import { Request, Response } from 'express';
import DogSpot from '../models/dogspot';
import Shelter from '../models/shelter';

export const getDogspots = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dogspots = await DogSpot.find();
  return res.json(dogspots);
};

export const getShelters = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const shelters = await Shelter.find();
  return res.json(shelters);
};

export const postShelter = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.link ||
    !req.body.pnumber ||
    !req.body.name ||
    !req.body.country ||
    !req.body.region
  ) {
    return res.status(400).json({ msg: 'Missing data' });
  }

  const shelter = await Shelter.findOne({ link: req.body.link });
  if (shelter) {
    return res.status(400).json({ msg: 'The Shelter already exists' });
  }

  const newShelter = await Shelter.create(req.body);
  return res.status(201).json(newShelter);
};
