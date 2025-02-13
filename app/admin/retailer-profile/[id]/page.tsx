"use client";

import TableTabButton from "@/components/core/tableTabButton";
import { Button } from "@/components/ui/button";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";

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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CollapsibleRow from "@/components/core/collapsibleRow";
import { useRetailerDetails } from "@/utils/apis/getRetailerDetails";
import moment from "moment";
import { useOrderList } from "@/utils/apis/getOrder";
import { Order } from "@/types/order";
import { useOrderCount } from "@/utils/apis/getOrderCount";

const RetailerProfileScreen = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { height } = useWindowDimensions();
  const [tableTab, setTableTab] = useState("all_order");
  const [limit, setLimit] = useState(10);
  const [selectedPage, setSelectedPage] = useState<any>(1);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const { id } = use(params);

  const { data } = useRetailerDetails(id);

  const mainComponentHeight = height - 200;

  const {
    data: orderData,
    isFetched: orderFetched,
    refetch: orderRefetch,
  } = useOrderList({
    limit,
    selectedPage,
    retailer: data?.data?.retailer?._id,
  });

  const paginate = (side: string) => {
    if (side === "left") {
      if (selectedPage == 1) return;
      setSelectedPage(selectedPage - 1);
    } else {
      if (selectedPage == data?.data?.meta?.totalPage) return;
      setSelectedPage(selectedPage + 1);
    }
  };

  const { data: orderCountData } = useOrderCount({
    retailer: data?.data?.retailer?._id,
  });

  useEffect(() => {
    orderRefetch();
  }, [limit, selectedPage, data]);

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
                <li className="flex items-center gap-2">
                  <Image
                    src="/icons/edit-icon.svg"
                    height={10}
                    width={10}
                    alt="edit"
                  />
                  <p className="text-[14px] text-[#8A94A6]">Edit Profile</p>
                </li>

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
                  data?.data?.retailer?.profileImg
                    ? data?.data?.retailer?.profileImg
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
                {data?.data?.retailer?.name}
              </p>
              <p className="text-[14px] text-[#8A94A6]">
                {data?.data?.retailer?.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="p-[18px] rounded-md bg-[#F8FAFF]">
              <Image
                src="/icons/phone.svg"
                height={20}
                width={18}
                alt="calendar"
              />
            </div>
            <div>
              <p className="font-medium text-[15px] text-[#222950]">Phone</p>
              <p className="text-[#8A94A6] text-[14px]">
                {data?.data?.retailer?.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="p-[18px] rounded-md bg-[#F8FAFF]">
              <Image
                src="/icons/calendar.svg"
                height={20}
                width={18}
                alt="calendar"
              />
            </div>
            <div>
              <p className="font-medium text-[15px] text-[#222950]">
                Join Date
              </p>
              <p className="text-[#8A94A6] text-[14px]">
                {moment(data?.data?.retailer?.createdAt).format("LL")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-l-[1px] border-r-[1px]  border-[#C9E2FF] w-full bg-[#fff] rounded-b-[12px] flex justify-between">
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">TOTAL ORDER</p>
          <p className="font-medium text-[16px] text-[#222950]">
            {orderCountData?.data?.totalOrder ?? 0}
          </p>
        </div>
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">CANCELED</p>
          <p className="font-medium text-[16px] text-[#222950]">
            {orderCountData?.data?.totalCancelled ?? 0}
          </p>
        </div>
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">Delivered</p>
          <p className="font-medium text-[16px] text-[#222950]">
            {orderCountData?.data?.totalCompleted ?? 0}
          </p>
        </div>
        <div className="w-full px-[64px] py-[32px]">
          <p className="text-[12px] text-[#595F84]">o/c</p>
          <p className="font-medium text-[16px] text-[#FF8F6B]">-1.7k</p>
        </div>
      </div>

      <div
        className="w-full overflow-hidden mt-[30px] bg-[#ffffff] rounded-[12px] relative"
        style={{ height: `${mainComponentHeight}px`, paddingBottom: "100px" }}
      >
        <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
          <div>
            <div>
              <ul className="flex items-center gap-[40px]">
                <button onClick={() => setTableTab("all_order")}>
                  <TableTabButton
                    selected={tableTab === "all_order"}
                    title="All Order"
                  />
                </button>

                <button onClick={() => setTableTab("delivered")}>
                  <TableTabButton
                    selected={tableTab === "delivered"}
                    title="Delivered"
                  />
                </button>

                <button onClick={() => setTableTab("cancelled")}>
                  <TableTabButton
                    selected={tableTab === "cancelled"}
                    title="Cancelled"
                  />
                </button>

                <button onClick={() => setTableTab("damage")}>
                  <p className="text-[14px] text-[#FF565E] font-medium underline underline-offset-4">
                    Damage
                  </p>
                </button>
              </ul>
            </div>
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
            <button className="p-[13px] rounded-[7px] border-[1px] border-[#E2E8F0]">
              <Image
                src="/icons/download.svg"
                alt="download"
                height={15}
                width={15}
              />
            </button>
          </div>
        </div>
        {/* main content */}
        <div className="py-[20px] px-[34px]">
          <div
            className="mt-[22px] overflow-scroll"
            style={{
              height: `${mainComponentHeight}px`,
              paddingBottom: "200px",
            }}
          >
            <Table>
              <TableHeader>
                <TableRow className="text-[#595F84]">
                  <TableHead className="w-[200px]">Date</TableHead>
                  <TableHead>Sr</TableHead>
                  <TableHead className="text-center">Total Items</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Payment</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right w-[200px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderFetched &&
                  orderData?.data?.result?.map((order: Order) => (
                    <CollapsibleRow key={order?._id} product={order} />
                  ))}
              </TableBody>
              <br />
              <br />
              <br />
              <br />
            </Table>
          </div>
        </div>

        {/* footer content */}
        <div className="bg-[#fff] px-[34px] py-[18px] flex justify-between items-center border-t-[1px] border-[#0472ED1F] absolute bottom-[75px] w-full text-[#718096] text-[14px]">
          <div className="flex items-center gap-4">
            <div>Total Order: 06</div>
            <div>|</div>
            <div>O/C: 500,00</div>
            <div>|</div>
            <div className="text-[#FD6A6A]">Cancel Amount: 500,00</div>
            <div>|</div>
          </div>
          <div>
            <div>Total Amount: 500,00</div>
          </div>
        </div>
        <div className="bg-[#fff] px-[34px] py-[18px] flex justify-between items-center border-t-[1px] border-[#0472ED1F] absolute bottom-0 w-full">
          <div className="text-[#718096] text-[14px] flex gap-2 items-center">
            Show&nbsp;Result:
            <Select
              defaultValue={limit.toString()}
              onValueChange={(value) => setLimit(Number(value))}
            >
              <SelectTrigger className="w-full" defaultValue={limit.toString()}>
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => paginate("left")}
                  />
                </PaginationItem>
                {orderFetched &&
                  (() => {
                    const totalPages = data?.data?.meta?.totalPage || 0;
                    const currentPage = data?.data?.meta?.page || 1;

                    // Helper function to determine if a page should be shown
                    const shouldShowPage = (page: any) => {
                      return (
                        page === 1 || // Always show the first page
                        page === totalPages || // Always show the last page
                        (page >= currentPage - 1 && page <= currentPage + 1) // Show current page, one before, one after
                      );
                    };

                    // Construct the pages array with ellipses
                    const pages = [];
                    for (let i = 1; i <= totalPages; i++) {
                      if (shouldShowPage(i)) {
                        pages.push(i);
                      } else if (pages[pages.length - 1] !== "...") {
                        pages.push("...");
                      }
                    }

                    return (
                      <div className="flex items-center">
                        {/* Page Numbers */}
                        {pages.map((page, idx) => (
                          <PaginationItem key={idx}>
                            {page === "..." ? (
                              <span className="ellipsis">...</span>
                            ) : (
                              <PaginationLink
                                className="cursor-pointer"
                                onClick={() => setSelectedPage(page)}
                                isActive={currentPage === page}
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                      </div>
                    );
                  })()}

                <PaginationItem>
                  <PaginationNext href="#" onClick={() => paginate("right")} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerProfileScreen;
