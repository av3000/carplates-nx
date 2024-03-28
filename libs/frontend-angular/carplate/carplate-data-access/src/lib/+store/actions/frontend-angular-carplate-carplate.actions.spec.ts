import * as CarplateActions from './frontend-angular-carplate-carplate.actions';
import { Carplate, CarplateFilters } from '@shared/carplate/types';
import { ErrorResponse, PaginatedList } from '@shared/common/types';

const errorMock = {
  error: {
    name: 'Error',
    message: 'An error occurred',
  },
  body: 'request body',
} as ErrorResponse;

const carplateMock: Carplate = {
  id: '1',
  plate_name: 'ABC123',
  owner: 'John Doe',
  createdAt: new Date().getFullYear().toString(),
  updatedAt: new Date().getFullYear().toString(),
};

const carplateCreateParamsMock = {
  plate_name: 'ABC123',
  owner: 'John Doe',
};

const carplatesListMock: PaginatedList<Carplate> = {
  rows: [] as Carplate[],
  currentPage: 1,
  perPage: 10,
  totalPages: 1,
  count: 0,
};

describe('CarplateActions', () => {
  describe('fetchAllCarplates', () => {
    it(`should create an ${CarplateActions.actionTypes.fetchAllCarplates} action`, () => {
      const filters: CarplateFilters = { page: 1, size: 10 };
      const action = CarplateActions.fetchAllCarplates({ filters });
      expect({ ...action }).toEqual({
        type: `${CarplateActions.actionTypes.fetchAllCarplates}`,
        filters,
      });
    });

    it(`should create an ${CarplateActions.actionTypes.fetchAllCarplatesSuccess} action`, () => {
      const action = CarplateActions.fetchAllCarplatesSuccess({
        carplatesList: carplatesListMock,
      });
      expect({ ...action }).toEqual({
        type: `${CarplateActions.actionTypes.fetchAllCarplatesSuccess}`,
        carplatesList: carplatesListMock,
      });
    });

    it(`should create an ${CarplateActions.actionTypes.fetchAllCarplatesFailure} action`, () => {
      const action = CarplateActions.fetchAllCarplatesFailure({
        error: errorMock,
      });
      expect({ ...action }).toEqual({
        type: `${CarplateActions.actionTypes.fetchAllCarplatesFailure}`,
        error: errorMock,
      });
    });

    describe('fetchOneCarplate', () => {
      it(`should create an ${CarplateActions.actionTypes.fetchOneCarplate} action`, () => {
        const id = '1';
        const action = CarplateActions.fetchOneCarplate({ id });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.fetchOneCarplate}`,
          id,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.fetchOneCarplateSuccess} action`, () => {
        const action = CarplateActions.fetchOneCarplateSuccess({
          carplate: carplateMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.fetchOneCarplateSuccess}`,
          carplate: carplateMock,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.fetchOneCarplateFailure} action`, () => {
        const action = CarplateActions.fetchOneCarplateFailure({
          error: errorMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.fetchOneCarplateFailure}`,
          error: errorMock,
        });
      });
    });

    describe('createCarplate', () => {
      it(`should create an ${CarplateActions.actionTypes.createCarplate} action`, () => {
        const action = CarplateActions.createCarplate({
          carplateParams: carplateCreateParamsMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.createCarplate}`,
          carplateParams: carplateCreateParamsMock,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.createCarplateSuccess} action`, () => {
        const action = CarplateActions.createCarplateSuccess();
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.createCarplateSuccess}`,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.createCarplateFailure} action`, () => {
        const action = CarplateActions.createCarplateFailure({
          error: errorMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.createCarplateFailure}`,
          error: errorMock,
        });
      });
    });

    describe('updateCarplate', () => {
      it(`should create an ${CarplateActions.actionTypes.updateCarplate} action`, () => {
        const id = '1';
        const action = CarplateActions.updateCarplate({
          id,
          carplateParams: carplateCreateParamsMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.updateCarplate}`,
          id,
          carplateParams: carplateCreateParamsMock,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.updateCarplateSuccess} action`, () => {
        const action = CarplateActions.updateCarplateSuccess();
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.updateCarplateSuccess}`,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.updateCarplateFailure} action`, () => {
        const action = CarplateActions.updateCarplateFailure({
          error: errorMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.updateCarplateFailure}`,
          error: errorMock,
        });
      });
    });

    describe('deleteCarplate', () => {
      it(`should create an ${CarplateActions.actionTypes.deleteCarplate} action`, () => {
        const id = '1';
        const action = CarplateActions.deleteCarplate({ id });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.deleteCarplate}`,
          id,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.deleteCarplateSuccess} action`, () => {
        const action = CarplateActions.deleteCarplateSuccess();
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.deleteCarplateSuccess}`,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.deleteCarplateFailure} action`, () => {
        const action = CarplateActions.deleteCarplateFailure({
          error: errorMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.deleteCarplateFailure}`,
          error: errorMock,
        });
      });
    });

    describe('clearCarplates state', () => {
      it(`should create an ${CarplateActions.actionTypes.clearCarplates} action`, () => {
        const action = CarplateActions.clearCarplates();
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.clearCarplates}`,
        });
      });

      it(`should create an ${CarplateActions.actionTypes.clearCarplates} action`, () => {
        const action = CarplateActions.clearCarplates();
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.clearCarplates}`,
        });
      });
    });
  });
});
