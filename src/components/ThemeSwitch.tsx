'use client';

import { useContext, useEffect } from 'react';
import { AppContext, BLACK, CLASSNAME_DARK, WHITE } from '../constants';
import { MoonIcon, SunIcon } from './Icons';
import { stopEvent } from '../api/utils';
import { useTranslations } from 'next-intl';

export function ThemeSwitch() {
  const t = useTranslations('Header');

  const context = useContext(AppContext);
  useEffect(() => {
    if (context.isDefaultTheme) {
      document.body.classList.remove(CLASSNAME_DARK);
    } else {
      document.body.classList.add(CLASSNAME_DARK);
    }
  }, [context.isDefaultTheme]);

  const isDefaultTheme = context.isDefaultTheme;
  const color = isDefaultTheme ? BLACK : WHITE;

  const handler = <T extends Element>(e: React.MouseEvent<T>) => {
    stopEvent(e);
    context.toggleTheme();
  };
  return (
    <div
      aria-label="toggle-theme"
      className="flex size-fit hover:cursor-pointer gap-2"
      onClick={(e) => handler(e)}
    >
      <span className="uppercase">{t('message')}</span>
      {isDefaultTheme ? (
        <MoonIcon data-testid="moon-icon" currentColor={color} />
      ) : (
        <SunIcon data-testid="sun-icon" currentColor={color} />
      )}
    </div>
  );
}
