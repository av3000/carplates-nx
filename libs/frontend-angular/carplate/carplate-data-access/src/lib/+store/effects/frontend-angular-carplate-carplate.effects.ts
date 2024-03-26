import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {
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
import { selectPagination } from '../selectors/frontend-angular-carplate-carplate.selectors';
import { CarplateService } from '../../frontend-angular-carplate-carplate.service';

@Injectable()
export class CarplateEffects {
  loadCarplatesPaginated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllCarplates),
      mergeMap(({ filters }: any): Observable<Action> => {
        return this.carplateService.getCarplatesList(filters).pipe(
          map((carplatesList) => {
            return fetchAllCarplatesSuccess({
              carplatesList,
            });
          }),
          catchError((error) => of(fetchAllCarplatesFailure({ error })))
        );
      })
    )
  );

  refreshCarplates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        updateCarplateSuccess,
        deleteCarplateSuccess,
        createCarplateSuccess
      ),
      withLatestFrom(this.store.select(selectPagination)),
      mergeMap(([{ filters }, pagination]: any): Observable<Action> => {
        return this.carplateService
          .getCarplatesList({ ...filters, size: pagination.perPage })
          .pipe(
            map((carplatesList) =>
              fetchAllCarplatesSuccess({
                carplatesList,
              })
            ),
            catchError((error) => of(fetchAllCarplatesFailure({ error })))
          );
      })
    )
  );

  loadOneCarplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchOneCarplate),
      mergeMap(({ id }) =>
        this.carplateService.getCarplate(id).pipe(
          map((carplate) => fetchOneCarplateSuccess({ carplate })),
          catchError((error) => of(fetchOneCarplateFailure({ error })))
        )
      )
    )
  );

  createCarplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCarplate),
      mergeMap(({ carplateParams }) =>
        this.carplateService.createCarplate(carplateParams).pipe(
          map(() => createCarplateSuccess()),
          catchError((httpErrorResponse) => {
            return of(
              createCarplateFailure({ error: httpErrorResponse.error })
            );
          })
        )
      )
    )
  );

  updateCarplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCarplate),
      mergeMap(({ id, carplateParams }) =>
        this.carplateService.updateCarplate(id, carplateParams).pipe(
          map(() => updateCarplateSuccess()),
          catchError((httpErrorResponse) =>
            of(updateCarplateFailure({ error: httpErrorResponse.error }))
          )
        )
      )
    )
  );

  deleteCarplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCarplate),
      mergeMap(({ id }) =>
        this.carplateService.deleteCarplate(id).pipe(
          map(() => deleteCarplateSuccess()),
          catchError((error) => of(deleteCarplateFailure({ error })))
        )
      )
    )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private carplateService: CarplateService
  ) {}
}
