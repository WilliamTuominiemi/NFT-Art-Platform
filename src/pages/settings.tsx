import LanguageSelect from "@/components/common/language-select";
import Layout from "@/components/layout";
import { type NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <Layout title="Settings">
      <LanguageSelect />
    </Layout>
  );
};

export default Settings;
