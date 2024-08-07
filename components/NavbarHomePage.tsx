import Link from "next/link";
import { getUserAuth } from "@/lib/auth/utils";

export default async function NavbarHomePage() {
  const { session } = await getUserAuth();
  return (
    <div>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-teal-500 ">
        <Link className="flex items-center justify-center" href="/">
          <h3 className="text-xl text-white font-bold ml-4">Parkour.dev</h3>
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          {session ? (
            <Link
              className="text-sm text-white font-bold hover:underline underline-offset-4"
              href="/sign-in"
            >
              Ir al Inicio
            </Link>
          ) :
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-sm font-bold text-white hover:underline underline-offset-4"
                href="/sign-up"
              >
                Registro
              </Link>
              <Link
                className="text-sm text-white font-bold hover:underline underline-offset-4"
                href="/sign-in"
              >
                Inicio de sesión
              </Link>
            </nav>}
        </nav>
      </header>
    </div>
  )
}