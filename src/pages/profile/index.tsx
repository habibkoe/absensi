import AppLayout from "@/components/AppLayout";
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
              <Card href="#" className="w-full text-center hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
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
                  <Card className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
                    <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
                      Kelas
                    </h5>
                    <p className="font-normal text-[#DADCE1]">
                      Kelas didikan
                    </p>
                  </Card>
                </Link>
                <Link href="/profile/mapel">
                  <Card className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
                    <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
                      Mapel
                    </h5>
                    <p className="font-normal text-[#DADCE1]">
                      Info mapel yang diampu
                    </p>
                  </Card>
                </Link>
                <Link href="/absensi">
                  <Card className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
                    <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
                      Absensi
                    </h5>
                    <p className="font-normal text-[#DADCE1]">
                      Fitur absensi
                    </p>
                  </Card>
                </Link>

                <Link href="/absensi/report">
                  <Card className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
                    <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
                      Report
                    </h5>
                    <p className="font-normal text-[#DADCE1]">
                      Report Absensi
                    </p>
                  </Card>
                </Link>
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
