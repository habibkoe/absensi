import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const GuestLayout = ({ children }: Props) => {
  return <div className="w-full h-screen">{children}</div>;
};

export default GuestLayout;
