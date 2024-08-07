/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import NavbarHomePage from "@/components/NavbarHomePage";
import UserForm from "@/components/user/UserForm";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <NavbarHomePage />
      <section className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-5xl font-bold text-teal-500">Página de inicio</h1>
      </section>
    </div>
  );
}
