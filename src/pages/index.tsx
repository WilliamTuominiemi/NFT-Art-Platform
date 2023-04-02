import Layout from "@/components/layout";
import { api } from "@/utils/api";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const { data, isLoading } = api.example.hello.useQuery({
    text: "team",
  });

  return (
    <Layout title="Home">
      <p>{isLoading ? "Loading..." : data?.greeting}</p>
    </Layout>
  );
};

export default Home;
