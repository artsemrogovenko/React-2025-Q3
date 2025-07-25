import Picture from '../assets/404.svg';
export const NotFound = () => {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <img src={Picture} alt="404" className="opacity-50" />
      <h3 className="capitalize font-bold text-[3vw]">page not found</h3>
      <button className="bg-fuchsia-800 capitalize">back to homepage</button>
    </div>
  );
};
