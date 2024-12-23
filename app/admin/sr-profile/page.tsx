"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import ProfileTab from "@/components/core/profileTab";
import SrOverview from "./_overview";
import SrDealer from "./_dealer";
import SrProducts from "./_products";
import SrRouteScreen from "./_route";
import SrSummaryScreen from "./_summary";
import SrOrderScreen from "./_order";

const SrProfile = () => {
  const [profileTab, setProfileTab] = useState("Overview");

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
                Mohammad Rasel
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

      {/* profile tabs */}

      <div className="flex gap-4 items-center mt-[50px]">
        <button onClick={() => setProfileTab("Overview")}>
          <ProfileTab
            image="/images/summary.png"
            title="Overview"
            selected={profileTab === "Overview"}
          />
        </button>
        <button onClick={() => setProfileTab("Order")}>
          <ProfileTab
            image="/images/order.png"
            title="Order"
            selected={profileTab === "Order"}
          />
        </button>
        <button onClick={() => setProfileTab("Route")}>
          <ProfileTab
            image="/images/route.png"
            title="Route"
            selected={profileTab === "Route"}
          />
        </button>
        <button onClick={() => setProfileTab("Dealer")}>
          <ProfileTab
            image="/images/dealer.png"
            title="Dealer"
            selected={profileTab === "Dealer"}
          />
        </button>
        <button onClick={() => setProfileTab("Summary")}>
          <ProfileTab
            image="/images/summary.png"
            title="Summary"
            selected={profileTab === "Summary"}
          />
        </button>
        <button onClick={() => setProfileTab("Products")}>
          <ProfileTab
            image="/images/product-box.png"
            title="Products"
            selected={profileTab === "Products"}
          />
        </button>
      </div>

      {/* main element */}
      {profileTab === "Overview" && <SrOverview />}
      {profileTab === "Order" && <SrOrderScreen />}
      {profileTab === "Dealer" && <SrDealer />}
      {profileTab === "Products" && <SrProducts />}
      {profileTab === "Route" && <SrRouteScreen />}
      {profileTab === "Summary" && <SrSummaryScreen />}
    </div>
  );
};

export default SrProfile;
