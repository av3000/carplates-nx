import { InjectionToken } from '@angular/core';

export const BASE_API_TOKEN = new InjectionToken<string>('Base API');

export const API_URL = 'http://localhost:8080/api';

export const DEFAULT_PAGE = 0;
export const DEFAULT_ITEMS_PER_PAGE = 3;

export const defaultPaginationFilters = {
  page: DEFAULT_PAGE,
  size: DEFAULT_ITEMS_PER_PAGE,
};
