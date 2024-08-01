import { FreshContext } from "https://deno.land/x/fresh@1.6.8/src/server/types.ts";
import { SentenceChecker } from "../islands/SentenceChecker.tsx";
import { getLanguageSelection } from "../services/local_api.ts";
import { LanguageSelection } from "../islands/LanguageSelection.tsx";
import { getRandomSentence } from "../services/external_api/tatoeba/api.ts";
import { getGuessingOptions } from "../services/external_api/api.ts";
import { separateSentenceAndGuessWord } from '../services/external_api/tatoeba/helpers.ts';
import { shuffleWordArray } from '../services/external_api/dictionary/helpers.ts';

export const KV = await Deno.openKv();

export default async function HomePage(_req: any, ctx: FreshContext) {
  const { guess, translation } = await getLanguageSelection();
  const randomSentenceData = await getRandomSentence(
    guess.value,
    translation.value,
  );
  const [textWithBlank, guessWord] = separateSentenceAndGuessWord(
    randomSentenceData.text,
  );
  let guessingOptions;

  if (!randomSentenceData) {
    return <h2>No random sentence found</h2>;
  } else {
    guessingOptions = await getGuessingOptions(guessWord, guess.value);
  }

  return (
    <div className="w-full flex flex-col">
      <div class={"self-start"}>
        <LanguageSelection
          guess={guess.value}
          translation={translation.value}
        />
      </div>
      <div class={"self-center"}>
        <SentenceChecker
          randomSentenceData={randomSentenceData}
          textWithBlank={textWithBlank}
          guessWord={guessWord}
          guessingOptions={shuffleWordArray([...guessingOptions, guessWord])}
        >
        </SentenceChecker>
      </div>
    </div>
  );
}
