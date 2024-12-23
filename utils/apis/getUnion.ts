import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getUnion(upazilaId: string) {
  const url = buildUrl("/api/v1/unions", { upazila: upazilaId });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useUnionList = (upazilaId: string) => {
  return useQuery({
    enabled: upazilaId != null || upazilaId != "",
    queryKey: ["union-list"],
    queryFn: () => getUnion(upazilaId),
  });
};
