import './App.css';
import { useEffect, useState } from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { testError } from './constants';
import { AppTitle } from './components/AppTitle';
import { ErrorButton } from './components/ErrorButton';
import { getPrevQuery, useRequestCharacter } from './api/utils';

function App() {
  const [fall, setFall] = useState<boolean>(false);
  const { results, isLoading, error, requestCharacter } = useRequestCharacter();

  useEffect(() => {
    requestCharacter(getPrevQuery());
  }, [requestCharacter]);

  const throwError = () => setFall(true);
  const resetError = () => setFall(false);
  const handleSubmit = async (query: string): Promise<void> => {
    resetError();
    await requestCharacter(query);
  };

  if (fall) testError();

  return (
    <div className="flex flex-col p-4 max-w-2xl mx-auto border-2 border-b-blue-900 gap-[20px]">
      <AppTitle />
      <Controls onSubmit={handleSubmit} />
      <Results
        data={results && results.data}
        error={error}
        loading={isLoading}
      />
      <ErrorButton onClick={throwError} />
    </div>
  );
}

export default App;
