export interface TatoebaApiResponse {
  paging: any;
  results: TatoebaResult[];
}

export interface TatoebaResult extends SentenceData {
  translations?: SentenceData[][]; // api format (translations array grouped by language)
  translation?: SentenceData; // my format
}

export interface SentenceData {
  id: number;
  text: string;
  lang: string; // eg. eng, hun, pol
}
