import express from 'express';
const router = express.Router();

const { asyncErrorHandler } = require('../middleware');

const {
  create,
  update,
  decomm,
  findOne,
  findAll,
} = require('../controllers/carplateController');

router.post('/', asyncErrorHandler(create));
router.get('/', findAll);
router.get('/:id', asyncErrorHandler(findOne));
router.put('/:id', asyncErrorHandler(update));
router.delete('/:id', asyncErrorHandler(decomm));

module.exports = router;
