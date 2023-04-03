import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import Head from "next/head";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | Baynet`}</title>
        <meta name="description" content="Social media for drawings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex flex-col space-y-6">
        <Navbar />
        <main className="container">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
