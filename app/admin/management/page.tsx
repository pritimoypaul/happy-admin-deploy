"use client";

import React, { useState } from "react";

import ProfileTab from "@/components/core/profileTab";
import ManagementDelivery from "./_delivery";
import ManagementPickup from "./_pickup";
import ManagementCheckout from "./_checkout";
import ManagementPacking from "./_packing";
import ManagementFreelancer from "./_freelancer";

const Management = () => {
  const [profileTab, setProfileTab] = useState("Pick-Up");

  return (
    <div className="h-full">
      {/* top elements */}

      {/* profile tabs */}

      <div className="flex gap-4 items-center mt-[20px]">
        <button onClick={() => setProfileTab("Pick-Up")}>
          <ProfileTab
            image="/images/product-box.png"
            title="Pick-Up"
            selected={profileTab === "Pick-Up"}
          />
        </button>
        <button onClick={() => setProfileTab("Checkout")}>
          <ProfileTab
            image="/images/summary.png"
            title="Checkout"
            selected={profileTab === "Checkout"}
          />
        </button>
        <button onClick={() => setProfileTab("Packing")}>
          <ProfileTab
            image="/images/order.png"
            title="Packing"
            selected={profileTab === "Packing"}
          />
        </button>
        <button onClick={() => setProfileTab("Collection")}>
          <ProfileTab
            image="/images/collection-box.png"
            title="Collection"
            selected={profileTab === "Collection"}
          />
        </button>
        <button onClick={() => setProfileTab("Delivery")}>
          <ProfileTab
            image="/images/delivery.png"
            title="Delivery"
            selected={profileTab === "Delivery"}
          />
        </button>
        <button onClick={() => setProfileTab("Freelancer")}>
          <ProfileTab
            image="/images/product-box.png"
            title="Freelancer"
            selected={profileTab === "Freelancer"}
          />
        </button>
      </div>

      {/* main element */}
      {profileTab === "Delivery" && <ManagementDelivery />}
      {profileTab === "Pick-Up" && <ManagementPickup />}
      {profileTab === "Checkout" && <ManagementCheckout />}
      {profileTab === "Packing" && <ManagementPacking />}
      {profileTab === "Freelancer" && <ManagementFreelancer />}
    </div>
  );
};

export default Management;
