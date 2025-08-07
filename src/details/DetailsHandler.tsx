import { NotFound } from '../pages/NotFound.tsx';
import { NOT_FOUND_DETAIL } from '../constants.ts';
import type { Character } from 'rickmortyapi';
import { Details } from './Details.tsx';
import { DetailsBlock } from './DetailsBlock.tsx';
import { MySpinner } from '../components/Loader.tsx';
import { CloseDetail } from '../components/CloseDetail.tsx';
import { useEffect } from 'react';
import { hideDetail, updateDetail } from '../store/detailsSlice.ts';
import { useAppDispatch, useUpdateLocation } from '../hooks/hooks.ts';
import { useGetCharacterByIdQuery } from '../services/rickMorty.ts';

export function DetailsHandler() {
  const { details } = useUpdateLocation();
  const { data, isFetching } = useGetCharacterByIdQuery(details);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateDetail(data ?? {}));
  }, [data]);

  useEffect(() => {
    return () => {
      dispatch(hideDetail());
    };
  }, []);
  if (isFetching)
    return (
      <DetailsBlock>
        <MySpinner />
      </DetailsBlock>
    );
  if (!Object.keys(data ?? {}).length) {
    return (
      <DetailsBlock>
        <NotFound reason={NOT_FOUND_DETAIL} hideButton={true} />
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
