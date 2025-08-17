import type { CardsContainerProps } from './types';
import { FLEX_STYLE_ROUNDED } from '../constants.ts';

export function ResultsContainer(props: CardsContainerProps) {
  const { children, style } = props;
  return (
    <div
      data-testid="search-results"
      className={`${FLEX_STYLE_ROUNDED} ${style} content-center items-center min-w-[282px] min-h-[380px] text-center gap-2`}
    >
      {children}
    </div>
  );
}
