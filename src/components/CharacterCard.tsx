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
    console.log('clike');
    dispatch(toggle({ id: id, value: props.character }));
  };

  const getDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    stopEvent(e);
    context?.showDetails();
    updateParam('details', id.toString());
  };

  return (
    <div
      onClick={getDetails}
      data-testid="character-card"
      className="w-[230px] max-h-[350px] bg-white p-4 rounded-lg shadow-md hover:cursor-pointer hover:bg-amber-200"
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
      {/* <button
      className="relative size-4 bottom-1 left-0 flex items-center  p-2"
        data-testid="mark-favorite"
        // type="checkbox"
        type='button'
        onClick={handleToggle}
        disabled={isSelected}
        title={isSelected ? 'in favorites' : 'to favorites'}
      /> */}
    </div>
  );
}
