export const getPrevQuery = (): string => {
  const stored = localStorage.getItem('previous');
  return stored ?? '';
};

export const setSearchQuery = (text: string): void => {
  localStorage.setItem('previous', text.trim());
};
