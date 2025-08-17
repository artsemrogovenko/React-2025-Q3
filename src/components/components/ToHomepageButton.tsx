import type { ToHomepageProps } from './types';
import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

export const ToHomepageButton = (props: ToHomepageProps) => {
  const t = useTranslations('ToHomepage');
  return (
    <Link
      data-testid="go-homepage"
      className={`${props.className} border-2 text-black capitalize p-2`}
      href="/"
    >
      {t('message')}
    </Link>
  );
};
