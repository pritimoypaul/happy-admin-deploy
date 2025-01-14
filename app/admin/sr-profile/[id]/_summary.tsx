import TableTabButton from "@/components/core/tableTabButton";
import { Button } from "@/components/ui/button";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { useSummaryList } from "@/utils/apis/getSummary";
import { formatDate } from "@/utils/formatDate";

const SrSummaryScreen = ({ srId }: any) => {
  const { height } = useWindowDimensions();
  const [tableTab, setTableTab] = useState("summary");
  const [limit, setLimit] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  const mainComponentHeight = height - 300;

  const { data, isFetched, refetch } = useSummaryList({
    limit: limit,
    selectedPage: selectedPage,
    createdGte: formatDate(date?.from),
    createdLte: formatDate(date?.to),
    sr: srId,
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

  useEffect(() => {
    refetch();
  }, [limit, selectedPage, formatDate(date?.from), formatDate(date?.to)]);

  useEffect(() => {
    console.log(`selected date: ${formatDate(date?.from)}`);
  }, [date]);

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
              {isFetched &&
                data?.data?.map((product: any, index: number) => (
                  <TableRow key={index} className="text-[#595F84]">
                    <TableCell className="font-medium">
                      {product?.productName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product?.totalQuantity}
                    </TableCell>
                    <TableCell>
                      {product?.totalPrice?.toString().substring(0, 7)}
                    </TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">
                      {product?.totalPrice?.toString().substring(0, 7)}
                    </TableCell>
                    <TableCell
                      className={clsx(`text-right`, {
                        "text-[#0CAF60]": Number(product?.totalOc) > 0,
                        "text-[#FF565E]": Number(product?.totalOc) < 0,
                      })}
                    >
                      ৳{product?.totalOc?.toString().substring(0, 7)}
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
                <PaginationPrevious href="#" onClick={() => paginate("left")} />
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
  );
};

export default SrSummaryScreen;
