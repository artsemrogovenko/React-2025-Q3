import type { Character } from 'rickmortyapi';
import { charactersResponse } from '../__tests__/__mock__/charatersData';
import pagesStyles from './Pages.module.scss';
import { DescriptionItem } from './DescriptionItem';
import {
  ejectEpisodesIds,
  showEpisodesNames,
  useRequestEpisode,
} from '../api/utils';
import { useEffect } from 'react';
import { MySpinner } from '../components/Loader';
import { FLEX_STYLE_ROUNDED } from '../constants';
export function Details() {
  const characters = charactersResponse.results as Character[];
  const character = characters[0];
  const { episode, gender, image, location, name, species, status, type } =
    character;

  const { isLoading, requestEpisodes, results } = useRequestEpisode();

  useEffect(() => {
    const episodesIds = ejectEpisodesIds(episode);
    requestEpisodes(episodesIds);
  }, [requestEpisodes,episode]);
  return (
    <div
      data-testid="character-details"
      className={`${FLEX_STYLE_ROUNDED} flex-col w-full h-[90dvh] sticky top-0 bg-amber-100`}
    >
      <div className="flex mb-2">
        <img src={image} alt={name} className="w-1/2 object-fit rounded-2xl" />

        <div className={`flex flex-col w-[50%]`}>
          <h3 className="text-[3vw] font-bold">{name}</h3>
          <div className="flex flex-col">
            <span
              className={`size-[20px] rounded-full ${pagesStyles[status.toLowerCase() ?? 'unknown']}`}
            ></span>
            <span className="text-[2vw]">{`${status} - ${species}, ${gender}`}</span>
            {type && DescriptionItem('Type', type)}
            {DescriptionItem('Seen in:', location.name)}
          </div>
        </div>
      </div>
      {isLoading ? (
        <MySpinner />
      ) : (
        results !== null &&
        DescriptionItem('Episodes:', showEpisodesNames(results.data), 'text-lg')
      )}
    </div>
  );
}
