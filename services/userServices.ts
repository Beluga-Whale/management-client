import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api/authApi";

const getUserQueryKey = "getUserQueryKey";

export const useGetProfile = () => {
  return useQuery({
    queryKey: [getUserQueryKey],
    queryFn: getProfile,
  });
};
