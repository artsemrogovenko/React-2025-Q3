import type { MyButtonProps } from './types';

export const MyButton = ({
  text,
  additiveStyle = '',
  ...props
}: MyButtonProps) => {
  return (
    <button className={`m-4 px-4 py-2 rounded ${additiveStyle}`} {...props}>
      {text}
    </button>
  );
};
