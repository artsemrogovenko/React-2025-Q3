import './App.css';
import { useEffect, useState } from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { FLEX_STYLE_ROUNDED, testError } from './constants';
import { AppTitle } from './components/AppTitle';
import { ErrorButton } from './components/ErrorButton';
import { getPrevQuery, useRequestCharacter } from './api/utils';
import { Details } from './pages/Details';

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
    <div
      className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-w-2xl mx-auto gap-[20px] items-center`}
    >
      <AppTitle />
      <Controls onSubmit={handleSubmit} />
      <div className="flex justify-center w-full gap-x-[20px]">
        <Results
          data={results && results.data}
          error={error}
          loading={isLoading}
        />
        <Details />
      </div>
      <ErrorButton onClick={throwError} />
    </div>
  );
}

export default App;
