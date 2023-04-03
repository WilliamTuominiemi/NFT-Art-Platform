import Layout from "@/components/layout";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = api.post.getAll.useQuery({ limit: 100 });

  return (
    <Layout title="Home">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {!isLoading && !isError
          ? posts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg bg-slate-100 px-4 py-4 dark:bg-slate-800"
              >
                <Image alt="Post" src={post.image} height={300} width={300} />
              </div>
            ))
          : null}
      </div>
    </Layout>
  );
};

export default Home;
