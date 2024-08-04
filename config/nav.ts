import { SidebarLink } from "@/components/SidebarItems";
import { Cog, UserPen, User, HomeIcon, NotebookPen } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: User },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/users",
        title: "Users",
        icon: UserPen,
      },
      {
        href: "/personal-information",
        title: "Personal Information",
        icon: NotebookPen,
      },
    ],
  },

];

