import React, { MouseEvent } from "react";
import { HiOutlinePlus } from "react-icons/hi";

interface Props {
  children?: React.ReactNode;
  title?: string;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AddButton = (props: Props) => {
  return (
    <button
      className="w-fit mb-4 flex gap-2 items-center text-blue-500"
      onClick={props.handleClick}
    >
      <span className="border border-blue-500 rounded-full p-1">
        <HiOutlinePlus />
      </span>{" "}
      {props.children}
    </button>
  );
};

export default AddButton;
