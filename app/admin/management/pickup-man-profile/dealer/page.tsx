"use client";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

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
import ProfileTab from "@/components/core/profileTab";

const PickupDealerProfile = () => {
  const [profileTab, setProfileTab] = useState("Summary");
  const { height } = useWindowDimensions();

  const [tableTab, setTableTab] = useState("product");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const mainComponentHeight = height - 300;

  const topProducts = [
    {
      name: "Fresh Water",
      qty: "",
      price: "৳10.62",
      edited_qty: "",
      edited_price: "৳100.62",
      status: "edited",
    },
    {
      name: "Fresh Water",
      qty: "",
      price: "৳10.62",
      edited_qty: "",
      edited_price: "৳100.62",
      status: "normal",
    },
    {
      name: "Fresh Water",
      qty: "",
      price: "৳10.62",
      edited_qty: "",
      edited_price: "৳100.62",
      status: "edited",
    },
    {
      name: "Fresh Water",
      qty: "",
      price: "৳10.62",
      edited_qty: "",
      edited_price: "৳100.62",
      status: "edited",
    },
    {
      name: "Fresh Water",
      qty: "",
      price: "৳10.62",
      edited_qty: "",
      edited_price: "৳100.62",
      status: "normal",
    },
  ];

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="flex gap-4 items-center mt-[20px]">
        <button onClick={() => setProfileTab("Summary")}>
          <ProfileTab
            image="/images/summary.png"
            title="Summary"
            selected={profileTab === "Summary"}
          />
        </button>
        <button onClick={() => setProfileTab("Edited-Summary")}>
          <ProfileTab
            image="/images/summary.png"
            title="Edited Summary"
            selected={profileTab === "Edited-Summary"}
          />
        </button>
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
                <button onClick={() => setTableTab("product")}>
                  <TableTabButton
                    selected={tableTab === "product"}
                    title="Product"
                  />
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
                  <TableHead className="w-[300px]">PRODUCT NAME</TableHead>
                  <TableHead className="">QTY</TableHead>
                  <TableHead>PRICE</TableHead>
                  <TableHead className="text-center">EDITED QTY</TableHead>
                  <TableHead className="text-center">EDITED PRICE</TableHead>
                  <TableHead className="text-center">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.name} className="text-[#595F84]">
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col gap-[16px]">
                        <div className="flex gap-4 items-center">
                          04
                          <span>
                            <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                              B
                            </div>
                          </span>
                          14{" "}
                          <span>
                            <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                              P
                            </div>
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col gap-[16px]">
                        <div className="flex gap-4 items-center justify-center">
                          04
                          <span>
                            <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                              B
                            </div>
                          </span>
                          14{" "}
                          <span>
                            <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                              P
                            </div>
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {product.edited_price}
                    </TableCell>

                    <TableCell className="text-center flex justify-center">
                      <div
                        className={clsx(
                          `text-center w-full flex justify-center`,
                          {
                            "text-[#FE964A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                              product.status == "edited",
                          }
                        )}
                      >
                        {product.status == "edited" && "Edited"}
                      </div>
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
    </div>
  );
};

export default PickupDealerProfile;
