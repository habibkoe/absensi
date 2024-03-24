import AppLayout from "@/components/AppLayout";
import CardMenuList from "@/components/Attribute/CardMenuList";
import { siteConfig } from "@/libs/config";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import {
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineChevronRight,
  HiOutlineOfficeBuilding,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";

const SettingPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (Number(session?.user?.roleId) !== 1) {
    router.push("/dashboard");
  }
  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Settings`}</title>
      </Head>

      <div className="w-full space-y-2">
        <CardMenuList
          icon={<HiOutlineCalendar />}
          href="/setting/periode"
          subTitle="Setting tahun ajaran"
        >
          Master Periode
        </CardMenuList>
        <CardMenuList
          icon={<HiOutlineOfficeBuilding />}
          href="/setting/kelas"
          subTitle="Setting master kelas"
        >
          Master Kelas
        </CardMenuList>
        <CardMenuList
          icon={<HiOutlineBookOpen />}
          href="/setting/mapel"
          subTitle="Setting mata pelajaran"
        >
          Master Mata Pelajaran
        </CardMenuList>
        <CardMenuList
          icon={<HiOutlineUsers />}
          href="/setting/siswa"
          subTitle="Setting master siswa"
        >
          Master Siswa
        </CardMenuList>
        <CardMenuList
          icon={<HiOutlineUserGroup />}
          href="/setting/siswa-kelas"
          subTitle="Setting kelas siswa"
        >
          Master Kelas Siswa
        </CardMenuList>
        <CardMenuList
          icon={<HiOutlineUserCircle />}
          href="/setting/users"
          subTitle="Setting users"
        >
          Master Users
        </CardMenuList>
      </div>
    </>
  );
};

SettingPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Settings">{content}</AppLayout>;
};

export default SettingPage;
