import { Suspense } from "react";

import Loading from "@/app/loading";
import PersonalInformationList from "@/components/personalInformation/PersonalInformationList";
import { getPersonalInformation } from "@/lib/api/personalInformation/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function PersonalInformationPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Personal Information</h1>
        </div>
        <PersonalInformation />
      </div>
    </main>
  );
}

const PersonalInformation = async () => {
  await checkAuth();

  const { personalInformation } = await getPersonalInformation();
  
  return (
    <Suspense fallback={<Loading />}>
      <PersonalInformationList personalInformation={personalInformation}  />
    </Suspense>
  );
};
