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
    paths: {
      '/api/carplates': {
        get: {
          description: 'Leggit',
          responses: {
            200: {
              description: 'returns carplates',
            },
          },
        },
        post: {
          description: 'Create a new Carplate',
          responses: {
            200: {
              description: 'Returns a Newly created Carplate',
            },
          },
        },
      },
    },
  },
  apis: [],
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