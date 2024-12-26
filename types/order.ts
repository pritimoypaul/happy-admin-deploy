import { Area } from "./area";
import { Retailer } from "./retailer";

export type Order = {
  _id: string;
  id: string;
  retailer: Retailer;
  area: Area;
  dealer: string;
  sr: string;
  status: string;
  paymentStatus: string;
  collectionAmount: number;
  collectedAmount: number;
  createdAt: string;
  updatedAt: string;
  insertedDate: string;
};
