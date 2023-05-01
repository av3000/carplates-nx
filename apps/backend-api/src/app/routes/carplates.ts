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

// Create a new Tutorial
router.post('/', asyncErrorHandler(create));

// Retrieve all Tutorials
router.get('/', findAll);

// Retrieve a single Tutorial with id
router.get('/:id', asyncErrorHandler(findOne));

// Update a Tutorial with id
router.put('/:id', asyncErrorHandler(update));

// Delete a Tutorial with id
router.delete('/:id', asyncErrorHandler(decomm));

module.exports = router;
