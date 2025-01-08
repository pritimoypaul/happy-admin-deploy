import { Company } from "./company";
import { dealer } from "./dealer";
import { Sr } from "./sr";
import { Upazila } from "./upazila";

export type SrDetails = {
  _id: string;
  sr: Sr;
  companies: Company[];
  dealers: dealer[];
  upazilas: Upazila[];
};
