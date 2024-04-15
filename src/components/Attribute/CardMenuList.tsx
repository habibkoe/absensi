import { Badge, Card } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { HiCheck, HiOutlineChevronRight } from "react-icons/hi";

interface Props {
  children?: React.ReactNode;
  href: string;
  subTitle?: string;
  icon?: any;
  isActive?:any
}

const CardMenuList = (props: Props) => {
  return (
    <Card className={`w-full ${props.isActive ? 'border-orange-400 border-2' : 'border-gray-200 border'} dark:hover:bg-[#57585a] dark:bg-[#3A3B3C] dark:border-[#3A3B3C] bg-white hover:bg-gray-50`}>
      <Link href={props.href} className="w-full">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-4 items-center">
              <div className="basis-1/12 text-2xl dark:text-white text-gray-900">{props.icon}</div>
              <div className="flex flex-col">
                <h5 className="text-sm font-semibold tracking-tight dark:text-[#DADCE1] text-gray-900 flex justify-start gap-2 items-center">
                  {props.children} {props.isActive ? <Badge color="success" icon={HiCheck}>Aktif</Badge>  : null}
                </h5>
                <p className="flex items-center gap-2 font-normal text-xs dark:text-[#DADCE1] text-gray-900">
                  <span>{props.subTitle}</span> 
                </p>
              </div>
          </div>
          <div className="dark:text-white text-gray-900">
            <HiOutlineChevronRight />
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CardMenuList;
