import { useDispatch } from 'react-redux';
import { rickMortyApi } from '../services/rickMorty';
import { MyButton } from './MyButton';

export function RefreshDetails({
  characterId,
  episodesIds,
}: {
  characterId: number;
  episodesIds: number[];
}) {
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

  return (
    <div className="flex gap-2">
      <MyButton
        text={'Refresh Details'}
        onClick={handleDetails}
        className="w-fit"
      />
      <MyButton
        text={'Refresh episodes'}
        onClick={handleEpisodes}
        className="w-fit"
      />
    </div>
  );
}
