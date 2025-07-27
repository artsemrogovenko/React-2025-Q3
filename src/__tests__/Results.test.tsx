import { render, screen } from '@testing-library/react';
import { Results } from '../results/Results';
import '@testing-library/jest-dom';
import { charactersResponse } from './__mock__/charatersData';
import { ErrorBoundary } from '../components/ErrorBoundary';
import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { AppProvider } from '../AppContext';
import { NOT_FOUND_MSG } from '../constants';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary>
    <BrowserRouter>
      <AppProvider>{children}</AppProvider>
    </BrowserRouter>
  </ErrorBoundary>
);

test('Show the message error', () => {
  render(
    <Wrapper>
      <Results data={null} loading={false} error={'not found'} />
    </Wrapper>
  );
  expect(screen.getByText('not found')).toBeVisible();
});

test('Show animation when loading', () => {
  const { rerender } = render(
    <Wrapper>
      <Results data={null} loading={true} error={''} />
    </Wrapper>
  );
  const spinner = screen.getByTestId('loading-spinner');

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

test('Display error message', () => {
  render(
    <Wrapper>
      <Results data={null} loading={false} error={NOT_FOUND_MSG} />
    </Wrapper>
  );
  const message = screen.getByText(NOT_FOUND_MSG);
  expect(message).toBeVisible();
});
