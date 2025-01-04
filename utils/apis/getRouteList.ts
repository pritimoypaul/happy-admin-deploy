import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getRoute(id: string, limit: number, selectedPage: number) {
  const url = buildUrl(`/api/v1/user-routes/${id}/user-route`, {
    limit: limit,
    page: selectedPage,
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useRouteList = (id: string, limit: number, selectedPage: number) => {
  return useQuery({
    queryKey: ["route-list"],
    queryFn: () => getRoute(id, limit, selectedPage),
  });
};
