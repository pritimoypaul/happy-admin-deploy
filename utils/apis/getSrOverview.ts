import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getSrOverview(id: string) {
  const url = buildUrl(`/api/v1/sr/${id}/overview`, {});
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useSrOverview = (id: string) => {
  return useQuery({
    queryKey: ["sr-Overview"],
    queryFn: () => getSrOverview(id),
  });
};
