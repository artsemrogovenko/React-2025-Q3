import { useCallback, useState } from 'react';
import type {
  AppContextType,
  AppProviderProps,
  CalculatedPages,
} from './types';
import type { Character } from 'rickmortyapi';
import { AppContext } from './constants';

export function AppProvider(props: AppProviderProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [pages, setPages] = useState<CalculatedPages>({
    pageNext: null,
    pagePrev: null,
  });
  console.log(pages);
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
    setPages(value);
  }, []);

  const values: AppContextType = {
    currentPage,
    updateCurrentPage,
    character,
    updateCharacter,
    closeDetails,
    pages,
    updatePages,
  };
  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
}
