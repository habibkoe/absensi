import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

interface Props {
  children?: React.ReactNode;
  href: string;
  subTitle?: string;
  icon?: any;
}

const CardMenuList = (props: Props) => {
  return (
    <Card className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
      <Link href={props.href} className="w-full">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-4 items-center">
              <div className="basis-1/12 text-2xl">{props.icon}</div>
              <div className="flex flex-col">
                <h5 className="text-sm font-semibold tracking-tight text-[#DADCE1] flex justify-between items-center">
                  {props.children}
                </h5>
                <p className="font-normal text-xs text-[#DADCE1]">
                  {props.subTitle}
                </p>
              </div>
          </div>
          <div>
            <HiOutlineChevronRight />
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CardMenuList;
