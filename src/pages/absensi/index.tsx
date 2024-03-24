import AppLayout from "@/components/AppLayout";
import CardMenu from "@/components/Attribute/CardMenu";
import { useUserRoomPostByUserData } from "@/hooks/userHook";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const AbsensiPage = () => {
  const { data: session } = useSession();

  const {
    isPending: isPeriodeLoading,
    error: isPeriodeError,
    data: dataKelas,
  } = useUserRoomPostByUserData(Number(session?.user?.id));

  console.log("check data ", dataKelas);
  return (
    <>
      <Head>
        <title>Absensi</title>
      </Head>

      {dataKelas !== undefined ? (
        <div className="w-full">
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            {dataKelas.map((data, index) => (
              <CardMenu
                href={`/absensi/kelas/${data.classRoom.id}`}
                key={index}
                subTitle={`Info terkait ${data.classRoom.name}`}
              >
                {data.classRoom.name}
              </CardMenu>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-red-500">
          Kelas belum di setting, silahkan setting pada menu profile
        </div>
      )}
    </>
  );
};

AbsensiPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Absensi">{content}</AppLayout>;
};

export default AbsensiPage;
