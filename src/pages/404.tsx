import { ErrorPage } from "@/components/error-page";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translations";
import { useRouter } from "next/router";

const NotFound = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <ErrorPage title="404" description={t.errorMessages.notFound}>
      <Button onClick={() => router.push("/")}>{t.errorMessages.goHome}</Button>
    </ErrorPage>
  );
};

export default NotFound;
