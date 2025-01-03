"use client";
import CustomCard from "@/components/core/customCard";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import moment from "moment";

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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import TableTabButton from "@/components/core/tableTabButton";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import clsx from "clsx";
// import { Progress } from "@/components/ui/progress";
import { useOrderList } from "@/utils/apis/getOrder";
import { Order } from "@/types/order";
import { useRetailerList } from "@/utils/apis/getRetailer";
import { useAreaList } from "@/utils/apis/getArea";

const OrderScreen = () => {
  const { height } = useWindowDimensions();

  const [tableTab, setTableTab] = useState("all_order");
  const [limit, setLimit] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const { data, isFetching, isFetched, refetch } = useOrderList(
    limit,
    selectedPage
  );

  const { data: retailerData } = useRetailerList(limit, selectedPage);

  const { data: bazarData } = useAreaList(100, 1);

  const mainComponentHeight = height - 300;

  const paginate = (side: string) => {
    if (side === "left") {
      if (selectedPage == 1) return;
      setSelectedPage(selectedPage - 1);
    } else {
      if (selectedPage == data?.data?.meta?.totalPage) return;
      setSelectedPage(selectedPage + 1);
    }
  };

  useEffect(() => {
    refetch();
  }, [limit, selectedPage]);

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="flex gap-4 items-center">
        <CustomCard
          title="Total Retailer"
          amount={retailerData?.data?.meta?.totalDoc ?? 0}
          icon="/images/total-order.svg"
        />
        <CustomCard
          title="Total Bazar"
          amount={bazarData?.data?.meta?.totalDoc ?? 0}
          icon="/images/pending-order.svg"
        />

        <CustomCard
          title="AV. Order Value"
          amount="1200"
          icon="/images/completed-order.svg"
        />

        <CustomCard
          title="AV. Order Value"
          amount="1200"
          icon="/images/canceled-order.svg"
        />
      </div>

      {/* main element */}
      <div
        className="w-full overflow-hidden mt-[30px] bg-[#ffffff] rounded-[12px] relative"
        style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
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
                <button onClick={() => setTableTab("on_delivery")}>
                  <TableTabButton
                    selected={tableTab === "on_delivery"}
                    title="On Delivery"
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

                <button onClick={() => setTableTab("return")}>
                  <TableTabButton
                    selected={tableTab === "return"}
                    title="Return"
                  />
                </button>

                <button onClick={() => setTableTab("baki")}>
                  <TableTabButton selected={tableTab === "baki"} title="Baki" />
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
            {isFetching ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="text-[#595F84]">
                    <TableHead className="w-[300px]">Orders</TableHead>
                    <TableHead className="w-[200px]">Date</TableHead>
                    <TableHead>Retailer</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                    <TableHead className="text-right">Total QTY</TableHead>
                    <TableHead className="text-right">Payment</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right w-[200px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isFetched &&
                    data?.data?.result?.map((order: Order) => (
                      <TableRow key={order?._id} className="text-[#595F84]">
                        <TableCell className="font-medium">
                          {order?.id.slice(0, 10)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {moment(order?.createdAt).format("LL")}
                        </TableCell>
                        <TableCell>
                          <Link href="/admin/order-retailer-profile">
                            {order?.retailer?.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-center">
                          ৳{order?.collectedAmount}
                        </TableCell>
                        <TableCell className="text-right">
                          ৳{order?.collectionAmount}
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={clsx(
                              `text-right w-full flex justify-end float-right`,
                              {
                                "text-[#0CAF60] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                                  order?.paymentStatus == "Paid",
                                "text-[#EF3DF2] bg-[#FC6BFF1A] px-[14px] py-[4px] rounded-sm max-w-fit":
                                  order?.paymentStatus == "Unpaid",
                              }
                            )}
                          >
                            {order?.paymentStatus == "Paid" ? "Paid" : "Baki"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={clsx(
                              `text-right w-full flex justify-end float-right`,
                              {
                                "text-[#0CAF60] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                                  order?.status == "Delivered",
                                "text-[#0bb663] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                                  order?.status == "Processing",
                                "text-[#FD6A6A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                                  order?.status == "Cancelled",
                                "text-[#FE964A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                                  order?.status == "On Delivery",
                              }
                            )}
                          >
                            {order?.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          {/* {product?.cancel_reason && (
                          <p className="text-[10px] text-[#8A94A6]">
                            {product.cancel_reason}
                          </p>
                        )} */}

                          {/* {product?.delivery_percentage && (
                          <div className="flex items-center gap-4">
                            <p className="text-[10px] text-[#0CAF60]">
                              {product?.delivery_percentage}%
                            </p>
                            <Progress
                              value={Number(product?.delivery_percentage)}
                              indicatorColor="bg-green-600"
                              className="w-[60%] h-[5px]"
                            />
                          </div>
                        )} */}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
        {/* footer content */}
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
                {isFetched &&
                  [...Array(data?.data?.meta?.totalPage)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => setSelectedPage(index + 1)}
                        isActive={data?.data?.meta?.page == index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

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

export default OrderScreen;
