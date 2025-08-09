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
  additiveStyle?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type PaginationProps = {
  isDisabled?: boolean;
  isVisible: boolean;
  searchParams?: { name: string; page: number };
};

export type ToHomepageProps = {
  className?: string;
  text?: string;
};

export type CheckboxProps = {
  onChange: () => void;
  isChecked: boolean;
};
