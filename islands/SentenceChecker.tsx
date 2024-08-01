import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/denonext/signals.mjs";
import { GuessOptions } from "../components/GuessOptions.tsx";
import { TatoebaResult } from "../services/external_api/tatoeba/types.ts";

export function SentenceChecker(props: {
  randomSentenceData: TatoebaResult;
  textWithBlank: string;
  guessWord: string;
  guessingOptions?: string[];
}) {
  const { textWithBlank, guessWord, guessingOptions } = props;
  const { id, text, lang, translation } = props.randomSentenceData;
  const isGuessCorrect = useSignal();

  const updateIsGuessCorrect = (value: boolean) => isGuessCorrect.value = value;

  return (
    <div class="container flex flex-col gap-5 mt-10 items-center">
      <h2 className="bold text-xl text-center">
        {isGuessCorrect.value ? text : textWithBlank}
      </h2>
      <h4 class="italic text-sm text-center">
        {translation?.text ?? "No translation found"}
      </h4>
      <GuessOptions
        options={guessingOptions ?? []}
        guessWord={guessWord}
        updateIsGuessCorrect={updateIsGuessCorrect}
      />
    </div>
  );
}
