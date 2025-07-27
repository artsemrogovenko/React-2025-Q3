import { FLEX_STYLE_ROUNDED } from '../constants.ts';
import type { DetailsBlockType } from '../pages/types.ts';

export function DetailsBlock({ children }: DetailsBlockType) {
  return (
    <div className="flex flex-col flex-1 w-full h-fit max-h-[100dvh] sticky top-0">
      <div
        className={`${FLEX_STYLE_ROUNDED} flex-col w-full items-center min-h-fit gap-y-4 bg-amber-100`}
      >
        {children}
      </div>
    </div>
  );
}
