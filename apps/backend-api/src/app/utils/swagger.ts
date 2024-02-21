// TODO: Make routes discoverable for swagger apis: []

import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST CarPlates API Docs',
      version: '1.2.4',
    },
  },
  apis: [
    './apps/backend-api/src/app/routes/*.ts',
    './apps/backend-api/src/app/models/*.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: string | number) {
  try {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/docs.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });

    console.log(`Swagger Docs available at http://localhost:${port}/docs`);
  } catch (error) {
    console.error('Error setting up Swagger documentation:', error);
  }
}

export default swaggerDocs;
