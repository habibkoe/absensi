import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const DashboardPage = () => {
  const { data: session } = useSession();

  console.log("ini data apa ", session)

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Card className="w-full md:w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h5>
            <MainMenu />
          </div>
        </div>

        <div className="w-full">
          <div className="text-gray-900">Hi {session?.user?.username}!</div>
        </div>

        <div className="w-full">
          <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
            <Card href="#" className="w-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Alpha
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                10 Info terkait status alpha
              </p>
            </Card>
            <Card href="#" className="w-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Bolos
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                22 Info terkait status bolos
              </p>
            </Card>
            <Card href="#" className="w-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sakit
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                14 Info terkait sakit
              </p>
            </Card>
            <Card href="#" className="w-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Izin
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                16 Info terkait izin
              </p>
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
};

DashboardPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default DashboardPage;
