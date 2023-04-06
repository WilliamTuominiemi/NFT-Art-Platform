import Layout from "@/components/layout";
import { LoadingCard } from "@/components/post/loading-card";
import { PostCard } from "@/components/post/post-card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translations";
import { api } from "@/utils/api";
import { Brush, Loader2 } from "lucide-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const LIMIT = 12;

const Home: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.post.getAll.useInfiniteQuery(
    { limit: LIMIT },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  if (isError) return <div>Error</div>;

  return (
    <Layout title="Home">
      <div className="mb-12 flex justify-between">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide">{t.home.feed}</h1>
          <p className="text-slate-500">{t.home.description}</p>
        </div>
        <Button onClick={() => router.push("/create")}>
          <Brush className="mr-2 h-4 w-4" />
          <span>{t.common.create}</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <>
            {Array(LIMIT)
              .fill(1)
              .map((_, idx) => (
                <LoadingCard key={`${idx}-loader`} />
              ))}
          </>
        ) : (
          <>
            {data.pages.map((page) => (
              <React.Fragment key={page.nextCursor || "lastPage"}>
                {page.posts?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
      <div className="mt-6 w-full text-center">
        <Button
          variant="subtle"
          disabled={isLoading || isFetchingNextPage || !hasNextPage}
          onClick={() => fetchNextPage()}
        >
          {isLoading || isFetchingNextPage ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          <span>{t.home.loadMore}</span>
        </Button>
      </div>
    </Layout>
  );
};

export default Home;
