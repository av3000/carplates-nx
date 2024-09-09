import { Carplate, CarplateFilters } from '@shared/carplate/types';
import { ErrorResponse, PaginatedList } from '@shared/common/types';

export const errorMock: ErrorResponse = {
  error: {
    name: 'Error',
    message: 'An error occurred',
  },
  body: 'request body',
};

export const carplateMock: Carplate = {
  id: '1',
  plate_name: 'ABC123',
  owner: 'John Doe',
  createdAt: new Date().getFullYear().toString(),
  updatedAt: new Date().getFullYear().toString(),
};

export const carplateCreateParamsMock = {
  plate_name: 'ABC123',
  owner: 'John Doe',
};

export const filtersMock: CarplateFilters = {
  size: 10,
  page: 1,
};

export const carplatesListMock: PaginatedList<Carplate> = {
  rows: [
    carplateMock,
    {
      ...carplateMock,
      id: '2',
      plate_name: 'DEF456',
      owner: 'Jane Doe',
    },
  ] as Carplate[],
  currentPage: 1,
  perPage: 10,
  totalPages: 1,
  count: 0,
};
