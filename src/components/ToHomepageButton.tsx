import { APP_ROUTES } from '../constants';
import { useRouter } from 'next/navigation';
import type { ToHomepageProps } from './types';
import { MyButton } from './MyButton';

export const ToHomepageButton = (props: ToHomepageProps) => {
  const navigate = useRouter();

  const handleClick = () => {
    navigate.push(APP_ROUTES.home);
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
