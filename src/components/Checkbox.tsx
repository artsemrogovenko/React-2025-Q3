import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/hooks';
import { hasSelected, toggle } from '../store/favoritesSlice';
import type { CharacterCardProps } from './types';
import type { RootState } from '../store/store.ts';

export function Checkbox(props: CharacterCardProps) {
  const { id } = props.character;
  const isSelected = useSelector((state: RootState) => hasSelected(state)(id));
  const dispatch = useAppDispatch();
  const handleToggle = () => {
    dispatch(toggle({ id: id, value: props.character }));
  };

  return (
    <div
      className="flex w-full e-8 gap-2 uppercase"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        className="size-5 items-center opacity-50"
        data-testid="mark-favorite"
        type="checkbox"
        onChange={handleToggle}
        checked={isSelected}
      />
      {isSelected ? 'in favorites' : 'add to favorites'}
    </div>
  );
}
