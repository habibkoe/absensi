import AppLayout from "@/components/AppLayout";
import SelectJamPelajaran from "@/components/DataComponents/SelectJamPelajaran";
import SelectMapel from "@/components/DataComponents/SelectMapel";
import SelectPertemuan from "@/components/DataComponents/SelectPertemuan";
import SelectSemester from "@/components/DataComponents/SelectSemester";
import SelectStatusAbsen from "@/components/DataComponents/SelectStatusAbsen";
import MainMenu from "@/components/MainMenu";
import { getOneData } from "@/services/classRoomService";
import { getOneData as getOneDataPeriode } from "@/services/periodeService";
import { getDataByClassAndPeriode } from "@/services/studentRoomService";
import { ClassRooms, Periode } from "@prisma/client";
import { Card, Table } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AbsensiPeriodePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { params } = router.query;

  let kelasId = params ? params[0] : null;
  let periodeId = params ? params[1] : null;

  const [dataKelas, setDataKelas] = useState<ClassRooms>();
  const [dataPeriode, setDataPeriode] = useState<Periode>();
  const [dataKelasSiswa, setDataKelasSiswa] = useState<any[]>([]);
  const [dataMapel, setDataMapel] = useState<any[]>([]);

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
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-gray-900">
                  <b>Kelas:</b> <br />
                  {dataKelas?.name}
                </div>
                <div className="text-gray-900">
                  <b>Periode:</b> <br />
                  {dataPeriode?.name}
                </div>
              </div>
              <div>
                <div>
                  <SelectMapel
                    typeData={1}
                    userId={Number(session?.user?.id)}
                  />
                </div>
                <div>
                  <SelectJamPelajaran />
                </div>
              </div>
              <div>
                <div>
                  <SelectPertemuan />
                </div>
                <div>
                  <SelectSemester />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Nama Siswa</Table.HeadCell>
                  <Table.HeadCell>JK</Table.HeadCell>
                  <Table.HeadCell>NIS</Table.HeadCell>
                  <Table.HeadCell>Alamat</Table.HeadCell>
                  <Table.HeadCell>Status Kehadiran</Table.HeadCell>
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
                        <SelectStatusAbsen />
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
