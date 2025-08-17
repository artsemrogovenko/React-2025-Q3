import type { Character, CharacterLocation } from 'rickmortyapi';

export type DetailsResponse = {
  result: Character;
  status: number;
};

export type CsvCharacter = Character & {
  origin: CharacterLocation | string;
  location: CharacterLocation | string;
  episode: string[] | string;
};
