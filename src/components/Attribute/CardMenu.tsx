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
      <Card className="w-full md:h-36 hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
        <h5 className="text-2xl font-semibold tracking-tight text-[#DADCE1]">
          {props.children}
        </h5>
        <p className="font-normal text-[#DADCE1]">{props.subTitle}</p>
      </Card>
    </Link>
  );
};

export default CardMenu;
