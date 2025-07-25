import './App.css';
import { useContext, useEffect } from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { AppContext, FLEX_STYLE_ROUNDED } from './constants';
import { AppTitle } from './components/AppTitle';
import { getPrevQuery, useRequest } from './api/utils';
import { Details } from './pages/Details';
import { Pagination } from './components/Pagination';
import { type Info, type Character, getCharacters } from 'rickmortyapi';

function App() {
  const { results, isLoading, error, requestData } =
    useRequest<Info<Character[]>>();
  const context = useContext(AppContext);

  useEffect(() => {
    requestData(() => getCharacters({ name: getPrevQuery() }));
  }, [requestData]);

  const handleSubmit = async (query: string): Promise<void> => {
    await requestData(() => getCharacters({ name: query }));
  };

  const visiblePagination =
    results !== null && Boolean(results.data.results?.length);

  const characterView = context?.character ?? null;
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
        {characterView !== null && <Details character={characterView} />}
      </div>
      <Pagination isVisible={visiblePagination} />
    </div>
  );
}

export default App;
