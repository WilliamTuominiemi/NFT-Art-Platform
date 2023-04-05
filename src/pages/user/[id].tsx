import Layout from "@/components/layout";
import { type NextPage } from "next";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const router = useRouter();

  return (
    <Layout title="Home">
      <div>
        <h1>{router.query.id}</h1>
      </div>
    </Layout>
  );
};

export default Profile;
