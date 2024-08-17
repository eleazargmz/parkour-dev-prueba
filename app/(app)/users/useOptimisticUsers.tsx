
import { type User, type CompleteUser } from "@/schemas/customUserSchema";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<User>) => void;

export const useOptimisticUsers = (
  users: CompleteUser[],
  
) => {
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (
      currentState: CompleteUser[],
      action: OptimisticAction<User>,
    ): CompleteUser[] => {
      const { data } = action;

      

      const optimisticUser = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "crear":
          return currentState.length === 0
            ? [optimisticUser]
            : [...currentState, optimisticUser];
        case "actualizar":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticUser } : item,
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

  return { addOptimisticUser, optimisticUsers };
};
