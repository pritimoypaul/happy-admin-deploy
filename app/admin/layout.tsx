"use client";

import NavButton from "@/components/core/navButton";
import { IconInput } from "@/components/ui/inputIcon";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface RouteDetails {
  key: string;
  name: string;
}

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [route, setRoute] = useState<RouteDetails>({
    key: "dashboard",
    name: "Overview",
  });

  const logOutUser = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  useEffect(() => {
    console.log("Route");
  }, [pathname]);

  return (
    <div>
      {/* navbar */}
      <div className="h-[70px] w-[100vw] flex px-[30px] items-center bg-[#FFF] border-[#F1F5F9] border-2 z-[10] fixed">
        <div className="w-[230px]">
          <Image
            src="/images/hello-logo.svg"
            alt="Hello"
            height={27}
            width={96}
          />
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="pl-[24px]">
            <h1 className="font-bold text-[22px]">{route.name}</h1>
          </div>
          <div>
            <IconInput icon="/icons/search.svg" placeholder="Search SO" />
          </div>
        </div>
      </div>
      {/* navbar */}
      <div className="h-full w-full flex">
        {/* sidebar */}
        <div className="w-[230px] h-[100vh] bg-[#fff] px-[30px] fixed z-[9] flex flex-col justify-between">
          <div className="mt-[80px] overflow-auto">
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "dashboard",
                  name: "Overview",
                });
              }}
            >
              <NavButton
                image="/icons/dashboard.svg"
                text="Dashboard"
                url="/admin/dashboard"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "sr",
                  name: "Sells Officer",
                });
              }}
            >
              <NavButton image="/icons/sr.svg" text="SRs" url="/admin/sr" />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "dealer",
                  name: "Dealers",
                });
              }}
            >
              <NavButton
                image="/icons/deller.svg"
                text="Dealers"
                url="/admin/dealer"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "sr",
                  name: "Dealer",
                });
              }}
            >
              <NavButton
                image="/icons/dsrs.svg"
                text="DSRs"
                url="/admin/dealers"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "sr",
                  name: "Dealer",
                });
              }}
            >
              <NavButton
                image="/icons/routes.svg"
                text="Routes"
                url="/admin/dealers"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "retailers",
                  name: "Retailers",
                });
              }}
            >
              <NavButton
                image="/icons/retailers.svg"
                text="Retailers"
                url="/admin/retailer"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "orders",
                  name: "Order Status",
                });
              }}
            >
              <NavButton
                image="/icons/orders.svg"
                text="Orders"
                url="/admin/order"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "sproduct",
                  name: "Product",
                });
              }}
            >
              <NavButton
                image="/icons/products.svg"
                text="Products"
                url="/admin/product"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "sr",
                  name: "Dealer",
                });
              }}
            >
              <NavButton
                image="/icons/profit.svg"
                text="Profit"
                url="/admin/dealers"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "sr",
                  name: "Dealer",
                });
              }}
            >
              <NavButton
                image="/icons/extra.svg"
                text="Extra"
                url="/admin/dealers"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "company",
                  name: "Company",
                });
              }}
            >
              <NavButton
                image="/icons/company.svg"
                text="Company"
                url="/admin/company"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "area",
                  name: "Area",
                });
              }}
            >
              <NavButton
                image="/icons/area.svg"
                text="Area"
                url="/admin/area"
              />
            </button>
            <button
              className="w-full"
              onClick={() => {
                setRoute({
                  key: "management",
                  name: "Management",
                });
              }}
            >
              <NavButton
                image="/icons/management.svg"
                text="Management"
                url="/admin/management"
              />
            </button>
          </div>
          <div className="pb-[20px]">
            <button
              onClick={() => logOutUser()}
              className="flex gap-3 items-center px-[10px] py-[15px] bg-[#F9F9FC] w-full rounded-md"
            >
              <Image src="/icons/logout.svg" alt="icn" height={13} width={13} />
              Logout
            </button>
          </div>
        </div>
        {/* sidebar */}
        {/* main */}
        <div className="flex-1 mx-[24px] mt-[100px] my-[30px] ml-[254px]">
          {children}
        </div>
        {/* main */}
      </div>
    </div>
  );
};

export default MainLayout;
