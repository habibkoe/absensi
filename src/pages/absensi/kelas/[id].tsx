import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
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
        <title>Absensi Kelas</title>
      </Head>

      <Card className="w-full md:w-3/6  p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Absensi Kelas
            </h5>
            <MainMenu />
          </div>
        </div>

        {dataPeriode !== null && dataPeriode.length > 0 ? (
          <div className="w-full">
            <div className="text-gray-900">Anda telah memilih kelas: {dataKelas?.name}</div>
            <div className="text-gray-900">Silahkan pilih periode tahun ajaran untuk melakukan absensi</div>
            <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
              {dataPeriode.map((data, index) => (
                <Link href={`/absensi/periode/${kelasId}/${data.id}`} key={data.id}>
                  <Card className="w-full">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {data.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      TA {data.periodeStart} - {data.periodeEnd}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-red-500">Periode belm di setting, silahkan setting pada menu setting</div>
        )}
      </Card>
    </>
  );
};

AbsensiKelasPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default AbsensiKelasPage;
