import AppLayout from "@/components/AppLayout";
import SelectJamPelajaran from "@/components/DataComponents/SelectJamPelajaran";
import SelectMapel from "@/components/DataComponents/SelectMapel";
import SelectSemester from "@/components/DataComponents/SelectSemester";
import SelectStatusAbsen from "@/components/DataComponents/SelectStatusAbsen";
import { Button, Datepicker, Label, Table, Toast } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { format } from "date-fns";
import { postData } from "@/services/absensiService";
import { siteConfig } from "@/libs/config";
import CardForm from "@/components/Attribute/CardForm";
import { usePostById as usePeriodeById } from "@/hooks/periodeHook";
import { usePostById as usePostKelasById } from "@/hooks/kelasHook";
import { usePostById as useUserById } from "@/hooks/userHook";
import { useDataByClassAndPeriode } from "@/hooks/siswaHook";
import ToastSave from "@/components/Attribute/ToastSave";

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

  const router = useRouter();
  const { data: session } = useSession();
  const { params } = router.query;

  let kelasId = params ? params[0] : null;
  let periodeId = params ? params[1] : null;

  const {
    data: dataPeriode,
    isPending: isPeriodeLoading,
    isError: isPeriodeError,
  } = usePeriodeById(Number(periodeId));

  const {
    data: dataKelas,
    isPending: isKelasLoading,
    isError: isKelasError,
  } = usePostKelasById(Number(periodeId));


  const {
    data: dataUser,
    isPending: isUserLoading,
    isError: isUserError,
  } = useUserById(Number(session?.user?.id));

  const {
    data: dataKelasPeriode,
    isPending: isDataKelasPeriodeLoading,
    isError: isDataKelasPeriodeError,
  } = useDataByClassAndPeriode(Number(kelasId), Number(periodeId));

  const [dataMapel, setDataMapel] = useState<any>();
  const [dataDate, setDataDate] = useState<any>();
  const [dataJamPelajaran, setJamPelajaran] = useState<any>();
  const [dataSemester, setSemester] = useState<any>();
  const [dataAbsensi, setDataAbsensi] = useState<any[]>([]);

  const [currentId, setCurrentId] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const [showToastMessage, setShowToastMessage] = useState<any>({
    type: 0,
    message: "",
  });

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
        setShowToast(true);
        setShowToastMessage({
          type: 1,
          message: "Berhasil simpan data",
        });
      } else {
        setShowToast(true);
        setShowToastMessage({
          type: 2,
          message: "Gagal simpan data",
        });
        console.error("Failed to post data");
      }
    }
  };

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Absensi Kelas Siswa`}</title>
      </Head>
      {dataKelasPeriode !== undefined && dataKelasPeriode.length > 0 ? (
        <div className="w-full">
          <div className="rounded-lg p-5 mb-4 bg-[#3A3B3C]">
            <CardForm>
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
            </CardForm>
          </div>

          <div className="overflow-x-auto">
            <Table hoverable className="mb-4">
              <Table.Head className="border-b border-[#242526]">
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 md:w-9/12 w-6/12">
                  Data Siswa
                </Table.HeadCell>

                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 md:w-3/12 w-6/12">
                  Kehadiran
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataKelasPeriode.map((data : any, index : any) => (
                  <Table.Row
                    key={"as" + index}
                    className="border border-[#242526] bg-[#3A3B3C] hover:bg-[#4f5052]"
                  >
                    <Table.Cell className="td-custom">
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
      {showToastMessage.type > 0 ? (
          <Toast className="mb-10 fixed bottom-2 right-10 z-50">
            <ToastSave
              type={showToastMessage.type}
              message={showToastMessage.message}
            />
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
