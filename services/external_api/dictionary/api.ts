import { DICTIONARY_API } from "../../../data/constants.ts";
import { dictionaryApiHeaders } from "../../../data/env_constants.ts";
import { FALLBACK } from "../../../data/fallback_guesses.ts";
import { getThreeRandomWords, transformDictionaryResponse } from "./helpers.ts";
import { DictionaryApiResponse } from "./types.ts";
import { getGuessingLanguageTranslation } from "../deepL/api.ts";

// get dictionary data for given word
export const getDictionaryData = (word: string, guessLang: string) =>
  fetch(`${DICTIONARY_API}${word}`, {
    headers: dictionaryApiHeaders,
  })
    .then((res) => res.json())
    .then((res: DictionaryApiResponse | DictionaryApiResponse[]) =>
      transformOrFallback(res, guessLang)
    );

export const transformOrFallback = async (
  res: DictionaryApiResponse | DictionaryApiResponse[],
  guessLang: string,
): Promise<string[]> => {
  const words = "title" in res && res.title === "No Definitions Found"
    ? getThreeRandomWords(FALLBACK)
    : transformDictionaryResponse(res);

  return getGuessingLanguageTranslation(words, guessLang)
    .then((res) => res.map((translation) => translation.text));
};
