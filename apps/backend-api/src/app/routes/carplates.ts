import { Router } from 'express';

const { asyncErrorHandler } = require('../middleware');

const router = Router();

import {
  create,
  update,
  decomm,
  findOne,
  findAll,
} from '../controllers/carplateController';

router.post('/', asyncErrorHandler(create));
router.get('/', findAll);
router.get('/:id', asyncErrorHandler(findOne));
router.put('/:id', asyncErrorHandler(update));
router.delete('/:id', asyncErrorHandler(decomm));

export default router;
