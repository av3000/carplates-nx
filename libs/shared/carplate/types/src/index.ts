import { PaginationFiltersParams } from '@shared/common/types';

export interface Carplate extends CarplateParameters {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarplateParameters {
  plate_name: string;
  owner: string;
}

export interface CarplateUpdateParameters {
  plate_name?: string;
  owner?: string;
}

export interface CarplateFilters extends PaginationFiltersParams {
  plate_name?: string;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
}
