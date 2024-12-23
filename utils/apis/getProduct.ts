import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getProduct(limit: number, selectedPage: number, dealerId?: string, companyId?: string) {
  const url = buildUrl("/api/v1/products", {
    limit: limit,
    page: selectedPage,
    dealer: dealerId,
    company: companyId,
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useProductList = (
  limit: number,
  selectedPage: number,
  dealerId?: string,
  companyId?: string
) => {
  return useQuery({
    queryKey: ["product-list"],
    queryFn: () => getProduct(limit, selectedPage, dealerId, companyId),
  });
};
