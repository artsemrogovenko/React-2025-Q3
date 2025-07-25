import { createContext } from 'react';
import type { AppContextType } from './types';

export const SUCCESS = 200;
export const NOT_FOUND = 404;
export const NOT_FOUND_MSG = 'No characters found';
export const MAX_SEARCH_LENGTH = 30;

export const FLEX_STYLE_ROUNDED = 'flex p-6 rounded-lg border-2';
export const testError = () => {
  throw new Error('На что я жмал?');
};

export const AppContext = createContext<AppContextType | null>(null);
