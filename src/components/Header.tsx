import { NavLink } from 'react-router';
import { ThemeSwitch } from './ThemeSwitch';

export function Header() {
  return (
    <div
      className="flex w-full items-baseline justify-between"
      data-testid="header"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Rick and Morty App
      </h2>
      <ThemeSwitch />
      <NavLink to="/about" className="uppercase text-2xl  ">
        about
      </NavLink>
    </div>
  );
}
