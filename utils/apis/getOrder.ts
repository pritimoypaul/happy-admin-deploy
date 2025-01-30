import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getOrder(
  limit: number,
  selectedPage: number,
  sr?: string,
  retailer?: string,
  dsr?: string,
  area?: string,
  packingMan?: string
) {
  const url = buildUrl("/api/v1/orders", {
    limit: limit,
    page: selectedPage,
    sr: sr,
    retailer: retailer,
    dsr: dsr,
    area: area,
    packingMan: packingMan,
  });
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (e) {
    return e;
  }
}

export const useOrderList = ({
  limit,
  selectedPage,
  sr,
  retailer,
  dsr,
  area,
  packingMan,
}: {
  limit: number;
  selectedPage: number;
  sr?: string;
  retailer?: string;
  dsr?: string;
  area?: string;
  packingMan?: string;
}) => {
  return useQuery({
    queryKey: ["order-list"],
    queryFn: () =>
      getOrder(limit, selectedPage, sr, retailer, dsr, area, packingMan),
  });
};
