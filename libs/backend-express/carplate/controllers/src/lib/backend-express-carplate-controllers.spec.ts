import { Op } from 'sequelize';

import { StatusCode } from '@shared/common/enums';
import { Pagination } from '@shared/common/utils';
import { db } from '@backend-express/utils';

import {
  create,
  decomm,
  findAll,
  findOne,
  update,
} from './backend-express-carplate-controllers';

import * as ValidationHelpers from './helpers';
import * as Helpers from './helpers';

const mockCarplates = [
  {
    id: '69afb3b6-871f-48c4-a372-423bbe7ec8a1',
    plate_name: 'ABC123',
    owner: 'John Doe',
    createdAt: '2024-09-09T14:44:39.000Z',
    updatedAt: '2024-09-09T14:44:39.000Z',
  },
  {
    id: '69afb3b6-871f-48c4-a372-423bbe7ec8a1',
    plate_name: 'XXX123',
    owner: 'greg johnsen',
    createdAt: '2024-09-08T14:44:39.000Z',
    updatedAt: '2024-09-08T14:44:39.000Z',
  },
  {
    id: 'ea4f1111-19ac-4ec0-b094-ff3b40e549c7',
    plate_name: 'ABC321',
    owner: 'John Doetwo',
    createdAt: '2024-09-07T14:40:34.000Z',
    updatedAt: '2024-09-07T14:40:34.000Z',
  },
];
const mockCarplate = mockCarplates[0];
const mockCarplatesPaginated = {
  count: 3,
  perPage: Pagination.DEFAULT_ITEMS_PER_PAGE,
  totalPages: 1,
  currentPage: 1,
  rows: mockCarplates,
};

