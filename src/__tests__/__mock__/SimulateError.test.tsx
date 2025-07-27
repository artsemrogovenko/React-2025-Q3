import { render, screen } from '@testing-library/react';
import { SimulateError } from './SimulateError';
import '@testing-library/jest-dom';

it('Check for error generation', () => {
  expect(() => render(<SimulateError simulate={true} />)).toThrow(
    'Error simulated'
  );
});
it('Checking for branching', () => {
  render(<SimulateError simulate={false} />);
  expect(screen.getByText('No error')).toBeInTheDocument();
});
