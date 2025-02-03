"use client";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useState } from "react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ProfileTab from "@/components/core/profileTab";
import { useDealerList } from "@/utils/apis/getDealer";
import { dealer } from "@/types/dealer";
import { usePickedProductList } from "@/utils/apis/getPickedProducts";
import Link from "next/link";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";

const CheckoutManProfile = () => {
  const { height, width } = useWindowDimensions();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });
  const [selectedPage, setSelectedPage] = useState<any>(1);
  const [limit, setLimit] = useState(10);

  const mainComponentHeight = height - 300;
  const mainComponentWidth = width - 300;

  const { data } = useDealerList(100, 1);

  const {
    data: productData,
    isFetched: productFetched,
    isFetching: productFetching,
  } = usePickedProductList(limit, selectedPage);

  const paginate = (side: string) => {
    if (side === "left") {
      if (selectedPage == 1) return;
      setSelectedPage(selectedPage - 1);
    } else {
      if (selectedPage == data?.data?.meta?.totalPage) return;
      setSelectedPage(selectedPage + 1);
    }
  };

  return (
    <div className="h-full">
      {/* top elements */}

      {/* profile tabs */}

      <div
        className="flex gap-4 items-center mt-[20px] overflow-x-scroll"
        style={{ width: `${mainComponentWidth}px` }}
      >
        <div className="flex min-w-max h-[100px] gap-4">
          {data?.data?.result.map((dealer: { _id: string; dealer: dealer }) => (
            <button key={dealer?._id} onClick={() => {}}>
              <ProfileTab
                image={dealer?.dealer?.profileImg}
                title={dealer?.dealer?.name}
                selected={false}
              />
            </button>
          ))}
        </div>
      </div>

      {/* main contents */}

      <div
        className="w-full overflow-hidden mt-[30px] bg-[#ffffff] rounded-[12px] relative"
        style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
      >
        <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
          <div>
            <div>
              <ul className="flex items-center gap-[40px]">
                <p>All Order</p>
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
            {productFetching ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="text-[#595F84]">
                    <TableHead className="w-[300px]">PRODUCT NAME</TableHead>
                    <TableHead className="w-[200px]">QTY</TableHead>
                    <TableHead>PRICE</TableHead>
                    <TableHead className="text-center">EDITED QTY</TableHead>
                    <TableHead className="text-right w-[300px]">
                      EDITED PRICE
                    </TableHead>
                    <TableHead className="text-right">STATUS</TableHead>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right w-[200px]"></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {productFetched &&
                    productData?.data?.result?.map((order: any) => (
                      <TableRow key={order?._id} className="text-[#595F84]">
                        <TableCell className="font-medium">
                          {order?.product?.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex gap-4 items-center">
                            <p>
                              {Math.floor(
                                order?.quantityOrder /
                                  order?.product?.quantityPerPackage
                              )}{" "}
                            </p>

                            <span>
                              <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                                B
                              </div>
                            </span>

                            <p>
                              {order?.quantityOrder %
                                order?.product?.quantityPerPackage}{" "}
                            </p>

                            <span>
                              <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                                P
                              </div>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link href="/admin/order-retailer-profile">
                            ৳{order?.product?.price}
                          </Link>
                        </TableCell>
                        <TableCell className="text-center w-4">
                          <div className="flex gap-4 items-center">
                            <p>
                              {Math.floor(
                                order?.quantityOrder /
                                  order?.product?.quantityPerPackage
                              )}{" "}
                            </p>

                            <span>
                              <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                                B
                              </div>
                            </span>

                            <p>
                              {order?.quantityOrder %
                                order?.product?.quantityPerPackage}{" "}
                            </p>

                            <span>
                              <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                                P
                              </div>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="w-[300px] text-right">
                          ৳350
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={clsx(
                              `text-right w-full flex justify-end float-right`,
                              {
                                "text-[#FE964A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                                  order?.product?.isEdited == true,
                              }
                            )}
                          >
                            {order?.product?.isEdited == true && "Edited"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div>
                            <Checkbox checked />
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
                {productFetched &&
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

export default CheckoutManProfile;
