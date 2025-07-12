import './App.css';
import React from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { ErrorBoundary } from './components/Errorboundary';

class App extends React.Component {
  render() {
    return (
      <div className="flex flex-col p-4 max-w-2xl mx-auto border-2 border-b-blue-900 gap-[20px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Rick and Morty App
        </h2>
        <Controls />
        <ErrorBoundary>
          <Results />
          <button
            onClick={() => {
              throw new Error('Test error');
            }}
            className="mt-4 px-4 py-2 bg-red-500  rounded"
          >
            Generate error
          </button>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
