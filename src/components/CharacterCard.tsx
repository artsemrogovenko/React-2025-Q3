import { useContext } from 'react';
import type { CharacterCardProps } from './types';
import { AppContext } from '../constants';
import { getCharacterDetails } from '../api/utils';

export function CharacterCard(props: CharacterCardProps) {
  const { image, name, species, id } = props.character;
  const context = useContext(AppContext);

  const getDetails = async () => {
    context?.updateCharacter(await getCharacterDetails(id));
  };

  return (
    <div
      onClick={getDetails}
      data-testid="character-card"
      className="bg-white p-4 rounded-lg shadow-md hover:cursor-pointer hover:bg-amber-200"
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
