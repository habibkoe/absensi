import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  HiLogout,
  HiOutlineCog,
  HiOutlineUser,
  HiTemplate,
} from "react-icons/hi";

const MainNavbar = () => {
  const { data: session } = useSession();

  let initMenu: any[] = [];

  if (Number(session?.user?.roleId) == 1) {
    initMenu = [
      {
        id: 1,
        name: "Profile",
        url: "/profile",
        icon: <HiOutlineUser />,
      },
      {
        id: 2,
        name: "Dashboard",
        url: "/dashboard",
        icon: <HiTemplate />,
      },
      {
        id: 3,
        name: "Absensi",
        url: "/absensi",
        icon: null,
      },
      {
        id: 4,
        name: "Settings",
        url: "/setting",
        icon: <HiOutlineCog />,
      },
    ];
  } else {
    initMenu = [
      {
        id: 1,
        name: "Profile",
        url: "/profile",
        icon: <HiOutlineUser />,
      },
      {
        id: 2,
        name: "Dashboard",
        url: "/dashboard",
        icon: <HiTemplate />,
      },
      {
        id: 3,
        name: "Absensi",
        url: "/absensi",
        icon: null,
      },
    ];
  }

  const [menus, setMenus] = useState<any[]>(initMenu);

  return (
    <Navbar className="bg-[#242526] border-b border-[#414344] fixed w-full py-1.5">
      <Navbar.Brand href="/" className="flex gap-4">
        <Image
          src="/images/icons/icon-72x72.png"
          className="h-8"
          width={32}
          height={30}
          alt="Go Absensi"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Absensi
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {menus.length > 0
          ? menus.map((data, index) => (
              <Link
                href={data.url}
                key={index}
                className="text-gray-300 md:text-xl md:rounded-full md:bg-[#3A3B3C] md:py-1 md:px-2 md:flex md:items-center md:justify-center hover:bg-[#5c5d5f]"
                title={data.name}
              >
                {data.icon !== null ? data.icon : data.name}
              </Link>
            ))
          : null}
        <button
          onClick={() => signOut()}
          className="cursor-pointer text-gray-300 md:text-xl md:rounded-full md:bg-[#3A3B3C] md:py-1 md:px-2 md:flex md:items-center md:justify-center hover:bg-[#5c5d5f]"
          title="Sign Out"
        >
          <HiLogout />
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
