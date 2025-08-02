import { stopEvent } from '../api/utils.ts';
import { FLEX_STYLE_ROUNDED } from '../constants.ts';
import type { DetailsBlockType } from '../pages/types.ts';

export function DetailsBlock({ children }: DetailsBlockType) {
  return (
    <div className="flex flex-col flex-1 w-full" onClick={stopEvent}>
      <div
        className={`${FLEX_STYLE_ROUNDED} flex-col w-full h-fit max-h-[70vh] sticky top-0 items-center min-h-fit gap-y-4 bg-amber-100`}
      >
        {children}
      </div>
    </div>
  );
}
