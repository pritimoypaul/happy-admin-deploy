import { balooda } from "@/utils/bengaliFont";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  name: string;
  details: string;
  image: string;
  url: string;
}

const CompanyCard = ({ name, details, image }: ProductCardProps) => {
  return (
    <div className="group bg-[#ffffff] w-full h-[238px] flex flex-col justify-center items-center py-[44px] rounded-[12px] relative hover:bg-[#ffffff] border-[1px] border-[#007AFF21] hover:border-[1px] hover:border-[#007AFF99]">
      <div className="h-[98px] w-[98px] mb-[20px]">
        <Image
          src={image}
          alt="user"
          width={98}
          height={98}
          className="rounded-[12px] object-contain h-[98px] w-[98px] border-2 border-[#fff]"
        />
      </div>
      <h3 className={`${balooda.className}`}>{name}</h3>
      <p className="text-[14px] text-[#8A94A6]">{details}</p>
    </div>
  );
};

export default CompanyCard;
