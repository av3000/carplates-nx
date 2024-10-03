require('dotenv').config();
import './instrument';
import express, { Express } from 'express';
import * as Sentry from '@sentry/node';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { db, errorMiddleware, swaggerDocs } from '@backend-express/utils';
import { carplateRoutes } from '@backend-express/carplate/routes';
import indexRoutes from './app/routes/index';
import { environment } from './environments/environment';

const FLUSH_DB: boolean = process.env.FLUSH_DB === 'true';

const app: Express = express();

const allowedOrigins = [
  `${environment.apiUrl}:${process.env.ANGULAR_PORT}`,
  `${environment.apiUrl}:${process.env.NODE_PORT}`,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

// Swagger Init
swaggerDocs(app, process.env.NODE_PORT || 8080);

// API Routes
app.use('/api', indexRoutes);
app.use('/api/carplates', carplateRoutes);

console.log('Connecting to database...');

Sentry.setupExpressErrorHandler(app);
app.use(errorMiddleware);

// Request handler to capture all requests
// app.use(Sentry.Handlers.requestHandler());
// Error handler to capture any errors
// app.use(Sentry.Handlers.errorHandler());

db.sequelize
  .sync({ force: FLUSH_DB })
  .then(() => {
    console.log('Synched db.');
    const server = app.listen(process.env.NODE_PORT, () => {
      console.log(
        `Listening at ${process.env.API_URL}:${process.env.NODE_PORT}`
      );
    });
    server.on('error', console.error);
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });
