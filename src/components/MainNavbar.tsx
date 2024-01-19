import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MainNavbar = () => {
  const { data: session } = useSession();

  let initMenu: any[] = [];

  if (Number(session?.user?.roleId) == 1) {
    initMenu = [
      {
        id: 1,
        name: "Profile",
        url: "/profile",
      },
      {
        id: 2,
        name: "Dashboard",
        url: "/dashboard",
      },
      {
        id: 3,
        name: "Absensi",
        url: "/absensi",
      },
      {
        id: 4,
        name: "Settings",
        url: "/setting",
      },
    ];
  } else {
    initMenu = [
      {
        id: 1,
        name: "Profile",
        url: "/profile",
      },
      {
        id: 2,
        name: "Dashboard",
        url: "/dashboard",
      },
      {
        id: 3,
        name: "Absensi",
        url: "/absensi",
      },
    ];
  }

  const [menus, setMenus] = useState<any[]>(initMenu);

  return (
    <Navbar className="bg-[#242526] border-b border-[#414344] fixed w-full">
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
              <Link href={data.url} key={index} className="text-gray-300">
                {data.name}
              </Link>
            ))
          : null}
        <Navbar.Link onClick={() => signOut()} className="cursor-pointer text-gray-300">Sign Out</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
