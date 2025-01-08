"use client";

import React, { use, useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import ProfileTab from "@/components/core/profileTab";
import CustomCardVertical from "@/components/core/customCardVertical";
import DealerProducts from "./_products";
import DealerSummaryScreen from "./_summary";
import DealerCompany from "./_company";
import DealerSrScreen from "./_sr";
import DealerProfitScreen from "./_profit";
import { useDealerDetails } from "@/utils/apis/getDealerDetails";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AssignCompanyForm } from "./_dealerAssignCompany";

const DealerProfile = ({ params }: { params: Promise<{ id: string }> }) => {
  const [profileTab, setProfileTab] = useState("Summary");
  const [isOpen, setIsOpen] = useState(false);

  const { id } = use(params);

  const { data, refetch } = useDealerDetails(id);

  useEffect(() => {
    return () => {
      document.body.style.pointerEvents = "";
    };
  }, [isOpen]);

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="flex gap-4">
        <div className="flex-1 w-full">
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

                    <li
                      className="mt-[10px] flex items-center gap-2"
                      onClick={() => setIsOpen(true)}
                    >
                      <Image
                        src="/icons/edit-icon.svg"
                        height={10}
                        width={10}
                        alt="edit"
                      />
                      <p className="text-[14px] text-[#8A94A6]">
                        Assign Company
                      </p>
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
            <div className="p-[10px] flex justify-between items-center">
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
                    {data?.data?.dealer?.name}
                  </p>
                  <p className="text-[14px] text-[#8A94A6]">
                    {data?.data?.dealer?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-[1px] border-l-[1px] border-r-[1px]  border-[#C9E2FF] w-full bg-[#fff] rounded-b-[12px] flex justify-between">
            <div className="w-full flex justify-center py-[32px] border-r-[1px] border-[#C9E2FF]">
              <div>
                <p className="text-[12px] text-[#595F84]">TOTAL ORDER</p>
                <p className="font-medium text-[16px] text-[#222950]">683</p>
              </div>
            </div>
            <div className="w-full flex justify-center py-[32px] border-r-[1px] border-[#C9E2FF]">
              <div>
                <p className="text-[12px] text-[#595F84]">CANCELED</p>
                <p className="font-medium text-[16px] text-[#222950]">400</p>
              </div>
            </div>
            <div className="w-full flex justify-center py-[32px] border-r-[1px] border-[#C9E2FF]">
              <div>
                <p className="text-[12px] text-[#595F84]">Delivered</p>
                <p className="font-medium text-[16px] text-[#222950]">855</p>
              </div>
            </div>
            <div className="w-full flex justify-center py-[32px]">
              <div>
                <p className="text-[12px] text-[#595F84]">o/c</p>
                <p className="font-medium text-[16px] text-[#FF8F6B]">-1.7k</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-between items-center gap-4 w-full">
          <CustomCardVertical
            title="Total SO"
            icon="/images/sheild-people-blue.svg"
            amount="200"
          />
          <CustomCardVertical
            title="Product"
            icon="/images/products.svg"
            amount="200"
          />
          <CustomCardVertical
            title="Profit"
            icon="/images/economy.svg"
            amount="12000"
          />
        </div>
      </div>

      {/* profile tabs */}

      <div className="flex gap-4 items-center mt-[50px]">
        <button onClick={() => setProfileTab("Summary")}>
          <ProfileTab
            image="/images/summary.png"
            title="Summary"
            selected={profileTab === "Summary"}
          />
        </button>
        <button onClick={() => setProfileTab("Company")}>
          <ProfileTab
            image="/images/company-tab.png"
            title="Company"
            selected={profileTab === "Company"}
          />
        </button>
        <button onClick={() => setProfileTab("SR")}>
          <ProfileTab
            image="/images/sr-tab.png"
            title="SR"
            selected={profileTab === "SR"}
          />
        </button>

        <button onClick={() => setProfileTab("Products")}>
          <ProfileTab
            image="/images/product-box.png"
            title="Products"
            selected={profileTab === "Products"}
          />
        </button>
        <button onClick={() => setProfileTab("Profit")}>
          <ProfileTab
            image="/images/profit-tab.png"
            title="Profit"
            selected={profileTab === "Profit"}
          />
        </button>
      </div>

      {/* main element */}
      {profileTab === "Products" && <DealerProducts />}
      {profileTab === "Summary" && <DealerSummaryScreen />}
      {profileTab === "Company" && <DealerCompany id={id} />}
      {profileTab === "SR" && <DealerSrScreen />}
      {profileTab === "Profit" && <DealerProfitScreen />}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[450px] max-h-[90%] overflow-scroll">
          <DialogHeader>
            <DialogTitle>Assign Company</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <AssignCompanyForm id={id} refetch={refetch} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealerProfile;
