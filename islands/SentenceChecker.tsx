import { Result } from '../common/api_methods.ts';
import { useSignal } from 'https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/denonext/signals.mjs';
import { JSX } from 'https://esm.sh/v128/preact@10.19.6/src/index.d.ts';

export function SentenceChecker(props: { sentence: Result }) {
	const { id, text, lang, translation } = props.sentence;
	const [textWithBlank, wordToGuess] = getTextWithBlank(text)
	const guess = useSignal('');
	const isGuessCorrect = useSignal();

	const check = () => {
		isGuessCorrect.value = guess.value.toLowerCase() === wordToGuess;
	}

	return (
		<div class="container flex flex-col gap-5 mt-10">
			<h2 className="bold text-xl text-center">{isGuessCorrect.value ? text : textWithBlank}</h2>
			<h4 class="italic text-sm text-center">{translation?.text ?? 'No translation found'}</h4>
			<input
				type="text"
				placeholder="Take a guess"
				onInput={(event) => { guess.value = (event.target as HTMLInputElement)?.value }}
				class={"w-80 self-center p-2 border border-gray-300 rounded"}
			/>
			<button
				onClick={check}
				class="w-fit self-center bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
			>Check</button>
			{getGuessResult(isGuessCorrect.value)}
		</div>
	);
}

const getTextWithBlank = (text: string): [string, string] => {
	const randomWordIndex = Math.floor(Math.random() * text.split(' ').length);
	return [text
		.split(' ')
		.map((word, i) =>
			i === randomWordIndex ?
				new Array(word.length).fill('_').join('') :
				word
		)
		.join(' '),
		getWordWithoutPunctuation(text.split(' ')[randomWordIndex])
	];
}

const getWordWithoutPunctuation = (word: string): string => {
	return word.split('').filter(char => !'.,'.includes(char)).join('');
}

const getGuessResult = (isGuessCorrect?: boolean): JSX.Element | null => {
	switch (isGuessCorrect) {
		case undefined:
			return null;
		case true:
			return (<div class={"bg-green-100"}>
				<h3>Correct!</h3>
				<button
					onClick={() => window.location.reload()}
					class="w-fit self-center bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
				>Get another sentence
				</button>
			</div>);
		case false:
			return <h3>Incorrect</h3>;
	}
}