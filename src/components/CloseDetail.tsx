import { MyButton } from './MyButton.tsx';
import { useAppDispatch, useUpdateLocation } from '../hooks/hooks.ts';
import { useNavigate } from 'react-router';
import { hideDetail } from '../store/detailsSlice.ts';

export const CloseDetail = () => {
  const navigate = useNavigate();
  const { removeParam } = useUpdateLocation();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(hideDetail());
    const url = removeParam('details');
    navigate(url);
  };
  return (
    <MyButton text="Close" onClick={handleClick} additiveStyle={'font-bold'} />
  );
};
