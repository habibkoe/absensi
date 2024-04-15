import AppLayout from "@/components/AppLayout";
import CardMenu from "@/components/Attribute/CardMenu";
import CardMenuList from "@/components/Attribute/CardMenuList";
import { usePostById } from "@/hooks/userHook";
import { siteConfig } from "@/libs/config";
import { Button, Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React from "react";
import {
  HiDocumentReport,
  HiFingerPrint,
  HiOutlineBookOpen,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    isPending: isPeriodeLoading,
    error: isPeriodeError,
    data: userData,
  } = usePostById(Number(session?.user?.id));

  const editProfile = () => {
    router.push("/profile/edit");
  };

  return (
    <>
      <Head>
        <title>
          {`${siteConfig.title} : Profile ${userData?.firstName} ${userData?.lastName}`}
        </title>
      </Head>

      <div className="w-full space-y-4">
        <div className="flex gap-4">
          <div className="border rounded-full p-5 w-28 h-28">test</div>
          <div>
            <p className="font-normal dark:text-[#DADCE1] text-gray-900">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className="font-normal dark:text-[#DADCE1] text-gray-900">{userData?.email}</p>
            <p className="font-normal dark:text-[#DADCE1] text-gray-900" onClick={editProfile}>
              @{userData?.username}
            </p>
            <Button
              onClick={editProfile}
              gradientDuoTone="pinkToOrange"
              size="sm"
            >
              Update
            </Button>
          </div>
        </div>
        <div>
          <div className="w-full space-y-2">
            {Number(session?.user?.roleId) !== 1 ? (
              <>
                <CardMenuList
                  icon={<HiOutlineOfficeBuilding />}
                  href="/profile/kelas"
                  subTitle="Kelas yang diampu oleh saya"
                >
                  Kelas Saya
                </CardMenuList>
                <CardMenuList
                  icon={<HiOutlineBookOpen />}
                  href="/profile/mapel"
                  subTitle="Mata pelajaran yang diajarkan pada sekolah"
                >
                  Mata Pelajaran Saya
                </CardMenuList>
              </>
            ) : null}

            <CardMenuList
              icon={<HiFingerPrint />}
              href="/absensi"
              subTitle="Fitur absensi"
            >
              Absensi
            </CardMenuList>
            <CardMenuList
              icon={<HiDocumentReport />}
              href="/absensi/report"
              subTitle="Report Absensi"
            >
              Report
            </CardMenuList>
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
