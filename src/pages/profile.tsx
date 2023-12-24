import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { getOne } from "@/services/userService";
import { Users } from "@prisma/client";
import { Card } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {

  const [userData, setUserData] = useState<Users>()


  const getData = async () => {
    let user = await getOne(1);

    setUserData(user.data)
  }

  useEffect(() => {
    getData();
  }, [])
  

  return (
    <>
      <Head>
        <title>Profile {userData?.firstName} {userData?.lastName}</title>
      </Head>

      <Card className="w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Profile {userData?.firstName} {userData?.lastName}
            </h5>
            <MainMenu />
          </div>
        </div>
        <div className="w-full text-black">
        {userData?.firstName} {userData?.lastName}

        {userData?.email}
        {userData?.categoryTeacher}
        {userData?.rating}
        {userData?.typeOfStudy}
        {userData?.typeTeacher}
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

ProfilePage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default ProfilePage;
