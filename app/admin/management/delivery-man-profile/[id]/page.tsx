"use client";

import React, { use, useState } from "react";

import ProfileTab from "@/components/core/profileTab";
import Image from "next/image";
import DeliveryOrderScreen from "./_order";
import DeliveryRouteScreen from "./_route";
import { useUserDetails } from "@/utils/apis/getUserDetails";

const ManagementDeliveryManProfile = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [profileTab, setProfileTab] = useState("Order");
  const { id } = use(params);

  const { data } = useUserDetails(id);

  return (
    <div className="h-full">
      {/* top elements */}

      {/* profile tabs */}

      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center mt-[20px]">
          <button onClick={() => setProfileTab("Order")}>
            <ProfileTab
              image="/images/summary.png"
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
        </div>
        <div className="bg-[#fff] px-[14px] py-[12px] rounded-[12px] flex items-center justify-between gap-[50px]">
          <div className="flex gap-4 items-center">
            <Image
              className="object-cover rounded-[6px] h-[39px] w-[39px]"
              src="/images/delivery-man.png"
              alt="pic"
              height={40}
              width={40}
            />
            <div>
              <p className="text-[12px] font-medium text-[#222950]">
                রমজান আলী
              </p>
              <p className="text-[10px] text-[#8A94A6]">+88 01234 5566 </p>
            </div>
          </div>
          <div>
            <div className="px-[8px] max-w-fit py-[6px] flex justify-center items-center gap-4 bg-[#EDF6FF] text-[#007AFF] rounded-[7px] cursor-pointer">
              <span className="text-[11px]">View Profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* main element */}
      {profileTab === "Order" && <DeliveryOrderScreen id={data?.data?._id} />}
      {profileTab === "Route" && <DeliveryRouteScreen id={id} />}
    </div>
  );
};

export default ManagementDeliveryManProfile;
