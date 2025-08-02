import { useCallback, useContext, useEffect, useMemo } from 'react';
import { type Character, getCharacters, type Info } from 'rickmortyapi';
import { calculatePages } from './api/utils';
import { Pagination } from './components/Pagination';
import { AppContext, DEFAULT_PAGE, KEY_PREV_QUERY } from './constants';
import { Controls } from './controls/Controls';
import { DetailsHandler } from './details/DetailsHandler';
import { useLocalStorage, useRequest, useUpdateLocation } from './hooks/hooks';
import { Results } from './results/Results';

export function Home() {
  const { results, isLoading, error, requestData } =
    useRequest<Info<Character[]>>();

  const context = useContext(AppContext);
  const { page, details } = useUpdateLocation();
  const { getStorageValue, setStorageValue } = useLocalStorage();
  const prevSearch = getStorageValue(KEY_PREV_QUERY);

  const updatePrevSearch = (value: string) =>
    setStorageValue(KEY_PREV_QUERY, value);

  const handleSubmit = useCallback(
    async (query?: string): Promise<void> => {
      const searchObj = { name: '', page: DEFAULT_PAGE };
      if (query !== undefined) updatePrevSearch(query);
      if (page) searchObj.page = Number(page);
      searchObj.name = query ?? prevSearch;
      await requestData(() => getCharacters(searchObj));
    },
    [page, requestData]
  );

  useEffect(() => {
    const rootElement = document.getElementById('root');
    const handleClick = () => {
      context.closeDetails();
    };
    rootElement?.addEventListener('click', handleClick);
    handleSubmit(prevSearch);
    return () => rootElement?.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [page]);

  useEffect(() => {
    const info = results?.data.info;
    context.updatePages(calculatePages(info));
  }, [results?.data.info]);

  const visiblePagination = useMemo(
    () =>
      results?.data !== null &&
      Boolean(results?.data.results?.length) &&
      !error,
    [error, results?.data]
  );

  return (
    <>
      <Controls onSubmit={handleSubmit} />
      <Pagination isVisible={visiblePagination} />
      <div className="flex justify-center w-full gap-x-[20px]">
        <Results
          data={results && results.data}
          error={error}
          loading={isLoading}
        />
        {details && <DetailsHandler />}
      </div>
      <Pagination isVisible={visiblePagination} />
    </>
  );
}
