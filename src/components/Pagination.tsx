import React, { useContext } from 'react';
import { MyButton } from './MyButton';
import type { PaginationProps } from './types';
import { AppContext, DEFAULT_PAGE, KEY_PREV_PAGE } from '../constants';
import { stopEvent } from '../api/utils';
import { useLocalStorage, useUpdateLocation } from '../hooks/hooks';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { rickMortyApi } from '../services/rickMorty.ts';

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
  return (
    <div className={isVisible ? 'flex gap-2' : 'hidden'}>
      <MyButton text="Refresh page" onClick={handleUpdate} />
      <MyButton
        text="Prev"
        isDisabled={isDisabledPrev}
        additiveStyle={isDisabledPrev ? 'opacity-50 cursor-not-allowed' : ''}
        onClick={(e) => handleStep(e, 'Prev')}
      />
      <MyButton
        text="Next"
        isDisabled={isDisabledNext}
        additiveStyle={isDisabledNext ? 'opacity-50 cursor-not-allowed' : ''}
        onClick={(e) => handleStep(e, 'Next')}
      />
    </div>
  );
}
