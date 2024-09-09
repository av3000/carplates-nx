import { createAction, props } from '@ngrx/store';

import {
  Carplate,
  CarplateFilters,
  CarplateParameters,
} from '@shared/carplate/types';
import { ErrorResponse, PaginatedList } from '@shared/common/types';

const api = '[Carplate API]';
export const actionTypes = {
  fetchAllCarplates: `${api} Fetch All Carplates`,
  fetchAllCarplatesSuccess: `${api} Fetch All Carplates Success`,
  fetchAllCarplatesFailure: `${api} Fetch All Carplates Failure`,
  fetchOneCarplate: `${api} Fetch One Carplate`,
  fetchOneCarplateSuccess: `${api} Fetch One Carplate Success`,
  fetchOneCarplateFailure: `${api} Fetch One Carplate Failure`,
  createCarplate: `${api} Create Carplate`,
  createCarplateSuccess: `${api} Create Carplate Success`,
  createCarplateFailure: `${api} Create Carplate Failure`,
  updateCarplate: `${api} Update Carplate`,
  updateCarplateSuccess: `${api} Update Carplate Success`,
  updateCarplateFailure: `${api} Update Carplate Failure`,
  deleteCarplate: `${api} Delete Carplate`,
  deleteCarplateSuccess: `${api} Delete Carplate Success`,
  deleteCarplateFailure: `${api} Delete Carplate Failure`,
  clearCarplates: `${api} Clear Carplates`,
  clearCarplatesError: `${api} Clear Carplates Error`,
};

export const fetchAllCarplates = createAction(
  actionTypes.fetchAllCarplates,
  props<{ filters: CarplateFilters }>()
);

export const fetchAllCarplatesSuccess = createAction(
  actionTypes.fetchAllCarplatesSuccess,
  props<{
    carplatesList: PaginatedList<Carplate>;
  }>()
);

export const fetchAllCarplatesFailure = createAction(
  actionTypes.fetchAllCarplatesFailure,
  props<{ error: ErrorResponse }>()
);

export const fetchOneCarplate = createAction(
  actionTypes.fetchOneCarplate,
  props<{ id: string }>()
);

export const fetchOneCarplateSuccess = createAction(
  actionTypes.fetchOneCarplateSuccess,
  props<{ carplate: Carplate }>()
);

export const fetchOneCarplateFailure = createAction(
  actionTypes.fetchOneCarplateFailure,
  props<{ error: ErrorResponse }>()
);

export const createCarplate = createAction(
  actionTypes.createCarplate,
  props<{ carplateParams: CarplateParameters }>()
);

export const createCarplateSuccess = createAction(
  actionTypes.createCarplateSuccess,
  props<{ carplate: Carplate }>()
);

export const createCarplateFailure = createAction(
  actionTypes.createCarplateFailure,
  props<{ error: ErrorResponse }>()
);

export const updateCarplate = createAction(
  actionTypes.updateCarplate,
  props<{ id: string; carplateParams: CarplateParameters }>()
);

export const updateCarplateSuccess = createAction(
  actionTypes.updateCarplateSuccess,
  props<{ carplate: Carplate }>()
);

export const updateCarplateFailure = createAction(
  actionTypes.updateCarplateFailure,
  props<{ error: ErrorResponse }>()
);

export const deleteCarplate = createAction(
  actionTypes.deleteCarplate,
  props<{ id: string }>()
);

export const deleteCarplateSuccess = createAction(
  actionTypes.deleteCarplateSuccess
);

export const deleteCarplateFailure = createAction(
  actionTypes.deleteCarplateFailure,
  props<{ error: ErrorResponse }>()
);

export const clearCarplates = createAction(actionTypes.clearCarplates);
export const clearCarplatesError = createAction(
  actionTypes.clearCarplatesError
);
