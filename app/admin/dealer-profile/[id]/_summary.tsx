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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";

const DealerSummaryScreen = () => {
  const { height } = useWindowDimensions();
  const [tableTab, setTableTab] = useState("summary");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const mainComponentHeight = height - 300;

  const topProducts = [
    {
      name: "ডাল ভাজা - 11 গ্রাম (48)",
      quantity: "5",
      rate: "৳10.62",
      total_retailer: "100",
      sr_total: "৳60.62",
      total: "৳1060.62",
      oc: "+5",
    },
    {
      name: "ডাল ভাজা - 12 গ্রাম (48)",
      quantity: "5",
      rate: "৳10.62",
      total_retailer: "100",
      sr_total: "৳60.62",
      total: "৳1060.62",
      oc: "+5",
    },
    {
      name: "ডাল ভাজা - 13 গ্রাম (48)",
      quantity: "5",
      rate: "৳10.62",
      total_retailer: "100",
      sr_total: "৳60.62",
      total: "৳1060.62",
      oc: "+5",
    },
    {
      name: "ডাল ভাজা - 14 গ্রাম (48)",
      quantity: "5",
      rate: "৳10.62",
      total_retailer: "100",
      sr_total: "৳60.62",
      total: "৳1060.62",
      oc: "-5",
    },
    {
      name: "ডাল ভাজা - 15 গ্রাম (48)",
      quantity: "5",
      rate: "৳10.62",
      total_retailer: "100",
      sr_total: "৳60.62",
      total: "৳1060.62",
      oc: "-5",
    },
    {
      name: "ডাল ভাজা - 16 গ্রাম (48)",
      quantity: "5",
      rate: "৳10.62",
      total_retailer: "100",
      sr_total: "৳60.62",
      total: "৳1060.62",
      oc: "+5",
    },
    {
      name: "ডাল ভাজা - 17 গ্রাম (48)",
      quantity: "5",
      rate: "৳10.62",
      total_retailer: "100",
      sr_total: "৳60.62",
      total: "৳1060.62",
      oc: "+5",
    },
    {
      name: "ডাল ভাজা - 18 গ্রাম (48)",
      quantity: "5",
      rate: "৳10.62",
      total_retailer: "100",
      sr_total: "৳60.62",
      total: "৳1060.62",
      oc: "+5",
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
              <button onClick={() => setTableTab("summary")}>
                <TableTabButton
                  selected={tableTab === "summary"}
                  title="Summary"
                />
              </button>
              <button onClick={() => setTableTab("product_sold")}>
                <TableTabButton
                  selected={tableTab === "product_sold"}
                  title="Product Selled"
                />
              </button>

              <button onClick={() => setTableTab("product_in")}>
                <TableTabButton
                  selected={tableTab === "product_in"}
                  title="Product In"
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
          style={{ height: `${mainComponentHeight}px`, paddingBottom: "200px" }}
        >
          <Table>
            <TableHeader>
              <TableRow className="text-[#595F84]">
                <TableHead className="w-[300px]">Product Name</TableHead>
                <TableHead className="w-[200px]">Quantity</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead className="text-center">Total Retailer</TableHead>
                <TableHead className="text-right">Sr Total</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">O/C</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.name} className="text-[#595F84]">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="font-medium">
                    {product.quantity}
                  </TableCell>
                  <TableCell>{product.rate}</TableCell>
                  <TableCell className="text-center">
                    {product.total_retailer}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.sr_total}
                  </TableCell>
                  <TableCell className="text-right">{product.total}</TableCell>
                  <TableCell
                    className={clsx(`text-right`, {
                      "text-[#0CAF60]": Number(product.oc) > 0,
                      "text-[#FF565E]": Number(product.oc) < 0,
                    })}
                  >
                    ৳{product.oc}
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

export default DealerSummaryScreen;
