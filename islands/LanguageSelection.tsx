import { updateLanguageSelection } from "../services/local_api.ts";
import {
  effect,
  signal,
} from "https://esm.sh/v135/@preact/signals-core@1.5.1/denonext/signals-core.mjs";

export function LanguageSelection(props: {
  guess: string;
  translation: string;
}) {
  const availableLanguages = ["pol", "eng", "hun", "fin", "fra"];
  const [guessLangInit, translationLangInit] = [props.guess, props.translation];
  const guessLang = signal(guessLangInit);
  const translationLang = signal(translationLangInit);

  const updateGuessLang = effect(() =>
    guessLang.value !== guessLangInit
      ? updateLanguageSelection({ type: "guess", value: guessLang.value })
        .then((res) => window.location.reload())
      : undefined
  );
  const updateTranslationLang = effect(() =>
    translationLang.value !== translationLangInit
      ? updateLanguageSelection({
        type: "translation",
        value: translationLang.value,
      })
        .then((res) => window.location.reload())
      : undefined
  );

  const changeLanguage = (lang: Event, type: "guess" | "translation") => {
    const value = (lang.target as HTMLSelectElement).value;
    switch (type) {
      case "guess":
        guessLang.value = value;
        break;
      case "translation":
        translationLang.value = value;
        break;
    }
  };

  return (
    <div className="flex flex-col">
      <div className={"mr-5"}>
        <label htmlFor="guess_lang">Fill in the blank language</label>
        <select
          name="guess_lang"
          id="guess_lang"
          value={props.guess}
          onChange={(event) => changeLanguage(event, "guess")}
        >
          {availableLanguages.map((lang) => <option value={lang}>{lang}
          </option>)}
        </select>
      </div>
      <div>
        <label htmlFor="translation_lang">Translate to</label>
        <select
          name="translation_lang"
          id="translation_lang"
          value={props.translation}
          onChange={(event) => changeLanguage(event, "translation")}
        >
          {availableLanguages.map((lang) => (
            <option
              value={lang}
            >
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
