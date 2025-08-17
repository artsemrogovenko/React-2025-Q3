'use server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { makeCsv } from '../../../components/api/utils';
import type { CsvResponse, FavoriteRequest } from '../types';
import { NOT_FOUND_MSG } from '../../../components/constants';

const SUCCESS = 200;

export async function POST(
  request: NextRequest
): Promise<NextResponse<CsvResponse>> {
  const { id } = (await request.json()) as FavoriteRequest;

  if (!Array.isArray(id)) {
    return NextResponse.json(
      { blob: null, error: 'Use array number' },
      { status: 400 }
    );
  }
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  );
  const characters = await response.json();
  if ('error' in characters) {
    return NextResponse.json(
      { blob: null, error: characters.error || NOT_FOUND_MSG },
      { status: characters.status || 400 }
    );
  }
  const blob = Array.isArray(characters)
    ? makeCsv(characters)
    : makeCsv([characters]);
  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="characters.csv"',
    },
    status: SUCCESS,
  });
}
