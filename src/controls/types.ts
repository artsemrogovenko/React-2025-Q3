export type ControlsProps = {
  onSubmit: (query?: string) => Promise<void>;
};

export type SubmitButtonProps<T = React.MouseEvent<HTMLButtonElement>> = {
  onClick?: (event: T) => Promise<void>;
};
