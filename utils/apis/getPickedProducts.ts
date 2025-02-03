import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getPickedProduct(limit: number, selectedPage: number) {
  const url = buildUrl("/api/v1/pickup-mans", {
    limit: limit,
    page: selectedPage,
    status: "Checked",
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const usePickedProductList = (limit: number, selectedPage: number) => {
  return useQuery({
    queryKey: ["pickedProduct-list"],
    queryFn: () => getPickedProduct(limit, selectedPage),
  });
};
