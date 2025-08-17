import React, { useContext } from 'react';
import { MyButton } from './MyButton.tsx';
import type { PaginationProps } from './types.ts';
import { AppContext, DEFAULT_PAGE, KEY_PREV_PAGE } from '../constants.ts';
import { stopEvent } from '../api/utils.ts';
import { useLocalStorage, useUpdateLocation } from '../hooks/hooks.ts';
import { useRouter } from '../../i18n/navigation.ts';
import { useDispatch } from 'react-redux';
import { rickMortyApi } from '../services/rickMorty.ts';
import { useTranslations } from 'next-intl';

export function Pagination(props: PaginationProps) {
  const navigate = useRouter();
  const { isVisible, searchParams } = props;
  const context = useContext(AppContext);
  const { setStorageValue } = useLocalStorage();
  const updatePrevPage = (value: string) =>
    setStorageValue(KEY_PREV_PAGE, value);

  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(
      rickMortyApi.util.invalidateTags([
        { type: 'Characters', id: JSON.stringify(searchParams) },
      ])
    );
  };

  const { pagePrev, pageNext } = context?.pages ?? {
    pageNext: null,
    pagePrev: null,
  };
  const { updateParam } = useUpdateLocation();
  const isDisabledPrev = pagePrev === null;
  const isDisabledNext = pagePrev === pageNext || pageNext === null;

  const handleStep = (
    event: React.MouseEvent<HTMLButtonElement>,
    action: 'Prev' | 'Next'
  ) => {
    stopEvent(event);
    let url: string = '';
    switch (action) {
      case 'Next':
        if (pageNext !== null) {
          updatePrevPage(pageNext.toString());
        }
        url = updateParam(
          'page',
          pageNext?.toString() || DEFAULT_PAGE.toString()
        );

        break;
      case 'Prev':
        if (pagePrev !== null) {
          updatePrevPage(pagePrev.toString());
          url = updateParam(
            'page',
            pagePrev?.toString() || DEFAULT_PAGE.toString()
          );
        }
        break;
      default:
        break;
    }
    navigate.push(url);
  };

  const t = useTranslations('Pagination');
  return (
    <div className={isVisible ? 'flex gap-2' : 'hidden'}>
      <MyButton text={t('refresh-page')} onClick={handleUpdate} />
      <MyButton
        text={t('prev')}
        isDisabled={isDisabledPrev}
        additiveStyle={isDisabledPrev ? 'opacity-50 cursor-not-allowed' : ''}
        onClick={(e) => handleStep(e, 'Prev')}
      />
      <MyButton
        text={t('next')}
        isDisabled={isDisabledNext}
        additiveStyle={isDisabledNext ? 'opacity-50 cursor-not-allowed' : ''}
        onClick={(e) => handleStep(e, 'Next')}
      />
    </div>
  );
}
