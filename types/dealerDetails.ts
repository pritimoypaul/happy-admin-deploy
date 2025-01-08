import { Company } from "./company";
import { dealer } from "./dealer";

export type DealerDetails = {
  _id: string;
  dealer: dealer;
  companies: Company[];
};
