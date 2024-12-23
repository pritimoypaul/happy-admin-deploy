import Image from "next/image";
import React from "react";

interface AddButtonProps {
  title: string;
}

export const AddButton = ({ title }: AddButtonProps) => {
  return (
    <div className="px-[20px] max-w-fit h-[40px] flex justify-center items-center gap-4 bg-[#EDF6FF] text-[#007AFF] rounded-[7px] cursor-pointer">
      <span>{title}</span>
      <Image src="/icons/plus.svg" height={14} width={14} alt="icon" />
    </div>
  );
};
