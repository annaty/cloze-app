import { TATOEBA_API } from "../../../data/constants.ts";
import { separateSentenceAndGuessWord, transformTatoebaResponse } from "./helpers.ts";

export const getRandomSentence = (from: string, to: string) =>
  fetch(
    `${TATOEBA_API}/search?from=${from}&orphans=no&sort=random&to=${to}&unapproved=no`,
  )
    .then((res) => res.json())
    .then((res) => transformTatoebaResponse(res, to));

export const getRandomSentenceWithBlank = async (from: string, to: string): Promise<[string, string]> =>
  await getRandomSentence(from, to)
  .then(randomSentence => separateSentenceAndGuessWord(randomSentence.text))
