import * as CarplateActions from './frontend-angular-carplate-carplate.actions';
import {
  carplateCreateParamsMock,
  carplateMock,
  carplatesListMock,
  errorMock,
  filtersMock,
} from '../__mocks__/carplate-fixtures'; // Import the filtersMock variable

describe('CarplateActions', () => {
  describe('fetchAllCarplates', () => {
    it(`should create an ${CarplateActions.actionTypes.fetchAllCarplates} action`, () => {
      const action = CarplateActions.fetchAllCarplates({
        filters: filtersMock,
      });
      expect({ ...action }).toEqual({
        type: `${CarplateActions.actionTypes.fetchAllCarplates}`,
        filters: filtersMock,
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
        const action = CarplateActions.createCarplateSuccess({
          carplate: carplateMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.createCarplateSuccess}`,
          carplate: carplateMock,
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
        const action = CarplateActions.updateCarplateSuccess({
          carplate: carplateMock,
        });
        expect({ ...action }).toEqual({
          type: `${CarplateActions.actionTypes.updateCarplateSuccess}`,
          carplate: carplateMock,
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
