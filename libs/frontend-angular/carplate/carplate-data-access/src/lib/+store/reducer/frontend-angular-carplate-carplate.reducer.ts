import { HttpErrorResponse } from '@angular/common/http';

import { Carplate } from '@shared/carplate/types';
import { PaginatedList } from '@shared/common/types';

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
  error: HttpErrorResponse | null;
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
    fetchAllCarplates,
    (state): CarplateState => ({
      ...state,
      isLoading: true,
      isLoaded: false,
      error: null,
    })
  ),
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
    fetchAllCarplatesFailure,
    (state, { error }): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      error,
    })
  ),
  on(
    fetchOneCarplate,
    (state): CarplateState => ({
      ...state,
      isLoading: true,
      isLoaded: false,
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
    fetchOneCarplateFailure,
    (state, { error }): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      error,
    })
  ),
  on(
    createCarplate,
    (state): CarplateState => ({
      ...state,
      isLoading: true,
      isLoaded: false,
      error: null,
    })
  ),
  on(
    createCarplateSuccess,
    (state): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: true,
      error: null,
    })
  ),
  on(
    createCarplateFailure,
    (state, { error }): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      error,
    })
  ),
  on(
    updateCarplate,
    (state): CarplateState => ({
      ...state,
      isLoading: true,
      isLoaded: false,
      error: null,
    })
  ),
  on(
    updateCarplateSuccess,
    (state): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: true,
      error: null,
    })
  ),
  on(
    updateCarplateFailure,
    (state, { error }): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      error,
    })
  ),
  on(
    deleteCarplate,
    (state): CarplateState => ({
      ...state,
      isLoading: true,
      isLoaded: false,
      error: null,
    })
  ),
  on(
    deleteCarplateSuccess,
    (state): CarplateState => ({
      ...state,
      isLoading: false,
      isLoaded: true,
      error: null,
    })
  ),
  on(
    deleteCarplateFailure,
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
