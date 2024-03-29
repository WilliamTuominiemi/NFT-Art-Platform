import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Baynet</title>
        <meta name="description" content="Social media for drawings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen flex-col space-y-6">
        <Navbar />
        <main className="flex-1">
          <div className="container">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};
