import { Suspense } from "react";

import Loading from "@/app/loading";
import PersonalInformationList from "@/components/personalInformation/PersonalInformationList";
import { getPersonalInformations } from "@/lib/api/personalInformation/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function PersonalInformationPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Información Personal</h1>
        </div>
        <PersonalInformation />
      </div>
    </main>
  );
}

const PersonalInformation = async () => {
  await checkAuth();

  const { personalInformation } = await getPersonalInformations();
  
  return (
    <Suspense fallback={<Loading />}>
      <PersonalInformationList personalInformation={personalInformation}  />
    </Suspense>
  );
};
