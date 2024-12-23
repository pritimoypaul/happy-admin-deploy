import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getFreelancer(limit: number, selectedPage: number) {
  const url = buildUrl("/api/v1/freelancers", {
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

export const useFreelancerList = (limit: number, selectedPage: number) => {
  return useQuery({
    queryKey: ["freelancer-list"],
    queryFn: () => getFreelancer(limit, selectedPage),
  });
};
