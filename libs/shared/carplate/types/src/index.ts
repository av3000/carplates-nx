import { PaginationFiltersParams } from 'libs/shared/common/types/src/pagination';

export interface Carplate extends CarplateParameters {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarplateParameters {
  plate_name: string;
  owner: string;
}

export interface CarplateFilters extends PaginationFiltersParams {
  plate_name?: string;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
}
