import { LikeButton } from "@/components/post/like-button";
import { MoreButton } from "@/components/post/more-button";
import { UserHoverCard } from "@/components/post/user-hover-card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/use-translations";
import type { Like, Post, User } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Pin } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post & {
    user: User;
    likes: Like[];
  };
  showPinned?: boolean;
}

export const PostCard = ({ post, showPinned = false }: PostCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { data: session } = useSession();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <Image
            src={post.image}
            height={600}
            width={600}
            alt="Post image"
            className="rounded-2xl p-2"
          />
        </DialogContent>
      </Dialog>

      <div className="group rounded-md border border-zinc-200 shadow-md hover:shadow-lg dark:border-zinc-800">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md border-b border-zinc-200 dark:border-zinc-800">
          <Image
            src={post.image}
            height={500}
            width={500}
            alt="Post image"
            onClick={() => setIsOpen(true)}
            className="object-cover object-top transition-all duration-500 hover:cursor-pointer group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col px-4 pb-4 pt-2">
          <div className="flex w-full flex-row justify-between space-x-2">
            <div className="flex flex-row space-x-1 truncate pt-2">
              <UserHoverCard user={post.user}>
                <Link
                  className="text-sm font-medium underline-offset-2 hover:cursor-pointer hover:underline"
                  href={`/user/${post.user.id}`}
                >
                  {post.user.name}
                </Link>
              </UserHoverCard>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {`${"·"} ${dayjs(post.createdAt).fromNow()}`}
              </p>
            </div>
            <MoreButton
              post={post}
              isOwner={!!session?.user && session.user.id === post.user.id}
            />
          </div>
          <div className="flex flex-row justify-between">
            <LikeButton post={post} />
            {post.pinned && showPinned ? (
              <div className="flex items-center truncate text-zinc-500">
                <Pin className="mr-2 h-4 w-4" fill="#64748b" />{" "}
                <span className="text-xs font-bold">{t.home.pinned}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
