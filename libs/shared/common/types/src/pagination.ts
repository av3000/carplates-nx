export interface PaginatedList<T> {
  count: number;
  totalPages: number;
  currentPage: number;
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
