"use client";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React from "react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ProfileCardCompact from "@/components/core/profileCardCompact";
import ProfileTab from "@/components/core/profileTab";
import { useDealerList } from "@/utils/apis/getDealer";
import { dealer } from "@/types/dealer";

const CheckoutManProfile = () => {
  const { height, width } = useWindowDimensions();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const mainComponentHeight = height - 300;
  const mainComponentWidth = width - 300;

  const { data } = useDealerList(100, 1);

  return (
    <div className="h-full">
      {/* top elements */}

      {/* profile tabs */}

      <div
        className="flex gap-4 items-center mt-[20px] overflow-x-scroll"
        style={{ width: `${mainComponentWidth}px` }}
      >
        <div className="flex min-w-max h-[100px] gap-4">
          {data?.data?.result.map((dealer: { _id: string; dealer: dealer }) => (
            <button key={dealer?._id} onClick={() => {}}>
              <ProfileTab
                image={dealer?.dealer?.profileImg}
                title={dealer?.dealer?.name}
                selected={false}
              />
            </button>
          ))}
        </div>
      </div>

      {/* main contents */}

      <div
        className="w-full overflow-hidden mt-[20px] bg-[#ffffff] rounded-[12px]"
        style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
      >
        <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
          <div>
            <h3 className="font-bold text-[16px]">All Dealer</h3>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Dealer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dealer">Dealer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              Add
              <Image
                src="/icons/plus-white.svg"
                alt="add"
                width={12}
                height={12}
                className="ml-[2px]"
              />
            </Button>
          </div>
        </div>

        {/* contents */}
        <div className="py-[20px] px-[34px]">
          <div
            className="overflow-scroll pt-[24px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4"
            style={{
              height: `${mainComponentHeight}px`,
              paddingBottom: "200px",
            }}
          >
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
            <ProfileCardCompact
              name="রমজান আলী"
              image="/images/man.png"
              url="/admin/management/pickup-man-profile/dealer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutManProfile;
