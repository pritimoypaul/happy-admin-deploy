import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getRetailer(limit: number, selectedPage: number, areaId?:string, unionId?: string) {
  const url = buildUrl("/api/v1/retailers", {
    limit: limit,
    page: selectedPage,
    area: areaId,
    union: unionId,
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useRetailerList = (
  limit: number,
  selectedPage: number,
  areaId?: string,
  unionId?: string
) => {
  return useQuery({
    queryKey: ["retailer-list"],
    queryFn: () => getRetailer(limit, selectedPage, areaId, unionId),
  });
};
