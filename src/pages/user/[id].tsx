import Layout from "@/components/layout";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { useRouter } from "next/router";

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

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <Layout title="Home">
      <h1>{user.name}</h1>
    </Layout>
  );
};

export default Profile;
