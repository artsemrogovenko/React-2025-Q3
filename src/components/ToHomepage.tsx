import { APP_ROUTES } from '../constants';
import { useNavigate } from 'react-router';
import type { ToHomepageProps } from './types';

export const ToHomepage = (props: ToHomepageProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(APP_ROUTES.home, { replace: false });
  };

  return (
    <button
      data-testid="go-homepage"
      className={`${props.className}  bg-fuchsia-800 capitalize`}
      onClick={handleClick}
    >
      back to homepage
    </button>
  );
};
