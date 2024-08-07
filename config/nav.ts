import { SidebarLink } from "@/components/SidebarItems";
import { Cog, UserPen, User, HomeIcon, NotebookPen } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Inicio", icon: HomeIcon },
  {
    href: "/personal-information",
    title: "Información Personal",
    icon: NotebookPen,
  },
  { href: "/settings", title: "Configuración", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  // {
  //   title: "Entities",
  //   links: [
  //     {
  //       href: "/users",
  //       title: "Users",
  //       icon: UserPen,
  //     },
  //     {
  //       href: "/personal-information",
  //       title: "Personal Information",
  //       icon: NotebookPen,
  //     },
  //     { href: "/account", title: "Account", icon: User },
    
  //   ],
  // },
];
