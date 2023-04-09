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
import { api } from "@/utils/api";
import { Link2, MoreHorizontal, Pin, Share2, Trash } from "lucide-react";
import { useState } from "react";

interface MoreButtonProps {
  postId: string;
  isOwner: boolean;
}

export const MoreButton = ({ postId, isOwner }: MoreButtonProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const ctx = api.useContext();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isLoading } = api.post.delete.useMutation({
    onSuccess: () => {
      ctx.invalidate();
      setIsOpen(false);
    },
    onError: () => {
      setIsOpen(false);
      toast({
        variant: "destructive",
        title: t.errorMessages.error,
        description: t.errorMessages.deleteError,
      });
    },
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.postMenu.deleteDialog.title}</DialogTitle>
            <DialogDescription>
              {t.postMenu.deleteDialog.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              {t.postMenu.deleteDialog.cancel}
            </Button>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() =>
                mutate({
                  id: postId,
                })
              }
            >
              {t.postMenu.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
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
            }}
          >
            <Share2 className="mr-2 h-4 w-4" />
            <span>{t.postMenu.share}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            <Link2 className="mr-2 h-4 w-4" />
            <span>{t.postMenu.copyLink}</span>
          </DropdownMenuItem>
          {isOwner ? (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <Pin className="mr-2 h-4 w-4" />
                <span>{t.postMenu.pin}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
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
