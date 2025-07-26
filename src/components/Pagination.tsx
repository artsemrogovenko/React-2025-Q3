import { useContext } from 'react';
import { MyButton } from './MyButton';
import type { PaginationProps } from './types';
import { AppContext } from '../constants';
import { useUpdateLocation } from '../api/utils';

export function Pagination(props: PaginationProps) {
  const { isVisible } = props;
  const context = useContext(AppContext);
  const { pagePrev, pageNext } = context?.pages ?? {
    pageNext: null,
    pagePrev: null,
  };
  const { updateParam } = useUpdateLocation();

  const isDisabledPrev = pagePrev === null;
  const isDisabledNext = pagePrev === pageNext || pageNext === null;

  const handleStep = (event: React.MouseEvent, action: 'Prev' | 'Next') => {
    event.preventDefault();
    switch (action) {
      case 'Next':
        if (pageNext !== null) context?.updateCurrentPage(pageNext);
        updateParam('page', pageNext?.toString() ?? '1');
        break;
      case 'Prev':
        if (pagePrev !== null) context?.updateCurrentPage(pagePrev);
        updateParam('page', pagePrev?.toString() ?? '1');
        break;
      default:
        break;
    }
  };
  return (
    <div className={isVisible ? 'flex gap-2' : 'hidden'}>
      <MyButton
        text="Prev"
        isDisabled={isDisabledPrev}
        style={isDisabledPrev ? 'opacity-50 cursor-not-allowed' : ''}
        onClick={(e) => handleStep(e, 'Prev')}
      />
      <MyButton
        text="Next"
        isDisabled={isDisabledNext}
        style={isDisabledNext ? 'opacity-50 cursor-not-allowed' : ''}
        onClick={(e) => handleStep(e, 'Next')}
      />
    </div>
  );
}
