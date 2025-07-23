import type { Character } from 'rickmortyapi';

export type CharacterCardProps = {
  character: Character;
};

export type ErrorProps = {
  children: React.ReactNode;
};

export type ErrorState = {
  errorMessage: string;
};

export type MySpinnerProps = {
  size?: number;
  color?: string;
};
