import { balooda } from "@/utils/bengaliFont";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileCardProps {
  name: string;
  details: string;
  image: string;
  url: string;
}

const ProfileCard = ({ name, details, image, url }: ProfileCardProps) => {
  return (
    <div className="group bg-[#F8FAFF] w-full h-[238px] flex flex-col justify-center items-center py-[44px] rounded-[12px] relative hover:bg-[#ffffff] hover:border-[1px] hover:border-[#007AFF99]">
      <div className="h-[80px] w-[80px] mb-[20px]">
        <Image
          src={image}
          alt="user"
          width={80}
          height={80}
          className="rounded-[12px] object-cover h-[80px] w-[80px] border-2 border-[#fff]"
        />
      </div>
      <h3 className={`${balooda.className}`}>{name}</h3>
      <p className="text-[14px] text-[#8A94A6]">{details}</p>
      <div className="absolute bottom-[0px] w-full bg-[#F8FAFF] hidden group-hover:flex items-center justify-center rounded-b-[12px]">
        <span className="text-[#007AFF] text-[14px] py-[7px] cursor-pointer">
          <Link href={url}>View Profile</Link>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
