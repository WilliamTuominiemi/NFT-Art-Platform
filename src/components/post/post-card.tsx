import { CommentButton } from "@/components/post/comment-button";
import { LikeButton } from "@/components/post/like-button";
import type { Like, Post, User } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post & {
    user: User;
    likes: Like[];
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
        <p className="truncate text-sm">
          <Link
            className="font-medium underline-offset-2 hover:cursor-pointer hover:underline"
            href={`/user/${post.user.id}`}
          >
            {post.user.name}
          </Link>
          <span className="text-slate-600 dark:text-slate-400">
            {` ${"·"} ${dayjs(post.createdAt).fromNow()}`}
          </span>
        </p>
        <div className="flex flex-row space-x-2">
          <LikeButton post={post} />
          <CommentButton postImage={post.image} />
        </div>
      </div>
    </div>
  );
};
