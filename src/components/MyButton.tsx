import type { MyButtonProps } from './types';

export const MyButton = ({
  text,
  isDisabled = false,
  additiveStyle = '',
  ...props
}: MyButtonProps) => {
  return (
    <button
      className={`mt-4 px-4 py-2 rounded ${additiveStyle}`}
      disabled={isDisabled}
      {...props}
    >
      {text}
    </button>
  );
};
