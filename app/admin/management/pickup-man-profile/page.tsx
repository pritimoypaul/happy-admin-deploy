"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const PickupManProfile = () => {
  const { height } = useWindowDimensions();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const mainComponentHeight = height - 300;

  return (
    <div className="h-full">
      {/* top elements */}
      <div className="w-full bg-[#fff] rounded-[12px] p-[25px] relative border-[1px] border-[#C9E2FF]">
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
        <div className="p-[10px] w-2/3 flex gap-[100px] items-center">
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

export default PickupManProfile;
