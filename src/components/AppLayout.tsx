import { Card, CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import MainMenu from "./MainMenu";
import MobileNavbar from "./MobileNavbar";
import MainNavbar from "./MainNavbar";

interface Props {
  children?: ReactNode;
  headMenu?: string;
}

const AppLayout = ({ children, headMenu }: Props) => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const authorized = sessionStatus === "authenticated";
  const unAuthorized = sessionStatus === "unauthenticated";
  const loading = sessionStatus === "loading";

  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady) return;

    // if the user is not authorized, redirect to the login page
    // with a return url to the current page
    if (unAuthorized) {
      console.log("not authorized");
      router.push({
        pathname: "/",
        query: { returnUrl: router.asPath },
      });
    }
  }, [loading, unAuthorized, sessionStatus, router]);

  // if the user refreshed the page or somehow navigated to the protected page
  if (loading) {
    return (
      <div className="w-full h-screen px-1 pt-16 md:px-5 bg-black flex justify-center items-center">
        <div className="bg-gray-700 text-white font-bold rounded-lg p-2">Loading app...</div>
      </div>
    );
  }

  return authorized ? (
    <Flowbite theme={{ theme: customTheme }}>
      <MainNavbar />
      <div className="w-full h-screen px-1 pt-16 md:px-5 bg-black">
        <Card className="w-full md:w-3/6 bg-[#242526] mx-auto border-[#242526]">
          <div className="w-full">
            <div className="flex justify-between">
              <h5 className="text-2xl font-semibold tracking-tight text-[#DADCE1] dark:text-white">
                {headMenu}
              </h5>
            </div>
          </div>
          {children}
        </Card>
      </div>
    </Flowbite>
  ) : (
    <></>
  );
};

const customTheme: CustomFlowbiteTheme = {
  textInput: {
    field: {
      base: "relative w-full",
      input: {
        base: "rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50",
        sizes: {
          sm: "sm:text-xs",
          md: "text-sm",
          lg: "sm:text-md",
        },
        colors: {
          gray: "bg-[#3A3B3C] border-gray-300 text-gray-300 focus:border-orange-400 focus:ring-orange-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          failure:
            "border-red-500 bg-[#3A3B3C] text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
          warning:
            "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
          success:
            "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
        },
      },
    },
  },
  select: {
    field: {
      base: "relative w-full",
      select: {
        base: "rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50",
        sizes: {
          sm: "sm:text-xs",
          md: "text-sm",
          lg: "sm:text-md",
        },
        colors: {
          gray: "bg-[#3A3B3C] border-gray-300 text-gray-300 focus:border-orange-400 focus:ring-orange-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          failure:
            "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
          warning:
            "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
          success:
            "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
        },
      },
    },
  },
  navbar: {
    collapse: {
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-2 md:text-sm md:font-medium",
    },
  },
};

export default AppLayout;
