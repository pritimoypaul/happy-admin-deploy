import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getOrderDetails(id: string) {
  const url = buildUrl(`/api/v1/orders/${id}`, {});
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: ["order-details"],
    queryFn: () => getOrderDetails(id),
  });
};
