import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from '../store/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

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

export function useUpdateLocation() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const params = useMemo(() => {
    if (!searchParams) {
      return { page: null, details: null };
    }
    return {
      page: searchParams.get('page') ?? null,
      details: searchParams.get('details') ?? null,
    };
  }, [searchParams]);

  const updateParam = (param: string, value: string): string => {
    if (!searchParams) return '';
    const copyParams = new URLSearchParams(searchParams);
    copyParams.set(param, value);
    return `?${copyParams.toString()}`;
  };

  const removeParam = (param: string): string => {
    if (!searchParams) return '';
    const copyParams = new URLSearchParams(searchParams);
    copyParams.delete(param);
    return `?${copyParams.toString()}`;
  };

  const deleteDetails = () => {
    navigate.replace(removeParam('details'));
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
