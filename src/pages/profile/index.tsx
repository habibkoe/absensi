import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { getOneData } from "@/services/userService";
import { Users } from "@prisma/client";
import { Button, Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<Users>();

  const { data: session } = useSession();

  const getData = async () => {
    let user = await getOneData(Number(session?.user?.id));

    setUserData(user.data);
  };

  const editProfile = () => {
    router.push("/profile/edit");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>
          Profile {userData?.firstName} {userData?.lastName}
        </title>
      </Head>

      <Card className="w-full md:w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Profile
            </h5>
            <MainMenu />
          </div>
        </div>
        <div className="w-full">
          <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
            <div>
              <Card href="#" className="w-full text-center">
                <div className="border rounded-full p-5 w-40 h-40 mx-auto">
                  test
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Email: {userData?.email}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Username: {userData?.username}
                </p>
                <Button
                  onClick={editProfile}
                  outline
                  gradientDuoTone="purpleToPink"
                  size="sm"
                >
                  Update
                </Button>
              </Card>
            </div>
            <div>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/profile/kelas">
                  <Card className="w-full">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Kelas
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Kelas didikan
                    </p>
                  </Card>
                </Link>
                <Link href="/profile/mapel">
                  <Card className="w-full">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Mapel
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Info mapel yang diampu
                    </p>
                  </Card>
                </Link>
                <Link href="/absensi">
                  <Card className="w-full">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Absensi
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Fitur absensi
                    </p>
                  </Card>
                </Link>

                <Card href="#" className="w-full">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Report
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Report Absensi
                  </p>
                </Card>
              </div>
            </div>
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
