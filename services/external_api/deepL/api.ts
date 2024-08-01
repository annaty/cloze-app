import * as deepl from "deepl-node";
import { DEEPL_API_KEY } from "../../../data/env_constants.ts";
import { tatoebaToDeepLLangFormat } from "../../../data/constants.ts";
import { DeepLApiResponse } from "./types.ts";

export const deepL = new deepl.Translator(DEEPL_API_KEY);

// get english translation of the guessed word so that we can use it with the dictionary API in getGuessWordSynonyms()
// (dictionary API only has data for english words)
export const getEnglishTranslation = (
  word: string,
  guessLang: string,
): Promise<DeepLApiResponse> =>
  deepL.translateText(
    word,
    tatoebaToDeepLLangFormat[guessLang].source,
    "en-US",
  );

// translate the list of guessing options to the language we are guessing in
export const getGuessingLanguageTranslation = (
  words: string[],
  guessLang: string,
): Promise<DeepLApiResponse[]> =>
  deepL.translateText(
    words.filter((word) => word.length > 0),
    "en",
    tatoebaToDeepLLangFormat[guessLang].target,
  );
