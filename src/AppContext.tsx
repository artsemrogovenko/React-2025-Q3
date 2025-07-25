import { useState } from 'react';
import type { AppContextType, AppProviderProps } from './types';
import type { Character } from 'rickmortyapi';
import { AppContext } from './constants';

export function AppProvider(props: AppProviderProps) {
  const [page, setPage] = useState<number>(1);
  const [character, setCharacter] = useState<Character | undefined>(undefined);

  const closeDetails = () => setCharacter(undefined);
  const updatePage = (value: number) => setPage(value);
  const updateCharacter = (value: Character | undefined) => setCharacter(value);

  const values: AppContextType = {
    page,
    updatePage,
    character,
    updateCharacter,
    closeDetails,
  };
  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
}
