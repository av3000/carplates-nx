import { createAction, props } from '@ngrx/store';

const api = '[Carplate API]';

export const fetchAllCarplates = createAction(`${api} Fetch All Carplates`);

export const fetchAllCarplatesSuccess = createAction(
  `${api} Fetch All Carplates Success`,
  props<{ carplates: any }>()
);

export const fetchAllCarplatesFailure = createAction(
  `${api} Fetch All Carplates Failure`,
  props<{ error: any }>()
);

export const fetchOneCarplate = createAction(
  `${api} Fetch One Carplate`,
  props<{ id: any }>()
);

export const fetchOneCarplateSuccess = createAction(
  `${api} Fetch One Carplate Success`,
  props<{ carplate: any }>()
);

export const fetchOneCarplateFailure = createAction(
  `${api} Fetch One Carplate Failure`,
  props<{ error: any }>()
);

export const createCarplate = createAction(
  `${api} Create Carplate`,
  props<{ carplate: any }>()
);

export const createCarplateSuccess = createAction(
  `${api} Create Carplate Success`,
  props<{ carplate: any }>()
);

export const createCarplateFailure = createAction(
  `${api} Create Carplate Failure`,
  props<{ error: any }>()
);

export const updateCarplate = createAction(
  `${api} Update Carplate`,
  props<{ id: any; carplate: any }>()
);

export const updateCarplateSuccess = createAction(
  `${api} Update Carplate Success`,
  props<{ carplate: any }>()
);

export const updateCarplateFailure = createAction(
  `${api} Update Carplate Failure`,
  props<{ error: any }>()
);

export const deleteCarplate = createAction(
  `${api} Delete Carplate`,
  props<{ id: any }>()
);

export const deleteCarplateSuccess = createAction(
  `${api} Delete Carplate Success`,
  props<{ id: any }>()
);

export const deleteCarplateFailure = createAction(
  `${api} Delete Carplate Failure`,
  props<{ error: any }>()
);

export const clearCarplates = createAction(`${api} Clear Carplates`);
export const clearCarplatesError = createAction(`${api} Clear Carplates Error`);
