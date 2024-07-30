// Tatoeba API types
export interface TatoebaApiResponse {
	paging: any;
	results: TatoebaResult[];
}

export interface TatoebaResult extends SentenceData {
	translations?: SentenceData[][]; // api format (translations array grouped by language)
	translation?: SentenceData; // my format
}

export interface SentenceData {
	id: number;
	text: string;
	lang: string; // eng, hun, pol
}

// DeepL
export interface DeepLApiResponse {
	text: string;
	detectedSourceLang: string; // en, hun
}

// Dictionary API
export interface DictionaryApiResponse {
	word: string;
	meanings: DictionaryMeaning[];
	title?: string; // only present if no definition found
}

export interface DictionaryMeaning {
	partOfSpeech: string;
	definitions: DictionaryDefinition[]
	synonyms: string[]
	antonyms: string[]
}

export interface DictionaryDefinition {
	definition: string;
	synonyms: string[]
	antonyms: string[]
}
