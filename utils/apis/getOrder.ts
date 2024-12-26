import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getOrder(limit: number, selectedPage: number) {
  const url = buildUrl("/api/v1/orders", {
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

export const useOrderList = (limit: number, selectedPage: number) => {
  return useQuery({
    queryKey: ["order-list"],
    queryFn: () => getOrder(limit, selectedPage),
  });
};
