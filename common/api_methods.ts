export const getRandomSentence = (from: string, to: string) => {
	const headers = new Headers();

	return fetch(`https://tatoeba.org/fr/api_v0/search?from=${from}&orphans=no&sort=random&to=${to}&unapproved=no`,{
		method: 'GET',
		headers
	})
		.then(res => res.json())
		.then((res: RandomSentenceApiResponse) => {
			const sentence = res.results[0];
			return {
				id: sentence.id,
				text: sentence.text,
				lang: sentence.lang,
				translation: sentence.translations?.find(tArray => tArray.find(t => t.lang === to))?.flat()[0] ??
					sentence.translations?.find(tArray => tArray.find(t => t.lang === 'eng'))?.flat()[0]
			};
		})
		.then(res => {
			console.log(res);
			return res;
		})
};

export interface RandomSentenceApiResponse {
	paging: any;
	results: Result[];
}

export interface Result extends SentenceData{
	translations?: SentenceData[][]; // api format
	translation?: SentenceData; // my format
}

export interface SentenceData {
	id: number;
	text: string;
	lang: string; // eng, hun
}
