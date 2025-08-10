import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getFavorites, unselectAll } from '../store/favoritesSlice';
import { MyButton } from './MyButton';
import { downloadCsv } from '../api/utils.ts';
import { useContext, useRef } from 'react';
import { AppContext } from '../constants.ts';

export function FavoritesModal() {
  const context = useContext(AppContext);
  const isDefaultTheme = context.isDefaultTheme;
  const themeStyle = !isDefaultTheme ? 'text-black' : '';

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);
  const count = favorites.length;
  const link = useRef<HTMLAnchorElement>(null);

  const unselect = () => {
    dispatch(unselectAll());
  };

  if (!favorites.length) return null;

  return (
    <div
      data-testid="favorites-modal"
      className="flex flex-col rounded-lg sticky border-2 bottom-8 right-2 z-2  p-2 self-end gap-2 bg-white"
    >
      <span className={`text-xl ${themeStyle}`}>
        {count} items
        <br /> selected
      </span>
      <MyButton text="Unselect all" onClick={unselect} className="m-0" />
      <MyButton
        text="Download"
        onClick={() => downloadCsv(link, favorites, count)}
        className="m-0"
      />
      <a ref={link} target={'_blank'} className="hidden" />
    </div>
  );
}
