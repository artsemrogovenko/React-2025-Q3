import { beforeEach, afterEach } from 'vitest';
import {
  act,
  render,
  screen,
  type RenderResult,
  cleanup,
} from '@testing-library/react';
import { AppWrapper } from './wrapper.tsx';
import userEvent from '@testing-library/user-event';

export const user = userEvent.setup();

export let rendered: RenderResult | null = null;
export let buttonForUncontrolled: HTMLButtonElement | null = null;
export let buttonForControlled: HTMLButtonElement | null = null;

beforeEach(async () => {
  await act(async () => {
    rendered = render(<AppWrapper />);
  });
  buttonForUncontrolled = screen.getByRole('button', {
    name: 'Uncontrolled form',
  }) as HTMLButtonElement;
  buttonForControlled = screen.getByRole('button', {
    name: 'React Hook Form',
  }) as HTMLButtonElement;
});

afterEach(() => {
  if (rendered) {
    rendered.unmount();
  }
  rendered = null;
  cleanup();
  buttonForUncontrolled = null;
  buttonForControlled = null;
});
