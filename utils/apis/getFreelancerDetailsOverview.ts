import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getFreelancerDetailsOverview(
  id: string,
  limit: number,
  selectedPage: number
) {
  const url = buildUrl(`/api/v1/freelancers/${id}/overview`, {
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

export const useFreelancerDetailsOverview = (
  id: string,
  limit: number,
  selectedPage: number
) => {
  return useQuery({
    queryKey: ["freelancer-details-overview"],
    queryFn: () => getFreelancerDetailsOverview(id, limit, selectedPage),
  });
};
