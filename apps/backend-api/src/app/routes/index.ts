import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>
  res.send({ message: 'Welcome to CarPlates API index page' })
);

export default router;
