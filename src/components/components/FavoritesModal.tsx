'use client';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getIds, unselectAll } from '../store/favoritesSlice';
import { MyButton } from './MyButton';
import { useContext, useRef } from 'react';
import { AppContext } from '../constants.ts';
import { useTranslations } from 'next-intl';
import { sendFavorites } from '../../app/[locale]/actions/client.ts';

export function FavoritesModal() {
  const context = useContext(AppContext);
  const isDefaultTheme = context.isDefaultTheme;
  const themeStyle = !isDefaultTheme ? 'text-black' : '';

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getIds);
  const count = favorites.length;
  const link = useRef<HTMLAnchorElement>(null);

  const t = useTranslations('Favorites');
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
        {count} {t('items')}
        <br /> {t('selected')}
      </span>
      <MyButton text={t('unselect')} onClick={unselect} className="m-0" />
      <MyButton
        text={t('download')}
        onClick={() => sendFavorites(favorites, link)}
        className="m-0"
      />
      <a ref={link} target={'_blank'} className="hidden" />
    </div>
  );
}
