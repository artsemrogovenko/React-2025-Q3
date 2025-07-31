import './App.css';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Controls } from './controls/Controls';
import { Results } from './results/Results';
import { AppContext, DEFAULT_PAGE, FLEX_STYLE_ROUNDED } from './constants';
import { Header } from './components/Header.tsx';
import {
  calculatePages,
  getCharacterDetails,
  useLocalStorage,
  useRequest,
  useUpdateLocation,
} from './api/utils';
import { Pagination } from './components/Pagination';
import { type Character, getCharacters, type Info } from 'rickmortyapi';
import { DetailsHandler } from './details/DetailsHandler.tsx';

function App() {
  const { results, isLoading, error, requestData } =
    useRequest<Info<Character[]>>();
  const context = useContext(AppContext);
  const [isFetchDetails, setIsFetchDetails] = useState<boolean>(false);
  const { updateParam, page, details } = useUpdateLocation();
  const { prevSearch, updatePrevSearch } = useLocalStorage();

  const handleSubmit = async (query?: string): Promise<void> => {
    const searchObj = { name: '', page: DEFAULT_PAGE };
    if (query !== undefined) updatePrevSearch(query);
    if (page) searchObj.page = Number(page);
    searchObj.name = query || prevSearch;
    await requestData(() => getCharacters(searchObj));
  };

  const handleDetails = async (): Promise<void> => {
    setIsFetchDetails(true);
    const detailCharacter = await getCharacterDetails(details);
    context?.updateCharacter(detailCharacter);
    setIsFetchDetails(false);
  };

  useEffect(() => {
    handleSubmit();
  }, [page]);

  useEffect(() => {
    if (details) {
      updateParam('details', details);
      handleDetails();
    }
  }, [details]);

  useEffect(() => {
    const info = results?.data.info;
    context?.updatePages(calculatePages(info));
  }, [results]);

  const visiblePagination = useMemo(
    () =>
      results?.data !== null &&
      Boolean(results?.data.results?.length) &&
      !error,
    [error, results?.data]
  );

  const characterView = context?.character ?? ({} as Character);
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
        {context?.isVisibleDetails && (
          <DetailsHandler
            character={characterView}
            isLoading={isFetchDetails}
          />
        )}
      </div>
      <Pagination isVisible={visiblePagination} />
    </div>
  );
}

export default App;
