import { useContext } from 'react';
import type { CharacterCardProps } from './types';
import { AppContext, SIZE_IMG } from '../constants';
import { stopEvent } from '../api/utils';
import { useUpdateLocation } from '../hooks/hooks';
import { Checkbox } from './Checkbox.tsx';
import { useRouter } from '../i18n/navigation.ts';
import Image from 'next/image';

export function CharacterCard(props: CharacterCardProps) {
  const navigate = useRouter();

  const { updateParam } = useUpdateLocation();
  const { image, name, species, id } = props.character;
  const context = useContext(AppContext);

  const getDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    stopEvent(e);
    const url = updateParam('details', id.toString());
    navigate.push(url);
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
      <Image
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
        width={SIZE_IMG}
        height={SIZE_IMG}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">{species}</p>
      </div>
      <Checkbox character={props.character} />
    </div>
  );
}
