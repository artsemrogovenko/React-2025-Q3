export const getPrevQuery = (): string => {
  const stored = localStorage.getItem('previous');
  if (stored) return stored;
  return '';
};

export const setSearchQuery = (text: string): void => {
  localStorage.setItem('previous', text);
};
