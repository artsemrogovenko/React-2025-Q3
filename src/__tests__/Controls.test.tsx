import { render, renderHook, screen } from '@testing-library/react';
import { beforeEach, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Controls } from '../controls/Controls';
import { useLocalStorage } from '../hooks/hooks';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

const { result } = renderHook(() => useLocalStorage());

const mockRequest = vi.fn(async (query?: string) => {
  act(() => {
    result.current.updatePrevSearch(query ?? '');
  });
});

describe('Rendering Tests', () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    localStorage.setItem('prevSearch', 'Dark');
    render(<Controls onSubmit={mockRequest} />);
    input = screen.getByTestId('character-search-input') as HTMLInputElement;
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('The presence of elements and display of the preserved value', async () => {
    const submit = screen.getByRole('button', {
      name: /search/i,
    }) as HTMLButtonElement;

    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    expect(input.value).toBe('Dark');
  });

  it('Resetting the input field and Localstorage', async () => {
    const reset = screen.getByLabelText('Clear input') as HTMLButtonElement;

    expect(reset).toBeInTheDocument();
    expect(input.value).toBe('Dark');
    expect(localStorage.getItem('prevSearch')).toBe('Dark');

    await userEvent.click(reset);

    expect(input.value).toBe('');
    expect(result.current.prevSearch).toBe('');
    expect(localStorage.getItem('prevSearch')).toBe('');
  });
});

describe('User Interaction Tests', () => {
  const user = userEvent.setup();
  let submit: HTMLButtonElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
    localStorage.clear();
    render(<Controls onSubmit={mockRequest} />);
    input = screen.getByTestId('character-search-input') as HTMLInputElement;
    submit = screen.getByRole('button', {
      name: /search/i,
    }) as HTMLButtonElement;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Saves search term to localStorage, trims whitespace before saving', async () => {
    expect(input.value).toBe('');

    await user.type(input, 'Test whitespaces  ');
    await user.click(submit);

    expect(mockRequest).toHaveBeenCalledWith('Test whitespaces  ');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'prevSearch',
      'Test whitespaces'
    );
  });

  it('Clear input', async () => {
    expect(input.value).toBe('');

    await user.type(input, 'Test clear');
    await user.keyboard('{Escape}');

    expect(input.value).toBe('');
  });
});
