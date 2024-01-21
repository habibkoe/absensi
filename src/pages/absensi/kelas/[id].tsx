import AppLayout from "@/components/AppLayout";
import CardMenu from "@/components/Attribute/CardMenu";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import { getOneData } from "@/services/classRoomService";
import { getAllData } from "@/services/periodeService";
import { ClassRooms, Periode } from "@prisma/client";
import { Card } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AbsensiKelasPage = () => {
  const router = useRouter();

  let kelasId = router.query.id;

  const [dataPeriode, setDataPeriode] = useState<Periode[]>([]);
  const [dataKelas, setDataKelas] = useState<ClassRooms>();

  const getKelas = async () => {
    try {
      let datas = await getOneData(Number(kelasId));
      setDataKelas(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataPeriode(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getKelas();
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Absensi Kelas`}</title>
      </Head>

      {dataPeriode !== null && dataPeriode.length > 0 ? (
        <div className="w-full">
          <div className="text-gray-300">
            Anda telah memilih kelas: {dataKelas?.name}
          </div>
          <div className="text-gray-300">
            Silahkan pilih periode tahun ajaran untuk melakukan absensi
          </div>
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            {dataPeriode.map((data, index) => (
              <CardMenu
                href={`/absensi/periode/${kelasId}/${data.id}`}
                key={index}
                subTitle={`TA ${data.periodeStart} - ${data.periodeEnd}`}
              >
                {data.name}
              </CardMenu>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-red-500">
          Periode belm di setting, silahkan setting pada menu setting
        </div>
      )}
    </>
  );
};

AbsensiKelasPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Absensi Kelas">{content}</AppLayout>;
};

export default AbsensiKelasPage;
