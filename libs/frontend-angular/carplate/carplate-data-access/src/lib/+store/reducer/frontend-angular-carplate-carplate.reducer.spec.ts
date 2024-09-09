import {
  CarplateState,
  carplateReducer,
  initialState,
} from './frontend-angular-carplate-carplate.reducer';
import * as CarplateActions from '../actions/frontend-angular-carplate-carplate.actions';
import {
  carplateCreateParamsMock,
  carplateMock,
  carplatesListMock,
  errorMock,
  filtersMock,
} from '../__mocks__/carplate-fixtures';

describe('FrontendAngularCarplateCarplate Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = carplateReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  describe('Fetch all carplates', () => {
    it('should set isLoading to true on fetchAllCarplates action', () => {
      const action = CarplateActions.fetchAllCarplates({
        filters: filtersMock,
      });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should update state on fetchAllCarplatesSuccess action', () => {
      const carplatesList = carplatesListMock;
      const action = CarplateActions.fetchAllCarplatesSuccess({
        carplatesList: carplatesListMock,
      });
      const state = carplateReducer(initialState, action);

      expect(state).toEqual({
        carplatesList,
        isLoading: false,
        isLoaded: true,
        error: null,
        selectedCarplate: null,
      });
    });

    it('should update state on fetchAllCarplatesFailure action', () => {
      const error = errorMock;
      const action = CarplateActions.fetchAllCarplatesFailure({ error });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('Fetch one carplate', () => {
    it('should set isLoading to true on fetchOneCarplate action', () => {
      const action = CarplateActions.fetchOneCarplate({ id: '1' });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should update state on fetchOneCarplateSuccess action', () => {
      const action = CarplateActions.fetchOneCarplateSuccess({
        carplate: carplatesListMock.rows[0],
      });
      const state = carplateReducer(initialState, action);

      expect(state.selectedCarplate).toBe(carplatesListMock.rows[0]);
      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should update state on fetchOneCarplateFailure action', () => {
      const error = errorMock;
      const action = CarplateActions.fetchOneCarplateFailure({ error });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('Create carplate', () => {
    it('should set isLoading to true on createCarplate action', () => {
      const action = CarplateActions.createCarplate({
        carplateParams: carplateCreateParamsMock,
      });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should update state on createCarplateSuccess action', () => {
      const action = CarplateActions.createCarplateSuccess({
        carplate: carplateMock,
      });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should update state on createCarplateFailure action', () => {
      const error = errorMock;
      const action = CarplateActions.createCarplateFailure({ error });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('Update carplate', () => {
    it('should set isLoading to true on updateCarplate action', () => {
      const action = CarplateActions.updateCarplate({
        id: '1',
        carplateParams: carplateCreateParamsMock,
      });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should update state on updateCarplateSuccess action', () => {
      const action = CarplateActions.updateCarplateSuccess({
        carplate: carplateMock,
      });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should update state on updateCarplateFailure action', () => {
      const error = errorMock;
      const action = CarplateActions.updateCarplateFailure({ error });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('Delete carplate', () => {
    it('should set isLoading to true on deleteCarplate action', () => {
      const action = CarplateActions.deleteCarplate({ id: '1' });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should update state on deleteCarplateSuccess action', () => {
      const action = CarplateActions.deleteCarplateSuccess();
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should update state on deleteCarplateFailure action', () => {
      const error = errorMock;
      const action = CarplateActions.deleteCarplateFailure({ error });
      const state = carplateReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('should clear state', () => {
    it('should clear state on clearCarplateState action', () => {
      const dirtyState: CarplateState = {
        ...initialState,
        isLoading: true,
        error: errorMock,
      };
      const action = CarplateActions.clearCarplates();
      const state = carplateReducer(dirtyState, action);

      expect(state).toStrictEqual(initialState);
    });

    it('should clear state errors', () => {
      const action = CarplateActions.clearCarplatesError();
      const state = carplateReducer(
        {
          ...initialState,
          error: errorMock,
        },
        action
      );

      expect(state.error).toBe(null);
    });
  });
});
