import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fill-in-the-blank</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <h1 className={"text-4xl"}>fill-in-the-blank</h1>
        <Component />
      </body>
    </html>
  );
}
