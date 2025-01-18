import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getRetailerDetails(id: string) {
  const url = buildUrl(`/api/v1/retailers/${id}`, {});
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useRetailerDetails = (id: string) => {
  return useQuery({
    queryKey: ["retailer-details"],
    queryFn: () => getRetailerDetails(id),
  });
};
