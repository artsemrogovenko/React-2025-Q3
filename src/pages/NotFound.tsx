import { useContext } from 'react';
import Picture from '../assets/404.svg';
import { APP_ROUTES, AppContext } from '../constants';
import { useNavigate } from 'react-router';

export const NotFound = ({ reason }: { reason?: string }) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  return (
    <div className="flex flex-col gap-2 w-[50%] sticky top-0 h-fit">
      <img src={Picture} alt="404" className="opacity-50" />
      <h3 className="capitalize font-bold text-[3vw]">
        {reason ?? `page not found`}
      </h3>
      <button
        className="bg-fuchsia-800 capitalize"
        onClick={() => {
          navigate(APP_ROUTES.home, { replace: false });
          context?.closeDetails();
        }}
      >
        back to homepage
      </button>
    </div>
  );
};
