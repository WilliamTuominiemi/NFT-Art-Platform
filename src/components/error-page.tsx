import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translations";
import { signOut } from "next-auth/react";

interface ErrorPageProps {
  title: string;
  description: string;
}

export const ErrorPage = ({ title, description }: ErrorPageProps) => {
  const { t } = useTranslation();

  return (
    <Layout title={title}>
      <div className="mt-12 flex flex-col items-center justify-center">
        <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </p>
        <p className="mb-12 leading-7 [&:not(:first-child)]:mt-6">
          {description}
        </p>
        <Button onClick={() => signOut()}>{t.errorMessages.tryAgain}</Button>
      </div>
    </Layout>
  );
};
