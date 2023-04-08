import { ErrorPage } from "@/components/error-page";
import Layout from "@/components/layout";
import { LoadingCard } from "@/components/post/loading-card";
import { PostCard } from "@/components/post/post-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/use-translations";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const { t, currentLanguage } = useTranslation();
  const { query } = useRouter();

  const {
    data: user,
    isLoading,
    isError,
  } = api.user.getById.useQuery({
    id: String(query.id),
  });

  if (isLoading)
    return (
      <Layout>
        <div className="mb-12 flex flex-row space-x-6">
          <div className="h-16 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />

          <div className="grid gap-1">
            <div className="h-6 w-64 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <Tabs defaultValue="drawings">
          <TabsList>
            <TabsTrigger value="drawings">{t.profile.drawings}</TabsTrigger>
            <TabsTrigger value="liked">{t.profile.likedDrawings}</TabsTrigger>
          </TabsList>
          <TabsContent value="drawings">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {Array(8)
                .fill(1)
                .map((_, idx) => (
                  <LoadingCard key={`${idx}-loader`} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="liked">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {Array(8)
                .fill(1)
                .map((_, idx) => (
                  <LoadingCard key={`${idx}-loader`} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </Layout>
    );

  if (isError)
    return (
      <ErrorPage
        title={t.errorMessages.title}
        description={t.errorMessages.profileError}
      />
    );

  if (!user)
    return <ErrorPage title="404" description={t.errorMessages.profileError} />;

  return (
    <Layout>
      <div className="mb-12 flex flex-row space-x-6">
        <Image
          className="h-16 w-16 rounded-full"
          src={user.image}
          alt="User profile"
          width={64}
          height={64}
        />
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-wide">{user.name}</h1>
          <p className="text-slate-500">
            {`${t.profile.joined} ${user.createdAt.toLocaleDateString(
              currentLanguage,
              {
                dateStyle: "long",
              },
            )}`}
          </p>
        </div>
      </div>
      <Tabs defaultValue="drawings">
        <TabsList>
          <TabsTrigger value="drawings">{t.profile.drawings}</TabsTrigger>
          <TabsTrigger value="liked">{t.profile.likedDrawings}</TabsTrigger>
        </TabsList>
        <TabsContent value="drawings" className="border-0 p-0">
          {user.posts.length === 0 ? (
            <p className="text-2xl font-semibold tracking-tight">
              {t.errorMessages.noPosts}
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {user.posts?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="liked" className="border-0 p-0">
          {user.likes.length === 0 ? (
            <p className="text-2xl font-semibold tracking-tight">
              {t.errorMessages.noPosts}
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {user.likes.map((like) => (
                  <PostCard
                    key={`${like.postId}-${like.userId}`}
                    post={like.post}
                  />
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;
