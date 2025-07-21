import React from 'react';
import { getPrevQuery, setSearchQuery } from '../api/utils';

interface ControlsProps {
  onSubmit: (query: string) => Promise<void>;
}
interface ControlsState {
  searchQuery: string;
}

export class Controls extends React.Component<ControlsProps, ControlsState> {
  state: ControlsState;
  constructor(props: ControlsProps) {
    super(props);
    this.state = {
      searchQuery: getPrevQuery(),
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  async handleSearch(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSearchQuery(this.state.searchQuery);
    return this.props.onSubmit(this.state.searchQuery);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchQuery: e.target.value });
  }

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
            maxLength={30}
            placeholder="Search Input Field"
            className="w-full border-2 rounded-l-sm h-[45px] px-4 pr-8"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
          {this.state.searchQuery && (
            <button
              type="reset"
              className="absolute flex items-center justify-center size-[30px] right-2 top-1/2 transform -translate-y-1/2 rounded-full text-gray-500 hover:text-gray-700"
              onClick={this.resetInput}
              aria-label="Clear input"
            >
              x
            </button>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold h-[45px] px-4 rounded rounded-l-none "
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}
