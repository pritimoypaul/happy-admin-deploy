import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface ProfileTabProps {
  title: string;
  image: string;
  selected: boolean;
}

const ProfileTab = ({ title, image, selected }: ProfileTabProps) => {
  return (
    <div
      className={clsx(
        "bg-[#fff] rounded-[12px] p-[20px] w-full flex items-center gap-4",
        {
          "text-[#007AFF] border-[1px] border-[#007AFF]": selected === true,
          "text-[#595F84]": selected === false,
        }
      )}
    >
      <Image
        className="rounded-sm"
        src={image}
        alt="Overview"
        height={30}
        width={30}
      />
      <p className="text-[16px]">{title}</p>
    </div>
  );
};

export default ProfileTab;
