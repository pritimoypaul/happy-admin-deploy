import { Area } from "./area";
import { Retailer } from "./retailer";
import { Union } from "./union";

export type RetailerList = {
  _id: string;
  retailer: Retailer;
  area: Area;
  environment: string;
  location: {
    longitude: number;
    latitude: number;
    _id: string;
  };
  shopName: string;
  union: Union;
};