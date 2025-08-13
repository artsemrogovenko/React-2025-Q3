import { ToHomepageButton } from '../components/ToHomepageButton';
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
        width={500}
        height={500}
      />
      <h3 className="capitalize font-bold text-[3vw] break-words whitespace-normal">
        {reason ?? `page not found`}
      </h3>
      {!hideButton && <ToHomepageButton />}
    </div>
  );
};
