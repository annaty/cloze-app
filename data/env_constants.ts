export const dictionaryApiHeaders = new Headers();
dictionaryApiHeaders.append("From", Deno.env.get("USER_EMAIL") ?? "");

// DEEPL API
export const DEEPL_API_KEY = Deno.env.get("DEEPL_API_KEY") ?? "MISSING";
if (!DEEPL_API_KEY || !DEEPL_API_KEY.length || DEEPL_API_KEY === "MISSING") {
  console.error(
    "No DeepL API key found!\n" +
      "Make sure the key is provided in your .env.local file under DEEPL_API_KEY entry",
  );
}