describe('/api/carplates/', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockResponse, next, mockRequestWithFilters, mockRequest: any;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    mockRequestWithFilters = {
      query: {
        page: Pagination.DEFAULT_PAGE,
        size: Pagination.DEFAULT_ITEMS_PER_PAGE,
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('get paginated carplate list with no optional filters', async () => {
      // GIVEN
      jest.spyOn(db.CarplateSchema, 'findAndCountAll').mockResolvedValue({
        count: mockCarplates.length,
        rows: mockCarplates,
      });

      // WHEN
      await findAll(mockRequestWithFilters, mockResponse, next);

      // THEN
      expect(db.CarplateSchema.findAndCountAll).toHaveBeenCalledWith({
        where: {},
        limit: 3,
        offset: 0,
        order: [['updatedAt', 'DESC']],
      });
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_200_SUCCESS_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockCarplatesPaginated);
    });

    const getCarplatesListByFiltersCases = [
      {
        filterName: 'owner',
        filterValue: 'John Doe',
        dbQueryCondition: {
          owner: { [Op.like]: '%John Doe%' },
        },
      },
      {
        filterName: 'plate_name',
        filterValue: 'ABC123',
        dbQueryCondition: { plate_name: { [Op.like]: '%ABC123%' } },
      },
    ];

    getCarplatesListByFiltersCases.forEach((test) => {
      it(`should get paginated carplate list with ${test.filterName} filtered`, async () => {
        // GIVEN
        mockRequestWithFilters.query[test.filterName] = test.filterValue;
        const mockDBResponse = {
          count: [mockCarplates[0]].length,
          rows: [mockCarplates[0]],
        };

        jest
          .spyOn(db.CarplateSchema, 'findAndCountAll')
          .mockResolvedValue(mockDBResponse);

        // WHEN
        await findAll(mockRequestWithFilters, mockResponse, next);

        // THEN
        expect(db.CarplateSchema.findAndCountAll).toHaveBeenCalledWith({
          where: test.dbQueryCondition,
          limit: 3,
          offset: 0,
          order: [['updatedAt', 'DESC']],
        });

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
          count: mockDBResponse.rows.length,
          perPage: Pagination.DEFAULT_ITEMS_PER_PAGE,
          totalPages: 1,
          currentPage: 1,
          rows: mockDBResponse.rows,
        });
      });
    });

    it('should handle errors gracefully', async () => {
      // GIVEN
      const mockError = new Error('Database error');
      jest
        .spyOn(db.CarplateSchema, 'findAndCountAll')
        .mockRejectedValue(mockError);
      // WHEN
      await findAll(mockRequestWithFilters, mockResponse, next);
      // THEN
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe(':id', () => {
    it('should return carplate by id and 200 success', async () => {
      // GIVEN
      mockRequest = {
        params: { id: mockCarplate.id },
      };
      jest.spyOn(ValidationHelpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findByPk').mockResolvedValue(mockCarplate);
      // WHEN
      await findOne(mockRequest, mockResponse, next);
      // THEN
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_200_SUCCESS_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockCarplate);
    });

    it('should return 400 if id is invalid', async () => {
      // GIVEN
      const invalidId = 'invalidId';
      mockRequest = {
        params: { id: invalidId },
      };
      const errResp = {
        error: ValidationHelpers.errorResponses.carplateIdFormat,
        body: { id: invalidId },
      };
      jest
        .spyOn(ValidationHelpers, 'validateIdFormat')
        .mockReturnValue(errResp);

      // WHEN
      await findOne(mockRequest, mockResponse, next);

      // THEN
      expect(ValidationHelpers.validateIdFormat).toHaveBeenCalledWith(
        invalidId
      );
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_400_BAD_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith(errResp);
    });

    it('should return 200 with empty object if carplate id doesnt exist', async () => {
      // GIVEN
      const validButDoesntExistId = '22223333-1111-4444-6666-423bbe7ec8a1';
      mockRequest = {
        params: { id: validButDoesntExistId },
      };
      jest.spyOn(ValidationHelpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findByPk').mockResolvedValue(null);

      // WHEN
      await findOne(mockRequest, mockResponse, next);

      // THEN
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_200_SUCCESS_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    it('should call next with an error if something goes wrong', async () => {
      // GIVEN
      mockRequest = {
        params: { id: mockCarplate.id },
      };

      const error = new Error('Something went wrong');

      jest.spyOn(ValidationHelpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findByPk').mockRejectedValue(error);

      // WHEN
      await findOne(mockRequest, mockResponse, next);

      // THEN
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe(':id/delete', () => {
    it('should return 404 if the carplate does not exist', async () => {
      // GIVEN
      const validNonExistentId = '11111111-1111-1111-1111-111111111111';
      mockRequest = {
        params: { id: validNonExistentId },
      };

      jest.spyOn(ValidationHelpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findByPk').mockResolvedValue(null);

      // WHEN
      await decomm(mockRequest, mockResponse, next);

      // THEN
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_404_NOT_FOUND
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Carplate not found',
      });
    });

    it('should return 200 and delete the carplate successfully', async () => {
      // GIVEN
      mockRequest = {
        params: { id: mockCarplate.id },
      };

      jest.spyOn(ValidationHelpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findByPk').mockResolvedValue(mockCarplate);
      jest.spyOn(db.CarplateSchema, 'destroy').mockResolvedValue(1);

      // WHEN
      await decomm(mockRequest, mockResponse, next);

      // THEN
      expect(db.CarplateSchema.destroy).toHaveBeenCalledWith({
        where: { id: mockCarplate.id },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_200_SUCCESS_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Carplate deleted successfully',
        id: mockCarplate.id,
      });
    });

    it('should call next with an error if an exception occurs', async () => {
      // GIVEN
      mockRequest = {
        params: { id: mockCarplate.id },
      };

      const error = new Error('Something went wrong');

      jest.spyOn(ValidationHelpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findByPk').mockRejectedValue(error);

      // WHEN
      await decomm(mockRequest, mockResponse, next);

      // THEN
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('create', () => {
    it('should return 400 if validation fails', async () => {
      // GIVEN
      const invalidPayload = { plate_name: '', owner: 'John Doe' };
      mockRequest = {
        body: invalidPayload,
      };

      const validationError = {
        error: ValidationHelpers.errorResponses.missingFields,
        body: { missingFields: ['plate_name'] },
      };
      jest
        .spyOn(Helpers, 'validateCarplateCreate')
        .mockReturnValue(validationError);

      // WHEN
      await create(mockRequest, mockResponse, next);

      // THEN
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_400_BAD_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith(validationError);
    });

    it('should call next with an error if carplate with same name already exists', async () => {
      // GIVEN
      const existingPlateName = 'ABC123';
      mockRequest = {
        body: { plate_name: existingPlateName, owner: 'John Doe' },
      };

      const foundCarplate = {
        id: '123',
        plate_name: existingPlateName,
        owner: 'John Doe',
      };

      jest
        .spyOn(ValidationHelpers, 'validateCarplateCreate')
        .mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findOne').mockResolvedValue(foundCarplate);

      // WHEN
      await create(mockRequest, mockResponse, next);

      // THEN
      expect(next).toHaveBeenCalledWith({
        status: StatusCode.HTTP_400_BAD_REQUEST,
        name: 'Already Exists',
        message: `Carplate with plate name ${existingPlateName} already exists `,
      });
    });

    it('should return 200 and create a new carplate successfully', async () => {
      // GIVEN
      mockRequest = {
        body: mockCarplate,
      };

      const createdCarplate = {
        id: '123',
        plate_name: mockCarplate.plate_name.toUpperCase(),
        owner: mockCarplate.owner,
      };

      jest
        .spyOn(ValidationHelpers, 'validateCarplateCreate')
        .mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(db.CarplateSchema, 'create')
        .mockResolvedValue(createdCarplate);

      // WHEN
      await create(mockRequest, mockResponse, next);

      // THEN
      expect(db.CarplateSchema.create).toHaveBeenCalledWith({
        plate_name: mockCarplate.plate_name.toUpperCase(),
        owner: mockCarplate.owner,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_200_SUCCESS_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith(createdCarplate);
    });

    it('should call next with an error if something goes wrong', async () => {
      // GIVEN
      mockRequest = {
        body: mockCarplate,
      };

      const error = new Error('Database error');

      jest
        .spyOn(ValidationHelpers, 'validateCarplateCreate')
        .mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findOne').mockRejectedValue(error);

      // WHEN
      await create(mockRequest, mockResponse, next);

      // THEN
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('update', () => {
    it('should return 400 if validation fails for request body', async () => {
      // GIVEN
      mockRequest = {
        params: { id: mockCarplate.id },
        body: { plate_name: '' },
      };

      const validationError = {
        error: ValidationHelpers.errorResponses.missingFields,
        body: { missingFields: ['plate_name'] },
      };

      jest
        .spyOn(Helpers, 'validateCarplateUpdate')
        .mockReturnValue(validationError);

      // WHEN
      await update(mockRequest, mockResponse, next);

      // THEN
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_400_BAD_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith(validationError);
    });

    it('should call next with an error if carplate with same plate name already exists', async () => {
      // GIVEN
      mockRequest = {
        params: { id: mockCarplate.id },
        body: { plate_name: mockCarplate.plate_name },
      };

      jest.spyOn(Helpers, 'validateCarplateUpdate').mockReturnValue(null);
      jest.spyOn(Helpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findOne').mockResolvedValue(mockCarplate);

      // WHEN
      await update(mockRequest, mockResponse, next);

      // THEN
      expect(next).toHaveBeenCalledWith({
        status: StatusCode.HTTP_400_BAD_REQUEST,
        name: 'Already Exists',
        message: `Carplate with plate name ${mockCarplate.plate_name} already exists `,
      });
    });

    it('should return 200 and update carplate successfully', async () => {
      // GIVEN
      mockRequest = {
        params: { id: mockCarplate.id },
        body: {
          plate_name: 'DEF456',
          owner: 'Jane Doe',
        },
      };

      jest.spyOn(Helpers, 'validateCarplateUpdate').mockReturnValue(null);
      jest.spyOn(Helpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findOne').mockResolvedValue(mockCarplate);
      jest.spyOn(db.CarplateSchema, 'update').mockResolvedValue([1]);

      // WHEN
      await update(mockRequest, mockResponse, next);

      // THEN
      expect(db.CarplateSchema.update).toHaveBeenCalledWith(
        {
          plate_name: 'DEF456',
          owner: 'Jane Doe',
        },
        {
          where: { id: mockCarplate.id },
        }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_200_SUCCESS_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Carplate updated successfully',
        id: mockCarplate.id,
      });
    });

    it('should return 400 if format is invalid', async () => {
      // GIVEN
      const invalidId = 'invalid-id';
      mockRequest = {
        params: { id: 'invalid-id' },
      };
      const errResp = {
        error: ValidationHelpers.errorResponses.carplateIdFormat,
        body: { id: invalidId },
      };
      jest
        .spyOn(ValidationHelpers, 'validateIdFormat')
        .mockReturnValue(errResp);
      jest
        .spyOn(db.CarplateSchema, 'findByPk')
        .mockResolvedValue(ValidationHelpers.errorResponses.carplateIdFormat);

      // WHEN
      await update(mockRequest, mockResponse, next);

      // THEN
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCode.HTTP_400_BAD_REQUEST
      );
      expect(mockResponse.json).toHaveBeenCalledWith(errResp);
    });

    it('should call next with an error if something goes wrong', async () => {
      // GIVEN
      mockRequest = {
        params: { id: '11111111-2222-3333-4444-423bbe7ec8a1' },
        body: { plate_name: 'NEW123', owner: 'John Doe' },
      };

      const error = new Error('Database error');

      jest.spyOn(Helpers, 'validateCarplateUpdate').mockReturnValue(null);
      jest.spyOn(Helpers, 'validateIdFormat').mockReturnValue(null);
      jest.spyOn(db.CarplateSchema, 'findOne').mockRejectedValue(error);

      // WHEN
      await update(mockRequest, mockResponse, next);

      // THEN
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
