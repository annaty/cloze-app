import { TATOEBA_API } from "../../../data/constants.ts";
import { transformTatoebaResponse } from "./helpers.ts";

export const getRandomSentence = (from: string, to: string) =>
  fetch(
    `${TATOEBA_API}/search?from=${from}&orphans=no&sort=random&to=${to}&unapproved=no`,
  )
    .then((res) => res.json())
    .then((res) => transformTatoebaResponse(res, to));
