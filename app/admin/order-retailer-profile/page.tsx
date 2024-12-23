"use client";

import TableTabButton from "@/components/core/tableTabButton";
import { Button } from "@/components/ui/button";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useState } from "react";

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

const OrderRetailerProfileScreen = () => {
  const { height } = useWindowDimensions();
  const [tableTab, setTableTab] = useState("all_order");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const mainComponentHeight = height - 200;

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
                src="/images/man-large.png"
                alt="Profile"
                width={80}
                height={80}
                className="h-[80px] w-[80px] object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-[20px] font-medium text-[#222950]">
                Mohammad Rasel
              </p>
              <p className="text-[14px] text-[#8A94A6]">+880125 5566 5566</p>
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
              <p className="text-[#8A94A6] text-[14px]">+880125 5566 55</p>
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
              <p className="text-[#8A94A6] text-[14px]">10 march 2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-l-[1px] border-r-[1px]  border-[#C9E2FF] w-full bg-[#fff] rounded-b-[12px] flex justify-between">
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">TOTAL ORDER</p>
          <p className="font-medium text-[16px] text-[#222950]">683</p>
        </div>
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">CANCELED</p>
          <p className="font-medium text-[16px] text-[#222950]">400</p>
        </div>
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">AVg. order value</p>
          <p className="font-medium text-[16px] text-[#222950]">855</p>
        </div>
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">Delivered</p>
          <p className="font-medium text-[16px] text-[#222950]">855</p>
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
                {topProducts.map((product) => (
                  <CollapsibleRow key={product.orders} product={product} />
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

export default OrderRetailerProfileScreen;
