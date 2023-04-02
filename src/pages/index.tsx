import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <Layout title="Home">
      <div>
        <p>
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
        <Button
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign Out" : "Sign In"}
        </Button>
      </div>
    </Layout>
  );
};

export default Home;
