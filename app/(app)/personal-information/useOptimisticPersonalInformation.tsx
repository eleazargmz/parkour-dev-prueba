
import { type PersonalInformation, type CompletePersonalInformation } from "@/lib/db/schema/personalInformation";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<PersonalInformation>) => void;

export const useOptimisticPersonalInformations = (
  personalInformation: CompletePersonalInformation[],
  
) => {
  const [optimisticPersonalInformations, addOptimisticPersonalInformation] = useOptimistic(
    personalInformation,
    (
      currentState: CompletePersonalInformation[],
      action: OptimisticAction<PersonalInformation>,
    ): CompletePersonalInformation[] => {
      const { data } = action;

      

      const optimisticPersonalInformation = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "crear":
          return currentState.length === 0
            ? [optimisticPersonalInformation]
            : [...currentState, optimisticPersonalInformation];
        case "actualizar":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticPersonalInformation } : item,
          );
        case "eliminar":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticPersonalInformation, optimisticPersonalInformations };
};
