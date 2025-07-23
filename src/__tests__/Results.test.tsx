import { render, screen } from '@testing-library/react';
import { Results } from '../results/Results';
import '@testing-library/jest-dom';
import { charactersResponse } from './__mock__/charatersData';

test('Показать сообщение ошибки', () => {
  render(<Results data={null} loading={false} error={'not found'} />);
  expect(screen.getByText('not found')).toBeVisible();
});

test('Показывать анимацию при загрузке', () => {
  const { rerender } = render(
    <Results data={null} loading={true} error={''} />
  );
  const spinner = screen.getByTestId('loading-spinner');

  expect(spinner).toBeVisible();
  rerender(<Results data={null} loading={false} error={''} />);
  expect(spinner).not.toBeVisible();
});

test('Отобразить верное количество карточек', () => {
  const response = charactersResponse;
  const countCards = Number(response.results?.length);

  render(<Results data={charactersResponse} loading={false} error={null} />);
  const characters = screen.getAllByTestId('character-card');
  expect(characters).toHaveLength(countCards);
});
