import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { AppContext, FLEX_STYLE_ROUNDED } from './constants';
import { Header } from './components/Header.tsx';
import {
  calculatePages,
  getCharacterDetails,
  useRequest,
  useUpdateLocation,
} from './api/utils';
import { Pagination } from './components/Pagination';
import { type Character, getCharacters, type Info } from 'rickmortyapi';
import { DetailsHandler } from './pages/DetailsHandler.tsx';

function App() {
  const { results, isLoading, error, requestData } =
    useRequest<Info<Character[]>>();
  const context = useContext(AppContext);
  const [fetchDetails, setFetchDetails] = useState<boolean>(false);
  const { updateParam, page, details } = useUpdateLocation();

  const handleSubmit = async (query?: string): Promise<void> => {
    const wishName = query ?? '';
    const wishPage = Number(page ?? 1);
    await requestData(() => getCharacters({ name: wishName, page: wishPage }));
  };

  const handleDetails = async (): Promise<void> => {
    try {
      setFetchDetails(true);
      const detail = await getCharacterDetails(Number(details));
      context?.updateCharacter(detail);
      if (details) updateParam('details', details);
    } finally {
      setFetchDetails(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [page]);

  useEffect(() => {
    if (details) handleDetails();
  }, [details]);

  useEffect(() => {
    const info = results?.data.info;
    context?.updatePages(calculatePages(info));
  }, [results]);

  const visiblePagination =
    results?.data !== null && Boolean(results?.data.results?.length) && !error;

  const characterView = context?.character ?? null;
  return (
    <div
      className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-w-2xl mx-auto gap-[20px] items-center`}
    >
      <Header />
      <Controls onSubmit={handleSubmit} />
      <Pagination isVisible={visiblePagination} />
      <div className="flex justify-center w-full gap-x-[20px]">
        <Results
          data={results && results.data}
          error={error}
          loading={isLoading}
        />
        {characterView !== null && (
          <DetailsHandler character={characterView} isLoading={fetchDetails} />
        )}
      </div>
      <Pagination isVisible={visiblePagination} />
    </div>
  );
}

export default App;
