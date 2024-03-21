import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { map, mergeMap, catchError } from 'rxjs/operators';
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
              carplatesList: {
                ...carplatesList,
                rows: carplatesList.rows,
              },
            });
          }),
          catchError((error) => of(fetchAllCarplatesFailure({ error })))
        );
      })
    )
  );

  // TODO: consider to refresh single carplate after create, update or delete
  // use case 1: user creates a new carplate, the list should refresh and show the new carplate
  // use case 2: user updates a carplate, need to look into carplates state and if carplate is there, update it and show the updated carplate
  // use case 3: user deletes a carplate, the list should refresh and show latest list withouth deleted carplate
  // p.s: consider pagination logic not messing up when not refreshing the whole list
  loadCarplates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        updateCarplateSuccess,
        deleteCarplateSuccess,
        createCarplateSuccess
      ),
      mergeMap(({ filters }: any): Observable<Action> => {
        return this.carplateService.getCarplatesList(filters).pipe(
          map((carplatesList) =>
            fetchAllCarplatesSuccess({
              carplatesList: {
                ...carplatesList,
                rows: carplatesList.rows,
              },
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
    private actions$: Actions,
    private carplateService: CarplateService
  ) {}
}
