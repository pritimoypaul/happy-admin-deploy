import { balooda } from "@/utils/bengaliFont";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  name: string;
  details: string;
  image: string;
  url: string;
}

const ProductCard = ({ name, details, image }: ProductCardProps) => {
  return (
    <div className="group bg-[#ffffff] w-full h-[238px] flex flex-col justify-center items-center py-[44px] rounded-[12px] relative hover:bg-[#ffffff] border-[1px] border-[#007AFF21] hover:border-[1px] hover:border-[#007AFF99]">
      <div className="h-[98px] w-[98px] mb-[20px]">
        <Image
          src={image}
          alt="user"
          width={98}
          height={98}
          className="rounded-[12px] object-cover h-[98px] w-[98px] border-2 border-[#fff]"
        />
      </div>
      <h3 className={`${balooda.className}`}>{name}</h3>
      <p className="text-[14px] text-[#8A94A6]">{details}</p>
      <div className="absolute bottom-[0px] w-full bg-[#FBFBFB] flex items-center justify-between px-[20px] rounded-b-[12px]">
        <span className="text-[#8A94A6] text-[14px] py-[7px] cursor-pointer">
          50 G
        </span>
        <span className="text-[#007AFF] text-[14px] py-[7px] cursor-pointer">
          Tk 50.00
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
