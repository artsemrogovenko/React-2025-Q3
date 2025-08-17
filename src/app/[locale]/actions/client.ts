import type { RefObject } from 'react';
import { downloadCsv } from '../../../components/api/utils';
import type { CsvResponse } from '../types.ts';

export async function sendFavorites(
  favorites: number[],
  link: RefObject<HTMLAnchorElement | null>
): Promise<void> {
  const requestObj = { id: favorites };
  const response = await fetch('/api/server', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestObj),
  });
  if (isCsvResponse(response)) {
    const { error } = response;
    const blob = await response.blob();
    if (!error && blob) {
      downloadCsv(link, favorites.length, blob);
    }
  }
}

function isCsvResponse(obj: object): obj is CsvResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'blob' in obj &&
    (!('error' in obj) || typeof obj.error === 'string')
  );
}
