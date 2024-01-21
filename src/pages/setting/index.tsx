import AppLayout from "@/components/AppLayout";
import CardMenu from "@/components/Attribute/CardMenu";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import { Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
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

      <div className="w-full">
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
          <CardMenu href="/setting/periode" subTitle="Setting tahun ajaran">
            Master <br /> Periode
          </CardMenu>
          <CardMenu href="/setting/kelas" subTitle="Setting master kelas">
            Master <br /> Kelas
          </CardMenu>
          <CardMenu href="/setting/mapel" subTitle="Setting mata pelajaran">
            Master <br /> Mata Pelajaran
          </CardMenu>
          <CardMenu href="/setting/siswa" subTitle="Setting master siswa">
            Master <br /> Siswa
          </CardMenu>
          <CardMenu href="/setting/siswa-kelas" subTitle="Setting kelas siswa">
            Master <br /> Kelas Siswa
          </CardMenu>
          <CardMenu href="/setting/users" subTitle="Setting users">
            Master <br /> Users
          </CardMenu>
        </div>
      </div>
    </>
  );
};

SettingPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Settings">{content}</AppLayout>;
};

export default SettingPage;
