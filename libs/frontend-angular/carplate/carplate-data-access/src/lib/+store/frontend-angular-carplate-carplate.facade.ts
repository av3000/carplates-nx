import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  selectAllCarplates,
  selectCarplateById,
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

  carplates$ = this.store.pipe(select(selectAllCarplates));
  isLoading$ = this.store.pipe(select(selectLoading));
  isLoaded$ = this.store.pipe(select(selectIsLoaded));
  errors$ = this.store.pipe(select(selectError));

  constructor(private store: Store) {}

  fetchAllCarplates() {
    this.store.dispatch(fetchAllCarplates());
  }

  createCarplate(carplate: any) {
    this.store.dispatch(createCarplate({ carplate }));
  }

  updateCarplate(carplate: any) {
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
