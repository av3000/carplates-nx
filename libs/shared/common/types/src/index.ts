import {
  PaginatedData,
  PaginationRange,
  PaginatedList,
  PaginationFiltersParams,
  Pagination,
} from './pagination';
import { ErrorResponse } from './error';

export {
  PaginatedData,
  PaginationRange,
  PaginatedList,
  PaginationFiltersParams,
  Pagination,
};
export { ErrorResponse };

export interface ExpressEnvironment {
  production: boolean;
  apiUrl: string;
  port: string;
  sentryDsn: string;
}

export interface AngularEnvironment {
  production: boolean;
  apiUrl: string;
  port: string;
  sentryDsn: string;
}
