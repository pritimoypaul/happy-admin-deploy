import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getSummary(
  limit: number,
  selectedPage: number,
  createdGte?: string,
  createdLte?: string,
  dealer?: string
) {
  const url = buildUrl("/api/v1/orders/summary/details", {
    limit: limit,
    page: selectedPage,
    "createdAt[gte]": createdGte,
    "createdAt[lte]": createdLte,
    dealer: dealer,
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useSummaryList = (
  limit: number,
  selectedPage: number,
  createdGte?: string,
  createdLte?: string,
  dealer?: string
) => {
  return useQuery({
    queryKey: ["summary-list"],
    queryFn: () =>
      getSummary(limit, selectedPage, createdGte, createdLte, dealer),
  });
};
