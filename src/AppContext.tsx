import { useCallback, useState } from 'react';
import type {
  AppContextType,
  AppProviderProps,
  CalculatedPages,
} from './types';
import type { Character } from 'rickmortyapi';
import { APP_ROUTES, AppContext } from './constants';
import { useNavigate } from 'react-router';

export function AppProvider(props: AppProviderProps) {
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [pages, setPages] = useState<CalculatedPages>({
    pageNext: null,
    pagePrev: null,
  });

  const closeDetails = useCallback(() => {
    setCharacter(undefined);
  }, []);
  const updateCurrentPage = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);
  const updateCharacter = useCallback((value: Character | undefined) => {
    setCharacter(value);
  }, []);
  const updatePages = useCallback((value: CalculatedPages) => {
    setPages((prev) => ({ ...prev, ...value }));
  }, []);
  const resetUrl = useCallback(() => {
    navigate(APP_ROUTES.home, { replace: false });
  }, []);
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
  };
  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
}
