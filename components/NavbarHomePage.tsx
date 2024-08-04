import Link from "next/link";


export default function NavbarHomePage() {
  return (
    <div>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-teal-500 ">
        <Link className="flex items-center justify-center" href="/">
          <h3 className="text-xl text-white font-bold ml-4">Parkour.dev</h3>
        </Link>
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
            Login
          </Link>
        </nav>
      </header>
    </div>
  )
}

// function MountainIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   );
// }
