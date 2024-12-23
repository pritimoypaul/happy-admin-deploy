"use client";
import { AddButton } from "@/components/core/addButton";
import CustomCard from "@/components/core/customCard";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddRetailerForm } from "./_addForm";

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
import { IconInput } from "@/components/ui/inputIcon";
import { EditRetailerForm } from "./_editForm";
import Link from "next/link";
import { useAreaList } from "@/utils/apis/getArea";
import { useUpazilaList } from "@/utils/apis/getUpazila";
import { useUnionList } from "@/utils/apis/getUnion";
import { useRetailerList } from "@/utils/apis/getRetailer";
import { Loader2 } from "lucide-react";
import { RetailerList } from "@/types/retailerList";
import { Upazila } from "@/types/upazila";

const Retailer = () => {
  const { height } = useWindowDimensions();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [limit, setLimit] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const { data, isFetching, isFetched, refetch } = useRetailerList(
    limit,
    selectedPage,
    selectedArea,
    selectedUnion
  );

  const {
    data: bazarData,
    isFetched: bazarFetched,
    refetch: bazarRefetch,
  } = useAreaList(100, 1, selectedUnion);
  const { data: upazilaData, isFetched: upazilaFetched } = useUpazilaList();

  const {
    data: unionData,
    isFetched: unionFetched,
    refetch: unionRefetch,
  } = useUnionList(selectedUpazila);

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
  }, [limit, selectedPage, selectedArea, selectedUnion]);

  useEffect(() => {
    unionRefetch();
  }, [selectedUpazila]);

  useEffect(() => {
    bazarRefetch();
  }, [selectedUnion]);

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="flex gap-4 items-center">
        <CustomCard
          title="Total Retailer"
          amount={data?.data?.meta?.totalDoc ?? 0}
          icon="/images/sheild-people.svg"
        />
        <CustomCard
          title="Total Bazar"
          amount={bazarData?.data?.meta?.totalDoc ?? 0}
          icon="/images/products.svg"
        />

        <CustomCard
          title="AV. Order Value"
          amount="1200"
          icon="/images/infograph.svg"
        />
        <div className="w-[270px] flex items-center justify-center py-[43px] px-[26px] bg-[#fff] rounded-[12px] border-[1px] border-[#007AFF30]">
          <Dialog>
            <DialogTrigger>
              <AddButton title="Add New Retailer" />
            </DialogTrigger>
            <DialogContent className="max-w-[650px] max-h-[90%] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Add New Retailer</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <AddRetailerForm />
            </DialogContent>
          </Dialog>
          {/* edit dialog */}
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent className="max-w-[650px] max-h-[90%] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Edit Retailer</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <EditRetailerForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* main element */}
      <div
        className="w-full overflow-hidden mt-[30px] bg-[#ffffff] rounded-[12px] relative"
        style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
      >
        <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
          <div>
            <div>
              <p className="text-[24px] text-[#222950] font-bold">All SR</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Select
              defaultValue={selectedUpazila}
              onValueChange={(value) => setSelectedUpazila(value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Upazillla" />
              </SelectTrigger>
              <SelectContent>
                {upazilaFetched &&
                  upazilaData?.data?.result?.map((upazila: Upazila) => (
                    <SelectItem key={upazila._id} value={upazila._id}>
                      {upazila.bnName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select
              defaultValue={selectedUnion}
              onValueChange={(value) => setSelectedUnion(value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Union" />
              </SelectTrigger>
              <SelectContent>
                {unionFetched &&
                  unionData?.data?.result?.map((union: any) => (
                    <SelectItem key={union._id} value={union._id}>
                      {union.bnName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select
              defaultValue={selectedArea}
              onValueChange={(value) => setSelectedArea(value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Bazar" />
              </SelectTrigger>
              <SelectContent>
                {bazarFetched &&
                  bazarData?.data?.result?.map((bazar: any) => (
                    <SelectItem key={bazar._id} value={bazar._id}>
                      {bazar.bnName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <IconInput icon="/icons/search.svg" placeholder="Search Retailer" />
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
                    <TableHead className="">SN.</TableHead>
                    <TableHead className="w-[200px]">NAME</TableHead>
                    <TableHead>PHONE NUMBER</TableHead>
                    <TableHead className="text-center">BAZAR</TableHead>
                    <TableHead className="text-right w-[50px]">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isFetched &&
                    data?.data?.result?.map((retailer: RetailerList) => (
                      <TableRow key={retailer?._id} className="text-[#595F84]">
                        <TableCell className="font-medium">
                          {retailer?.retailer?.id}
                        </TableCell>
                        <TableCell className="font-medium w-[300px]">
                          <div className="flex gap-2 items-center">
                            <Image
                              src="/images/rasel.png"
                              alt="pic"
                              height={33}
                              width={33}
                              className="rounded-[100%]"
                            />
                            <Link href="/admin/retailer-profile">
                              {retailer?.retailer?.name}
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell>{retailer?.retailer?.phone}</TableCell>
                        <TableCell className="text-center">
                          {retailer?.area?.name}
                        </TableCell>

                        <TableCell className="text-center">
                          <div className="w-full flex justify-center items-center gap-2">
                            <button onClick={() => setOpenEdit(true)}>
                              <Image
                                src="/icons/edit-icon.svg"
                                alt="icn"
                                height={13}
                                width={13}
                              />
                            </button>

                            <button>
                              <Image
                                src="/icons/delete-icon.svg"
                                alt="icn"
                                height={13}
                                width={13}
                              />
                            </button>
                          </div>
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

export default Retailer;
