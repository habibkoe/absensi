import { Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import MainMenu from "./MainMenu";

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
    return <>Loading app...</>;
  }

  return authorized ? (
    <div className="w-full h-screen p-1 md:p-5 bg-black">
      <Card className="w-full md:w-3/6 bg-[#242526] mx-auto border-[#242526]">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1] dark:text-white">
              {headMenu}
            </h5>
            <MainMenu />
          </div>
        </div>
        {children}
      </Card>
    </div>
  ) : (
    <></>
  );
};

export default AppLayout;
