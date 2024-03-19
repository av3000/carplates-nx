import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import {
  Carplate,
  CarplateFilters,
  CarplateParameters,
} from '@shared/carplate/types';
import { PaginatedList } from '@shared/common/types';

const api = '[Carplate API]';

export const fetchAllCarplates = createAction(
  `${api} Fetch All Carplates`,
  props<{ filters: CarplateFilters }>()
);

export const fetchAllCarplatesSuccess = createAction(
  `${api} Fetch All Carplates Success`,
  props<{
    carplatesList: PaginatedList<Carplate>;
  }>()
);

export const fetchAllCarplatesFailure = createAction(
  `${api} Fetch All Carplates Failure`,
  props<{ error: HttpErrorResponse }>()
);

export const fetchOneCarplate = createAction(
  `${api} Fetch One Carplate`,
  props<{ id: string }>()
);

export const fetchOneCarplateSuccess = createAction(
  `${api} Fetch One Carplate Success`,
  props<{ carplate: Carplate }>()
);

export const fetchOneCarplateFailure = createAction(
  `${api} Fetch One Carplate Failure`,
  props<{ error: HttpErrorResponse }>()
);

export const createCarplate = createAction(
  `${api} Create Carplate`,
  props<{ carplateParams: CarplateParameters }>()
);

export const createCarplateSuccess = createAction(
  `${api} Create Carplate Success`
);

export const createCarplateFailure = createAction(
  `${api} Create Carplate Failure`,
  props<{ error: HttpErrorResponse }>()
);

export const updateCarplate = createAction(
  `${api} Update Carplate`,
  props<{ id: string; carplateParams: CarplateParameters }>()
);

export const updateCarplateSuccess = createAction(
  `${api} Update Carplate Success`
);

export const updateCarplateFailure = createAction(
  `${api} Update Carplate Failure`,
  props<{ error: HttpErrorResponse }>()
);

export const deleteCarplate = createAction(
  `${api} Delete Carplate`,
  props<{ id: string }>()
);

export const deleteCarplateSuccess = createAction(
  `${api} Delete Carplate Success`
);

export const deleteCarplateFailure = createAction(
  `${api} Delete Carplate Failure`,
  props<{ error: HttpErrorResponse }>()
);

export const clearCarplates = createAction(`${api} Clear Carplates`);
export const clearCarplatesError = createAction(`${api} Clear Carplates Error`);
