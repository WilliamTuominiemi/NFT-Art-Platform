import { Layout } from "@/components/layout";

interface ErrorPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const ErrorPage = ({ title, description, children }: ErrorPageProps) => {
  return (
    <Layout>
      <div className="mt-12 flex flex-col items-center justify-center">
        <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </p>
        <p className="mb-12 leading-7 [&:not(:first-child)]:mt-6">
          {description}
        </p>
        {children}
      </div>
    </Layout>
  );
};
