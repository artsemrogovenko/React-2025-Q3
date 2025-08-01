import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getFavorites, unselectAll } from '../store/favoritesSlice';
import { MyButton } from './MyButton';

export function FavoritesModal() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);

  const unselect = () => {
    dispatch(unselectAll());
  };

  if (!favorites.length) return null;

  return (
    <div className="flex flex-col rounded-lg sticky border-2 bottom-8 right-2 z-2  p-2 self-end gap-2 bg-white">
      <MyButton text="Unselect all" onClick={unselect} className="m-0" />
      <MyButton text="Download" className="m-0" />
    </div>
  );
}
