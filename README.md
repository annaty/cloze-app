Small project for generating "fill-in-the-blank" sentences, made with the Deno-based full stack framework [Fresh](https://fresh.deno.dev/).

The project uses 3 APIs: 
- [Tatoeba API](https://en.wiki.tatoeba.org/articles/show/api#) for getting sentences
- [Dictionary API](https://dictionaryapi.dev/) for getting synonyms/related words of the "blanked" word
- [DeepL API](https://www.deepl.com/en/pro-api) for translating the synonyms/related words of the "blanked" word

To use the app you need a DeepL API key, which you can get for free [here](https://www.deepl.com/en/signup?cta=checkout).

### Running the project locally

1. Clone the repository
2. Add a `.env.local` file at the root of the project with the following variables

```yaml
DEEPL_API_KEY="your deepl api key here"
USER_EMAIL="your email here" // used for signing the Dictionary API requests
```

3. Make sure to install Deno: https://deno.land/manual/getting_started/installation

4. Start the project with:

```bash
deno task start
```

This will watch the project directory and restart as necessary.
