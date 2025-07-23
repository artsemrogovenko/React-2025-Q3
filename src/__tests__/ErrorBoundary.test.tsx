import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MySpinner } from '../components/Loader';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SimulateError } from './__mock__/SimulateError';
import { vi } from 'vitest';

vi.spyOn(console, 'error').mockImplementation(() => {});

test('The component display if there is no error', () => {
  render(
    <ErrorBoundary>
      <MySpinner />
    </ErrorBoundary>
  );
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});

test('Display of the spare component, and the possibility of resetting', async () => {
  render(
    <ErrorBoundary>
      <SimulateError simulate={true} />
    </ErrorBoundary>
  );

  const component = screen.getByTestId('error-component');
  const reason = screen.getByText('Error: Error simulated');
  const resetButton = screen.getByRole('button');

  expect(component).toBeInTheDocument();
  expect(reason).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();

  await userEvent.click(resetButton);
  expect(component).not.toBeInTheDocument();
});
