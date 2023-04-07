import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

interface CommentButtonProps {
  postImage: string;
}

export const CommentButton = ({ postImage }: CommentButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          aria-label="Comment"
          className="text-blue-400"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          <span>4</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <Image
          src={postImage}
          height={1000}
          width={1000}
          alt="Post image"
          className="rounded-md"
        />
      </DialogContent>
    </Dialog>
  );
};
