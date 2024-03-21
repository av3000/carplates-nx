import { Carplate } from '@shared/carplate/types';
import {
  PaginatedData,
  PaginatedList,
  PaginationRange,
} from '@shared/common/types';

const DEFAULT_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE = 3;

export const getPagination = (
  page: number = DEFAULT_PAGE,
  size: number = DEFAULT_ITEMS_PER_PAGE
): PaginationRange => {
  const limit = +size;
  const offset = (page - 1) * limit;

  return { limit, offset };
};

export const getPagingData = (
  data: PaginatedData<Carplate>,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_ITEMS_PER_PAGE
): PaginatedList<Carplate> => {
  const { count, rows } = data;
  const perPage = limit;
  const currentPage = page;
  const totalPages = Math.ceil(count / limit);

  return { count, perPage, totalPages, currentPage, rows };
};
