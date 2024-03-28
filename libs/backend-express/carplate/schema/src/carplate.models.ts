import { DataTypes } from 'sequelize';

export default (sequelize) => {
  /**
   * @openapi
   * components:
   *   schemas:
   *     Carplate:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *           description: The carplate id
   *         plate_name:
   *           type: string
   *           description: The carplate number
   *         owner:
   *           type: string
   *           description: The carplate owner
   *         createdAt:
   *           type: string
   *           format: date-time
   *           description: The date the carplate was created
   *         updatedAt:
   *           type: string
   *           format: date-time
   *           description: The date the carplate was last updated
   *       example:
   *         id: 123e4567-e89b-12d3-a456-426614174000
   *         plate_name: 'ABC123'
   *         owner: 'John Doe'
   *         createdAt: '2024-02-20T00:00:00.000Z'
   *         updatedAt: '2024-02-20T00:00:00.000Z'
   *       required:
   *         - id
   *         - plate_name
   *         - owner
   *     CarplateParameters:
   *       type: object
   *       properties:
   *         plate_name:
   *           type: string
   *           description: The carplate number
   *         owner:
   *           type: string
   *           description: The carplate owner
   *       required:
   *         - plate_name
   *         - owner
   *     CarplateUpdateParameters:
   *       type: object
   *       properties:
   *         plate_name:
   *           type: string
   *           description: The carplate number
   *         owner:
   *           type: string
   *           description: The carplate owner
   *       required:
   *         - plate_name
   *         - owner
   *   responses:
   *     '200':
   *       description: A JSON object of the created carplate
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Carplate'
   *     '400':
   *       description: Bad request
   *     '404':
   *       description: Not found
   *     '500':
   *       description: Internal server error
   *     '503':
   */

  /**
   * @openapi
   * components:
   *   schemas:
   *     PaginatedData<Carplate>:
   *       type: object
   *       properties:
   *         count:
   *           type: integer
   *           description: The number of carplates on the current page.
   *         totalPages:
   *           type: integer
   *           description: The total number of pages.
   *         currentPage:
   *           type: integer
   *           description: The current page number.
   *         rows:
   *           type: array
   *           items:
   *             $ref: '#/components/schemas/Carplate'
   *           description: The carplates on the current page.
   *       example:
   *         count: 6
   *         totalPages: 2
   *         currentPage: 1
   *         rows: [
   *           {
   *             id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
   *             owner: 'John Doe',
   *             plate_name: 'ABC123'
   *           },
   *           // ... more carplates ...
   *         ]
   */

  const Carplate = sequelize.define('carplate', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    plate_name: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 6],
      },
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },
  });

  return Carplate;
};
