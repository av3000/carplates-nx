import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>
  res.send({ message: 'Welcome to CarPlates API index page' })
);

module.exports = router;
