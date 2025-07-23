import type { CardsContainerProps } from './types';

export function ResultsContainer({ children }: CardsContainerProps) {
  return (
    <div
      data-testid="search-results"
      className="flex flex-col p-6 rounded-lg border-2 max-w-sm min-h-[360px] text-center gap-2"
    >
      {children}
    </div>
  );
}
