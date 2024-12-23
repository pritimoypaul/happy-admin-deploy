import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  icon: string;
  amount: string;
}

const CustomCard = ({ title, amount, icon }: CardProps) => {
  return (
    <div className="w-[270px] flex items-center gap-4 py-[32px] px-[26px] bg-[#fff] rounded-[12px] border-[1px] border-[#007AFF30]">
      <div>
        <Image src={icon} alt="People" width={41} height={46} />
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <p className="text-[#595F84]">{title}</p>
        <p className="text-[#222950] font-bold text-[20px]">{amount}</p>
      </div>
    </div>
  );
};

export default CustomCard;
