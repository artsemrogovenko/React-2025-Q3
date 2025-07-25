import type { MyButtonProps } from './types';

export const MyButton = (props: MyButtonProps) => {
  const { isDisabled, text, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`mt-4 px-4 py-2 rounded ${props.style}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};
