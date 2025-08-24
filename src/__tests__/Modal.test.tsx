import { test } from 'vitest';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { buttonForControlled, buttonForUncontrolled, user } from './Prepare';
import { BACKDROP_ID } from '../constants.ts';

describe('Test modal opening/closing functionality', () => {
  test('buttons is visible', async () => {
    expect(buttonForControlled).toBeInTheDocument();
    expect(buttonForUncontrolled).toBeInTheDocument();
  });

  test('Test click outside', async () => {
    if (buttonForControlled) {
      act(() => {
        buttonForControlled?.click();
      });
    }
    const form = screen.getByTestId('MyForm');
    const backdrop = screen.getByTestId(BACKDROP_ID);
    expect(form).toBeInTheDocument();
    expect(backdrop).toBeInTheDocument();

    act(() => {
      backdrop.click();
    });

    expect(form).not.toBeInTheDocument();
  });

  test('Test closing by ESC', async () => {
    if (buttonForControlled) {
      act(() => {
        buttonForControlled?.click();
      });
    }
    const form = screen.getByTestId('MyForm');
    expect(form).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(form).not.toBeInTheDocument();
  });
});
