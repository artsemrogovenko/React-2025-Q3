import { ToHomepageButton } from '../components/ToHomepageButton';
import { SIZE_IMG } from '../constants';
import type { NotFoundProps } from './types';
import Image from 'next/image';

export const NotFound = (props: NotFoundProps) => {
  const { reason, hideButton } = props;
  return (
    <div className="flex flex-col gap-2 max-w-[50%] sticky top-0 h-fit w-fit">
      <Image
        src="/404.svg"
        alt="404"
        className="opacity-50"
        width={SIZE_IMG}
        height={SIZE_IMG}
      />
      <h3 className="capitalize font-bold text-[3vw] break-words whitespace-normal">
        {reason ?? `page not found`}
      </h3>
      {!hideButton && <ToHomepageButton />}
    </div>
  );
};
