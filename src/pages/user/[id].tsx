import { ErrorPage } from "@/components/error-page";
import Layout from "@/components/layout";
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

  if (typeof query.id !== "string")
    return <ErrorPage title="404" description={t.errorMessages.notFound} />;

  const {
    data: user,
    isLoading,
    isError,
  } = api.user.getById.useQuery({
    id: query.id,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!user)
    return <ErrorPage title="404" description={t.errorMessages.notFound} />;

  if (isError)
    return (
      <ErrorPage
        title={t.errorMessages.title}
        description={t.errorMessages.profileError}
      />
    );

  return (
    <Layout title="Home">
      <div className="mb-12 flex flex-row space-x-6">
        <Image
          className="h-16 w-16 rounded-full"
          src={user.image || ""}
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
        <TabsContent value="drawings">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {user.posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="liked">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {user.likes.map((like) => (
              <PostCard
                key={`${like.postId}-${like.userId}`}
                post={like.post}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;
