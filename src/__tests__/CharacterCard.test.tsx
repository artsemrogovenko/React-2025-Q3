import { render, screen } from '@testing-library/react';
import { CharacterCard } from '../components/CharacterCard';
import type { Character } from 'rickmortyapi';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { charactersResponse } from './__mock__/charatersData';

const characterData: Character = charactersResponse.results?.pop() as Character;

test('Display the name and description of the character', () => {
  render(<CharacterCard character={characterData} />);

  const characterName = screen.getByText(/Ants in my Eyes Johnson/i);
  const characterSpecies = screen.getByText(/Human/i);

  expect(characterName).toBeInTheDocument();
  expect(characterSpecies).toBeInTheDocument();
});
