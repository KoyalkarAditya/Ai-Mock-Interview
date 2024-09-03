"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center p-4 justify-between shadow-md">
      <Image alt="" src={"/logo.svg"} width={50} height={40} />
      <ul className="hidden md:flex gap-6">
        <li
          className={`cursor-pointer hover:text-primary hover:font-bold transition-all ${
            pathname == "/dashboard" && " text-primary font-bold"
          }`}
        >
          DashBoard
        </li>
        <li
          className={`cursor-pointer hover:text-primary hover:font-bold transition-all ${
            pathname == "/dashboard/questions" && " text-primary font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`cursor-pointer hover:text-primary hover:font-bold transition-all ${
            pathname == "/dashboard/upgrade" && " text-primary font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`cursor-pointer hover:text-primary hover:font-bold transition-all ${
            pathname == "/dashboard/howitworks" && " text-primary font-bold"
          }`}
        >
          How it works
        </li>
      </ul>
      <UserButton showName />
    </div>
  );
};
