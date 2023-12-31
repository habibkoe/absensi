import { Dropdown } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { siteConfig } from "@/libs/config";
import { signOut } from "next-auth/react";

const MainMenu = () => {
  return (
    <div>
      <Dropdown
        label={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        }
        dismissOnClick={false}
        placement="left-start"
        arrowIcon={false}
      >
        {siteConfig.menu.length > 0
          ? siteConfig.menu.map((data, index) => (
              <Dropdown.Item key={data.id}>
                <Link href={data.url} className="w-full text-left h-full">
                  {data.name}
                </Link>
              </Dropdown.Item>
            ))
          : null}
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default MainMenu;
