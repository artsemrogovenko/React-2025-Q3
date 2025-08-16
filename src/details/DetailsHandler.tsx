import { NotFound } from '../pages/NotFound.tsx';
import { EMPTY_OBJECT, NETWORK_ERROR, NOT_FOUND_DETAIL } from '../constants.ts';
import type { Character } from 'rickmortyapi';
import { Details } from './Details.tsx';
import { DetailsBlock } from './DetailsBlock.tsx';
import { MySpinner } from '../components/Loader.tsx';
import { CloseDetail } from '../components/CloseDetail.tsx';
import { useEffect } from 'react';
import { hideDetail, updateDetail } from '../store/detailsSlice.ts';
import { useAppDispatch, useUpdateLocation } from '../hooks/hooks.ts';
import { useGetCharacterByIdQuery } from '../services/rickMorty.ts';
import { useTranslations } from 'next-intl';
import { getErrorMessage } from '../api/utils.ts';

export function DetailsHandler() {
  const { details } = useUpdateLocation();
  const { data, isFetching, error } = useGetCharacterByIdQuery(details);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateDetail(data ?? EMPTY_OBJECT));
  }, [data]);

  useEffect(() => {
    return () => {
      dispatch(hideDetail());
    };
  }, []);
  const t = useTranslations('NotFound');
  const translateError = (): string => {
    const message = getErrorMessage(error);
    if (message?.toLowerCase() === NETWORK_ERROR) return t('fetch');
    return message === NOT_FOUND_DETAIL ? t('details') : message || '';
  };

  if (isFetching)
    return (
      <DetailsBlock>
        <MySpinner />
      </DetailsBlock>
    );
  if (!Object.keys(data ?? EMPTY_OBJECT).length) {
    return (
      <DetailsBlock>
        <NotFound reason={translateError()} hideButton={true} />
        <CloseDetail />
      </DetailsBlock>
    );
  }
  return (
    <DetailsBlock>
      <Details character={data as Character} />
    </DetailsBlock>
  );
}
