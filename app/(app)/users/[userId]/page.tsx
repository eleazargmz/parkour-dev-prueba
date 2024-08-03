import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getUserById } from "@/lib/api/users/queries";
import OptimisticUser from "./OptimisticUser";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {

  return (
    <main className="overflow-auto">
      <User id={params.userId} />
    </main>
  );
}

const User = async ({ id }: { id: string }) => {
  
  const { user } = await getUserById(id);
  

  if (!user) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="users" />
        <OptimisticUser user={user}  />
      </div>
    </Suspense>
  );
};
