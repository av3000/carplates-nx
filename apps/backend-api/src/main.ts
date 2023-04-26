/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

require('dotenv').config();

import express from 'express';
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./app/routes/index');
const carplatesRouter = require('./app/routes/carplates');

const PORT = process.env.NODE_DOCKER_PORT || 3333;

const app = express();

const corsOptions = {
  origin: `http://localhost:${PORT}`,
};

app.use(cors(corsOptions));

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to backend-api root page!' });
});

// API Routes
app.use('/api', indexRouter);
app.use('/api/carplates', carplatesRouter);

console.log('Connecting to database...');

const db = require('./app/models');
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
    const server = app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
    server.on('error', console.error);
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });
