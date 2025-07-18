import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MySpinner } from '../components/Loader';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SimulateError } from './__mock__/SimulateError';

test('Отображение компонента если нет ошибки', () => {
  render(
    <ErrorBoundary>
      <MySpinner />
    </ErrorBoundary>
  );
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});

test('Отображение запасного компонента, и возможность сброса', async () => {
  render(
    <ErrorBoundary>
      <SimulateError />
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
