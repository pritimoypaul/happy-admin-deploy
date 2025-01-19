import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
import { useOrderList } from "@/utils/apis/getOrder";
import { Order } from "@/types/order";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import TableTabButton from "@/components/core/tableTabButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import CollapsibleRow from "@/components/core/collapsibleRow";

const DeliveryOrderScreen = ({ id }: any) => {
  const { height } = useWindowDimensions();
  const [limit, setLimit] = useState(10);
  const [tableTab, setTableTab] = useState("all_order");
  const [selectedPage, setSelectedPage] = useState<any>(1);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const mainComponentHeight = height - 300;

  const { data, isFetched, refetch } = useOrderList({
    limit,
    selectedPage,
    dsr: id,
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
  }, [limit, selectedPage]);

  return (
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
              {isFetched &&
                data?.data?.result?.map((order: Order) => (
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
                <PaginationPrevious href="#" onClick={() => paginate("left")} />
              </PaginationItem>
              {isFetched &&
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
  );
};

export default DeliveryOrderScreen;
