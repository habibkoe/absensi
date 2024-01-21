import React, { MouseEvent } from "react";

interface Props {
  children?: React.ReactNode;
  title?: string;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton = (props: Props) => {
  return (
    <button
      title={props.title}
      onClick={props.handleClick}
      className="font-medium text-xl text-white hover:underline dark:text-cyan-500 cursor-pointer bg-gray-700 p-1.5 rounded-full hover:bg-gray-600"
    >
      {props.children}
    </button>
  );
};

export default ActionButton;
