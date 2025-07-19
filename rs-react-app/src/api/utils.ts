export const getPrevQuery = (): string => {
  const stored = localStorage.getItem('previous');
  return stored ? stored : '';
};

export const setSearchQuery = (text: string): void => {
  localStorage.setItem('previous', text.trim());
};

export const NotFoundMsg = 'No characters found';
