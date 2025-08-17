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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestObj),
  });
  if (isCsvResponse(response)) {
    const { blob, error } = response;
    if (!error && !!blob) {
      const blob = await response.blob();
      downloadCsv(link, favorites.length, blob);
    }
  }
}

function isCsvResponse(obj: object): obj is CsvResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'blob' in obj &&
    (obj.blob === null || obj.blob instanceof Blob) &&
    (!('error' in obj) || typeof obj.error === 'string')
  );
}
