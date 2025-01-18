import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
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
import { IconInput } from "@/components/ui/inputIcon";
import { useOrderList } from "@/utils/apis/getOrder";
import { Order } from "@/types/order";

const DeliveryOrderScreen = ({ id }: any) => {
  const { height } = useWindowDimensions();
  const [limit, setLimit] = useState(10);
  const [selectedPage, setSelectedPage] = useState<any>(1);

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
      style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
    >
      <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
        <div>
          <div>
            <p className="text-[24px] text-[#222950] font-bold">All Orders</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Select defaultValue="">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Upazillla" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Upazilla">Upazilla</SelectItem>
                <SelectItem value="Zilla">Zilla</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Union" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Union">Union</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Bazar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Bazar">Bazar</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <IconInput icon="/icons/search.svg" placeholder="Search SR" />
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
                <TableHead className="">SN.</TableHead>
                <TableHead className="w-[200px]">NAME</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead className="text-center">BAZAR</TableHead>
                {/* <TableHead className="text-right w-[50px]">ACTION</TableHead>
                <TableHead className="text-right"></TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetched &&
                data?.data?.result?.map((order: Order) => (
                  <TableRow key={order?._id} className="text-[#595F84]">
                    <TableCell className="font-medium">
                      {order?.retailer?.id}
                    </TableCell>
                    <TableCell className="font-medium w-[300px]">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={
                            order?.retailer?.profileImg
                              ? order?.retailer?.profileImg
                              : "/images/man-large.png"
                          }
                          alt="pic"
                          height={33}
                          width={33}
                          className="rounded-[100%]"
                        />

                        {order?.retailer?.name}
                      </div>
                    </TableCell>
                    <TableCell>{order?.retailer?.name}</TableCell>
                    <TableCell className="text-center">
                      {order?.area?.bnName}
                    </TableCell>

                    {/* <TableCell className="text-center">
                    <div className="w-full flex justify-center items-center gap-2">
                      <Image
                        src="/icons/edit-icon.svg"
                        alt="icn"
                        height={13}
                        width={13}
                      />
                      <Image
                        src="/icons/delete-icon.svg"
                        alt="icn"
                        height={13}
                        width={13}
                      />
                    </div>
                  </TableCell> */}
                    {/* <TableCell className="text-center flex justify-center">
                    <div className="cursor-pointer px-[20px] max-w-fit h-[40px] flex justify-center items-center gap-4 bg-[#EDF6FF] text-[#007AFF] rounded-[7px]">
                      <span>View Product</span>
                    </div>
                  </TableCell> */}
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
