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

export type MyButtonProps = {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isVisible?: boolean;
  style: string;
};

export type PaginationProps = {
  isDisabled?: boolean;
  isVisible: boolean;
};
