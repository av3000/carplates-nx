import { Carplate } from '@shared/carplate/types';
import { ErrorResponse, PaginatedList } from '@shared/common/types';

import { Action, createReducer, on } from '@ngrx/store';

import {
  clearCarplates,
  clearCarplatesError,
  updateCarplate,
  updateCarplateSuccess,
  updateCarplateFailure,
  createCarplate,
  createCarplateFailure,
  createCarplateSuccess,
  fetchAllCarplates,
  fetchAllCarplatesFailure,
  fetchAllCarplatesSuccess,
  fetchOneCarplate,
  fetchOneCarplateFailure,
  fetchOneCarplateSuccess,
  deleteCarplate,
  deleteCarplateSuccess,
  deleteCarplateFailure,
} from '../actions/frontend-angular-carplate-carplate.actions';

export const carplateFeatureKey = 'carplate';

export interface CarplateState {
  selectedCarplate: Carplate | null;
  carplatesList: PaginatedList<Carplate>;
  isLoading: boolean;
  isLoaded: boolean;
  error: ErrorResponse | null;
}

export const initialState: CarplateState = {
  selectedCarplate: null,
  carplatesList: {
    count: 0,
    perPage: 0,
    totalPages: 0,
    currentPage: 0,
    rows: [],
  },
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const carplateReducer = createReducer(
  initialState,
  on(
    fetchAllCarplatesSuccess,
    (state, { carplatesList }): CarplateState => ({
      ...state,
      carplatesList: carplatesList,
      isLoading: false,
      isLoaded: true,
      error: null,
    })
  ),
  on(
    fetchOneCarplateSuccess,
    (state, { carplate }): CarplateState => ({
      ...state,
      selectedCarplate: carplate,
      isLoading: false,
      isLoaded: true,
      error: null,
    })
  ),
  on(
    createCarplate,
    updateCarplate,
    deleteCarplate,
    fetchOneCarplate,
    fetchAllCarplates,
    (state): CarplateState => ({
      ...state,
      isLoading: true,
      isLoaded: false,
      error: null,
    })
  ),
  on(
    createCarplateSuccess,
    updateCarplateSuccess,
    deleteCarplateSuccess,
    (state): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: true,
      error: null,
    })
  ),
  on(
    createCarplateFailure,
    updateCarplateFailure,
    deleteCarplateFailure,
    fetchOneCarplateFailure,
    fetchAllCarplatesFailure,
    (state, { error }): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      error,
    })
  ),
  on(
    clearCarplates,
    (state): CarplateState => ({
      ...state,
      carplatesList: {
        count: 0,
        perPage: 0,
        totalPages: 0,
        currentPage: 0,
        rows: [],
      },
      isLoading: false,
      isLoaded: false,
      error: null,
    })
  ),
  on(
    clearCarplatesError,
    (state): CarplateState => ({
      ...state,
      error: null,
    })
  )
);

export function reducer(state: CarplateState | undefined, action: Action) {
  return carplateReducer(state, action);
}
