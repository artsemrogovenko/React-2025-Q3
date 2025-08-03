import { useContext } from 'react';
import { AppContext, BLACK, WHITE } from '../constants';
import { MoonIcon, SunIcon } from './Icons';
import { stopEvent } from '../api/utils';

export function ThemeSwitch() {
  const context = useContext(AppContext);
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
      <span className="uppercase">switch theme</span>
      {isDefaultTheme ? (
        <MoonIcon data-testid="moon-icon" currentColor={color} />
      ) : (
        <SunIcon data-testid="sun-icon" currentColor={color} />
      )}
    </div>
  );
}
