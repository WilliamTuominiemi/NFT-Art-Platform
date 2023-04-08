import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTranslation } from "@/hooks/use-translations";
import type { User } from "@prisma/client";
import { CalendarDays, User as UserIcon } from "lucide-react";

interface UserHoverCardProps {
  user: User;
  children: React.ReactNode;
}

export const UserHoverCard = ({ user, children }: UserHoverCardProps) => {
  const { t, currentLanguage } = useTranslation();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-row space-x-4">
          <Avatar>
            <AvatarImage src={user.image} />
            <AvatarFallback>
              <span className="sr-only">{user.name}</span>
              <UserIcon className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {`${t.profile.joined} ${user.createdAt.toLocaleDateString(
                  currentLanguage,
                  {
                    dateStyle: "long",
                  },
                )}`}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
