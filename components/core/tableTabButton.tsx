import { balooda } from "@/utils/bengaliFont";
import clsx from "clsx";
import React from "react";

interface TableTabButtonProps {
  title: string;
  selected: boolean;
}

const TableTabButton = ({ title, selected }: TableTabButtonProps) => {
  return (
    <li
      className={clsx(`${balooda.className}`, {
        "text-[#0472ED] text-[14px] font-semibold border-b-2 border-[#0472ED]":
          selected === true,
        "text-[#222950] text-[14px] font-semibold": selected === false,
      })}
    >
      {title}
    </li>
  );
};

export default TableTabButton;
