export interface PaginatedList<T> extends Pagination {
  rows: T[];
}

export interface PaginatedData<T> {
  count: number;
  rows: T[];
}

export interface PaginationRange {
  limit: number;
  offset: number;
}

export interface PaginationFiltersParams {
  page: number;
  size: number;
}

export interface Pagination {
  count: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
}
