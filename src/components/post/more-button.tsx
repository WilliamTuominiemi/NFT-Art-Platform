import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/use-translations";
import { Link2, MoreHorizontal, Pin, Share2, Trash } from "lucide-react";
import { useSession } from "next-auth/react";

interface MoreButtonProps {
  postId: string;
}

export const MoreButton = ({}: MoreButtonProps) => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
        {!!session?.user ? (
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
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>{t.postMenu.delete}</span>
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
