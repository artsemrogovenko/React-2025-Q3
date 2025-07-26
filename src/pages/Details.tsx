import { type Character, getEpisode } from 'rickmortyapi';
import pagesStyles from './Pages.module.scss';
import { DescriptionItem } from './DescriptionItem';
import {
  ejectEpisodesIds,
  showEpisodesNames,
  useRequest,
  useUpdateLocation,
} from '../api/utils';
import { useContext, useEffect } from 'react';
import { MySpinner } from '../components/Loader';
import { AppContext, FLEX_STYLE_ROUNDED } from '../constants';
import { MyButton } from '../components/MyButton';
import type { CharacterEpisode } from '../types';

export function Details({ character }: { character: Character }) {
  const context = useContext(AppContext);
  const { updateParam, removeParam } = useUpdateLocation();

  const { isLoading, requestData, results } = useRequest<
    CharacterEpisode | CharacterEpisode[]
  >();

  const { episode, gender, image, location, name, species, status, type, id } =
    character;

  useEffect(() => {
    const episodesIds = ejectEpisodesIds(episode);
    requestData(() => getEpisode(episodesIds));
    if (id) updateParam('details', id.toString());
  }, [requestData, episode, character, id]);

  const handleClick = () => {
    context?.closeDetails();
    removeParam('details');
  };
  return (
    <div className="flex flex-col  w-full">
      <div
        data-testid="character-details"
        className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-h-fit gap-y-4 `}
      >
        <div className="flex  gap-2">
          <div className="flex size-1/2 size-max-[412px] rounded-2xl">
            <img src={image} alt={name} className="size-full object-cover" />
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
          results !== null &&
          DescriptionItem(
            'Episodes:',
            showEpisodesNames(results.data),
            'text-lg'
          )
        )}
      </div>
      <MyButton text="Close" onClick={handleClick} style={'font-bold'} />
    </div>
  );
}
