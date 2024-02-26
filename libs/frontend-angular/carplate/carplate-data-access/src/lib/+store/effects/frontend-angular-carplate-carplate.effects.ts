import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
} from '../actions/frontend-angular-carplate-carplate.actions';
import { CarplateService } from '../../frontend-angular-carplate-carplate.service';

@Injectable()
export class CarplateEffects {
  loadCarPlates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllCarplates),
      mergeMap(() =>
        this.carplateService.getCarplatesList().pipe(
          map((carplatesList) =>
            // TODO: create a pagination logic and provide it from here
            fetchAllCarplatesSuccess({ carplates: carplatesList.rows })
          ),
          catchError((error) => of(fetchAllCarplatesFailure({ error })))
        )
      )
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
          map((carplate) => createCarplateSuccess({ carplate })),
          catchError((error) => of(createCarplateFailure({ error })))
        )
      )
    )
  );

  updateCarplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCarplate),
      mergeMap(({ id, carplate }) =>
        this.carplateService.updateCarplate(id, carplate).pipe(
          map(() => updateCarplateSuccess()),
          catchError((error) => of(updateCarplateFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private carplateService: CarplateService
  ) {}
}
