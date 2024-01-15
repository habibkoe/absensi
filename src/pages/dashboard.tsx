import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import { Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const DashboardPage = () => {
  const { data: session } = useSession();

  console.log("ini data apa ", session);

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Dashboard`}</title>
      </Head>

      <div className="w-full">
        <div className="text-[#DADCE1]">Hi {session?.user?.username}!</div>
      </div>

      <div className="w-full">
        <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
          <Card href="#" className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
            <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
              Alpha
            </h5>
            <p className="font-normal text-[#DADCE1]">
              10 Info terkait status alpha
            </p>
          </Card>
          <Card href="#" className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
            <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
              Bolos
            </h5>
            <p className="font-normal text-[#DADCE1]">
              22 Info terkait status bolos
            </p>
          </Card>
          <Card href="#" className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
            <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
              Sakit
            </h5>
            <p className="font-normal text-[#DADCE1]">
              14 Info terkait sakit
            </p>
          </Card>
          <Card href="#" className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
            <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
              Izin
            </h5>
            <p className="font-normal text-[#DADCE1]">
              16 Info terkait izin
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

DashboardPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Dashboard">{content}</AppLayout>;
};

export default DashboardPage;
