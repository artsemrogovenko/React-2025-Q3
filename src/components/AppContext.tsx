'use client';
import { useCallback, useState } from 'react';
import type {
  AppContextType,
  AppProviderProps,
  CalculatedPages,
} from './types';
import { AppContext, DEFAULT_PAGE } from './constants';

export function AppProvider(props: AppProviderProps) {
  const [isDefaultTheme, setIsDefaultTheme] = useState<boolean>(true);
  const [isVisibleDetails, setIsVisibleDetails] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [pages, setPages] = useState<CalculatedPages>({
    pageNext: null,
    pagePrev: null,
  });

  const closeDetails = useCallback(() => {
    setIsVisibleDetails(false);
  }, []);
  const updateCurrentPage = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);
  const showDetails = useCallback(() => {
    setIsVisibleDetails(true);
  }, []);
  const updatePages = useCallback((value: CalculatedPages) => {
    setPages((prev) => ({ ...prev, ...value }));
  }, []);
  const updateQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);
  const toggleTheme = useCallback(() => {
    setIsDefaultTheme((prev) => !prev);
  }, []);

  const values: AppContextType = {
    currentPage,
    updateCurrentPage,
    showDetails,
    closeDetails,
    pages,
    updatePages,
    query,
    updateQuery,
    isVisibleDetails,
    toggleTheme,
    isDefaultTheme,
  };
  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
}
