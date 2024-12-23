import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileCardCompactProps {
  name: string;
  image: string;
  url: string;
}

const ProfileCardCompact = ({ name, image, url }: ProfileCardCompactProps) => {
  return (
    <div className="px-[23px] py-[21px] group bg-[#F8FAFF] hover:bg-[#fff] rounded-[12px] flex items-center gap-[26px] hover:border-[1px] border-[#007AFF99] relative">
      <Image
        className="h-[60px] w-[63px] object-cover rounded-[12px]"
        src={image}
        width={63}
        height={60}
        alt="photo"
      />
      <p>{name}</p>
      <div className="absolute hidden right-0 h-full group-hover:flex px-[26px] bg-[#F2F6FF] items-center rounded-r-[12px]">
        <Link href={url}>
          <p className="text-[#007AFF] text-[14px]">View</p>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCardCompact;
