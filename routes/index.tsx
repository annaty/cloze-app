import { FreshContext } from 'https://deno.land/x/fresh@1.6.8/src/server/types.ts';
import { getGuessingOptions, getRandomSentence } from '../common/api/api_methods.ts';
import { SentenceChecker } from '../islands/SentenceChecker.tsx';
import { separateSentenceAndGuessWord, shuffleWordArray } from '../common/text_methods.ts';
import { getLanguageSelection } from '../common/internal_api/api_methods.ts';
import { LanguageSelection } from '../islands/LanguageSelection.tsx';

export const KV = await Deno.openKv();

export default async function HomePage(_req: any, ctx: FreshContext) {
  const {guess, translation} = await getLanguageSelection()
  const randomSentenceData = await getRandomSentence(guess.value, translation.value);
  const [textWithBlank, guessWord] = separateSentenceAndGuessWord(randomSentenceData.text);
  let guessingOptions;

  if (!randomSentenceData) {
    return <h2>No random sentence found</h2>;
  } else {
    console.log(guessWord)
    guessingOptions = await getGuessingOptions(guessWord, guess.value)
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
        ></SentenceChecker>
      </div>
    </div>
  );
}
