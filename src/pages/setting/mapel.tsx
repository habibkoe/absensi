import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { Card } from "flowbite-react";
import Head from "next/head";
import React from "react";

const MapelPage = () => {
  return (
    <>
      <Head>
        <title>MapelPage</title>
      </Head>

        <Card className="w-3/6 p-3 bg-white mx-auto">
          <div className="w-full">
            <div className="flex justify-between">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                MapelPage
              </h5>
              <MainMenu />
            </div>
          </div>

          <div className="w-full">
            <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
              <Card href="#" className="w-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Master Siswa
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Info terkait kelas A
                </p>
              </Card>
              <Card href="#" className="w-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Master Kelas
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Info terkait kelas B
                </p>
              </Card>
              <Card href="#" className="w-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Master Mata Pelajaran
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

MapelPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default MapelPage;
