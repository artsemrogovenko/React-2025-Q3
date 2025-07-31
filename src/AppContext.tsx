import { useCallback, useState } from 'react';
import type {
  AppContextType,
  AppProviderProps,
  CalculatedPages,
} from './types';
import type { Character } from 'rickmortyapi';
import { APP_ROUTES, AppContext, DEFAULT_PAGE } from './constants';
import { useNavigate } from 'react-router';

export function AppProvider(props: AppProviderProps) {
  const navigate = useNavigate();

  const [isVisibleDetails, setIsVisibleDetails] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [character, setCharacter] = useState<Character | object>({});
  const [pages, setPages] = useState<CalculatedPages>({
    pageNext: null,
    pagePrev: null,
  });

  const closeDetails = useCallback(() => {
    setCharacter({});
    setIsVisibleDetails(false);
  }, []);
  const updateCurrentPage = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);
  const updateCharacter = useCallback((value: Character | object) => {
    setIsVisibleDetails(true);
    setCharacter(value);
  }, []);
  const updatePages = useCallback((value: CalculatedPages) => {
    setPages((prev) => ({ ...prev, ...value }));
  }, []);
  const resetUrl = useCallback(() => {
    navigate(APP_ROUTES.home, { replace: false });
  }, [navigate]);
  const updateQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);
  const values: AppContextType = {
    currentPage,
    updateCurrentPage,
    character,
    updateCharacter,
    closeDetails,
    pages,
    updatePages,
    resetUrl,
    query,
    updateQuery,
    isVisibleDetails,
  };
  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
}
