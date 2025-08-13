import { render, screen } from '@testing-library/react';
import { Results } from '../results/Results';
import '@testing-library/jest-dom';
import { charactersResponse } from './__mock__/charatersData';
import { NOT_FOUND_MSG } from '../constants';
import { afterEach, vi } from 'vitest';
import * as hooks from '../hooks/hooks.ts';
import { Wrapper } from './__mock__/wrapper';

test('Show the message error', () => {
  render(
    <Wrapper>
      <Results data={null} loading={false} error={'not found'} />
    </Wrapper>
  );
  expect(screen.getByText('not found')).toBeVisible();
});

test('Show animation when loading.tsx', () => {
  const { rerender } = render(
    <Wrapper>
      <Results data={null} loading={true} error={''} />
    </Wrapper>
  );
  const spinner = screen.getByTestId('loading.tsx-spinner');

  expect(spinner).toBeVisible();
  rerender(
    <Wrapper>
      <Results data={null} loading={false} error={''} />
    </Wrapper>
  );
  expect(spinner).not.toBeVisible();
});

test('Display the right number of cards', () => {
  const countCards = Number(charactersResponse.results?.length);
  render(
    <Wrapper>
      <Results data={charactersResponse} loading={false} error={null} />
    </Wrapper>
  );
  const characters = screen.getAllByTestId('character-card');
  expect(characters).toHaveLength(countCards);
});

describe('useUpdateLocation', () => {
  afterEach(() => vi.clearAllMocks());

  test('Show error message and no button', () => {
    vi.spyOn(hooks, 'useUpdateLocation').mockReturnValue({
      searchParams: new URLSearchParams(),
      updateParam: vi.fn((_: string, value: string) => value),
      page: '',
      details: null,
      removeParam: vi.fn((param: string) => param),
      navigate: vi.fn(),
      deleteDetails: vi.fn(),
    });
    render(
      <Wrapper>
        <Results data={null} loading={false} error={NOT_FOUND_MSG} />
      </Wrapper>
    );
    const message = screen.getByText(NOT_FOUND_MSG);
    expect(message).toBeVisible();
    expect(() => screen.getByTestId('go-homepage')).toThrow();
  });

  test('Show error message and home page button if page is not first', () => {
    vi.spyOn(hooks, 'useUpdateLocation').mockReturnValue({
      searchParams: new URLSearchParams(),
      updateParam: vi.fn((_: string, value: string) => value),
      page: '2',
      details: null,
      removeParam: vi.fn((param: string) => param),
      navigate: vi.fn(),
      deleteDetails: vi.fn(),
    });
    render(
      <Wrapper>
        <Results data={null} loading={false} error={NOT_FOUND_MSG} />
      </Wrapper>
    );
    const message = screen.getByText(NOT_FOUND_MSG);
    const button = screen.getByTestId('go-homepage');
    expect(button).toBeVisible();
    expect(message).toBeVisible();
  });
});
