import { MyButton } from './MyButton.tsx';
import { useContext } from 'react';
import { AppContext } from '../constants.ts';
import { useUpdateLocation } from '../hooks/hooks.ts';

export const CloseDetail = () => {
  const context = useContext(AppContext);
  const { removeParam } = useUpdateLocation();
  const handleClick = () => {
    context?.closeDetails();
    removeParam('details');
  };
  return (
    <MyButton text="Close" onClick={handleClick} additiveStyle={'font-bold'} />
  );
};
