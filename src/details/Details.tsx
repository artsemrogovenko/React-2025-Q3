import { type Character } from 'rickmortyapi';
import pagesStyles from '../pages/Pages.module.scss';
import { DescriptionItem } from './DescriptionItem.tsx';
import { ejectEpisodesIds, showEpisodesNames } from '../api/utils.ts';
import { MySpinner } from '../components/Loader.tsx';
import { FLEX_STYLE_ROUNDED, SIZE_IMG } from '../constants.ts';
import { CloseDetail } from '../components/CloseDetail.tsx';
import { useGetEpisodesNamesQuery } from '../services/rickMorty.ts';
import { RefreshDetails } from '../components/RefreshDetails.tsx';
import Image from 'next/image';

export function Details({ character }: { character: Character }) {
  const { episode, gender, image, location, name, species, status, type, id } =
    character;
  const episodesIds = ejectEpisodesIds(episode);
  const { data: results, isFetching } = useGetEpisodesNamesQuery(episodesIds);

  return (
    <div className="flex flex-col w-full">
      <RefreshDetails characterId={id} episodesIds={episodesIds} />
      <div
        data-testid="character-details"
        className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-h-fit gap-y-4 `}
      >
        <div className="flex gap-2">
          <div className="flex rounded-2xl">
            <Image
              src={image}
              alt={name}
              className=" object-cover"
              loading="lazy"
              width={SIZE_IMG}
              height={SIZE_IMG}
            />
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
        {isFetching ? (
          <MySpinner />
        ) : (
          results &&
          DescriptionItem(
            'Episodes:',
            showEpisodesNames(results.data),
            'text-lg border-1 inline-block max-h-[30dvh] overflow-y-auto  p-1'
          )
        )}
      </div>
      <CloseDetail />
    </div>
  );
}
