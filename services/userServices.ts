import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateUser } from "./api/authApi";
import { UpdateUser } from "@/types";

const getUserQueryKey = "getUserQueryKey";

export const useGetProfile = () => {
  return useQuery({
    queryKey: [getUserQueryKey],
    queryFn: getProfile,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; body: UpdateUser }) =>
      updateUser(data?.id, data?.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getUserQueryKey],
      });
    },
    onError: (error: Error) => {
      console.error("Register Failed:", error.message);
    },
  });
};
