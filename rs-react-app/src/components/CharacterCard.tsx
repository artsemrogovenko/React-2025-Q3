import React from 'react';
import type { Character } from 'rickmortyapi';

interface CharacterCardProps {
  character: Character;
}
export class CharacterCard extends React.Component<CharacterCardProps> {
  render() {
    const { character } = this.props;
    return (
      <div key={character.id} className="bg-white p-4 rounded-lg shadow-md">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{character.name}</h3>
          <p className="text-gray-600">{character.species}</p>
        </div>
      </div>
    );
  }
}
