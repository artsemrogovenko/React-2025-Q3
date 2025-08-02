import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getFavorites, unselectAll } from '../store/favoritesSlice';
import { MyButton } from './MyButton';
import { makeCsv } from '../api/utils.ts';
import { useRef } from 'react';

export function FavoritesModal() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);
  const count = favorites.length;
  const link = useRef<HTMLAnchorElement>(null);

  const unselect = () => {
    dispatch(unselectAll());
  };

  const download = () => {
    const blob = makeCsv(favorites);
    const url = URL.createObjectURL(blob);

    if (link.current) {
      link.current.href = url;
      link.current.download = `${count}_items.csv`;
      link.current.click();
    }
    URL.revokeObjectURL(url);
  };
  if (!favorites.length) return null;

  return (
    <div className="flex flex-col rounded-lg sticky border-2 bottom-8 right-2 z-2  p-2 self-end gap-2 bg-white">
      <span className="text-xl">
        {count} items
        <br /> selected
      </span>
      <MyButton text="Unselect all" onClick={unselect} className="m-0" />
      <MyButton text="Download" onClick={download} className="m-0" />
      <a ref={link} target={'_blank'} className="hidden" />
    </div>
  );
}
