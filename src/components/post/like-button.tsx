import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translations";
import { api } from "@/utils/api";
import { Like, Post } from "@prisma/client";
import { Heart, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface LikeButtonProps {
  post: Post & {
    likes: Like[];
  };
}

export const LikeButton = ({ post }: LikeButtonProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { t } = useTranslation();
  const ctx = api.useContext();

  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(
    !session?.user
      ? false
      : post.likes.some((like) => like.userId === session.user.id),
  );

  const { mutate: like, isLoading: likeIsLoading } =
    api.like.create.useMutation({
      onSuccess: () => {
        ctx.invalidate();
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: t.errorMessages.error,
          description: t.errorMessages.likeError,
        });
      },
    });

  const { mutate: unLike, isLoading: unLikeIsLoading } =
    api.like.delete.useMutation({
      onSuccess: () => {
        ctx.invalidate();
        setIsLiked(false);
        setLikeCount((prev) => prev + -1);
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: t.errorMessages.error,
          description: t.errorMessages.unLikeError,
        });
      },
    });

  return (
    <Button
      size="sm"
      variant="ghost"
      aria-label="Like"
      className="text-red-400 dark:text-red-400 dark:hover:text-red-400"
      disabled={!session?.user || likeIsLoading || unLikeIsLoading}
      onClick={() => {
        if (isLiked) {
          unLike({ postId: post.id });
        } else {
          like({ postId: post.id });
        }
      }}
    >
      {likeIsLoading || unLikeIsLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Heart
          className="mr-2 h-4 w-4"
          fill={isLiked ? "#f87171" : "transparent"}
        />
      )}
      <span>{likeCount}</span>
    </Button>
  );
};
