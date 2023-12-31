import AppLayout from "@/components/AppLayout";
import SelectJamPelajaran from "@/components/DataComponents/SelectJamPelajaran";
import SelectMapel from "@/components/DataComponents/SelectMapel";
import SelectSemester from "@/components/DataComponents/SelectSemester";
import SelectStatusAbsen from "@/components/DataComponents/SelectStatusAbsen";
import MainMenu from "@/components/MainMenu";
import { getOneData } from "@/services/classRoomService";
import { getOneData as getOneDataPeriode } from "@/services/periodeService";
import { getOneData as getOneDataUser } from "@/services/userService";
import { getDataByClassAndPeriode } from "@/services/studentRoomService";
import { ClassRooms, Periode, Users } from "@prisma/client";
import { Button, Card, Datepicker, Label, Table, Toast } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { postData } from "@/services/absensiService";
import { HiCheck } from "react-icons/hi";

export interface NewForm {
  userId: number;
  classRoomId: number;
  studentId: number;
  mapelId: number;
  jamPelajaran: number;
  semester: number;
  absensiType: string;
  infoTambahan: boolean;
  absensiDate: any;
  pertemuan: number;
}


const AbsensiPeriodePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  let initialState: NewForm = {
    userId: 0,
    classRoomId: 0,
    studentId: 0,
    mapelId: 0,
    jamPelajaran: 0,
    semester: 0,
    absensiType: "",
    infoTambahan: false,
    absensiDate: undefined,
    pertemuan: 0,
  };

  const { params } = router.query;

  let kelasId = params ? params[0] : null;
  let periodeId = params ? params[1] : null;

  const [dataKelas, setDataKelas] = useState<ClassRooms>();
  const [dataMapel, setDataMapel] = useState<any>();
  const [dataDate, setDataDate] = useState<any>();
  const [dataJamPelajaran, setJamPelajaran] = useState<any>();
  const [dataSemester, setSemester] = useState<any>();
  const [dataPeriode, setDataPeriode] = useState<Periode>();
  const [dataUser, setDataUser] = useState<Users>();
  const [dataKelasSiswa, setDataKelasSiswa] = useState<any[]>([]);
  const [dataAbsensi, setDataAbsensi] = useState<any[]>([]);

  const [currentId, setCurrentId] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState("");

  const datePickerHandler = (params: any) => {
    console.log("masuk sini nggak ", params);

    let newDate = format(new Date(params), "dd/MM/yyyy");

    setDataDate(newDate);
    console.log("masuk sini nggak new date ", newDate);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const { indexdata } = e.target.dataset;

    if (name == "mapelId") {
      setDataMapel(Number(value));
    }

    if (name == "jamPelajaran") {
      setJamPelajaran(Number(value));
    }

    if (name == "semester") {
      setSemester(Number(value));
    }

    if (name == "absensiType") {
      setDataAbsensi((prevFriends) => [
        ...prevFriends,
        { id: indexdata, status: value },
      ]);
    }
  };

  const getData = async () => {
    try {
      let datas = await getDataByClassAndPeriode(
        Number(kelasId),
        Number(periodeId)
      );

      setDataKelasSiswa(datas.data);

      let kelas = await getOneData(Number(kelasId));
      setDataKelas(kelas.data);

      let periode = await getOneDataPeriode(Number(periodeId));
      setDataPeriode(periode.data);

      let guru = await getOneDataUser(Number(session?.user?.id));
      setDataUser(guru.data);

      console.log("ada nggak ni ", datas);
    } catch (error) {
      console.error(error);
    }
  };


  const saveData =async () => {

    console.log("ini isinya apa ", dataAbsensi)
    
    if(dataAbsensi.length > 0) {

      let arrData : NewForm[] = []

      dataAbsensi.map((data, index) => {
        arrData.push({
          userId: Number(session?.user?.id),
          classRoomId: Number(kelasId),
          studentId: Number(data.id),
          mapelId: Number(kelasId),
          jamPelajaran: dataJamPelajaran,
          semester: dataSemester,
          absensiType: data.status,
          infoTambahan: false,
          absensiDate: new Date(format(new Date(dataDate), "yyyy-dd-MM HH:mm:ss")),
          pertemuan: 0
        })
      })

      console.log("check data ", JSON.stringify(arrData))

      let store = await postData(JSON.stringify(arrData));

      if (store.data) {
        setCurrentId(0);
        getData();
        setShowToast(true);
        setShowToastMessage("Berhasil simpan data");
      } else {
        setShowToast(true);
        setShowToastMessage("Gagal simpan data");
        console.error("Failed to post data");
      }
    }
  }
  useEffect(() => {
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
                  <span className="font-medium text-sm">Kelas</span> <br />
                  {dataKelas?.name}
                </div>
                <div className="text-gray-900">
                  <span className="font-medium text-sm">Periode</span> <br />
                  {dataPeriode?.name}
                </div>
                <div className="text-gray-900">
                  <span className="font-medium text-sm">Guru</span> <br />
                  {dataUser?.firstName} {dataUser?.lastName}
                </div>
              </div>
              <div>
                <div>
                  <SelectMapel
                    value={dataMapel}
                    typeData={1}
                    handleChange={handleInputChange}
                    userId={Number(session?.user?.id)}
                  />
                </div>
                <div>
                  <SelectJamPelajaran
                    value={dataJamPelajaran}
                    handleChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="absensiDate" value="Tanggal Absensi" />
                  </div>
                  <Datepicker
                    name="absensiDate"
                    language="ID"
                    value={dataDate}
                    showTodayButton={false}
                    showClearButton={true}
                    onSelectedDateChanged={(date) => datePickerHandler(date)}
                    color="gray"
                  />
                </div>
                <div>
                  <SelectSemester
                    value={dataSemester}
                    handleChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>NIS</Table.HeadCell>
                  <Table.HeadCell>Nama Siswa</Table.HeadCell>
                  <Table.HeadCell>JK</Table.HeadCell>

                  <Table.HeadCell>Status Kehadiran</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {dataKelasSiswa.map((data, index) => (
                    <Table.Row
                      key={"as" + index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{data.student.nis}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {data.student.firstName} {data.student.lastName}
                      </Table.Cell>
                      <Table.Cell>{data.student.gender}</Table.Cell>

                      <Table.Cell>
                        <SelectStatusAbsen
                          indexData={data.student.id}
                          value={data.absensiType}
                          handleChange={handleInputChange}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Button onClick={saveData} outline gradientDuoTone="purpleToPink">
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-red-500">Data siswa belum ada</div>
        )}
      </Card>
      {showToast ? (
        <Toast className="mb-10 fixed bottom-2 right-10">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{showToastMessage}</div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      ) : null}
    </>
  );
};

AbsensiPeriodePage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default AbsensiPeriodePage;
