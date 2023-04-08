import { ErrorPage } from "@/components/error-page";
import { Header } from "@/components/header";
import Layout from "@/components/layout";
import { LoadingCard } from "@/components/post/loading-card";
import { PostCard } from "@/components/post/post-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const LIMIT = 12;

const Profile: NextPage = () => {
  const { query } = useRouter();
  if (typeof query.id !== "string") return <div>Invalid user id</div>;

  const {
    data: user,
    isLoading,
    isError,
  } = api.user.getById.useQuery({
    id: query.id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  if (isError)
    return <ErrorPage title="Error" description="Error loading profile" />;

  return (
    <Layout title="Home">
      <div className="flex flex-row space-x-4">
        <Image
          className="mr-4 flex-shrink-0 rounded-full"
          src={user.image || ""}
          alt="User profile"
          width={32}
          height={32}
        />
        <Header
          title={user.name || ""}
          description={`Joined at ${user.createdAt.toDateString()}`}
        ></Header>
      </div>

      <Tabs defaultValue="drawings" className="w-full">
        <TabsList>
          <TabsTrigger value="drawings">Drawings</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
        </TabsList>
        <TabsContent value="drawings">
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
                {user.posts?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="liked">
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
                {user.likes.map((like) => (
                  <PostCard
                    key={`${like.postId}-${like.userId}`}
                    post={like.post}
                  />
                ))}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;
