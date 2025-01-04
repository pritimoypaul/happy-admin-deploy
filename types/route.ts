import { User } from "./user";

export type Route = {
  _id: string;
  user: User;
  friday: RouteDetail[];
  saturday: RouteDetail[];
  sunday: RouteDetail[];
  monday: RouteDetail[];
  tuesday: RouteDetail[];
  wednesday: RouteDetail[];
  thursday: RouteDetail[];
 
};

export type RouteDetail = {
  _id: string;
  id: string;
  union: string;
  name: string;
  bnName: string;
}