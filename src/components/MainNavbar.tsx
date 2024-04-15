import { Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  HiFingerPrint,
  HiLogout,
  HiOutlineCog,
  HiOutlineUser,
  HiTemplate,
} from "react-icons/hi";

const MainNavbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  let arrPath = pathname.split("/");
  let realPath = "/"+arrPath[1];

  // console.log("ini apa real A ", arrPath);
  // console.log("ini apa real ", realPath);

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
        icon: <HiFingerPrint />,
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
        icon: <HiFingerPrint />,
      },
    ];
  }

  const [menus, setMenus] = useState<any[]>(initMenu);

  // console.log("active ", pathname);
  return (
    <Navbar className="dark:bg-[#242526] bg-white border-gray-100 border-b dark:border-[#414344] fixed w-full py-1.5">
      <Navbar.Brand href="/dashboard" className="flex gap-4">
        <Image
          src="/images/icons/icon-72x72.png"
          className="h-8"
          width={32}
          height={30}
          alt="Go Absensi"
        />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Go Absensi
        </span> */}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {menus.length > 0
          ? menus.map((data, index) => (
              <Link
                href={data.url}
                key={index}
                className={`${
                  data.url == realPath ? "text-orange-500" : "dark:text-gray-300 text-gray-900"
                } border-b dark:border-gray-700 md:border-b-0 py-2 md:py-0 md:text-2xl md:rounded-full dark:md:bg-[#3A3B3C] md:bg-gray-200 hover:bg-gray-300 md:p-2 md:flex md:items-center md:justify-center dark:hover:bg-[#5c5d5f] flex items-center gap-2`}
                title={data.name}
              >
                {data.icon !== null ? data.icon : data.name}{" "}
                <span className="md:hidden">{data.name}</span>
              </Link>
            ))
          : null}
        <button
          onClick={() => signOut()}
          className="cursor-pointer dark:text-gray-300 text-gray-900 py-2 md:text-2xl md:rounded-full md:bg-gray-200 hover:bg-gray-300 dark:md:bg-[#3A3B3C] md:p-2 md:flex md:items-center md:justify-center dark:hover:bg-[#5c5d5f] flex items-center gap-2"
          title="Sign Out"
        >
          <HiLogout /> <span className="md:hidden">Sign Out</span>
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
