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
import { siteConfig } from "@/libs/config";

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

  const saveData = async () => {
    console.log("ini isinya apa ", dataAbsensi);

    if (dataAbsensi.length > 0) {
      let arrData: NewForm[] = [];

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
          absensiDate: new Date(
            format(new Date(dataDate), "yyyy-dd-MM HH:mm:ss")
          ),
          pertemuan: 0,
        });
      });

      console.log("check data ", JSON.stringify(arrData));

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
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Absensi Kelas Siswa`}</title>
      </Head>
      {dataKelasSiswa !== null && dataKelasSiswa.length > 0 ? (
        <div className="w-full">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-gray-300">
                <span className="font-medium text-sm">Kelas</span> <br />
                {dataKelas?.name}
              </div>
              <div className="text-gray-300">
                <span className="font-medium text-sm">Periode</span> <br />
                {dataPeriode?.name}
              </div>
              <div className="text-gray-300">
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
                  <Label
                    htmlFor="absensiDate"
                    className="text-gray-300"
                    value="Tanggal Absensi"
                  />
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
            <Table hoverable className="mb-4">
              <Table.Head className="border-b border-[#242526]">
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-9/12">
                  Data Siswa
                </Table.HeadCell>

                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-3/12">
                  Kehadiran
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataKelasSiswa.map((data, index) => (
                  <Table.Row
                    key={"as" + index}
                    className="border border-[#242526] bg-[#3A3B3C] hover:bg-[#4f5052]"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-300 dark:text-white">
                      <span className="text-base text-gray-300 dark:text-white">
                        {data.student.firstName} {data.student.lastName}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Nis: {data.student.nis}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Jenis kelamin: {data.student.gender}
                      </span>
                    </Table.Cell>

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
            <Button onClick={saveData} gradientDuoTone="pinkToOrange">
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-red-500">Data siswa belum ada</div>
      )}
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
  return <AppLayout headMenu="Absensi Kelas Siswa">{content}</AppLayout>;
};

export default AbsensiPeriodePage;
