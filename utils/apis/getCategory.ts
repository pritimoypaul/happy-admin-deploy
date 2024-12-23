import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getCategory(limit: number, selectedPage: number) {
  const url = buildUrl("/api/v1/categories", {
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

export const useCategoryList = (
  limit: number,
  selectedPage: number,
) => {
  return useQuery({
    queryKey: ["category-list"],
    queryFn: () => getCategory(limit, selectedPage),
  });
};
