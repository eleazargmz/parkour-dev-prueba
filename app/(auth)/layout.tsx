import NavbarHomePage from "@/components/NavbarHomePage";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserAuth();
  if (session?.session) redirect("/dashboard");

  return (
    <div className=" h-screen ">
      <NavbarHomePage />
      {children}
    </div>);
}
