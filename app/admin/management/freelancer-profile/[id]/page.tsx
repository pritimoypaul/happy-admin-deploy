"use client";

import { Button } from "@/components/ui/button";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { use, useState } from "react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ProfileCardCompact from "@/components/core/profileCardCompact";
import { useFreelancerDetailsOverview } from "@/utils/apis/getFreelancerDetailsOverview";

import { FreelancerRetailer } from "@/types/freelancerRetailer";
import { useFreelancerDetails } from "@/utils/apis/getFreelancerDetails";
import { Upazila } from "@/types/upazila";
import { AssignUpazillaForm } from "../../_freelancerAssignUpazilla";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FreelancerProfileScreen = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { height } = useWindowDimensions();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const { id } = use(params);

  const [limit] = useState(10);
  const [selectedPage] = useState(1);

  const mainComponentHeight = height - 200;

  const { data, isFetched } = useFreelancerDetailsOverview(
    id,
    limit,
    selectedPage
  );

  const { data: detailsData, refetch: detailsRefetch } =
    useFreelancerDetails(id);

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="w-full bg-[#fff] rounded-t-[12px] p-[25px] relative border-[1px] border-[#C9E2FF]">
        <div className="absolute right-[15px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src="/icons/options.svg"
                height={16}
                width={16}
                alt="options"
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 absolute right-[0px] top-2">
              <DropdownMenuLabel></DropdownMenuLabel>
              <ul className="p-4">
                <Dialog>
                  <DialogTrigger>
                    <li className="flex items-center gap-2">
                      <Image
                        src="/icons/edit-icon.svg"
                        height={10}
                        width={10}
                        alt="edit"
                      />
                      <p className="text-[14px] text-[#8A94A6]">
                        Assign Upazilla
                      </p>
                    </li>
                  </DialogTrigger>
                  <DialogContent className="max-w-[450px] max-h-[90%] overflow-scroll">
                    <DialogHeader>
                      <DialogTitle>Assign Upazila</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <AssignUpazillaForm id={id} refetch={detailsRefetch} />
                  </DialogContent>
                </Dialog>

                <li className="mt-[10px] flex items-center gap-2">
                  <Image
                    src="/icons/delete-icon.svg"
                    height={10}
                    width={10}
                    alt="delete"
                  />
                  <p className="text-[14px] text-[#FF565E]">Block</p>
                </li>
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-[10px] w-2/3 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="h-[80px] w-[80px]">
              <Image
                src={
                  detailsData?.data?.freelancer?.profileImg
                    ? detailsData?.data?.freelancer?.profileImg
                    : "/images/man-large.png"
                }
                alt="Profile"
                width={80}
                height={80}
                className="h-[80px] w-[80px] object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-[20px] font-medium text-[#222950]">
                {detailsData?.data?.freelancer?.name || "Freelancer Name"}
              </p>
              <p className="text-[14px] text-[#8A94A6]">
                {detailsData?.data?.freelancer?.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="p-[18px] rounded-md bg-[#F8FAFF]">
              <h1 className="text-[32px] text-[#BB3030] font-bold">U</h1>
            </div>
            <div>
              <p className="font-medium text-[15px] text-[#222950]">
                {detailsData?.data?.upazilas?.map(
                  (upazila: Upazila) => upazila?.name + ", "
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-l-[1px] border-r-[1px]  border-[#C9E2FF] w-full bg-[#fff] rounded-b-[12px] flex justify-between">
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">TOTAL RETAILER</p>
          <p className="font-medium text-[16px] text-[#222950]">
            {data?.data?.totalAdded}
          </p>
        </div>
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">TOTAL EARNING</p>
          <p className="font-medium text-[16px] text-[#222950]">
            {data?.data?.totalAdded * 10 + data?.data?.totalEdited * 5}
          </p>
        </div>
        {/* <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">TODAY EARNING</p>
          <p className="font-medium text-[16px] text-[#222950]">855</p>
        </div>
        <div className="w-full px-[64px] py-[32px]">
          <p className="text-[12px] text-[#595F84]">o/c</p>
          <p className="font-medium text-[16px] text-[#FF8F6B]">-1.7k</p>
        </div> */}
      </div>

      <div
        className="w-full overflow-hidden mt-[30px] bg-[#ffffff] rounded-[12px] relative"
        style={{ height: `${mainComponentHeight}px`, paddingBottom: "100px" }}
      >
        <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
          <div>
            <h3 className="text-[#222950] text-[16px] font-bold">
              All Retailer
            </h3>
          </div>
          <div className="flex gap-4 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {/* main content */}
        <div className="py-[20px] px-[34px]">
          <div
            className="overflow-scroll pt-[24px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4"
            style={{
              height: `${mainComponentHeight}px`,
              paddingBottom: "200px",
            }}
          >
            {isFetched &&
              data?.data?.retailers?.map((retailer: FreelancerRetailer) => (
                <ProfileCardCompact
                  key={retailer._id}
                  name={retailer.retailer.name}
                  image={retailer.retailer.profileImg}
                  url="/admin/management/pickup-man-profile/dealer"
                />
              ))}
          </div>
        </div>

        {/* footer content */}

        <div className="bg-[#fff] px-[34px] py-[18px] flex justify-between items-center border-t-[1px] border-[#0472ED1F] absolute bottom-0 w-full">
          <div className="text-[#718096] text-[14px] flex gap-2 items-center">
            Show&nbsp;Result:
            <Select defaultValue={"1"}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>1</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfileScreen;
