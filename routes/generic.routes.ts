import { Router } from 'express';
import {
  getDogspots,
  getShelters,
  postShelter,
} from '../controllers/generic.controller';

const router = Router();

router.get('/dogspots', getDogspots);
router.get('/shelters', getShelters);
router.post('/shelters/postshelter', postShelter);
export default router;
