import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";

interface Props {
  children?: React.ReactNode;
  href: string;
  subTitle?: string;
}

const CardMenuList = (props: Props) => {
  return (
    <Link href={props.href} className="w-full">
      <Card className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
        <h5 className="text-lg font-semibold tracking-tight text-[#DADCE1]">
          {props.children}
        </h5>
        <p className="font-normal text-[#DADCE1]">{props.subTitle}</p>
      </Card>
    </Link>
  );
};

export default CardMenuList;
