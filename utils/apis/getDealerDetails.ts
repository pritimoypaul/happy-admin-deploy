import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getDealerDetails(id: string) {
  const url = buildUrl(`/api/v1/dealers/${id}`, {});
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useDealerDetails = (id: string) => {
  return useQuery({
    queryKey: ["dealer-details"],
    queryFn: () => getDealerDetails(id),
  });
};
