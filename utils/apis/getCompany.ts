import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getCompany(limit: number, selectedPage: number) {
  const url = buildUrl("/api/v1/companies", {
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

export const useCompanyList = (limit: number, selectedPage: number) => {
  return useQuery({
    queryKey: ["company-list"],
    queryFn: () => getCompany(limit, selectedPage),
  });
};
