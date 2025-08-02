import { type Character, getEpisode } from 'rickmortyapi';
import pagesStyles from '../pages/Pages.module.scss';
import { DescriptionItem } from './DescriptionItem.tsx';
import { ejectEpisodesIds, showEpisodesNames } from '../api/utils.ts';
import { useEffect } from 'react';
import { MySpinner } from '../components/Loader.tsx';
import { FLEX_STYLE_ROUNDED } from '../constants.ts';
import type { CharacterEpisode } from '../types.ts';
import { CloseDetail } from '../components/CloseDetail.tsx';
import { useRequest } from '../hooks/hooks.ts';

export function Details({ character }: { character: Character }) {
  const { isLoading, requestData, results } = useRequest<
    CharacterEpisode | CharacterEpisode[]
  >();

  const { episode, gender, image, location, name, species, status, type } =
    character;

  useEffect(() => {
    const episodesIds = ejectEpisodesIds(episode);
    requestData(() => getEpisode(episodesIds));
  }, [episode, requestData]);

  return (
    <div className="flex flex-col w-full">
      <div
        data-testid="character-details"
        className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-h-fit gap-y-4 `}
      >
        <div className="flex gap-2">
          <div className="flex rounded-2xl">
            <img src={image} alt={name} className=" object-cover" />
          </div>

          <div className={`flex flex-col w-[50%]`}>
            <h3 className="text-[3vw] font-bold ">{name}</h3>
            <div className="flex flex-col ">
              <span
                className={`size-[20px] rounded-full p-0 ${pagesStyles[status?.toLowerCase() ?? 'unknown']}`}
              ></span>
              <span className="text-lg">{`${status} - ${species}, ${gender}`}</span>
              {type && DescriptionItem('Type', type, 'text-lg')}
              {DescriptionItem('Seen in:', location.name, 'text-[1.5vw]')}
            </div>
          </div>
        </div>
        {isLoading ? (
          <MySpinner />
        ) : (
          results &&
          DescriptionItem(
            'Episodes:',
            showEpisodesNames(results.data),
            'text-lg border-1 inline-block max-h-[30dvh] overflow-y-auto border-amber-300 p-1'
          )
        )}
      </div>
      <CloseDetail />
    </div>
  );
}
