import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, vi } from 'vitest';
import { KEY_PREV_QUERY } from '../constants';
import { Controls } from '../controls/Controls';
import { useLocalStorage } from '../hooks/hooks';
import { act } from 'react';

const { result } = renderHook(() => useLocalStorage());

const mockRequest = vi.fn(async (query?: string) => {
  result.current.setStorageValue(KEY_PREV_QUERY, query ?? '');
});

const setStorageSpy = vi.spyOn(result.current, 'setStorageValue');

describe('Rendering Tests', () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('prevSearch', 'Dark');
    render(<Controls onSubmit={mockRequest} />);
    input = screen.getByTestId('character-search-input') as HTMLInputElement;
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('The presence of elements and display of the preserved value', async () => {
    const submit = screen.getByRole('button', {
      name: /search/i,
    }) as HTMLButtonElement;

    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(input.value).toBe('Dark');
  });

  test('Resetting the input field and Localstorage', async () => {
    const reset = screen.getByLabelText('Clear input') as HTMLButtonElement;

    expect(reset).toBeInTheDocument();
    expect(input.value).toBe('Dark');
    expect(localStorage.getItem('prevSearch')).toBe('Dark');
    await userEvent.click(reset);

    expect(input.value).toBe('');
    expect(setStorageSpy).toHaveBeenCalledOnce();
    expect(localStorage.getItem('prevSearch')).toBe('');
  });
});

describe('User Interaction Tests', () => {
  const mockRequest = vi.fn();
  const user = userEvent.setup();
  let input: HTMLInputElement;

  beforeEach(async () => {
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
    localStorage.clear();
    await act(async () => {
      render(<Controls onSubmit={mockRequest} />);
    });
    input = screen.getByTestId('character-search-input') as HTMLInputElement;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // TODO:
  // test('Saves search term to localStorage, trims whitespace before saving', async () => {
  //   expect(input.value).toBe('');
  //   const submit = screen.getByRole('button', {
  //     name: /Search/i,
  //   }) as HTMLButtonElement;
  //   await user.type(input, 'Test whitespaces  ');
  //   await user.click(submit);

  //   expect(setStorageSpy).toHaveBeenCalledWith(
  //     KEY_PREV_QUERY,
  //     'Test whitespaces'
  //   );
  //   expect(localStorage.getItem( KEY_PREV_QUERY)).toBe (
  //     'Test whitespaces'
  //   );
  // });

  test('Clear input', async () => {
    expect(input.value).toBe('');

    await user.type(input, 'Test clear');
    await user.keyboard('{Escape}');

    expect(input.value).toBe('');
  });
});
