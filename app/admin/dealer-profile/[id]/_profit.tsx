import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React from "react";

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
import { IconInput } from "@/components/ui/inputIcon";

const DealerProfitScreen = () => {
  const { height } = useWindowDimensions();

  const mainComponentHeight = height - 300;

  const topProducts = [
    {
      sn: "01",
      image: "",
      name: "Mohammad Rasel",
      phone: "+880 27383 637",
      bazar: "Mirpur, Dhaka, Bangladesh",
      amount: "50000",
    },
    {
      sn: "02",
      image: "",
      name: "Mohammad Rasel",
      phone: "+880 27383 637",
      bazar: "Mirpur, Dhaka, Bangladesh",
      amount: "50000",
    },
    {
      sn: "03",
      image: "",
      name: "Mohammad Rasel",
      phone: "+880 27383 637",
      bazar: "Mirpur, Dhaka, Bangladesh",
      amount: "50000",
    },
    {
      sn: "04",
      image: "",
      name: "Mohammad Rasel",
      phone: "+880 27383 637",
      bazar: "Mirpur, Dhaka, Bangladesh",
      amount: "-350",
    },
    {
      sn: "05",
      image: "",
      name: "Mohammad Rasel",
      phone: "+880 27383 637",
      bazar: "Mirpur, Dhaka, Bangladesh",
      amount: "50000",
    },
    {
      sn: "06",
      image: "",
      name: "Mohammad Rasel",
      phone: "+880 27383 637",
      bazar: "Mirpur, Dhaka, Bangladesh",
      amount: "50000",
    },
    {
      sn: "07",
      image: "",
      name: "Mohammad Rasel",
      phone: "+880 27383 637",
      bazar: "Mirpur, Dhaka, Bangladesh",
      amount: "-350",
    },
    {
      sn: "08",
      image: "",
      name: "Mohammad Rasel",
      phone: "+880 27383 637",
      bazar: "Mirpur, Dhaka, Bangladesh",
      amount: "50000",
    },
  ];

  return (
    <div
      className="w-full overflow-hidden mt-[30px] bg-[#ffffff] rounded-[12px] relative"
      style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
    >
      <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
        <div>
          <div className="flex gap-3 items-center">
            <p className="text-[24px] text-[#222950] font-bold">Profit</p>
            <Select defaultValue="">
              <SelectTrigger className="">
                <SelectValue placeholder="This Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="This Month">This Month</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
                <TableHead className="text-right w-[50px]">PROFIT</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.sn} className="text-[#595F84]">
                  <TableCell className="font-medium">{product.sn}</TableCell>
                  <TableCell className="font-medium w-[300px]">
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/images/rasel.png"
                        alt="pic"
                        height={33}
                        width={33}
                        className="rounded-[100%]"
                      />

                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.phone}</TableCell>
                  <TableCell className="text-center">{product.bazar}</TableCell>

                  <TableCell className="text-center flex justify-center">
                    <div className="flex items-center gap-3">
                      {Number(product.amount) > 0 ? (
                        <Image
                          src="/icons/tk-blue.svg"
                          alt="tk"
                          height={17}
                          width={17}
                        />
                      ) : (
                        <Image
                          src="/icons/tk-red.svg"
                          alt="tk"
                          height={17}
                          width={17}
                        />
                      )}

                      <p
                        className={clsx(`text-[12px] font-semibold`, {
                          "text-[#1273EB]": Number(product.amount) > 0,
                          "text-[#FF565E]": Number(product.amount) < 0,
                        })}
                      >
                        {product.amount}
                      </p>
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
  );
};

export default DealerProfitScreen;
