import Layout from "@/components/layout";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <Layout title="Home">
      <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
    </Layout>
  );
};

export default Home;
