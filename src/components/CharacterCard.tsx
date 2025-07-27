import { useContext } from 'react';
import type { CharacterCardProps } from './types';
import { AppContext } from '../constants';
import { getCharacterDetails, stopEvent } from '../api/utils';

export function CharacterCard(props: CharacterCardProps) {
  const { image, name, species, id } = props.character;
  const context = useContext(AppContext);

  const getDetails = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    stopEvent(e);
    context?.updateCharacter(await getCharacterDetails(id));
  };

  return (
    <div
      onClick={(e) => getDetails(e)}
      data-testid="character-card"
      className="w-[230px] h-[310px] bg-white p-4 rounded-lg shadow-md hover:cursor-pointer hover:bg-amber-200"
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
    </div>
  );
}
