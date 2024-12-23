"use client";

import React, { useState } from "react";

import ProfileTab from "@/components/core/profileTab";
import MainProducts from "./_products";
import MainCategoryScreen from "./_category";

const Product = () => {
  const [profileTab, setProfileTab] = useState("Products");

  return (
    <div className="h-full">
      {/* top elements */}

      {/* profile tabs */}

      <div className="flex gap-4 items-center mt-[20px]">
        <button onClick={() => setProfileTab("Products")}>
          <ProfileTab
            image="/images/product-box.png"
            title="Products"
            selected={profileTab === "Products"}
          />
        </button>
        <button onClick={() => setProfileTab("Category")}>
          <ProfileTab
            image="/images/summary.png"
            title="Category"
            selected={profileTab === "Category"}
          />
        </button>
      </div>

      {/* main element */}

      {profileTab === "Products" && <MainProducts />}
      {profileTab === "Category" && <MainCategoryScreen />}
    </div>
  );
};

export default Product;
