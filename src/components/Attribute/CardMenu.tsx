import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";

interface Props {
  children?: React.ReactNode;
  href: string;
  subTitle?: string;
}

const CardMenu = (props: Props) => {
  return (
    <Link href={props.href}>
      <Card className="w-full md:h-36 dark:hover:bg-[#57585a] dark:bg-[#3A3B3C] dark:border-[#3A3B3C] bg-white border-gray-300 hover:bg-gray-50">
        <h5 className="text-2xl font-semibold tracking-tight dark:text-[#DADCE1] text-gray-900">
          {props.children}
        </h5>
        <p className="font-normal dark:text-[#DADCE1] text-gray-700">
          {props.subTitle}
        </p>
      </Card>
    </Link>
  );
};

export default CardMenu;
