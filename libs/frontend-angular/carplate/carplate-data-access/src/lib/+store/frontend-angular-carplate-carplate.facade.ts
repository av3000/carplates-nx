import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { CarplateFilters, CarplateParameters } from '@shared/carplate/types';

import {
  selectCarplateById,
  selectCarplateList,
  selectCarplateState,
  selectError,
  selectIsLoaded,
  selectLoading,
  selectPagination,
  selectSelectedCarplate,
} from './selectors/frontend-angular-carplate-carplate.selectors';
import {
  clearCarplates,
  clearCarplatesError,
  createCarplate,
  createCarplateSuccess,
  deleteCarplate,
  fetchAllCarplates,
  fetchOneCarplate,
  updateCarplate,
  updateCarplateSuccess,
} from './actions/frontend-angular-carplate-carplate.actions';
import { map } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class CarplateFacade {
  carplateStore$ = this.store.pipe(select(selectCarplateState));

  saved$ = this.actions$.pipe(
    ofType(createCarplateSuccess, updateCarplateSuccess),
    map(() => true)
  );

  pagination$ = this.store.pipe(select(selectPagination));
  carplatesList$ = this.store.pipe(select(selectCarplateList));
  selectedCarplate$ = this.store.pipe(select(selectSelectedCarplate));
  isLoading$ = this.store.pipe(select(selectLoading));
  isLoaded$ = this.store.pipe(select(selectIsLoaded));
  errors$ = this.store.pipe(select(selectError));

  constructor(private store: Store, private actions$: Actions) {}

  fetchAllCarplates(filters: CarplateFilters) {
    this.store.dispatch(fetchAllCarplates({ filters }));
  }

  fetchOneCarplate(id: string) {
    this.store.dispatch(fetchOneCarplate({ id }));
  }

  createCarplate(carplateParams: CarplateParameters) {
    this.store.dispatch(createCarplate({ carplateParams }));
  }

  updateCarplate(id: string, carplateParams: CarplateParameters) {
    this.store.dispatch(
      updateCarplate({
        id,
        carplateParams,
      })
    );
  }

  deleteCarplate(id: string) {
    this.store.dispatch(deleteCarplate({ id }));
  }

  selectCarplateById(id: string) {
    return this.store.pipe(select(selectCarplateById(id)));
  }

  clearCarplates() {
    this.store.dispatch(clearCarplates());
  }

  clearErrors() {
    this.store.dispatch(clearCarplatesError());
  }
}
