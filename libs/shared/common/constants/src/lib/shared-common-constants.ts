import { InjectionToken } from '@angular/core';
import { DefaultModalSize } from '@shared/common/enums';

export const BASE_API_TOKEN = new InjectionToken<string>('Base API');

export const API_URL = 'http://localhost:8080/api';

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 3;

export const defaultPaginationFilters = {
  page: DEFAULT_PAGE,
  size: DEFAULT_ITEMS_PER_PAGE,
};

export const defaultSmallModalOptions = {
  animations: {
    modal: {
      enter: 'enter-slide-down 0.8s',
    },
    overlay: {
      enter: 'fade-in 0.8s',
      leave: 'fade-out 0.3s forwards',
    },
  },
  size: {
    width: DefaultModalSize.Small,
  },
};
