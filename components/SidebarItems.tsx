"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { defaultLinks, additionalLinks } from "@/config/nav";

export interface SidebarLink {
  title: string;
  href: string;
  icon: LucideIcon;
}

const SidebarItems = () => {
  return (
    <>
      <SidebarLinkGroup links={defaultLinks} />
      {additionalLinks.length > 0
        ? additionalLinks.map((l) => (
            <SidebarLinkGroup
              links={l.links}
              title={l.title}
              border
              key={l.title}
            />
          ))
        : null}
    </>
  );
};
export default SidebarItems;

const SidebarLinkGroup = ({
  links,
  title,
  border,
}: {
  links: SidebarLink[];
  title?: string;
  border?: boolean;
}) => {
  const fullPathname = usePathname();
  const pathname = "/" + fullPathname.split("/")[1];

  return (
    <div className={border ? "border-border my-8 pt-4" : ""}>
      {title ? (
        <h4 className="px-2 mb-2 text-sm font-bold uppercase text-muted-foreground-id tracking-wider">
          {title}
        </h4>
      ) : null}
      <ul>
        {links.map((link) => (
          <li key={link.title} className="my-1">
            <SidebarLink link={link} active={pathname === link.href} />
          </li>
        ))}
      </ul>
    </div>
  );
};
const SidebarLink = ({
  link,
  active,
}: {
  link: SidebarLink;
  active: boolean;
}) => {
  return (
    <Link
      href={link.href}
      className={`group transition-colors p-3 inline-block hover:text-secondary text-muted-foreground-ip text-sm hover:bg-muted-foreground  hover:text-muted-foreground-ip rounded-s-2xl w-full${
        active ? " text-secondary bg-muted-foreground font-semibold" : ""
      }`}
    >
      <div className="flex items-center">
        {/* <div
          className={cn(
            "opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
            active ? "opacity-100" : "",
          )}
        /> */}
        <link.icon className="h-4.1 mr-1" />
        <span>{link.title}</span>
      </div>
    </Link>
  );
};
