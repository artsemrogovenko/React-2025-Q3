import { createContext } from 'react';
import type { AppContextType } from './types';

export const SUCCESS = 200;
export const NOT_FOUND = 404;
export const NOT_FOUND_MSG = 'No characters found';
export const NOT_FOUND_DETAIL = 'Failed to get character more details';
export const MAX_SEARCH_LENGTH = 30;
export const DEFAULT_PAGE = 1;
export const EMPTY_OBJECT = {};

export const FLEX_STYLE_ROUNDED = 'flex p-6 rounded-lg border-2';
export const KEY_PREV_PAGE = 'prevPage';
export const KEY_PREV_QUERY = 'prevSearch';

const DEFAULT_CONTEXT = {
  currentPage: DEFAULT_PAGE,
  pages: {
    pageNext: null,
    pagePrev: null,
  },
  updateCurrentPage: () => {},
  showDetails: () => {},
  closeDetails: () => {},
  updatePages: () => {},
  resetUrl: () => {},
  query: '',
  updateQuery: () => {},
  isVisibleDetails: false,
  toggleTheme: () => {},
  isDefaultTheme: true,
};
export const AppContext = createContext<AppContextType>(DEFAULT_CONTEXT);

export const APP_ROUTES = {
  notFound: '*',
  home: '/',
  about: 'about',
  page: 'page',
  details: 'details',
};

export const BLACK = '#000000';
export const WHITE = '#ffffff';
