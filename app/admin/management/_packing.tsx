import ProfileCard from "@/components/core/profileCard";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useState } from "react";

const ManagementPacking = () => {
  const { height } = useWindowDimensions();
  const [viewFormat, setViewFormat] = useState<string>("gridview");

  const mainComponentHeight = height - 300;

  return (
    <div
      className="w-full overflow-hidden mt-[20px] bg-[#ffffff] rounded-[12px]"
      style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
    >
      <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
        <div>
          <h3 className="font-bold text-[16px]">Pickup Man</h3>
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
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
        <ProfileCard
          name="রমজান আলী"
          details="Pran Food & Bavreage"
          image="/images/man.png"
          url="/admin/management/packing-man-profile"
        />
      </div>
    </div>
  );
};

export default ManagementPacking;
