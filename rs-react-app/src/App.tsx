import './App.css';
import React from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { ErrorBoundary } from './components/ErrorBoundary';
import {
  getCharacters,
  type ApiResponse,
  type Character,
  type Info,
} from 'rickmortyapi';
import { getPrevQuery } from './api/utils';

type AppProps = Record<string, never>;

interface AppState {
  results: ApiResponse<Info<Character[]>> | null;
  isLoading: boolean;
  error: string | null;
  query: string;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    results: null,
    isLoading: false,
    error: null,
    query: '',
  };

  async componentDidMount() {
    await this.requestCharacter(getPrevQuery().trim());
  }

  async requestCharacter(query: string): Promise<void> {
    try {
      this.setState({ isLoading: true });
      const characters = await getCharacters({ name: query.trim() });
      this.setState({ results: characters, isLoading: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    } finally {
      this.setState({ query: query.trim() });
    }
  }

  render() {
    const { results, isLoading, error } = this.state;

    return (
      <div className="flex flex-col p-4 max-w-2xl mx-auto border-2 border-b-blue-900 gap-[20px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Rick and Morty App
        </h2>
        <Controls onSubmit={this.requestCharacter.bind(this)} />
        <ErrorBoundary>
          <Results
            data={results && results.data}
            error={error}
            loading={isLoading}
          />
          <button
            onClick={() => {
              throw new Error('Test error');
            }}
            className="mt-4 px-4 py-2 rounded"
          >
            Error Button
          </button>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
