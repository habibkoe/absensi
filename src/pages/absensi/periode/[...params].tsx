import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { getOneData } from "@/services/classRoomService";
import { getOneData as getOneDataPeriode } from "@/services/periodeService";
import { getDataByClassAndPeriode } from "@/services/studentRoomService";
import { ClassRooms, Periode } from "@prisma/client";
import { Card, Table } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AbsensiPeriodePage = () => {
  const router = useRouter();

  const { params } = router.query;

  let kelasId = params ? params[0] : null;
  let periodeId = params ? params[1] : null;

  const [dataKelas, setDataKelas] = useState<ClassRooms>();
  const [dataPeriode, setDataPeriode] = useState<Periode>();
  const [dataKelasSiswa, setDataKelasSiswa] = useState<any[]>([]);

  const getParentData = async () => {
    try {
      let kelas = await getOneData(Number(kelasId));
      setDataKelas(kelas.data);

      let periode = await getOneDataPeriode(Number(periodeId));
      setDataPeriode(periode.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      let datas = await getDataByClassAndPeriode(
        Number(kelasId),
        Number(periodeId)
      );

      console.log("ada nggak ni ", datas);
      setDataKelasSiswa(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getParentData();
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>Absensi Kelas Siswa</title>
      </Head>
      <Card className="w-full md:w-3/6  p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Absensi Kelas Siswa
            </h5>
            <MainMenu />
          </div>
        </div>

        {dataKelasSiswa !== null && dataKelasSiswa.length > 0 ? (
          <div className="w-full">
            <div className="text-gray-900">Kelas: {dataKelas?.name}</div>
            <div className="text-gray-900">Periode: {dataPeriode?.name}</div>
            <div className="text-gray-900">Silahkan lakukan absensi online</div>
            <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>Nama Siswa</Table.HeadCell>
                    <Table.HeadCell>JK</Table.HeadCell>
                    <Table.HeadCell>NIS</Table.HeadCell>
                    <Table.HeadCell>Alamat</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {dataKelasSiswa.map((data, index) => (
                      <Table.Row
                        key={"as" + index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {data.student.firstName} {data.student.lastName}
                        </Table.Cell>
                        <Table.Cell>{data.student.gender}</Table.Cell>
                        <Table.Cell>{data.student.nis}</Table.Cell>
                        <Table.Cell>{data.student.address}</Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-wrap gap-4 w-full">
                            <a
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                            >
                              Hapus
                            </a>
                            <a
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                            >
                              Detail
                            </a>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
          </div>
        ) : (
          <div>Data siswa belum ada</div>
        )}
      </Card>
    </>
  );
};

AbsensiPeriodePage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default AbsensiPeriodePage;
