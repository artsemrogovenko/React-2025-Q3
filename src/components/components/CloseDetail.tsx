import { MyButton } from './MyButton.tsx';
import { useUpdateLocation } from '../hooks/hooks.ts';
import { useTranslations } from 'next-intl';

export const CloseDetail = () => {
  const { deleteDetails } = useUpdateLocation();
  const handleClick = () => deleteDetails();

  const t = useTranslations('Details');
  return (
    <MyButton
      text={t('close')}
      onClick={handleClick}
      additiveStyle={'font-bold'}
    />
  );
};
