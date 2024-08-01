import { TatoebaApiResponse, TatoebaResult } from "./types.ts";

export const transformTatoebaResponse = (
  res: TatoebaApiResponse,
  translationLanguage: string,
): TatoebaResult => {
  const sentence = res.results[0];
  return {
    id: sentence.id,
    text: sentence.text,
    lang: sentence.lang,
    translation:
      sentence.translations?.find((tArray) =>
        tArray.find((t) => t.lang === translationLanguage)
      )?.flat()[0] ??
        sentence.translations?.find((tArray) =>
          tArray.find((t) => t.lang === "eng")
        )?.flat()[0],
  };
};
