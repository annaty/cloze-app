import { FreshContext } from 'https://deno.land/x/fresh@1.6.8/src/server/types.ts';
import { getRandomSentence } from '../common/api_methods.ts';
import { SentenceChecker } from '../islands/SentenceChecker.tsx';
import { GUESS_LANGUAGE, TRANSLATION_LANGUAGE } from '../static/constants.ts';

export default async function HomePage(_req: any, ctx: FreshContext) {
  const sentence = await getRandomSentence(GUESS_LANGUAGE, TRANSLATION_LANGUAGE);

  if (!sentence) {
    return <h2>No random sentence found</h2>;
  }

  return (
    <div class="w-full flex justify-center">
      <SentenceChecker sentence={sentence}></SentenceChecker>
    </div>
  );
}