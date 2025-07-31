import type { Character } from 'rickmortyapi';
import type { ReactNode } from 'react';

export type CharacterCardProps = {
  character: Character;
};

export type ErrorProps = {
  children: ReactNode;
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
  isDisabled?: boolean;
  isVisible?: boolean;
  additiveStyle?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type PaginationProps = {
  isDisabled?: boolean;
  isVisible: boolean;
};

export type ToHomepageProps = {
  className?: string;
  text?: string;
};
