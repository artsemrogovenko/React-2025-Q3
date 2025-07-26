import { NotFound } from './NotFound.tsx';
import { NOT_FOUND_DETAIL } from '../constants.ts';
import type { Character } from 'rickmortyapi';
import { Details } from './Details.tsx';
import { DetailsBlock } from './DetailsBlock.tsx';
import { MySpinner } from '../components/Loader.tsx';

export function DetailsHandler({
  character,
  isLoading,
}: {
  character: Character;
  isLoading?: boolean;
}) {
  if (isLoading)
    return (
      <DetailsBlock>
        <MySpinner />
      </DetailsBlock>
    );
  if (Object.keys(character).length === 0)
    return (
      <DetailsBlock>
        <NotFound reason={NOT_FOUND_DETAIL} />
      </DetailsBlock>
    );
  return (
    <DetailsBlock>
      <Details character={character} />
    </DetailsBlock>
  );
}
