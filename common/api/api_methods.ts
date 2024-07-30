import * as deepl from 'deepl-node';
import { DeepLApiResponse, DictionaryApiResponse } from "./api_types.ts";
import { getThreeRandomWords, transformDictionaryResponse, transformTatoebaResponse } from './api_helper_methods.ts';
import {
	DEEPL_API_KEY,
	DICTIONARY_API, dictionaryApiHeaders,
	TATOEBA_API,
	tatoebaToDeepLLangFormat
} from '../constants/server_constants.ts';
import { FALLBACK } from './fallback_guesses.ts';

export const deepL = new deepl.Translator(DEEPL_API_KEY);

// get random sentence from tatoeba
export const getRandomSentence = (from: string, to: string) =>
	fetch(`${TATOEBA_API}/search?from=${from}&orphans=no&sort=random&to=${to}&unapproved=no`)
		.then(res => res.json())
		.then(res => transformTatoebaResponse(res, to))

// get english translation of the guessed word so that we can use it with the dictionary API in getGuessWordSynonyms()
// (dictionary API only has data for english words)
export const getEnglishTranslation = (word: string, guessLang: string): Promise<DeepLApiResponse> => deepL.translateText(word, tatoebaToDeepLLangFormat[guessLang].source, 'en-US');

// translate the list of guessing options to the language we are guessing in
export const getGuessingLanguageTranslation = (words: string[], guessLang: string): Promise<DeepLApiResponse[]> =>
	deepL.translateText(
		words.filter(word => word.length > 0),
		'en',
		tatoebaToDeepLLangFormat[guessLang].target
	);

// get related words to populate guess option list
export const getGuessingOptions = (word: string, guessLang: string): Promise<string[]> =>
	getEnglishTranslation(word, guessLang)
		.then(res => getDictionaryData(res.text, guessLang));

// get dictionary data for given word
export const getDictionaryData = (word: string, guessLang: string) => fetch(`${DICTIONARY_API}${word}`, {
	headers: dictionaryApiHeaders
})
	.then(res => res.json())
	.then((res: DictionaryApiResponse | DictionaryApiResponse[]) => transformOrFallback(res, guessLang));

export const transformOrFallback = async (res: DictionaryApiResponse | DictionaryApiResponse[], guessLang: string): Promise<string[]>  => {
	const words = 'title' in res && res.title === "No Definitions Found" ?
		getThreeRandomWords(FALLBACK) :
		transformDictionaryResponse(res);

	return getGuessingLanguageTranslation(words, guessLang)
		.then(res => res.map(translation => translation.text))
}
