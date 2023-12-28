import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { Card } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const SettingPage = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <Card className="w-full md:w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Settings
            </h5>
            <MainMenu />
          </div>
        </div>

        <div className="w-full">
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            <Link href="/setting/periode">
              <Card className="w-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Master <br /> Periode
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Setting Tahun Ajaran
                </p>
              </Card>
            </Link>

            <Link href="/setting/kelas">
              <Card className="w-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Master <br /> Kelas
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Setting Master Kelas
                </p>
              </Card>
            </Link>

            <Link href="/setting/mapel">
              <Card className="w-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Master <br /> Mata Pelajaran
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Setting Master Pelajaran
                </p>
              </Card>
            </Link>
            <Link href="/setting/siswa">
              <Card className="w-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Master <br /> Siswa
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Setting Master Siswa
                </p>
              </Card>
            </Link>
            <Link href="/setting/siswa-kelas">
              <Card className="w-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Master Kelas <br /> Siswa
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Setting Kelas Siswa
                </p>
              </Card>
            </Link>

            
          </div>
        </div>
      </Card>
    </>
  );
};

SettingPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default SettingPage;
