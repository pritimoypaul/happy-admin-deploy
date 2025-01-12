import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getSr(limit: number, selectedPage: number, dealer?: string) {
  const url = buildUrl("/api/v1/sr", {
    limit: limit,
    page: selectedPage,
    sort: "-_id",
    "dealers[]": dealer,
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useSrList = (
  limit: number,
  selectedPage: number,
  dealer?: string
) => {
  return useQuery({
    queryKey: ["sr-list"],
    queryFn: () => getSr(limit, selectedPage, dealer),
  });
};
