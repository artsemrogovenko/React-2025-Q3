import type { CardsContainerProps } from './types';
import { FLEX_STYLE_ROUNDED } from '../constants.ts';

export function ResultsContainer(props: CardsContainerProps) {
  const { children } = props;
  return (
    <div
      data-testid="search-results"
      className={`${FLEX_STYLE_ROUNDED} flex-col items-center max-w-sm min-h-[360px] text-center gap-2`}
    >
      {children}
    </div>
  );
}
