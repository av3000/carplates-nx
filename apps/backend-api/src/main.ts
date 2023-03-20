/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

require('dotenv').config();
console.log(process.env); // remove this after you've confirmed it is working

import express from 'express';
import * as path from 'path';

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./app/routes/index');
const carplatesRouter = require('./app/routes/carplates');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to backend-api root page!' });
});

// API Routes
app.use('/api', indexRouter);
app.use('/api/carplates', carplatesRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
