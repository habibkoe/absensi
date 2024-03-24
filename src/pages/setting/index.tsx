import AppLayout from "@/components/AppLayout";
import CardMenu from "@/components/Attribute/CardMenu";
import CardMenuList from "@/components/Attribute/CardMenuList";
import { siteConfig } from "@/libs/config";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

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

      <div className="w-full space-y-6">
          <CardMenuList href="/setting/periode" subTitle="Setting tahun ajaran">
            Master Periode
          </CardMenuList>
          <CardMenuList href="/setting/kelas" subTitle="Setting master kelas">
            Master Kelas
          </CardMenuList>
          <CardMenuList href="/setting/mapel" subTitle="Setting mata pelajaran">
            Master Mata Pelajaran
          </CardMenuList>
          <CardMenuList href="/setting/siswa" subTitle="Setting master siswa">
            Master Siswa
          </CardMenuList>
          <CardMenuList href="/setting/siswa-kelas" subTitle="Setting kelas siswa">
            Master Kelas Siswa
          </CardMenuList>
          <CardMenuList href="/setting/users" subTitle="Setting users">
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
