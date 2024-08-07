
import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="space-y-4">
      {session ? (
        <pre className="flex items-center justify-center text-7xl text-teal-500 font-bold h-screen">
          <h1>{`Bienvenido ${session.user.name}`}</h1>
          
        </pre>
      ) : null}
      {/* <SignIn /> */}
    </main>
  );
}
