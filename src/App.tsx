import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { AppContext, FLEX_STYLE_ROUNDED } from './constants';
import { AppTitle } from './components/AppTitle';
import {
  calculatePages,
  getCharacterDetails,
  getPrevQuery,
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

  const handleSubmit = async (query: string): Promise<void> => {
    const res = await requestData(() =>
      getCharacters({ name: query, page: Number(page ?? 1) })
    );
    const info = results?.data.info;
    console.log(res);
    context?.updatePages(calculatePages(info));
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
    handleSubmit(getPrevQuery());
  }, []);

  useEffect(() => {
    if (details) handleDetails();
  }, [details]);

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
        {characterView !== null && (
          <DetailsHandler character={characterView} isLoading={fetchDetails} />
        )}
      </div>
      <Pagination isVisible={visiblePagination} />
    </div>
  );
}

export default App;
