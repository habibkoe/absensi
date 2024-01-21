import AppLayout from "@/components/AppLayout";
import CardMenu from "@/components/Attribute/CardMenu";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
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
          {`${siteConfig.title} : Profile ${userData?.firstName} ${userData?.lastName}`}
        </title>
      </Head>

      <div className="w-full">
        <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
          <div>
            <Card
              href="#"
              className="w-full text-center hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]"
            >
              <div className="border rounded-full p-5 w-40 h-40 mx-auto">
                test
              </div>
              <p className="font-normal text-[#DADCE1]">
                Email: {userData?.email}
              </p>
              <p className="font-normal text-[#DADCE1]">
                Username: {userData?.username}
              </p>
              <Button
                onClick={editProfile}
                gradientDuoTone="pinkToOrange"
                size="sm"
              >
                Update
              </Button>
            </Card>
          </div>
          <div>
            <div className="grid gap-4 md:grid-cols-2">
              <CardMenu href="/profile/kelas" subTitle="Kelas didikan">
                Kelas
              </CardMenu>
              <CardMenu href="/profile/mapel" subTitle="Info mapel yang diampu">
                Mapel
              </CardMenu>
              <CardMenu href="/absensi" subTitle="Fitur absensi">
                Absensi
              </CardMenu>
              <CardMenu href="/absensi/report" subTitle="Report Absensi">
                Report
              </CardMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProfilePage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Profile">{content}</AppLayout>;
};

export default ProfilePage;
