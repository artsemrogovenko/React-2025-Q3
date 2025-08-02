import { render, screen } from '@testing-library/react';
import { CharacterCard } from '../components/CharacterCard';
import type { Character } from 'rickmortyapi';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { charactersResponse } from './__mock__/charatersData';
import { Wrapper } from './__mock__/wrapper';

const characterData: Character = charactersResponse.results?.[0] as Character;

test('Display the name and description of the character', () => {
  render(
    <Wrapper>
      <CharacterCard character={characterData} />
    </Wrapper>
  );

  const characterName = screen.getByText(/Rick Sanchez/i);
  const characterSpecies = screen.getByText(/Human/i);

  expect(characterName).toBeInTheDocument();
  expect(characterSpecies).toBeInTheDocument();
});
