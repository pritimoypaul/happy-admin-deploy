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
import { AddBazarForm } from "./_addForm";

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
import { EditBazarForm } from "./_editForm";
import { useAreaList } from "@/utils/apis/getArea";
import { Area } from "@/types/area";
import { Loader2 } from "lucide-react";
import { useUpazilaList } from "@/utils/apis/getUpazila";
import { Upazila } from "@/types/upazila";
import { useUnionList } from "@/utils/apis/getUnion";
import { Button } from "@/components/ui/button";

const AreaScreen = () => {
  const { height } = useWindowDimensions();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [areaList, setArealist] = useState<Array<Area>>([]);
  const [limit, setLimit] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");

  const { data, isFetching, isFetched, refetch } = useAreaList(
    limit,
    selectedPage,
    selectedUnion
  );
  const { data: upazilaData, isFetched: upazilaFetched } = useUpazilaList();

  const {
    data: unionData,
    isFetched: unionFetched,
    refetch: unionRefetch,
  } = useUnionList(selectedUpazila);

  const mainComponentHeight = height - 300;

  const clearFilter = () => {
    setSelectedUnion("");
    setSelectedUpazila("");
  };

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
    console.log("data: " + JSON.stringify(data?.data?.result));

    if (isFetched) {
      setArealist(data?.data?.result);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [limit, selectedPage, selectedUnion]);

  useEffect(() => {
    unionRefetch();
  }, [selectedUpazila]);

  useEffect(() => {
    console.log(unionData?.data?.result);
  }, [unionData]);

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="flex gap-4 items-center">
        <CustomCard
          title="Total Bazar"
          amount={data?.data?.meta?.totalDoc ?? 0}
          icon="/images/products.svg"
        />
        <CustomCard
          title="Total Union"
          amount={unionData?.data?.meta?.totalDoc ?? 0}
          icon="/images/sheild-people.svg"
        />
        <CustomCard
          title="Total Upazila"
          amount={upazilaData?.data?.meta?.totalDoc ?? 0}
          icon="/images/infograph.svg"
        />
        <div className="w-[270px] flex items-center justify-center py-[43px] px-[26px] bg-[#fff] rounded-[12px] border-[1px] border-[#007AFF30]">
          <Dialog>
            <DialogTrigger>
              <AddButton title="Add New Bazar" />
            </DialogTrigger>
            <DialogContent className="max-w-[450px] max-h-[90%] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Add New Bazar</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <AddBazarForm refetch={refetch} />
            </DialogContent>
          </Dialog>
          {/* edit dialog */}
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent className="max-w-[450px] max-h-[90%] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Edit Bazar</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <EditBazarForm />
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
            <Button variant="outline" onClick={() => clearFilter()}>
              Clear Filter
            </Button>
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
            <IconInput icon="/icons/search.svg" placeholder="Search Bazar" />
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
                    <TableHead className="w-[200px]">BAZAR NAME</TableHead>
                    <TableHead>UPAZILA</TableHead>
                    <TableHead className="text-center">UNION</TableHead>
                    <TableHead className="text-right w-[50px]">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isFetched &&
                    areaList?.map((area) => (
                      <TableRow key={area._id} className="text-[#595F84]">
                        <TableCell className="font-medium">{area.id}</TableCell>
                        <TableCell className="font-medium w-[300px]">
                          <div className="flex gap-2 items-center">
                            {area.bnName}
                          </div>
                        </TableCell>
                        <TableCell>{area.union.bnName}</TableCell>
                        <TableCell className="text-center">
                          {area.union.bnName}
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

export default AreaScreen;
