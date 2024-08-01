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

export const separateSentenceAndGuessWord = (text: string,): [string, string] => {
  const words = text
    .split(" ")
    .filter((word) => word.length);
  const randomWordIndex = Math.floor(Math.random() * words.length);
  const randomWord = randomWordIndex === 0 ? getWordWithoutPunctuation(words[randomWordIndex]).toLowerCase() : getWordWithoutPunctuation(words[randomWordIndex]);
  return [getSentenceWithBlank(words, randomWordIndex), randomWord];
};

export const getSentenceWithBlank = (words: string[], blankIndex: number): string => {
  const word = words[blankIndex];
  const blank = ',.?!;'.includes(word[word.length - 1]) ?
    new Array(word.length - 1).fill("_").join("") + word[word.length - 1] :
    new Array(word.length).fill("_").join("");

  return words.map((w, i) => i === blankIndex ? blank : w).join(" ")
}

export const getWordWithoutPunctuation = (word: string): string =>
  word
    .split("")
    .filter((char) => !".,?!;()".includes(char))
    .join("");
