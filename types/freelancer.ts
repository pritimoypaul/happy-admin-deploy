import { Upazila } from "./upazila";

export type Freelancer = {
  _id: string;
  freelancer: FreelancerDetails;
  upazilas: Upazila[];
};

export type FreelancerDetails = {
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
  __v: number;
};