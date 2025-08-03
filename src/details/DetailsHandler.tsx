import { NotFound } from '../pages/NotFound.tsx';
import { NOT_FOUND_DETAIL } from '../constants.ts';
import type { Character } from 'rickmortyapi';
import { Details } from './Details.tsx';
import { DetailsBlock } from './DetailsBlock.tsx';
import { MySpinner } from '../components/Loader.tsx';
import { CloseDetail } from '../components/CloseDetail.tsx';
import { useCallback, useEffect, useState } from 'react';
import { getCharacterDetails } from '../api/utils.ts';
import { hideDetail, updateDetail } from '../store/detailsSlice.ts';
import {
  useAppDispatch,
  useAppSelector,
  useUpdateLocation,
} from '../hooks/hooks.ts';

export function DetailsHandler() {
  const { details } = useUpdateLocation();
  const [isFetchDetails, setIsFetchDetails] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDetails = useCallback(async (): Promise<void> => {
    setIsFetchDetails(true);
    const detailCharacter = await getCharacterDetails(details || null);
    dispatch(updateDetail(detailCharacter));
    setIsFetchDetails(false);
  }, [details, dispatch]);

  useEffect(() => {
    if (details) {
      handleDetails();
    }
  }, [details]);

  useEffect(() => {
    return () => {
      dispatch(hideDetail());
    };
  }, []);
  const character = useAppSelector((state) => state.details.value);

  if (isFetchDetails)
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
