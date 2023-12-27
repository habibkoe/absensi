import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string
}
const BottomInfo = (props: Props) => {
  return (
    <>
      <span className="text-xs text-gray-500 font-semibold">{props.children}</span>
    </>
  );
};

export default BottomInfo;
