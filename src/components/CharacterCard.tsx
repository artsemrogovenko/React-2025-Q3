import { useContext } from 'react';
import type { CharacterCardProps } from './types';
import { AppContext } from '../constants';
import { stopEvent } from '../api/utils';
import { useAppDispatch, useUpdateLocation } from '../hooks/hooks';
import { hasSelected, toggle } from '../store/favoritesSlice.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store.ts';
import { Checkbox } from './Checkbox.tsx';

export function CharacterCard(props: CharacterCardProps) {
  const { updateParam } = useUpdateLocation();
  const { image, name, species, id } = props.character;
  const context = useContext(AppContext);
  const isSelected = useSelector((state: RootState) => hasSelected(state)(id));
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggle({ id: id, value: props.character }));
  };

  const getDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    stopEvent(e);
    context?.showDetails();
    updateParam('details', id.toString());
  };

  const isDefaultTheme = context.isDefaultTheme;
  const themeStyle = isDefaultTheme
    ? 'bg-white'
    : 'bg-gray-800 text-amber-600 hover:text-black';

  return (
    <div
      onClick={getDetails}
      data-testid="character-card"
      className={`w-[230px] max-h-[350px] ${themeStyle} p-4 rounded-lg shadow-md hover:cursor-pointer hover:bg-amber-200`}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">{species}</p>
      </div>
      <Checkbox isChecked={isSelected} onChange={handleToggle} />
    </div>
  );
}
