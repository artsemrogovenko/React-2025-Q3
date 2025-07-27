import React, { useState } from 'react';

import { useLocalStorage } from '../api/utils';
import { ClearButton } from './ClearButton';
import { SubmitButton } from './SubmitButton';

import type { ControlsProps } from './types';
import { FLEX_STYLE_ROUNDED, MAX_SEARCH_LENGTH } from '../constants';

export function Controls(props: ControlsProps) {
  const { prevSearch } = useLocalStorage();
  const [query, setQuery] = useState(prevSearch);

  const handleSearch = async (
    event?: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    return props.onSubmit(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const resetInput = (
    e?:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
          className="w-full border-2 rounded-l-sm h-[45px] px-4 pr-8"
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
