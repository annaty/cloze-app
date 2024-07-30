import { useSignal } from 'https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/denonext/signals.mjs';
import { JSX } from 'https://esm.sh/v128/preact@10.19.6/src/index.d.ts';

export function GuessOptions(props: {
	options: string[];
	guessWord: string;
	updateIsGuessCorrect: (value: boolean) => void
}) {
	const { options, guessWord, updateIsGuessCorrect } = props;
	const isGuessCorrect = useSignal();
	const optionButtons: (HTMLButtonElement | null)[] = [];

	const check = (event: MouseEvent, option: string) => {
		isGuessCorrect.value = option === guessWord;
		optionButtons.forEach(button => button ? button.style.backgroundColor = 'transparent' : undefined)
		if (isGuessCorrect.value) {
			(event.target as HTMLButtonElement).style.backgroundColor = 'lightgreen'
		} else {
			(event.target as HTMLButtonElement).style.backgroundColor = 'coral'
		}
		updateIsGuessCorrect(isGuessCorrect.value)
	}

	return (
			<div class={"flex flex-col w-80 gap-3"}>
				{
					options ?
						options.map(option =>
							<button
								onClick={(event) => check(event, option)}
								ref={ref => optionButtons.push(ref) }
								class={"guess-option"}
							>
								{option}
							</button>
						) :
						<div>Error fetching words</div>
				}
				{getGuessResult(isGuessCorrect.value)}
			</div>
	);
}

const getGuessResult = (isGuessCorrect?: boolean): JSX.Element | null => {
	switch (isGuessCorrect) {
		case undefined:
		case false:
			return null;
		case true:
			return (
				<button
					onClick={() => window.location.reload()}
					class="w-fit self-center bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
				>Get another sentence
				</button>);
	}
}