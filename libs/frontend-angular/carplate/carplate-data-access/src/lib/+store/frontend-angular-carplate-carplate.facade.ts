import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  Carplate,
  CarplateFilters,
  CarplateParameters,
} from '@shared/carplate/types';
import { defaultPaginationFilters } from '@shared/common/constants';

import {
  selectCarplateById,
  selectCarplateList,
  selectCarplateState,
  selectError,
  selectIsLoaded,
  selectLoading,
} from './selectors/frontend-angular-carplate-carplate.selectors';
import {
  clearCarplates,
  clearCarplatesError,
  createCarplate,
  deleteCarplate,
  fetchAllCarplates,
  updateCarplate,
} from './actions/frontend-angular-carplate-carplate.actions';

@Injectable({ providedIn: 'root' })
export class CarplateFacade {
  carplateStore$ = this.store.pipe(select(selectCarplateState));

  carplatesList$ = this.store.pipe(select(selectCarplateList));
  isLoading$ = this.store.pipe(select(selectLoading));
  isLoaded$ = this.store.pipe(select(selectIsLoaded));
  errors$ = this.store.pipe(select(selectError));

  constructor(private store: Store) {}

  fetchAllCarplates(filters: CarplateFilters = defaultPaginationFilters) {
    this.store.dispatch(fetchAllCarplates({ filters }));
  }

  createCarplate(carplateParams: CarplateParameters) {
    this.store.dispatch(createCarplate({ carplateParams }));
  }

  updateCarplate(carplate: Carplate) {
    this.store.dispatch(updateCarplate({ id: carplate.id, carplate }));
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
