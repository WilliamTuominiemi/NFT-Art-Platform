import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="bg-white text-slate-900">
      <Head />
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
