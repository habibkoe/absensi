import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { getByUserData } from "@/services/userRoomService";
import { Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AbsensiPage = () => {
  const { data: session } = useSession();

  const [dataKelas, setDataKelas] = useState<any[]>([]);

  const getData = async () => {
    try {
      let datas = await getByUserData(Number(session?.user?.id));

      console.log("ada nggak ni ", datas);
      setDataKelas(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>Absensi</title>
      </Head>

      {dataKelas !== null && dataKelas.length > 0 ? (
        <div className="w-full">
          <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
            {dataKelas.map((data, index) => (
              <Link href={`/absensi/kelas/${data.classRoom.id}`} key={index}>
                <Card className="w-full hover:bg-[#57585a] bg-[#3A3B3C] border-[#3A3B3C]">
                  <h5 className="text-2xl font-bold tracking-tight text-[#DADCE1]">
                    {data.classRoom.name}
                  </h5>
                  <p className="font-normal text-[#DADCE1]">
                    Info terkait {data.classRoom.name}
                  </p>
                </Card>
              </Link>
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
