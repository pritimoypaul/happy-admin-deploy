import TableTabButton from "@/components/core/tableTabButton";
import { Button } from "@/components/ui/button";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useState } from "react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Progress } from "@/components/ui/progress";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";

const SrOrderScreen = () => {
  const { height } = useWindowDimensions();
  const [tableTab, setTableTab] = useState("all_order");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const mainComponentHeight = height - 300;

  const topProducts = [
    {
      orders: "SKN1100",
      date: "April 24, 2022",
      retailer: "Chieko Chute",
      amount: "৳10.62",
      qty: "৳10.62",
      payment: "paid",
      status: "cancelled",
      cancel_reason: "Reason for cancellation",
    },
    {
      orders: "SKN1200",
      date: "April 24, 2022",
      retailer: "Chieko Chute",
      amount: "৳10.62",
      qty: "৳10.62",
      payment: "paid",
      status: "delivered",
      delivery_percentage: "20",
    },
    {
      orders: "SKN1300",
      date: "April 24, 2022",
      retailer: "Chieko Chute",
      amount: "৳10.62",
      qty: "৳10.62",
      payment: "paid",
      status: "on_delivery",
    },
    {
      orders: "SKN1400",
      date: "April 24, 2022",
      retailer: "Chieko Chute",
      amount: "৳10.62",
      qty: "৳10.62",
      payment: "paid",
      status: "cancelled",
      cancel_reason: "Reason for cancellation",
    },
    {
      orders: "SKN1500",
      date: "April 24, 2022",
      retailer: "Chieko Chute",
      amount: "৳10.62",
      qty: "৳10.62",
      payment: "paid",
      status: "delivered",
    },
    {
      orders: "SKN1600",
      date: "April 24, 2022",
      retailer: "Chieko Chute",
      amount: "৳10.62",
      qty: "৳10.62",
      payment: "baki",
      status: "delivered",
    },
  ];

  return (
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
          style={{ height: `${mainComponentHeight}px`, paddingBottom: "200px" }}
        >
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
              {topProducts.map((product) => (
                <TableRow key={product.orders} className="text-[#595F84]">
                  <TableCell className="font-medium">
                    {product.orders}
                  </TableCell>
                  <TableCell className="font-medium">{product.date}</TableCell>
                  <TableCell>{product.retailer}</TableCell>
                  <TableCell className="text-center">
                    {product.amount}
                  </TableCell>
                  <TableCell className="text-right">{product.qty}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className={clsx(
                        `text-right w-full flex justify-end float-right`,
                        {
                          "text-[#0CAF60] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                            product.payment == "paid",
                          "text-[#EF3DF2] bg-[#FC6BFF1A] px-[14px] py-[4px] rounded-sm max-w-fit":
                            product.payment == "baki",
                        }
                      )}
                    >
                      {product.payment == "paid" ? "Paid" : "Baki"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={clsx(
                        `text-right w-full flex justify-end float-right`,
                        {
                          "text-[#0CAF60] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                            product.status == "delivered",
                          "text-[#FD6A6A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                            product.status == "cancelled",
                          "text-[#FE964A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                            product.status == "on_delivery",
                        }
                      )}
                    >
                      {product.status == "delivered"
                        ? "Delivered"
                        : product.status == "on_delivery"
                        ? "On Delivery"
                        : "Cancelled"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {product?.cancel_reason && (
                      <p className="text-[10px] text-[#8A94A6]">
                        {product.cancel_reason}
                      </p>
                    )}

                    {product?.delivery_percentage && (
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
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
  );
};

export default SrOrderScreen;
