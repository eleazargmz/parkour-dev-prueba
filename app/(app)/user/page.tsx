import { Suspense } from "react";

import Loading from "@/app/loading";
import UserList from "@/components/user/UserList";
import { getUsers } from "@/lib/api/user/queries";


export const revalidate = 0;

export default async function UserPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">User</h1>
        </div>
        <User />
      </div>
    </main>
  );
}

const User = async () => {
  
  const { user } = await getUsers();
  
  return (
    <Suspense fallback={<Loading />}>
      <UserList user={user}  />
    </Suspense>
  );
};
