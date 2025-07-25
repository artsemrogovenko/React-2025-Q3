import { getEpisode, type Character } from 'rickmortyapi';
import pagesStyles from './Pages.module.scss';
import { DescriptionItem } from './DescriptionItem';
import { ejectEpisodesIds, showEpisodesNames, useRequest } from '../api/utils';
import { useContext, useEffect } from 'react';
import { MySpinner } from '../components/Loader';
import { AppContext, FLEX_STYLE_ROUNDED } from '../constants';
import { MyButton } from '../components/MyButton';
import type { CharacterEpisode } from '../types';

export function Details({ character }: { character: Character }) {
  const context = useContext(AppContext);

  const { episode, gender, image, location, name, species, status, type } =
    character;

  const { isLoading, requestData, results } = useRequest<
    CharacterEpisode | CharacterEpisode[]
  >();

  useEffect(() => {
    const episodesIds = ejectEpisodesIds(episode);
    requestData(() => getEpisode(episodesIds));
  }, [requestData, episode, character]);

  return (
    <div className="flex flex-col flex-1 w-full h-[100dvh] sticky top-0">
      <div
        data-testid="character-details"
        className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-h-fit gap-y-4 bg-amber-100`}
      >
        <div className="flex  ">
          <div className="flex w-1/2 size-max-[412px] rounded-2xl">
            <img src={image} alt={name} className="size-full object-cover" />
          </div>

          <div className={`flex flex-col w-[50%]`}>
            <h3 className="text-[3vw] font-bold">{name}</h3>
            <div className="flex flex-col ">
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
          DescriptionItem(
            'Episodes:',
            showEpisodesNames(results.data),
            'text-lg'
          )
        )}
      </div>
      <MyButton
        text="Close"
        onClick={context?.closeDetails}
        style={'font-bold'}
      />
    </div>
  );
}
