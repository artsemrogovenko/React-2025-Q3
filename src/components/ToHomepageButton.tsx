import { APP_ROUTES } from '../constants';
import { useNavigate } from 'react-router';
import type { ToHomepageProps } from './types';
import { MyButton } from './MyButton';

export const ToHomepageButton = (props: ToHomepageProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(APP_ROUTES.home, { replace: false });
  };

  return (
    <MyButton
      text="back to homepage"
      data-testid="go-homepage"
      className={`${props.className}  bg-fuchsia-800 capitalize`}
      onClick={handleClick}
    />
  );
};
