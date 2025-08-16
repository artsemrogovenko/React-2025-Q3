'use client';
import { Link, usePathname } from '../../i18n/navigation.ts';
import { ThemeSwitch } from './ThemeSwitch.tsx';
import { APP_ROUTES } from '../constants.ts';
import { LangSwitch } from './LangSwitch.tsx';
import { useTranslations } from 'next-intl';

export function Header() {
  const pathname = usePathname();
  const isAbout = pathname?.includes(APP_ROUTES.about);
  const t = useTranslations('Header');
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
      {!isAbout && (
        <Link href={`${APP_ROUTES.about}`} className="uppercase text-2xl  ">
          {t('about')}
        </Link>
      )}
    </div>
  );
}
