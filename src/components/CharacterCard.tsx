import type { CharacterCardProps } from './types';

export function CharacterCard(props: CharacterCardProps) {
  const { image, name, species } = props.character;
  return (
    <div
      data-testid="character-card"
      className="bg-white p-4 rounded-lg shadow-md"
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
