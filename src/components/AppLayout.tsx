import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return <div className="w-full h-screen p-5">{children}</div>;
};

export default AppLayout;
