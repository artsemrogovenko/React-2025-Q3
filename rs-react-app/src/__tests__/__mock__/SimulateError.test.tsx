import { render, screen } from '@testing-library/react';
import { SimulateError } from './SimulateError';
import '@testing-library/jest-dom';

it('Проверка на генерацию ошибки', () => {
  expect(() => render(<SimulateError simulate={true} />)).toThrow(
    'Error simulated'
  );
});
it('Проверка на ветвление', () => {
  render(<SimulateError simulate={false} />);
  expect(screen.getByText('No error')).toBeInTheDocument();
});
