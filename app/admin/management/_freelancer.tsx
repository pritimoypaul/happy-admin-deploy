import { AddButton } from "@/components/core/addButton";
import ProfileCard from "@/components/core/profileCard";
import { Freelancer } from "@/types/freelancer";
import { useFreelancerList } from "@/utils/apis/getFreelancer";
import useWindowDimensions from "@/utils/windowSize";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { AddFreelancerForm } from "./_addFreelancer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ManagementFreelancer = () => {
  const { height } = useWindowDimensions();
  const [viewFormat, setViewFormat] = useState<string>("gridview");
  const [limit] = useState(10);
  const [selectedPage] = useState(1);

  const mainComponentHeight = height - 300;

  const { data, isFetched, isFetching, refetch } = useFreelancerList(
    limit,
    selectedPage
  );

  return (
    <div
      className="w-full overflow-hidden mt-[20px] bg-[#ffffff] rounded-[12px]"
      style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
    >
      <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
        <div>
          <h3 className="font-bold text-[16px]">Freelancer</h3>
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
          <Dialog>
            <DialogTrigger>
            <AddButton title="Add New" />
            </DialogTrigger>
            <DialogContent className="max-w-[450px] max-h-[90%] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Add New Freelancer</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <AddFreelancerForm refetch={refetch} />
            </DialogContent>
          </Dialog>
          
        </div>
      </div>
      {isFetching && (
        <div className="flex justify-center items-center pt-4">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div
        className="overflow-scroll px-[24px] pt-[24px] grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
        style={{ height: `${mainComponentHeight}px`, paddingBottom: "200px" }}
      >
        {isFetched &&
          data?.data?.result.map((freelancer: Freelancer) => (
            <ProfileCard
              key={freelancer.freelancer._id}
              name={freelancer.freelancer.name}
              details=""
              image={freelancer.freelancer.profileImg}
              url={`/admin/management/freelancer-profile/${freelancer.freelancer.id}`}
            />
          ))}
      </div>
    </div>
  );
};

export default ManagementFreelancer;