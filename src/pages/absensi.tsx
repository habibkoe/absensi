import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { Card } from "flowbite-react";
import Head from "next/head";
import React from "react";

const AbsensiPage = () => {
  return (
    <>
      <Head>
        <title>Absensi</title>
      </Head>

      <Card className="w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Absensi
            </h5>
            <MainMenu />
          </div>
        </div>

        <div className="w-full">
          <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
            <Card href="#" className="w-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Kelas A
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Info terkait kelas A
              </p>
            </Card>
            <Card href="#" className="w-full">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Kelas B
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Info terkait kelas B
              </p>
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
};

AbsensiPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default AbsensiPage;
