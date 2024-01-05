import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translations";
import { api } from "@/lib/api";
import { Post } from "@prisma/client";
import {
  Link2,
  Loader2,
  MoreHorizontal,
  Pin,
  PinOff,
  Trash,
} from "lucide-react";
import { useState } from "react";

interface MoreButtonProps {
  post: Post;
  isOwner: boolean;
}

export const MoreButton = ({ post, isOwner }: MoreButtonProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const ctx = api.useContext();
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { mutate: deletePost, isLoading: deleteIsLoading } =
    api.post.delete.useMutation({
      onSuccess: () => {
        ctx.invalidate();
        setDeleteIsOpen(false);
      },
      onError: () => {
        setDeleteIsOpen(false);
        toast({
          variant: "destructive",
          title: t.errorMessages.error,
          description: t.errorMessages.deleteError,
        });
      },
    });

  const { mutate: pinPost, isLoading: pinIsLoading } =
    api.post.updatePinned.useMutation({
      onSuccess: () => {
        ctx.invalidate();
        setMenuIsOpen(false);
      },
      onError: () => {
        setMenuIsOpen(false);
        toast({
          variant: "destructive",
          title: t.errorMessages.error,
          description: post.pinned
            ? t.errorMessages.unPinError
            : t.errorMessages.pinError,
        });
      },
    });

  return (
    <>
      <Dialog open={deleteIsOpen} onOpenChange={setDeleteIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.postMenu.deleteDialog.title}</DialogTitle>
            <DialogDescription>
              {t.postMenu.deleteDialog.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteIsOpen(false)}>
              {t.postMenu.deleteDialog.cancel}
            </Button>
            <Button
              variant="destructive"
              disabled={deleteIsLoading}
              onClick={() =>
                deletePost({
                  id: post.id,
                })
              }
            >
              {deleteIsLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>{t.postMenu.delete}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu open={menuIsOpen} onOpenChange={setMenuIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            aria-label="More"
            className="rounded-full"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(
                `${window.location.origin}/post/${post.id}`,
              );
              toast({
                description: t.home.linkCopied,
              });
              setMenuIsOpen(false);
            }}
          >
            <Link2 className="mr-2 h-4 w-4" />
            <span>{t.postMenu.copyLink}</span>
          </DropdownMenuItem>
          {isOwner ? (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                disabled={pinIsLoading}
                onClick={() => pinPost({ id: post.id, pinned: !post.pinned })}
                onSelect={(e) => {
                  e.preventDefault();
                  pinPost({ id: post.id, pinned: !post.pinned });
                }}
              >
                {pinIsLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {post.pinned ? (
                      <PinOff className="mr-2 h-4 w-4" />
                    ) : (
                      <Pin className="mr-2 h-4 w-4" />
                    )}
                  </>
                )}
                <span>{post.pinned ? t.postMenu.unpin : t.postMenu.pin}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setDeleteIsOpen(true);
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>{t.postMenu.delete}</span>
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
