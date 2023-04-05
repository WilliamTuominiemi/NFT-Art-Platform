import Layout from "@/components/layout";
import { LoadingCard } from "@/components/loading-card";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translations";
import { api } from "@/utils/api";
import { Brush } from "lucide-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    data: posts,
    isLoading,
    isError,
  } = api.post.getAll.useQuery({ limit: 100 });

  if (isError) return <div>Error</div>;

  return (
    <Layout title="Home">
      <div className="mb-12 flex justify-between">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide">
            {posts?.length === 0 ? t.home.welcome : t.home.feed}
          </h1>
          <p className="text-slate-500">
            {posts?.length === 0 ? t.home.noPosts : t.home.description}
          </p>
        </div>
        <Button onClick={() => router.push("/create")}>
          <Brush className="mr-2 h-4 w-4" />
          <span>{t.create.create}</span>
        </Button>
      </div>
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
