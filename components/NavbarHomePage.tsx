import Link from "next/link";


export default function NavbarHomePage() {
  return (
    <div>
        <header className="px-4 lg:px-6 h-14 flex items-center bg-blue-500">
        <Link className="flex items-center justify-center" href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-bold hover:underline underline-offset-4"
            href="/sign-up"
          >
            Registro
          </Link>
          <Link
            className="text-sm font-bold hover:underline underline-offset-4"
            href="/sign-in"
          >
            Login
          </Link>
        </nav>
      </header>
    </div>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
