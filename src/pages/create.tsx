import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translations";
import { api } from "@/utils/api";
import { Loader2, Redo, Trash, Undo } from "lucide-react";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createRef, useEffect, useState } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";

const INITIAL_WIDTH = 10;

const Create: NextPage = () => {
  const { data: session, status } = useSession();
  if (!session?.user && status !== "loading") {
    signIn("google");
  }

  const { t } = useTranslation();
  const { toast } = useToast();
  const router = useRouter();
  const ctx = api.useContext();

  const canvasRef = createRef<ReactSketchCanvasRef>();
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(INITIAL_WIDTH);

  const { mutate, isLoading } = api.post.create.useMutation({
    onError: () => {
      toast({
        variant: "destructive",
        title: t.common.error,
        description: t.create.errorDescription,
      });
    },
    onSuccess: () => {
      toast({
        title: t.common.success,
        description: t.create.successDescription,
      });
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

  useEffect(() => {
    addEventListener("keypress", (event) => {
      if (event.key === "\x1A") {
        canvasRef.current?.undo();
      } else if (event.key === "\x19") {
        canvasRef.current?.redo();
      }
    });
  });

  return (
    <Layout title="Create">
      <div className="flex flex-col items-center space-x-0 space-y-12 md:flex-row md:items-start md:space-x-12 md:space-y-0">
        <div className="h-[500px] w-[500px]">
          <ReactSketchCanvas
            className="h-full w-full rounded-md border border-slate-200"
            width="500"
            height="500"
            strokeWidth={width}
            strokeColor={color}
            canvasColor="#ffffff"
            ref={canvasRef}
            exportWithBackgroundImage
          />
        </div>
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <Label htmlFor="colorText">{t.create.color}</Label>
            <div className="flex flex-row space-x-4">
              <Input
                type="text"
                id="colorText"
                placeholder="color"
                value={color}
                disabled
              />
              <input
                className="rounded-md"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Label htmlFor="slider">{t.create.thickness}</Label>
            <Slider
              min={1}
              max={100}
              defaultValue={[INITIAL_WIDTH]}
              id="slider"
              onValueChange={(e) => setWidth(e[0])}
            />
          </div>
          <div className="flex flex-row space-x-4">
            <Button variant="ghost" onClick={() => canvasRef.current?.undo()}>
              <Undo className="mr-2 h-4 w-4" />
              <span>{t.create.undo}</span>
            </Button>
            <Button variant="ghost" onClick={() => canvasRef.current?.redo()}>
              <Redo className="mr-2 h-4 w-4" />
              <span>{t.create.redo}</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => canvasRef.current?.clearCanvas()}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>{t.create.clear}</span>
            </Button>
          </div>
          <div className="flex flex-row space-x-4">
            <Button onClick={handleCreate} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>{t.create.create}</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
