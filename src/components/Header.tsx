import Link from 'next/link';
import { ThemeSwitch } from './ThemeSwitch';
import { APP_ROUTES } from '../constants.ts';
import { LangSwitch } from './LangSwitch.tsx';

export function Header() {
  return (
    <div
      className="flex w-full items-baseline justify-between"
      data-testid="header"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Rick and Morty App
      </h2>
      <LangSwitch />
      <ThemeSwitch />
      <Link href={`${APP_ROUTES.about}`} className="uppercase text-2xl  ">
        about
      </Link>
    </div>
  );
}
