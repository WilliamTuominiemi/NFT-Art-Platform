import { ErrorPage } from "@/components/error-page";
import { useTranslation } from "@/hooks/use-translations";

const NotFound = () => {
  const { t } = useTranslation();
  return <ErrorPage title="404" description={t.errorMessages.notFound} />;
};

export default NotFound;
