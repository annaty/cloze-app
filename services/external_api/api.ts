import { getDictionaryData } from "./dictionary/api.ts";
import { getEnglishTranslation } from "./deepL/api.ts";

// get words related to the "blanked" word to populate guess option list
export const getGuessingOptions = (
  word: string,
  guessLang: string,
): Promise<string[]> =>
  getEnglishTranslation(word, guessLang)
    .then((res) => getDictionaryData(res.text, guessLang));
