import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { Wrapper } from './__mock__/wrapper';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BLACK, WHITE } from '../constants';

vi.mock('../utils', () => ({
  stopEvent: vi.fn(),
}));

describe('ThemeSwitch', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <ThemeSwitch />
      </Wrapper>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders with default theme  ', () => {
    expect(screen.getByText('switch theme')).toBeInTheDocument();
    const icon = screen.queryByTestId('moon-icon') as HTMLElement;
    expect(icon).toBeInTheDocument();

    const path = icon.querySelector('path');
    expect(path).toHaveAttribute('fill', BLACK);
  });

  test('Toggle color and icon', async () => {
    const user = userEvent.setup();
    expect(screen.queryByTestId('moon-icon')).toBeInTheDocument();

    const switchElement = screen.getByLabelText('toggle-theme');
    await user.click(switchElement);

    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).toBeInTheDocument();

    const icon = screen.queryByTestId('sun-icon') as HTMLElement;
    const path = icon.querySelector('g');
    expect(path).toHaveAttribute('fill', WHITE);
  });
});
