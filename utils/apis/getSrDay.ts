import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getSrDay(id: string, date: string, limit: number, selectedPage: number) {
  const url = buildUrl(`/api/v1/user-routes/${id}/sr-day/${date}`, {
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

export const useSrDayList = (id: string, date: string, limit: number, selectedPage: number) => {
  return useQuery({
    queryKey: ["srDay-list"],
    queryFn: () => getSrDay(id, date, limit, selectedPage),
  });
};
