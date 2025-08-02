import { useCallback, useState } from 'react';
import type {
  AppContextType,
  AppProviderProps,
  CalculatedPages,
} from './types';
import { APP_ROUTES, AppContext, DEFAULT_PAGE } from './constants';
import { useNavigate } from 'react-router';

export function AppProvider(props: AppProviderProps) {
  const navigate = useNavigate();

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
  const resetUrl = useCallback(() => {
    navigate(APP_ROUTES.app, { replace: false });
  }, [navigate]);
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
    resetUrl,
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
