import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getSrDetails(id: string) {
  const url = buildUrl(`/api/v1/sr/${id}`, {});
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useSrDetails = (id: string) => {
  return useQuery({
    queryKey: ["sr-details"],
    queryFn: () => getSrDetails(id),
  });
};
