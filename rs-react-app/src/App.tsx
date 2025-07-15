import './App.css';
import React from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
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
  fall: boolean;
}
const SUCCESS = 200;

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    results: null,
    isLoading: false,
    error: null,
    query: '',
    fall: false,
  };

  async componentDidMount() {
    await this.requestCharacter(getPrevQuery().trim());
  }

  async requestCharacter(query: string): Promise<void> {
    this.resetError();
    try {
      this.setState({ isLoading: true });
      const characters = await getCharacters({ name: query.trim() });
      if (characters.status !== SUCCESS) {
        this.setState({ error: 'No characters found' });
        return;
      }
      this.setState({ results: characters, error: null });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    } finally {
      this.setState({ query: query.trim(), isLoading: false });
    }
  }

  resetError() {
    this.setState({ error: null });
  }

  render() {
    const { results, isLoading, error } = this.state;
    if (this.state.fall) {
      throw new Error('На что я жмал?');
    }
    return (
      <div className="flex flex-col p-4 max-w-2xl mx-auto border-2 border-b-blue-900 gap-[20px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Rick and Morty App
        </h2>
        <Controls onSubmit={this.requestCharacter.bind(this)} />
        <Results
          data={results && results.data}
          error={error}
          loading={isLoading}
        />
        <button
          onClick={() => {
            this.setState({ fall: true });
          }}
          className="mt-4 px-4 py-2 rounded"
        >
          Error Button
        </button>
      </div>
    );
  }
}

export default App;
