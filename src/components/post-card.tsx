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
    <div className="group rounded-md border border-slate-200 shadow-md hover:shadow-lg dark:border-slate-800">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md border-b border-slate-200 dark:border-slate-800">
        <Image
          src={post.image}
          height={500}
          width={500}
          alt="Post image"
          className="object-cover object-top transition-all duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex flex-row justify-between text-sm">
          <p className="truncate font-medium underline-offset-4 hover:cursor-pointer hover:underline">
            {post.user.name}
          </p>
          <p className="text-slate-600 dark:text-slate-400">1 day ago</p>
        </div>
        <div className="flex flex-row space-x-3">
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
