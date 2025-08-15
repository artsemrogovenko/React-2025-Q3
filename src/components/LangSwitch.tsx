import { MyButton } from './MyButton';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../i18n/navigation';
import { useSearchParams } from 'next/navigation';

export function LangSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleLang = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en';
    const newPathname = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    router.push(newPathname, { locale: newLocale });
  };

  return (
    <MyButton
      text={locale}
      onClick={toggleLang}
      className="uppercase rounded-2xl"
    />
  );
}
