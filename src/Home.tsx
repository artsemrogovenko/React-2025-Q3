import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { calculatePages, getErrorMessage } from './api/utils';
import { Pagination } from './components/Pagination';
import { AppContext, DEFAULT_PAGE, KEY_PREV_QUERY } from './constants';
import { Controls } from './controls/Controls';
import { DetailsHandler } from './details/DetailsHandler';
import { useLocalStorage, useUpdateLocation } from './hooks/hooks';
import { Results } from './results/Results';
import { useGetCharactersQuery } from './services/rickMorty.ts';

export function Home() {
  // const { results, isLoading, error, requestData } =
  //   useRequest<Info<Character[]>>();

  const context = useContext(AppContext);
  const { page, details } = useUpdateLocation();
  const { getStorageValue, setStorageValue } = useLocalStorage();
  const prevSearch = getStorageValue(KEY_PREV_QUERY);
  const [searchParams, setSearchParams] = useState({
    name: prevSearch,
    page: DEFAULT_PAGE,
  });
  const {
    data: results,
    isFetching,
    error,
  } = useGetCharactersQuery(searchParams);
  const updatePrevSearch = (value: string) =>
    setStorageValue(KEY_PREV_QUERY, value);

  const handleSubmit = useCallback(
    async (query?: string): Promise<void> => {
      const searchObj = { name: '', page: DEFAULT_PAGE };
      if (query !== undefined) updatePrevSearch(query);
      if (page) searchObj.page = Number(page);
      searchObj.name = query ?? prevSearch;
      setSearchParams((prev) => ({ ...prev, ...searchObj }));
    },
    [page]
  );

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
  const errorMsg = getErrorMessage(error);
  return (
    <>
      <Controls onSubmit={handleSubmit} />
      <Pagination isVisible={visiblePagination} />
      <div className="flex justify-center w-full gap-x-[20px]">
        <Results
          data={results ? results.data : null}
          error={errorMsg}
          loading={isFetching}
          searchParams={searchParams}
        />
        {details && <DetailsHandler />}
      </div>
      <Pagination isVisible={visiblePagination} />
    </>
  );
}
