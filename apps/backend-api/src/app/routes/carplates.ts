import express from 'express';
const router = express.Router();

const { asyncErrorHandler } = require('../middleware');

const { getCarplates } = require('../controllers/carplateController');

router.get('/', asyncErrorHandler(getCarplates));

module.exports = router;
