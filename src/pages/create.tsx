import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslations";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { createRef } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";

const Create: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const ctx = api.useContext();

  const canvasRef = createRef<ReactSketchCanvasRef>();

  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess: () => {
      ctx.invalidate();
      router.push("/");
    },
  });

  const handleCreate = async () => {
    const exportImage = canvasRef.current?.exportImage;
    if (exportImage) {
      const image = await exportImage("png");
      mutate({ image });
    }
  };

  return (
    <Layout title="Create">
      <div className="flex flex-row space-x-6">
        <div className="h-[500px] w-[500px]">
          <ReactSketchCanvas
            className="h-full w-full rounded-lg border border-slate-100"
            width="500"
            height="500"
            strokeWidth={4}
            strokeColor="black"
            canvasColor="white"
            ref={canvasRef}
            exportWithBackgroundImage
          />
        </div>
        <div>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>{t.create.create}</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
