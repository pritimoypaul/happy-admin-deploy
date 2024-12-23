import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getFreelancerDetails(id: string) {
  const url = buildUrl(`/api/v1/freelancers/${id}`, {});
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useFreelancerDetails = (id: string) => {
  return useQuery({
    queryKey: ["freelancer-details"],
    queryFn: () => getFreelancerDetails(id),
  });
};
