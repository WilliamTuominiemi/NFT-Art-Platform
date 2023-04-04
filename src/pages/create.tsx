import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "@/hooks/useTranslations";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createRef, useState } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";

const Create: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const ctx = api.useContext();
  const { data: session, status } = useSession();

  if (!session?.user && status !== "loading") {
    signIn("google");
  }

  const canvasRef = createRef<ReactSketchCanvasRef>();

  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(10);

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
            strokeWidth={width}
            strokeColor={color}
            canvasColor="white"
            ref={canvasRef}
            exportWithBackgroundImage
          />
        </div>
        <div>
          <div className="flex flex-col space-y-6">
            <div>
              <Label htmlFor="colorText">{t.create.color}</Label>
              <div className="space-between-4 flex flex-row">
                <Input
                  type="text"
                  id="colorText"
                  placeholder="color"
                  value={color}
                  disabled
                />
                <input
                  className="ml-2"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="slider">Thickness</Label>
            <Slider
              defaultValue={[width]}
              id="slider"
              onValueChange={(e) => setWidth(e[0])}
            />
          </div>
          <Button className="mt-6" onClick={handleCreate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>{t.create.create}</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
