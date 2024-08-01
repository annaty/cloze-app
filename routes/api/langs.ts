import { Handlers } from "https://deno.land/x/fresh@1.6.8/src/server/types.ts";
import { KV } from "../index.tsx";

export interface Lang {
  type: "guess" | "translation";
  value: string;
}

const defaultValue = {
  guess: {
    key: "guess",
    value: "fra",
  },
  translation: {
    key: "translation",
    value: "eng",
  },
};

export const handler: Handlers<{ [type: string]: Lang } | null> = {
  async GET(_req, ctx) {
    const guessKey = ["lang", "guess"];
    const translationKey = ["lang", "translation"];

    const [guess, translation] = [
      (await KV.get<Lang>(guessKey)).value,
      (await KV.get<Lang>(translationKey)).value,
    ];
    return new Response(JSON.stringify({
      guess: guess ?? defaultValue.guess,
      translation: translation ?? defaultValue.translation,
    }));
  },
};
