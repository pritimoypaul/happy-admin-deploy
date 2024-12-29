"use client";
import { AddButton } from "@/components/core/addButton";
import CustomCard from "@/components/core/customCard";
import ProfileCard from "@/components/core/profileCard";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddDealerForm } from "./_addForm";
import { useDealerList } from "@/utils/apis/getDealer";
import { dealer } from "@/types/dealer";
import { Company } from "@/types/company";

const Dealer = () => {
  const { height } = useWindowDimensions();
  const [viewFormat, setViewFormat] = useState<string>("gridview");

  const mainComponentHeight = height - 300;

  const [limit] = useState(10);
  const [selectedPage] = useState(1);

  const { data, isFetched, refetch } = useDealerList(limit, selectedPage);

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="flex gap-4 items-center">
        <CustomCard
          title="Total SO"
          amount="200"
          icon="/images/sheild-people.svg"
        />
        <CustomCard
          title="All Products"
          amount="800+"
          icon="/images/products.svg"
        />
        <CustomCard
          title="AV. Summary Value"
          amount="12000+"
          icon="/images/infograph.svg"
        />
        <div className="w-[270px] flex items-center justify-center py-[43px] px-[26px] bg-[#fff] rounded-[12px] border-[1px] border-[#007AFF30]">
          <Dialog>
            <DialogTrigger>
              <AddButton title="Add New Dealer" />
            </DialogTrigger>
            <DialogContent className="max-w-[650px] max-h-[90%] overflow-scroll">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <AddDealerForm refetch={refetch} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* main element */}
      <div
        className="w-full overflow-hidden mt-[20px] bg-[#ffffff] rounded-[12px]"
        style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
      >
        <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
          <div>
            <h3 className="font-bold text-[16px]">All Dealer</h3>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center justify-center gap-3 px-[16px] py-[10px] bg-[#F8FAFF] rounded-[7px]">
              <button onClick={() => setViewFormat("gridview")}>
                {viewFormat === "gridview" ? (
                  <Image
                    src="/icons/boxview-blue.svg"
                    alt="filter"
                    width={14}
                    height={14}
                  />
                ) : (
                  <Image
                    src="/icons/boxview.svg"
                    alt="filter"
                    width={14}
                    height={14}
                  />
                )}
              </button>
              <button onClick={() => setViewFormat("listview")}>
                {viewFormat === "listview" ? (
                  <Image
                    src="/icons/listview-blue.svg"
                    alt="filter"
                    width={14}
                    height={14}
                  />
                ) : (
                  <Image
                    src="/icons/listview.svg"
                    alt="filter"
                    width={14}
                    height={14}
                  />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center px-[10px] py-[10px] border-[1px] border-[#E0EFFF] rounded-[7px]">
              <button>
                <Image
                  src="/icons/sort.svg"
                  alt="filter"
                  width={14}
                  height={14}
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className="overflow-scroll px-[24px] pt-[24px] grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
          style={{ height: `${mainComponentHeight}px`, paddingBottom: "200px" }}
        >
          {isFetched &&
            data?.data?.result?.map(
              (dealer: { companies: Array<Company>; dealer: dealer }) => (
                <ProfileCard
                  key={dealer?.dealer?._id}
                  name={dealer?.dealer?.name}
                  details={dealer?.dealer?.phone}
                  image={dealer?.dealer?.profileImg}
                  url="/admin/dealer-profile"
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default Dealer;
