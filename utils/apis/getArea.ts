import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getArea(limit: number, selectedPage: number, unionId: string) {
  const url = buildUrl("/api/v1/area", {
    limit: limit,
    page: selectedPage,
    union: unionId,
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useAreaList = (
  limit: number,
  selectedPage: number,
  unionId: string
) => {
  return useQuery({
    queryKey: ["area-list"],
    queryFn: () => getArea(limit, selectedPage, unionId),
  });
};
