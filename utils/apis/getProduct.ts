import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrlMultiValue } from "../urlBuilder";

async function getProduct(limit: number, selectedPage: number, dealerId?: string, srId?: string, companyId?: string) {
  const url = buildUrlMultiValue("/api/v1/products", {
    limit: limit,
    page: selectedPage,
    dealer: dealerId,
    sr: srId,
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
  {
  limit,
  selectedPage,
  dealerId,
  srId,
  companyId
  }:{
  limit: number,
  selectedPage: number,
  dealerId?: string,
  srId?: string,
  companyId?: string
  }
) => {
  return useQuery({
    queryKey: ["product-list"],
    queryFn: () => getProduct(limit, selectedPage, dealerId, srId, companyId),
  });
};
