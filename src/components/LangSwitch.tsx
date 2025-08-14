import { useContext } from 'react';
import { AppContext } from '../constants';
import { MyButton } from './MyButton';

export function LangSwitch() {
  const context = useContext(AppContext);
  const { locale, setLocale } = context;
  const toggleLang = () => {
    const newLang = locale === 'EN' ? 'RU' : 'EN';
    setLocale(newLang);
  };
  return <MyButton text={locale} onClick={toggleLang} />;
}
