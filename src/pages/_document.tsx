import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="bg-white font-sans text-slate-900 antialiased">
      <Head />
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
