import './App.css';
import { useEffect } from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { FLEX_STYLE_ROUNDED } from './constants';
import { AppTitle } from './components/AppTitle';
import { getPrevQuery, useRequestCharacter } from './api/utils';
import { Details } from './pages/Details';
import { Pagination } from './components/Pagination';

function App() {
  const { results, isLoading, error, requestCharacter } = useRequestCharacter();

  useEffect(() => {
    requestCharacter(getPrevQuery());
  }, [requestCharacter]);

  const handleSubmit = async (query: string): Promise<void> => {
    await requestCharacter(query);
  };

  const visiblePagination =
    results !== null && Boolean(results.data.results?.length);
  return (
    <div
      className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-w-2xl mx-auto gap-[20px] items-center`}
    >
      <AppTitle />
      <Controls onSubmit={handleSubmit} />
      <Pagination isVisible={visiblePagination} />
      <div className="flex justify-center w-full gap-x-[20px]">
        <Results
          data={results && results.data}
          error={error}
          loading={isLoading}
        />
        <Details />
      </div>
      <Pagination isVisible={visiblePagination} />
    </div>
  );
}

export default App;
