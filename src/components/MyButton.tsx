import type { MyButtonProps } from './types';

export const MyButton = (props: MyButtonProps) => {
  return (
    <button
      className={`mt-4 px-4 py-2 rounded ${props.additiveStyle}`}
      disabled={props.isDisabled}
      {...props}
    >
      {props.text}
    </button>
  );
};
