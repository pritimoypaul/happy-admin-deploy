import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

async function getUpazila() {
  try {
    const response = await axiosInstance.get(`/upazilas`);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useUpazilaList = () => {
  return useQuery({
    queryKey: ["upazila-list"],
    queryFn: () => getUpazila(),
  });
};
