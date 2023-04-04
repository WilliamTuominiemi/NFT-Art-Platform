import { Button } from "@/components/ui/button";
import type { Post, User } from "@prisma/client";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  post: Post & {
    user: User;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="rounded-lg border border-slate-200 shadow-md hover:shadow-lg">
      <Image
        src={post.image}
        height={500}
        width={500}
        alt="Post image"
        className="rounded-t-lg border-b border-slate-200 object-cover object-top"
      />
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <p className="truncate text-sm font-medium underline-offset-4 hover:cursor-pointer hover:underline">
            {post.user.name}
          </p>
          <div className="flex flex-col text-sm">
            <p className="text-slate-600 dark:text-slate-400">1 day ago</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row space-x-3">
          <Button size="sm" variant="ghost">
            <Heart />
          </Button>
          <Button size="sm" variant="ghost">
            <MessageCircle />
          </Button>
        </div>
      </div>
    </div>
  );
};
