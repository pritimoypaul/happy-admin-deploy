import { Company } from "./company";
import { dealer } from "./dealer";
import { Upazila } from "./upazila";

export type Sr = {
  _id: string;
  sr: srMain;
  dealers: Array<dealer>;
  companies: Array<Company>;
  upazilas: Array<Upazila>
};

type srMain = {
    insertedDate: number;
    _id: string;
    id: string;
    name: string;
    phone: string;
    nid: string;
    needPasswordChange: boolean;
    role: string;
    status: string;
    profileImg: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}