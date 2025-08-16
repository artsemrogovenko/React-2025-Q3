import { CharacterCard } from '../components/CharacterCard';
import { MySpinner } from '../components/Loader';
import type { ResultsProps } from './types';
import { ResultsContainer } from './ResultsContainer';
import { NotFound } from '../pages/NotFound';
import { DEFAULT_PAGE, NETWORK_ERROR, NOT_FOUND_MSG } from '../constants.ts';
import { useAppSelector, useUpdateLocation } from '../hooks/hooks.ts';
import { useTranslations } from 'next-intl';
import { getErrorMessage } from '../api/utils.ts';

export function Results(props: ResultsProps) {
  const { data, loading, error } = props;
  const founded = Array.isArray(data?.results) && data?.results.length;
  const { page } = useUpdateLocation();
  const rightside = useAppSelector((state) => state.details.isVisible);

  const t = useTranslations('NotFound');
  const translateError = (): string => {
    const message = getErrorMessage(error);
    if (message?.toLowerCase() === NETWORK_ERROR) return t('fetch');
    return message === NOT_FOUND_MSG ? t('characters') : message || '';
  };

  if (error) {
    const hide = Number(page) <= DEFAULT_PAGE;
    return (
      <ResultsContainer>
        <NotFound reason={translateError()} hideButton={hide} />
      </ResultsContainer>
    );
  }
  if (loading)
    return (
      <ResultsContainer>
        <MySpinner />
      </ResultsContainer>
    );
  if (founded)
    return (
      <ResultsContainer
        style={
          rightside ? 'w-[340px] flex-col' : 'h-fit flex-wrap justify-around'
        }
      >
        {founded &&
          data.results?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </ResultsContainer>
    );
}
