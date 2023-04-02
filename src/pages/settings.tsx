import { LanguageSelect } from "@/components/common/language-select";
import { ThemeToggle } from "@/components/common/theme-toggle";
import Layout from "@/components/layout";
import { type NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <Layout title="Settings">
      <div className="flex flex-row space-x-4">
        <LanguageSelect />
        <ThemeToggle />
      </div>
    </Layout>
  );
};

export default Settings;
