import { render, screen } from '@testing-library/react';
import { Error } from '../app/[[...slug]]/error.tsx';
import { MySpinner } from '../components/Loader';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SimulateError } from './__mock__/SimulateError';
import { vi } from 'vitest';

vi.spyOn(console, 'error').mockImplementation(() => {});

test('The component display if there is no error', () => {
  render(
    <Error>
      <MySpinner />
    </Error>
  );
  expect(screen.getByTestId('loading.tsx-spinner')).toBeInTheDocument();
});

test('Display of the spare component, and the possibility of resetting', async () => {
  render(
    <Error>
      <SimulateError simulate={true} />
    </Error>
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
