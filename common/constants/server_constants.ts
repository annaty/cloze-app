import { TargetLanguageCode, SourceLanguageCode } from 'deepl-node';

// TATOEBA API
export const TATOEBA_API = 'https://tatoeba.org/fr/api_v0';

// DICTIONARY API
export const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
export const dictionaryApiHeaders = new Headers();
dictionaryApiHeaders.append('From', Deno.env.get('USER_EMAIL') ?? '')

// DEEPL API API
export const DEEPL_API_KEY = Deno.env.get("DEEPL_API_KEY") ?? "MISSING";
if (!DEEPL_API_KEY || !DEEPL_API_KEY.length || DEEPL_API_KEY === "MISSING") {
	console.error(
		"No DeepL API key found!\n"
		+ "Make sure the key is provided in your .env.local file under DEEPL_API_KEY entry"
	)
}

export const tatoebaToDeepLLangFormat: { [key:string]: { source: SourceLanguageCode; target: TargetLanguageCode } } = {
	eng: {
		source: 'en',
		target: 'en-US'
	},
	pol: {
		source: 'pl',
		target: 'pl'
	},
	hun: {
		source: 'hu',
		target: 'hu'
	},
	fin: {
		source: 'fi',
		target: 'fi'
	},
	fra: {
		source: 'fr',
		target: 'fr'
	}
}
