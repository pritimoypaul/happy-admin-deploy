"use client";

import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { TabButton } from "@/components/core/tabButton";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SrDealerProfile = () => {
  const [graphTab, setGraphTab] = useState("This Week");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const series = [{ name: "Value", data: [20, 25, 30, 40, 35, 30, 45] }];

  const options: any = {
    chart: {
      type: "line",
      height: 350,
      dropShadow: { enabled: true, top: 4, left: 0, blur: 7, opacity: 0.4 },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#2563EB"],
    xaxis: { categories: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return `৳${val.toFixed(2)}`;
        },
      },
    },
  };

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="w-full bg-[#fff] rounded-t-[12px] p-[25px] relative border-[1px] border-[#C9E2FF]">
        <div className="absolute right-[15px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src="/icons/options.svg"
                height={16}
                width={16}
                alt="options"
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 absolute right-[0px] top-2">
              <DropdownMenuLabel></DropdownMenuLabel>
              <ul className="p-4">
                <li className="flex items-center gap-2">
                  <Image
                    src="/icons/edit-icon.svg"
                    height={10}
                    width={10}
                    alt="edit"
                  />
                  <p className="text-[14px] text-[#8A94A6]">Edit Profile</p>
                </li>

                <li className="mt-[10px] flex items-center gap-2">
                  <Image
                    src="/icons/delete-icon.svg"
                    height={10}
                    width={10}
                    alt="delete"
                  />
                  <p className="text-[14px] text-[#FF565E]">Block</p>
                </li>
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-[10px] w-2/3 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="h-[80px] w-[80px]">
              <Image
                src="/images/man-large.png"
                alt="Profile"
                width={80}
                height={80}
                className="h-[80px] w-[80px] object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-[20px] font-medium text-[#222950]">
                Romjan Ali
              </p>
              <p className="text-[14px] text-[#8A94A6]">+880125 5566 5566</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Image
              src="/images/brand-logo.png"
              width={37}
              height={25}
              alt="brand"
            />
            <p>প্রাণ ফুডস লি:</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="p-[18px] rounded-md bg-[#F8FAFF]">
              <Image
                src="/icons/calendar.svg"
                height={20}
                width={18}
                alt="calendar"
              />
            </div>
            <div>
              <p className="font-medium text-[15px] text-[#222950]">
                Join Date
              </p>
              <p className="text-[#8A94A6] text-[14px]">10 march 2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-l-[1px] border-r-[1px]  border-[#C9E2FF] w-full bg-[#fff] rounded-b-[12px] flex justify-between">
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">TOTAL ORDER</p>
          <p className="font-medium text-[16px] text-[#222950]">683</p>
        </div>
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">CANCELED</p>
          <p className="font-medium text-[16px] text-[#222950]">400</p>
        </div>
        <div className="w-full px-[64px] py-[32px] border-r-[1px] border-[#C9E2FF]">
          <p className="text-[12px] text-[#595F84]">Delivered</p>
          <p className="font-medium text-[16px] text-[#222950]">855</p>
        </div>
        <div className="w-full px-[64px] py-[32px]">
          <p className="text-[12px] text-[#595F84]">o/c</p>
          <p className="font-medium text-[16px] text-[#FF8F6B]">-1.7k</p>
        </div>
      </div>

      {/* main element */}
      {/* line chart */}
      <div className="mt-[25px] w-full bg-[#fff] rounded-[12px] p-[25px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#64748B] text-[12px]">Overall Sell</p>
            <p className="text-[18px] font-bold">
              ৳48,574.21{" "}
              <span className="text-[12px] font-medium text-[#34D399]">
                +20%
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setGraphTab("This Week")}>
              <TabButton title="This Week" selected={graphTab == "This Week"} />
            </button>
            <button onClick={() => setGraphTab("This Month")}>
              <TabButton
                title="This Month"
                selected={graphTab == "This Month"}
              />
            </button>
            <button onClick={() => setGraphTab("This Year")}>
              <TabButton title="This Year" selected={graphTab == "This Year"} />
            </button>
            <button onClick={() => setGraphTab("Lifetime")}>
              <TabButton title="Lifetime" selected={graphTab == "Lifetime"} />
            </button>
          </div>
        </div>
        <div className="pb-4">
          {mounted && (
            <Chart options={options} series={series} type="line" height={350} />
          )}
        </div>
      </div>
      {/* line chart end */}
    </div>
  );
};

export default SrDealerProfile;
