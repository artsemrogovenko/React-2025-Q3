import { render, screen } from '@testing-library/react';
import { ToHomepageButton } from '../components/ToHomepageButton';
import { APP_ROUTES } from '../constants';
import { Wrapper } from './__mock__/wrapper';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('ToHomepage button', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(
      <Wrapper>
        <ToHomepageButton className="custom-class" />
      </Wrapper>
    );
  });
  test('renders component', () => {
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('back to homepage');
    expect(button.className).toBe('custom-class  bg-fuchsia-800 capitalize');
  });

  test('navigates to home page when clicked', async () => {
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(APP_ROUTES.home, {
      replace: false,
    });
  });
});
