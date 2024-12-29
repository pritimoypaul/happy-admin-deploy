import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getDealer(limit: number, selectedPage: number) {
  const url = buildUrl("/api/v1/dealers", {
    limit: limit,
    page: selectedPage,
    sort: '-_id',
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useDealerList = (
  limit: number,
  selectedPage: number,
) => {
  return useQuery({
    queryKey: ["dealer-list"],
    queryFn: () => getDealer(limit, selectedPage),
  });
};
