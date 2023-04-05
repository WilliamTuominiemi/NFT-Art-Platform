import Layout from "@/components/layout";
import { LoadingCard } from "@/components/loading-card";
import { PostCard } from "@/components/post-card";
import { api } from "@/utils/api";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = api.post.getAll.useQuery({ limit: 100 });

  if (isError) return <div>Error</div>;

  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <>
            {Array(12)
              .fill(1)
              .map((_, idx) => (
                <LoadingCard key={`${idx}-loader`} />
              ))}
          </>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
