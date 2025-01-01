import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getUser(limit: number, selectedPage: number, role?: string) {
  const url = buildUrl("/api/v1/users", {
    limit: limit,
    page: selectedPage,
    role: role,
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useUserList = (limit: number, selectedPage: number, role?: string) => {
  return useQuery({
    queryKey: ["user-list"],
    queryFn: () => getUser(limit, selectedPage, role),
  });
};
