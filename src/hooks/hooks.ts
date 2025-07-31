import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { ApiResponse } from 'rickmortyapi';
import { NOT_FOUND_MSG, SUCCESS } from '../constants';
import type { RequestState } from '../types';

export function useLocalStorage() {
  const [prevSearch, setPrevSearch] = useState<string>(
    () => localStorage.getItem('prevSearch') ?? ''
  );
  const [prevPage, setPrevPage] = useState<string>(
    () => localStorage.getItem('prevPage') ?? ''
  );

  const updatePrevSearch = useCallback((text: string) => {
    const value = text.trim();
    setPrevSearch(() => {
      localStorage.setItem('prevSearch', value);
      return value;
    });
  }, []);
  const updatePrevPage = useCallback((page: string | number) => {
    let value: string = '';
    if (typeof page === 'number') {
      value = !isNaN(page) ? page.toString() : '';
    } else value = page;

    setPrevPage(() => {
      localStorage.setItem('prevPage', value);
      return value;
    });
  }, []);
  return { prevSearch, prevPage, updatePrevPage, updatePrevSearch };
}

export function useRequest<T>() {
  const [state, setState] = useState<RequestState<ApiResponse<T>>>({
    results: null,
    isLoading: false,
    error: null,
  });

  const updateState = useCallback(
    (values: Partial<RequestState<ApiResponse<T>>>) => {
      setState((prevState) => ({
        ...prevState,
        ...values,
      }));
    },
    []
  );

  const requestData = useCallback(
    async (handlerData: () => Promise<ApiResponse<T>>): Promise<void> => {
      updateState({ error: '' });

      try {
        updateState({ isLoading: true });

        const data = await handlerData();
        if (data.status !== SUCCESS) {
          updateState({ error: NOT_FOUND_MSG });
          return;
        }
        updateState({
          results: data,
          error: null,
        });
      } catch (error) {
        if (error instanceof Error)
          updateState({
            error: error.message,
            isLoading: false,
          });
      } finally {
        updateState({ isLoading: false });
      }
    },
    [updateState]
  );

  return { ...state, requestData };
}

export function useUpdateLocation() {
  const [searchParams, setSearchParams] = useSearchParams();
  let page: string | null = null;
  let details: string | null = null;

  const updateParam = (param: string, value: string) => {
    const copyParams = new URLSearchParams(searchParams);
    copyParams.set(param, value);
    setSearchParams(copyParams);
  };

  const removeParam = useCallback(
    (param: string) => {
      const copyParams = new URLSearchParams(searchParams);
      copyParams.delete(param);
      setSearchParams(copyParams);
    },
    [searchParams, setSearchParams]
  );

  if (page !== searchParams.get('page')) page = searchParams.get('page');

  if (details !== searchParams.get('details'))
    details = searchParams.get('details');

  return { searchParams, updateParam, page, details, removeParam };
}
