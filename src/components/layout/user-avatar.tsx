import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

const UserAvatar = () => {
  const { data: session } = useSession();

  if (!session?.user)
    return (
      <Button size="sm" className="px-4" onClick={() => signIn()}>
        Login
      </Button>
    );

  return (
    <Avatar className="h-8 w-8">
      {session.user.image ? (
        <AvatarImage alt="Picture" src={session.user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{session.user.name}</span>
          <User className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
