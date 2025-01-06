import TableTabButton from "@/components/core/tableTabButton";
import { Button } from "@/components/ui/button";
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

import RouteBox from "@/components/core/routeBox";
import { AddRouteForm } from "./_addForm";
import { useRouteList } from "@/utils/apis/getRouteList";
import { RouteDetail } from "@/types/route";

const DeliveryRouteScreen = ({ id }: any) => {
  const { height } = useWindowDimensions();
  const [tableTab, setTableTab] = useState("saturday");
  const [limit] = useState(10);
  const [selectedPage] = useState(1);

  const mainComponentHeight = height - 300;

  const { data, isFetched, refetch } = useRouteList(id, limit, selectedPage);

  return (
    <div
      className="w-full overflow-hidden mt-[30px] bg-[#ffffff] rounded-[12px] relative"
      style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
    >
      <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
        <div>
          <div>
            <ul className="flex items-center gap-[40px]">
              <button onClick={() => setTableTab("saturday")}>
                <TableTabButton
                  selected={tableTab === "saturday"}
                  title="শনিবার"
                />
              </button>
              <button onClick={() => setTableTab("sunday")}>
                <TableTabButton
                  selected={tableTab === "sunday"}
                  title="রবিবার"
                />
              </button>

              <button onClick={() => setTableTab("monday")}>
                <TableTabButton
                  selected={tableTab === "monday"}
                  title="সোমবার"
                />
              </button>

              <button onClick={() => setTableTab("tuesday")}>
                <TableTabButton
                  selected={tableTab === "tuesday"}
                  title="মঙ্গলবার"
                />
              </button>
              <button onClick={() => setTableTab("wednesday")}>
                <TableTabButton
                  selected={tableTab === "wednesday"}
                  title="বুধবার"
                />
              </button>
              <button onClick={() => setTableTab("thursday")}>
                <TableTabButton
                  selected={tableTab === "thursday"}
                  title="বৃহস্পতিবার"
                />
              </button>
              <button onClick={() => setTableTab("friday")}>
                <TableTabButton
                  selected={tableTab === "friday"}
                  title="শুক্রবার"
                />
              </button>
            </ul>
          </div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>
                Add Route
                <Image
                  src="/icons/plus-white.svg"
                  alt="Add Route"
                  width={10}
                  height={10}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[450px] max-h-[90%] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Add New Route</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <AddRouteForm id={id} refetch={refetch} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* main content */}
      <div className="py-[20px] px-[34px]">
        <div
          className="overflow-scroll pt-[24px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4"
          style={{ height: `${mainComponentHeight}px`, paddingBottom: "200px" }}
        >
          {tableTab == "saturday" &&
            isFetched &&
            data?.data?.saturday?.map((route: RouteDetail) => (
              <RouteBox key={route?._id} title={route?.bnName} distance={6} />
            ))}
          {tableTab == "sunday" &&
            isFetched &&
            data?.data?.sunday?.map((route: RouteDetail) => (
              <RouteBox key={route?._id} title={route?.bnName} distance={6} />
            ))}
          {tableTab == "monday" &&
            isFetched &&
            data?.data?.monday?.map((route: RouteDetail) => (
              <RouteBox key={route?._id} title={route?.bnName} distance={6} />
            ))}
          {tableTab == "tuesday" &&
            isFetched &&
            data?.data?.tuesday?.map((route: RouteDetail) => (
              <RouteBox key={route?._id} title={route?.bnName} distance={6} />
            ))}
          {tableTab == "wednesday" &&
            isFetched &&
            data?.data?.wednesday?.map((route: RouteDetail) => (
              <RouteBox key={route?._id} title={route?.bnName} distance={6} />
            ))}
          {tableTab == "thursday" &&
            isFetched &&
            data?.data?.thursday?.map((route: RouteDetail) => (
              <RouteBox key={route?._id} title={route?.bnName} distance={6} />
            ))}
          {tableTab == "friday" &&
            isFetched &&
            data?.data?.friday?.map((route: RouteDetail) => (
              <RouteBox key={route?._id} title={route?.bnName} distance={6} />
            ))}
        </div>
      </div>
      {/* footer content */}
    </div>
  );
};

export default DeliveryRouteScreen;
