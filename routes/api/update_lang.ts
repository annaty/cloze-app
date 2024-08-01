import { Handlers } from "https://deno.land/x/fresh@1.6.8/src/server/types.ts";
import { Lang } from "./langs.ts";
import { KV } from "../index.tsx";

export const handler: Handlers<Lang | null> = {
  async POST(req, _ctx) {
    console.log(req);
    const lang = (await req.json()) as Lang;
    const langKey = ["lang", lang.type];
    const ok = await KV.atomic().set(langKey, lang).commit();
    console.log("post ", lang);
    if (!ok) throw new Error("Something went wrong.");
    return new Response(JSON.stringify(lang));
  },
};
