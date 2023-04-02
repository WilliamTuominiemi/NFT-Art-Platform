import LanguageSelect from "@/components/common/language-select";
import ThemeSelect from "@/components/common/theme-select";
import Layout from "@/components/layout";
import { type NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <Layout title="Settings">
      <div className="flex flex-row space-x-4">
        <LanguageSelect />
        <ThemeSelect />
      </div>
    </Layout>
  );
};

export default Settings;
