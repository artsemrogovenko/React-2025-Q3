import React from 'react';
import { getPrevQuery, setSearchQuery } from '../api/utils';
import { SubmitButton } from './SubmitButton';
import { ClearButton } from './ClearButton';
import type { ControlsProps, ControlsState } from './types';

export class Controls extends React.Component<ControlsProps, ControlsState> {
  state: ControlsState;
  MAX_SEARCH_LENGTH = 30;
  constructor(props: ControlsProps) {
    super(props);
    this.state = {
      searchQuery: getPrevQuery(),
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSearchQuery(this.state.searchQuery);
    return this.props.onSubmit(this.state.searchQuery);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  resetInput = () => {
    this.setState({ searchQuery: '' });
    setSearchQuery('');
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      this.resetInput();
    }
  };

  render() {
    return (
      <form
        data-testid="character-search-form"
        className="flex  p-6 rounded-lg border-2 max-w-sm text-center"
        onSubmit={this.handleSearch}
      >
        <div className="relative flex-1">
          <input
            data-testid="character-search-input"
            type="text"
            maxLength={this.MAX_SEARCH_LENGTH}
            placeholder="Search Input Field"
            className="w-full border-2 rounded-l-sm h-[45px] px-4 pr-8"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
          {this.state.searchQuery && <ClearButton reset={this.resetInput} />}
        </div>
        <SubmitButton />
      </form>
    );
  }
}
