export const separateSentenceAndGuessWord = (
  text: string,
): [string, string] => {
  const words = text
    .split(" ")
    .map((word) => getWordWithoutPunctuation(word))
    .filter((word) => word.length);
  const randomWordIndex = Math.floor(Math.random() * words.length);
  return [
    words.map((word, i) =>
      i === randomWordIndex ? new Array(word.length).fill("_").join("") : word
    ).join(" "),
    getWordWithoutPunctuation(text.split(" ")[randomWordIndex].toLowerCase()),
  ];
};

export const getWordWithoutPunctuation = (word: string): string =>
  word
    .split("")
    .filter((char) => !".,?!;()".includes(char))
    .join("");

export const shuffleWordArray = (words: string[]): string[] =>
  words
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
