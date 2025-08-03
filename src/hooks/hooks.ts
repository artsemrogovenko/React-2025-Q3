import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import type { ApiResponse } from 'rickmortyapi';
import { NOT_FOUND_MSG, SUCCESS } from '../constants';
import type { RequestState } from '../types';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useLocalStorage() {
  const getStorageValue = (key: string) => localStorage.getItem(key) ?? '';
  const setStorageValue = (key: string, value: string) =>
    localStorage.setItem(key, value);
  const clearStorageValues = () => localStorage.clear();
  const deleteStorageValue = (key: string) => localStorage.removeItem(key);

  return {
    getStorageValue,
    setStorageValue,
    clearStorageValues,
    deleteStorageValue,
  };
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useMemo(() => {
    return {
      page: searchParams.get('page') || null,
      details: searchParams.get('details') || null,
    };
  }, [searchParams]);

  const updateParam = (param: string, value: string): string => {
    const copyParams = new URLSearchParams(searchParams);
    copyParams.set(param, value);
    return `?${copyParams.toString()}`;
  };

  const removeParam = (param: string): string => {
    const copyParams = new URLSearchParams(searchParams);
    copyParams.delete(param);
    return `?${copyParams.toString()}`;
  };

  const deleteDetails = () => {
    navigate(removeParam('details'));
  };

  return {
    searchParams,
    updateParam,
    page: params.page,
    details: params.details,
    removeParam,
    navigate,
    deleteDetails,
  };
}
