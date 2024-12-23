import clsx from "clsx";
import React from "react";

interface TabButtonProps {
  title: string;
  selected: boolean;
}

export const TabButton = ({ title, selected }: TabButtonProps) => {
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-sm",
        {
          "px-[12px] py-[5px] flex justify-center items-center gap-4 bg-[#EDF6FF] text-[#007AFF] !rounded-full border-[1px] border-[#007AFF26] cursor-pointer text-[12px]":
            selected === true,
          "px-[12px] py-[5px] flex justify-center items-center gap-4 bg-[#fff] text-[#64748B] !rounded-full border-[1px] border-[#F1F5F9] cursor-pointer text-[12px]":
            selected === false,
        }
      )}
    >
      <span>{title}</span>
    </div>
  );
};
