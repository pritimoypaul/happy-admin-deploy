import moment from "moment";

export const formatDate = (dateString: any) => {
  return moment(new Date(dateString)).format("YYYY-MM-DD");
};
