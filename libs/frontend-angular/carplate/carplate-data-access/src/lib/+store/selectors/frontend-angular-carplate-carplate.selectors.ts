import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Carplate } from '@shared/carplate/types';

import { CarplateState } from '../reducer/frontend-angular-carplate-carplate.reducer';

export const selectCarplateState =
  createFeatureSelector<CarplateState>('carplate');

export const selectAllCarplates = createSelector(
  selectCarplateState,
  (state: CarplateState) => state.carplates
);

export const selectCarplateById = (id: string) =>
  createSelector(selectAllCarplates, (carplates: Carplate[]) =>
    carplates.find((carplate) => carplate.id === id)
  );

export const selectLoading = createSelector(
  selectCarplateState,
  (state: CarplateState) => state.isLoading
);

export const selectIsLoaded = createSelector(
  selectCarplateState,
  (state: CarplateState) => state.isLoaded
);

export const selectError = createSelector(
  selectCarplateState,
  (state: CarplateState) => state.error
);
