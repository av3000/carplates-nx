import { Router } from 'express';

import { asyncErrorHandler } from '@backend-express/utils';

import {
  create,
  decomm,
  findAll,
  findOne,
  update,
} from '@backend-express/carplate/controllers';

const router = Router();

/**
 * @openapi
 * /api/carplates:
 *   post:
 *     summary: Create a new carplate.
 *     description: Create a new carplate with provided properties.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carplate'
 *     responses:
 *       200:
 *         description: A JSON object of the created carplate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carplate'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */

router.post('/', asyncErrorHandler(create));

/**
 * @openapi
 * /api/carplates:
 *   get:
 *     summary: Returns a paginated list of carplates.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number
 *         example: 0
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of items per page
 *         example: 3
 *       - in: query
 *         name: plate_name
 *         schema:
 *           type: string
 *         required: false
 *         description: The carplate name, case insensitive and partial match, example 'ABC123'
 *       - in: query
 *         name: owner
 *         schema:
 *           type: string
 *         required: false
 *         description: The owner name, case insensitive and partial match, example 'John Doe'
 *     responses:
 *       200:
 *         description: A paginated list of carplates
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedData<Carplate>'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */

router.get('/', findAll);

/**
 * @openapi
 * /api/carplates/{id}:
 *   get:
 *     summary: Get a specific carplate by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the carplate to retrieve.
 *     responses:
 *       200:
 *         description: A carplate object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carplate'
 *       400:
 *         description: Bad request
 *       404:
 *         description: The carplate was not found.
 */

router.get('/:id', asyncErrorHandler(findOne));

/**
 * @openapi
 * /api/carplates/{id}:
 *   put:
 *     summary: Update a carplate by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the carplate to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carplate'
 *     responses:
 *       200:
 *         description: The updated carplate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carplate'
 *       400:
 *         description: Bad request
 *       404:
 *         description: The carplate was not found.
 */

router.put('/:id', asyncErrorHandler(update));

/**
 * @openapi
 * /api/carplates/{id}:
 *   delete:
 *     summary: Delete a carplate by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the carplate to delete.
 *     responses:
 *       200:
 *         description: The carplate was deleted.
 *       400:
 *         description: Bad request
 *       404:
 *         description: The carplate was not found.
 */

router.delete('/:id', asyncErrorHandler(decomm));

export default router;
