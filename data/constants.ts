import { SourceLanguageCode, TargetLanguageCode } from "deepl-node";

// TATOEBA API
export const TATOEBA_API = "https://tatoeba.org/fr/api_v0";

// DICTIONARY API
export const DICTIONARY_API =
  "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const tatoebaToDeepLLangFormat: {
  [key: string]: { source: SourceLanguageCode; target: TargetLanguageCode };
} = {
  eng: {
    source: "en",
    target: "en-US",
  },
  pol: {
    source: "pl",
    target: "pl",
  },
  hun: {
    source: "hu",
    target: "hu",
  },
  fin: {
    source: "fi",
    target: "fi",
  },
  fra: {
    source: "fr",
    target: "fr",
  },
};
