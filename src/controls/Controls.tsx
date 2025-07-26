import React, { useState } from 'react';
import { getPrevQuery, setSearchQuery } from '../api/utils';
import { SubmitButton } from './SubmitButton';
import { ClearButton } from './ClearButton';
import type { ControlsProps } from './types';
import { FLEX_STYLE_ROUNDED, MAX_SEARCH_LENGTH } from '../constants';

export function Controls(props: ControlsProps) {
  const [query, setQuery] = useState(getPrevQuery());

  const handleSearch = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setSearchQuery(query);
    return props.onSubmit(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const resetInput = () => {
    setQuery('');
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      resetInput();
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
        />
        {query && <ClearButton reset={resetInput} />}
      </div>
      <SubmitButton />
    </form>
  );
}
