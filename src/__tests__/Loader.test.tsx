import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { MySpinner } from '../components/Loader';

test('Отображение изображения и текста, размер по умолчанию', () => {
  render(<MySpinner />);

  const spinner = screen.getByTestId('loading-spinner');
  const description = screen.getByText(/Loading.../i);

  expect(spinner).toBeInTheDocument();
  expect(description).toBeInTheDocument();

  expect(spinner).toHaveAttribute('width', '50');
  expect(spinner).toHaveAttribute('height', '50');
});

test('Размер спинера правильно задается', () => {
  render(<MySpinner size={100} />);

  const spinner = screen.getByTestId('loading-spinner');
  expect(spinner).toHaveAttribute('width', '100');
  expect(spinner).toHaveAttribute('height', '100');
});
