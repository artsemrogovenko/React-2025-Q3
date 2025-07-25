import { MyButton } from './MyButton';
import type { PaginationProps } from './types';

export function Pagination(props: PaginationProps) {
  const { isVisible, isDisabled } = props;

  return (
    <div className={isVisible ? 'flex gap-2' : 'hidden'}>
      <MyButton text="Prev" isDisabled={isDisabled} />
      <MyButton text="Next" isDisabled={isDisabled} />
    </div>
  );
}
