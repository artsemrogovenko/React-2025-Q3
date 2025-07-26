import Picture from '../assets/404.svg';
import { ToHomepage } from '../components/ToHomepage';

export const NotFound = ({ reason }: { reason?: string }) => {
  return (
    <div className="flex flex-col gap-2 w-[50%] sticky top-0 h-fit">
      <img src={Picture} alt="404" className="opacity-50" />
      <h3 className="capitalize font-bold text-[3vw] break-words whitespace-normal">
        {reason ?? `page not found`}
      </h3>
      <ToHomepage />
    </div>
  );
};
