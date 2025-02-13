import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { buildUrl } from "../urlBuilder";

async function getOrderCount(
  sr?: string,
  retailer?: string,
  dsr?: string,
  area?: string,
  packingMan?: string
) {
  const url = buildUrl("/api/v1/orders/order/counting", {
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

export const useOrderCount = ({
  sr,
  retailer,
  dsr,
  area,
  packingMan,
}: {
  sr?: string;
  retailer?: string;
  dsr?: string;
  area?: string;
  packingMan?: string;
}) => {
  return useQuery({
    queryKey: ["orderCount-list"],
    queryFn: () =>
      getOrderCount(sr, retailer, dsr, area, packingMan),
  });
};
