import React, { type SyntheticEvent, useContext, useState } from 'react';
import { stopEvent } from '../api/utils';
import { ClearButton } from './ClearButton';
import { SubmitButton } from './SubmitButton';
import type { ControlsProps } from './types';
import {
  AppContext,
  FLEX_STYLE_ROUNDED,
  KEY_PREV_QUERY,
  MAX_SEARCH_LENGTH,
} from '../constants';
import { useLocalStorage } from '../hooks/hooks';

export function Controls(props: ControlsProps) {
  const context = useContext(AppContext);
  const isDefaultTheme = context.isDefaultTheme;
  const themeStyle = !isDefaultTheme ? 'text-gray-300 font-bold' : '';

  const { getStorageValue } = useLocalStorage();
  const prevSearch = getStorageValue(KEY_PREV_QUERY);
  const [query, setQuery] = useState(prevSearch);

  const handleSearch = async (
    event?: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    if (event) {
      stopEvent(event);
    }
    return props.onSubmit(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const resetInput = <T extends Event | SyntheticEvent>(e?: T) => {
    e?.stopPropagation();
    setQuery('');
    props.onSubmit('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      resetInput(e);
    }
  };

  return (
    <form
      data-testid="character-search-form"
      className={`${FLEX_STYLE_ROUNDED} max-w-sm text-center`}
      onSubmit={handleSearch}
    >
      <div className="relative flex-1">
        <input
          data-testid="character-search-input"
          type="text"
          maxLength={MAX_SEARCH_LENGTH}
          placeholder="Search Input Field"
          className={`w-full border-2 rounded-l-sm h-[45px] px-4 pr-8 ${themeStyle}`}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
        {query && <ClearButton reset={resetInput} />}
      </div>
      <SubmitButton />
    </form>
  );
}
