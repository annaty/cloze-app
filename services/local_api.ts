import { Lang } from "../routes/api/langs.ts";

export const LOCAL_API = "http://localhost:8000/api/";

export const getLanguageSelection = (): Promise<{ [type: string]: Lang }> =>
  fetch(`${LOCAL_API}langs`)
    .then((res) => res.json());

export const updateLanguageSelection = (body: Lang): Promise<Lang> =>
  fetch(`${LOCAL_API}update_lang`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());
