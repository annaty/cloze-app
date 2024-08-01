import { DictionaryApiResponse } from "./types.ts";
import { getWordWithoutPunctuation } from '../tatoeba/helpers.ts';

export const transformDictionaryResponse = (
  res: DictionaryApiResponse[] | DictionaryApiResponse,
): string[] => {
  const result = Array.isArray(res) ? res : [res];
  const potentialGuessOptions = [
    ...new Set(
      result
        .map((res) => getWordMeanings(res)).flat()
        .map((meaning) => [...meaning.synonyms, ...meaning.antonyms]).flat(),
    ),
  ];
  return potentialGuessOptions.length > 2
    // get three random words from synonyms and antonyms of the guessed word
    ? getThreeRandomWords(potentialGuessOptions)
    // if not enough words, take the definitions and get random words from that
    : getThreeRandomWords(
      [
        ...new Set(
          result
            .map((res) => getWordMeanings(res)).flat()
            .map((meaning) =>
              meaning.definitions
                .map((def) => def.definition.split(" "))
            )
            .flat(2)
            //filter out words in parentheses since they're usually linguistic comments
            .filter((word) => !word.includes("("))
            .map((word) => getWordWithoutPunctuation(word.toLowerCase())),
        ),
      ],
    );
};

const getWordMeanings = (res: DictionaryApiResponse) =>
  res.meanings
    // filter interjections since they have weird/unusable synonyms
    .filter((meaning) => meaning.partOfSpeech !== "interjection");

export const getThreeRandomWords = (words: string[]) => {
  const result: string[] = [];
  while (result.length < 3) {
    const idx = Math.floor(Math.random() * words.length);
    if (!result.includes(words[idx])) result.push(words[idx]);
  }
  return result;
};

export const shuffleWordArray = (words: string[]): string[] =>
  words
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
