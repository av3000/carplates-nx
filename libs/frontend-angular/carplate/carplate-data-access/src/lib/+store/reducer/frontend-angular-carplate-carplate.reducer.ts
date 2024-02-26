import { HttpErrorResponse } from '@angular/common/http';
import { Carplate } from '@shared/carplate/types';

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
} from '../actions/frontend-angular-carplate-carplate.actions';

export const carplateFeatureKey = 'carplate';

export interface CarplateState {
  carplates: Carplate[];
  isLoading: boolean;
  isLoaded: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: CarplateState = {
  carplates: [],
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
    (state, { carplates }): CarplateState => ({
      ...state,
      carplates,
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
      carplates: [...state.carplates, carplate],
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
    (state, { carplate }): CarplateState => ({
      ...state,
      carplates: [...state.carplates, carplate],
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
    (state, { carplate }): CarplateState => ({
      ...state,
      carplates: state.carplates.map((_carplate) =>
        _carplate.id === carplate.id ? carplate : _carplate
      ),
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
    clearCarplates,
    (state): CarplateState => ({
      ...state,
      carplates: [],
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
