import express from 'express';
const router = express.Router();

router.get('/', (req, res) =>
  res.send({ message: 'Welcome to CarPlates API index page' })
);

export default router;
