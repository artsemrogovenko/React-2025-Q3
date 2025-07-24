import { FLEX_STYLE_ROUNDED } from '../constants';
import type { CardsContainerProps } from './types';

export function ResultsContainer({ children }: CardsContainerProps) {
  return (
    <div
      data-testid="search-results"
      className={`${FLEX_STYLE_ROUNDED} flex-col max-w-sm min-h-[360px] text-center gap-2`}
    >
      {children}
    </div>
  );
}
