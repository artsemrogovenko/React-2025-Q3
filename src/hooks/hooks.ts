import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
