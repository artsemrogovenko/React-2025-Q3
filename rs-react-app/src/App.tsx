import './App.css';
import React from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { getCharacters } from 'rickmortyapi';
import type { AppProps, AppState } from './types';
import { NOT_FOUND_MSG, SUCCESS, testError } from './constants';
import { AppTitle } from './components/AppTitle';
import { ErrorButton } from './components/ErrorButton';
import { getPrevQuery } from './api/utils';

class App extends React.Component<AppProps, AppState> {
  state: AppState;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      results: null,
      isLoading: false,
      error: null,
      query: '',
      fall: false,
    };
    this.requestCharacter = this.requestCharacter.bind(this);
    this.throwError = this.throwError.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  componentDidMount = async (): Promise<void> => {
    await this.requestCharacter(getPrevQuery());
  };

  requestCharacter = async (query: string): Promise<void> => {
    this.resetError();
    const searchQuery = query.trim();
    try {
      this.setState({ isLoading: true });
      const characters = await getCharacters({ name: searchQuery });
      if (characters.status !== SUCCESS) {
        this.setState({ error: NOT_FOUND_MSG });
        return;
      }
      this.setState({ results: characters, error: null });
    } catch (error) {
      if (error instanceof Error)
        this.setState({
          error: error.message,
          isLoading: false,
        });
    } finally {
      this.setState({ query: searchQuery, isLoading: false });
    }
  };

  throwError = () => {
    this.setState({ fall: true });
  };

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    const { results, isLoading, error, fall } = this.state;
    if (fall) testError();

    return (
      <div className="flex flex-col p-4 max-w-2xl mx-auto border-2 border-b-blue-900 gap-[20px]">
        <AppTitle />
        <Controls onSubmit={this.requestCharacter} />
        <Results
          data={results && results.data}
          error={error}
          loading={isLoading}
        />
        <ErrorButton onClick={this.throwError} />
      </div>
    );
  }
}

export default App;
