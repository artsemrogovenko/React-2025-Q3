import { render, screen } from '@testing-library/react';
import type { Character } from 'rickmortyapi';
import { DetailsHandler } from '../details/DetailsHandler';
import { charactersResponse } from './__mock__/charatersData';
import { Wrapper } from './__mock__/wrapper';
import { NOT_FOUND_DETAIL } from '../constants';
import '@testing-library/jest-dom/vitest';

describe('DetailsHandler', () => {
  const mockCharacter = charactersResponse.results?.[0] as Character;

  test('renders spinner when isLoading', () => {
    render(<DetailsHandler character={mockCharacter} isLoading={true} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });

  test('renders NotFound when character is empty', () => {
    render(
      <Wrapper>
        <DetailsHandler character={{} as Character} />
      </Wrapper>
    );

    expect(screen.getByText(NOT_FOUND_DETAIL)).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });

  test('renders Details not loading', () => {
    render(
      <Wrapper>
        <DetailsHandler character={mockCharacter} />
      </Wrapper>
    );
    expect(screen.getByTestId('character-details')).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
