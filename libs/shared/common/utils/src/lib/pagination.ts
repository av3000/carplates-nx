// TODO: Fix default page to count from 1

import { Carplate } from '@shared/carplate/types';
import {
  PaginatedData,
  PaginatedList,
  PaginationRange,
} from '@shared/common/types';

const DEFAULT_PAGE = 0;
const DEFAULT_ITEMS_PER_PAGE = 3;

export const getPagination = (
  page: number = DEFAULT_PAGE,
  size: number = DEFAULT_ITEMS_PER_PAGE
): PaginationRange => {
  const limit = +size;
  const offset = page * limit;

  return { limit, offset };
};

export const getPagingData = (
  data: PaginatedData<Carplate>,
  page: number,
  limit: number
): PaginatedList<Carplate> => {
  const { count, rows } = data;
  const perPage = limit;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit);

  return { count, perPage, totalPages, currentPage, rows };
};
