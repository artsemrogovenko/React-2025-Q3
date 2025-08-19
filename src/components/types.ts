import type { MouseEventHandler, ReactNode } from 'react';

export interface ErrorProps {
  children: ReactNode;
}

export interface ErrorState {
  errorMessage: string;
}

export type MyButtonProps = {
  text: string;
  additiveStyle?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type FormType = 'controlled' | 'uncontrolled';
export interface ModalProps {
  isOpen: boolean;
  type: FormType;
  onClick: MouseEventHandler<HTMLDivElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export type Gender = 'Male' | 'Female';
export interface ProfileType {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: Gender | null;
  picture: string;
  country: string;
}
