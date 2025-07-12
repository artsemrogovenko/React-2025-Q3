import './App.css';
import React from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { ErrorBoundary } from './components/Errorboundary';
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
  loading: boolean;
  error: string | null;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    results: null,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    const searchQuery = getPrevQuery();
    if (searchQuery) {
      try {
        this.setState({ loading: true });
        const characters = await getCharacters({ name: searchQuery });
        this.setState({ results: characters, loading: false });
      } catch (error) {
        this.setState({
          error: error instanceof Error ? error.message : 'Unknown error',
          loading: false,
        });
      }
    }
  }

  render() {
    const { results, loading: isLoading, error } = this.state;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!results) return <div>No results</div>;

    return (
      <div className="flex flex-col p-4 max-w-2xl mx-auto border-2 border-b-blue-900 gap-[20px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Rick and Morty App
        </h2>
        <Controls />
        <ErrorBoundary>
          <Results data={results.data} error={error} loading={isLoading} />
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
