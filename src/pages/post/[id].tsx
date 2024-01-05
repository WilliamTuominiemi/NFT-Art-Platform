import { ErrorPage } from "@/components/error-page";
import { Layout } from "@/components/layout";
import { LikeButton } from "@/components/post/like-button";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translations";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type NextPage } from "next";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

const Profile: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = api.post.getById.useQuery(
    {
      id: String(router.query.id),
    },
    {
      retry(_failureCount, error) {
        if (error.data?.code === "NOT_FOUND") return false;
        return true;
      },
    },
  );

  if (isError)
    return (
      <ErrorPage
        title={error.data?.code === "NOT_FOUND" ? "404" : t.errorMessages.error}
        description={
          error.data?.code === "NOT_FOUND"
            ? t.errorMessages.notFound
            : t.errorMessages.getPostsError
        }
      >
        {error.data?.code === "NOT_FOUND" ? (
          <Button onClick={() => router.push("/")}>
            {t.errorMessages.goHome}
          </Button>
        ) : (
          <Button onClick={() => signOut()}>{t.errorMessages.tryAgain}</Button>
        )}
      </ErrorPage>
    );

  return (
    <Layout>
      <div className="mt-12 flex flex-col items-center justify-center">
        <div className="flex flex-col space-y-4">
          <div className="aspect-h-1 aspect-w-1 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px]">
            {isLoading ? (
              <div className="animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
            ) : (
              <Image
                src={post.image}
                className="rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-800"
                alt="Post image"
                width={600}
                height={600}
              />
            )}
          </div>
          <div className="flex flex-row justify-between space-x-4">
            <div className="flex flex-row space-x-4">
              {isLoading ? (
                <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
              ) : (
                <Image
                  className="h-10 w-10 rounded-full"
                  src={post.user.image}
                  alt="User profile"
                  width={40}
                  height={40}
                />
              )}
              <div className="flex flex-col">
                <div className="grid gap-1">
                  {isLoading ? (
                    <>
                      <div className="h-5 w-48 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="mt-1 h-3 w-32 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    </>
                  ) : (
                    <>
                      <Link
                        className="text-lg font-medium leading-none underline-offset-2 hover:cursor-pointer hover:underline"
                        href={`/user/${post?.user.id}`}
                      >
                        {post?.user.name}
                      </Link>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{`${dayjs(
                        post.createdAt,
                      ).fromNow()}`}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            {!isLoading && <LikeButton post={post} isBig />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
