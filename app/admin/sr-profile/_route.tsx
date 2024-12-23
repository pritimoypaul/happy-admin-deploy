import TableTabButton from "@/components/core/tableTabButton";
import { Button } from "@/components/ui/button";
import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import RouteBox from "@/components/core/routeBox";

const SrRouteScreen = () => {
  const { height } = useWindowDimensions();
  const [tableTab, setTableTab] = useState("saturday");

  const mainComponentHeight = height - 300;

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
          <Button>
            Add Route
            <Image
              src="/icons/plus-white.svg"
              alt="Add Route"
              width={10}
              height={10}
            />
          </Button>
        </div>
      </div>
      {/* main content */}
      <div className="py-[20px] px-[34px]">
        <div
          className="overflow-scroll pt-[24px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4"
          style={{ height: `${mainComponentHeight}px`, paddingBottom: "200px" }}
        >
          <RouteBox title="১ - বুধির হাট" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
          <RouteBox title="২ - কাশেমের মোড়" distance={6} />
        </div>
      </div>
      {/* footer content */}
      <div className="bg-[#fff] px-[34px] py-[18px] flex justify-between items-center border-t-[1px] border-[#0472ED1F] absolute bottom-0 w-full">
        <div className="text-[#718096] text-[14px] flex gap-2 items-center">
          Show&nbsp;Result:
          <Select defaultValue={"1"}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>1</SelectLabel>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default SrRouteScreen;
