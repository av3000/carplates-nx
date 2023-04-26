import express from 'express';
const router = express.Router();

const { asyncErrorHandler } = require('../middleware');

const {
  create,
  update,
  deleteOne,
  findOne,
  findAll,
} = require('../controllers/carplateController');

// Create a new Tutorial
router.post('/', create);

// Retrieve all Tutorials
router.get('/', findAll);

// Retrieve a single Tutorial with id
router.get('/:id', findOne);

// Update a Tutorial with id
router.put('/:id', update);

// Delete a Tutorial with id
router.delete('/:id', deleteOne);

module.exports = router;
