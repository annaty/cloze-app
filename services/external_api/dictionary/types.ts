// Dictionary API
export interface DictionaryApiResponse {
  word: string;
  meanings: DictionaryMeaning[];
  title?: string; // only present if no definition found
}

export interface DictionaryMeaning {
  partOfSpeech: string;
  definitions: DictionaryDefinition[];
  synonyms: string[];
  antonyms: string[];
}

export interface DictionaryDefinition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
}
