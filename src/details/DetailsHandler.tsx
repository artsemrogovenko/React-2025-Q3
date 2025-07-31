import { NotFound } from '../pages/NotFound.tsx';
import { NOT_FOUND_DETAIL } from '../constants.ts';
import type { Character } from 'rickmortyapi';
import { Details } from './Details.tsx';
import { DetailsBlock } from './DetailsBlock.tsx';
import { MySpinner } from '../components/Loader.tsx';
import { CloseDetail } from '../components/CloseDetail.tsx';

export function DetailsHandler({
  character,
  isLoading,
}: {
  character: Character | object;
  isLoading?: boolean;
}) {
  if (isLoading)
    return (
      <DetailsBlock>
        <MySpinner />
      </DetailsBlock>
    );
  if (!Object.keys(character).length) {
    return (
      <DetailsBlock>
        <NotFound reason={NOT_FOUND_DETAIL} hideButton={true} />
        <CloseDetail />
      </DetailsBlock>
    );
  }
  return (
    <DetailsBlock>
      <Details character={character as Character} />
    </DetailsBlock>
  );
}
