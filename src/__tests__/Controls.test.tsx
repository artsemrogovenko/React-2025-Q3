import { render, screen } from '@testing-library/react';
import { beforeAll, beforeEach, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Controls } from '../controls/Controls';
import { getPrevQuery, setSearchQuery } from '../api/utils';
import userEvent from '@testing-library/user-event';

const mockRequest = vi.fn(async (queryRequest: string) => {
  setSearchQuery(queryRequest);
});

describe('Rendering Tests', () => {
  let input: HTMLInputElement;
  beforeAll(() => {
    setSearchQuery('Dark');
  });

  beforeEach(() => {
    render(<Controls onSubmit={vi.fn()} />);
    input = screen.getByTestId('character-search-input') as HTMLInputElement;
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

    await userEvent.click(reset);

    expect(input.value).toBe('');
    expect(getPrevQuery()).toBe('');
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

  it('Saves search term to localStorage, trims whitespace before saving', async () => {
    expect(input.value).toBe('');

    await user.type(input, 'Test whitespaces  ');
    await user.click(submit);

    expect(mockRequest).toHaveBeenCalledWith('Test whitespaces  ');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'previous',
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
