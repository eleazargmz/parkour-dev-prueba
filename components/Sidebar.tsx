import Link from "next/link";

import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import SignIn from "./auth/SignIn";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-screen min-w-52 bg-teal-500 hidden text-white md:block ps-4 pt-8 border-r shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h3 className="text-xl text-white items-center font-bold mb-5">Parkour.dev</h3>
          <UserDetails session={session} />
          <SidebarItems />
        </div>
          <SignIn />
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <Link href="/account">
      <div className="flex flex-col items-center w-full pt-4 font-bold px-2 mb-16">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarFallback className="border-border border-4 font-bold text-lg text-muted-foreground">
            {user.name
              ? user.name
                ?.split(" ")
                .map((word) => word[0].toUpperCase())
                .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
        <div className="text-center text-muted-foreground">
          <p className="text-lg">{user.name ?? "John Doe"}</p>
          <p className="text-sm font-light">
            {user.email ?? "john@doe.com"}
          </p>
        </div>
      </div>
    </Link>
  );
};
