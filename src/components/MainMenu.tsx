import { Dropdown } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { siteConfig } from "@/libs/config";

const MainMenu = () => {
  return (
    <div>
      <Dropdown label="Main Menu" dismissOnClick={false} placement="left-start">
        {siteConfig.menu.length > 0
          ? siteConfig.menu.map((data, index) => (
              <Dropdown.Item key={data.id}>
                <Link href={data.url} className="w-full text-left">
                  {data.name}
                </Link>
              </Dropdown.Item>
            ))
          : null}
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default MainMenu;
