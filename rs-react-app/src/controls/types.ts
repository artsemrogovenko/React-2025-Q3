export type ControlsProps = {
  onSubmit: (query: string) => Promise<void>;
};
export type ControlsState = {
  searchQuery: string;
};
