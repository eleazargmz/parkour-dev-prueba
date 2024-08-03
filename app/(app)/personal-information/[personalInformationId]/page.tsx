import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getPersonalInformationById } from "@/lib/api/personalInformation/queries";
import OptimisticPersonalInformation from "./OptimisticPersonalInformation";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function PersonalInformationPage({
  params,
}: {
  params: { personalInformationId: string };
}) {

  return (
    <main className="overflow-auto">
      <PersonalInformation id={params.personalInformationId} />
    </main>
  );
}

const PersonalInformation = async ({ id }: { id: string }) => {
  await checkAuth();

  const { personalInformation } = await getPersonalInformationById(id);
  

  if (!personalInformation) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="personal-information" />
        <OptimisticPersonalInformation personalInformation={personalInformation}  />
      </div>
    </Suspense>
  );
};
