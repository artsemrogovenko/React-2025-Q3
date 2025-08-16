import { useTranslations } from 'next-intl';
import { MyButton } from '../components/MyButton';
import type { SubmitButtonProps } from './types';

export function SubmitButton<T = React.MouseEvent<HTMLButtonElement>>({
  onClick,
}: SubmitButtonProps<T>) {
  const t = useTranslations('Search');

  return (
    <MyButton
      className="bg-blue-500 hover:bg-blue-700 font-bold h-[45px] px-4 rounded rounded-l-none "
      type="submit"
      text={t('submit')}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    />
  );
}
