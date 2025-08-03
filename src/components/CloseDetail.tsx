import { MyButton } from './MyButton.tsx';
import { useUpdateLocation } from '../hooks/hooks.ts';

export const CloseDetail = () => {
  const { deleteDetails } = useUpdateLocation();
  const handleClick = () => deleteDetails();

  return (
    <MyButton text="Close" onClick={handleClick} additiveStyle={'font-bold'} />
  );
};
