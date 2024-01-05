import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head />
      <body className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
