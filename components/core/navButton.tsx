"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavButton {
  url: string;
  image: string;
  text: string;
}

const NavButton = ({ image, text, url }: NavButton) => {
  const pathname = usePathname();
  return (
    <Link
      className={`"hover:bg-[#F8FAFF] px-[10px] py-[10px] flex items-center gap-2 rounded-lg" ${
        pathname == url && "bg-[#F8FAFF]"
      }`}
      href={url}
    >
      <Image src={image} alt="dashboard" height={17} width={17} />
      {text}
    </Link>
  );
};

export default NavButton;
