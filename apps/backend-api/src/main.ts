require('dotenv').config();

import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { db, errorMiddleware, swaggerDocs } from '@backend-express/utils';
import { carplateRoutes } from '@backend-express/carplate/routes';
import indexRoutes from './app/routes/index';

const NODE_PORT = process.env.NODE_DOCKER_PORT;
const ANGULAR_PORT = process.env.ANGULAR_DOCKER_PORT;
const FLUSH_DB: boolean = process.env.FLUSH_DB === 'true';

const app: Express = express();

const allowedOrigins = [
  `http://localhost:${ANGULAR_PORT}`,
  `http://localhost:${NODE_PORT}`,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to backend-api root page!' });
});

// Swagger Init
swaggerDocs(app, NODE_PORT);

// API Routes
app.use('/api', indexRoutes);
app.use('/api/carplates', carplateRoutes);

console.log('Connecting to database...');

app.use(errorMiddleware);

db.sequelize
  .sync({ force: FLUSH_DB })
  .then(() => {
    console.log('Synched db.');
    const server = app.listen(NODE_PORT, () => {
      console.log(`Listening at http://localhost:${NODE_PORT}`);
    });
    server.on('error', console.error);
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });
