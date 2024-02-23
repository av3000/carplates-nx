// TODO: Fix default page to count from 1

import { Carplate } from '@shared/carplate/types';
import {
  PaginatedData,
  PaginatedList,
  PaginationRange,
} from '@shared/common/types';

const DEFAULT_PAGE = 0;
const DEFAULT_ITEMS_PER_PAGE = 3;

export const getPagination = (page: number, size: number): PaginationRange => {
  const limit = size ? +size : DEFAULT_ITEMS_PER_PAGE;
  const offset = page ? page * limit : DEFAULT_PAGE;

  return { limit, offset };
};

export const getPagingData = (
  data: PaginatedData<Carplate>,
  page: number,
  limit: number
): PaginatedList<Carplate> => {
  const { count, rows } = data;
  const currentPage = page ? +page : DEFAULT_PAGE;
  const totalPages = Math.ceil(count / limit);

  return { count, totalPages, currentPage, rows };
};
