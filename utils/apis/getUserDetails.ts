import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getUserDetails(id: string) {
  const url = buildUrl(`/api/v1/users/${id}`, {});
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useUserDetails = (id: string) => {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: () => getUserDetails(id),
  });
};
