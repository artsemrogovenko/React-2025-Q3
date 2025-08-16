import { useDispatch } from 'react-redux';
import { rickMortyApi } from '../services/rickMorty';
import { MyButton } from './MyButton';
import { useTranslations } from 'next-intl';
import type { RefreshDetailsProps } from './types';

export function RefreshDetails({
  characterId,
  episodesIds,
}: RefreshDetailsProps) {
  const dispatch = useDispatch();

  const handleDetails = () => {
    dispatch(
      rickMortyApi.util.invalidateTags([{ type: 'Details', id: characterId }])
    );
  };
  const handleEpisodes = () => {
    dispatch(
      rickMortyApi.util.invalidateTags([
        { type: 'Episodes', id: episodesIds.map((id) => String(id)).join(',') },
      ])
    );
  };
  const t = useTranslations('Details');

  return (
    <div className="flex gap-2">
      <MyButton
        text={t('refresh-details')}
        onClick={handleDetails}
        className="w-fit"
      />
      <MyButton
        text={t('refresh-episodes')}
        onClick={handleEpisodes}
        className="w-fit"
      />
    </div>
  );
}
