import { Card, Dropdown } from "flowbite-react";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface Props {
  children?: React.ReactNode;
  subTitle?: string;
  icon?: any;
}

const CardList = (props: Props) => {
  return (
    <div className="flex w-full items-center justify-between bg-[#242526] border-b border-[#242526] hover:border-[#4f5052] py-2">
      <div className="flex gap-4 items-center">
        <div className="basis-1/12 text-2xl border rounded-full border-gray-400 p-2">{props.icon}</div>
        <div className="flex flex-col">
          <div>{props.children}</div>
          <p className="font-normal text-xs text-[#DADCE1]">{props.subTitle}</p>
        </div>
      </div>
      <div>
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <div className="border rounded-full border-[#4f5052] p-2 bg-[#4f5052] cursor-pointer">
              <HiOutlineDotsHorizontal />
            </div>
          )}
        >
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default CardList;
