import { balooda } from "@/utils/bengaliFont";
import Image from "next/image";
import React from "react";

interface CategoryBoxProps {
  title: string;
}

const CategoryBox = ({ title }: CategoryBoxProps) => {
  return (
    <div className="group flex items-center justify-between px-[16px] py-[12px] border-[1px] w-full max-h-fit border-[#0000000D] rounded-[10px] hover:border-[#007AFF47]">
      <div>
        <p className={`${balooda.className}`}>{title}</p>
      </div>

      <div className="cursor-pointer block group-hover:hidden">
        <Image
          src={"/icons/delete-icon-grey.svg"}
          alt="edit"
          height={11}
          width={11}
        />
      </div>
      <div className="cursor-pointer hidden group-hover:block">
        <Image
          src={"/icons/delete-icon.svg"}
          alt="edit"
          height={11}
          width={11}
        />
      </div>
    </div>
  );
};

export default CategoryBox;
