import AppLayout from "@/components/AppLayout";
import CardMenuList from "@/components/Attribute/CardMenuList";
import { usePostById } from "@/hooks/kelasHook";
import { useAllPosts } from "@/hooks/periodeHook";
import { siteConfig } from "@/libs/config";
import { getMonth, getYear } from "date-fns";

import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineCalendar, HiOutlineOfficeBuilding } from "react-icons/hi";

const AbsensiKelasPage = () => {
  const router = useRouter();

  let kelasId = router.query.id;

  const {
    isPending: isPeriodeLoading,
    error: isPeriodeError,
    data: dataPeriode,
  } = useAllPosts();

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataKelas,
  } = usePostById(Number(kelasId));

  const yearNow = getYear(new Date());
  const monthNow = getMonth(new Date());
  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Absensi Kelas`}</title>
      </Head>

      {dataPeriode !== undefined && dataPeriode.length > 0 ? (
        <div className="w-full">
          <div className="mb-2">
            <div className="flex gap-2 items-center dark:text-gray-300 text-gray-900 text-lg font-bold">
              <HiOutlineOfficeBuilding />
              <span>{dataKelas?.name}</span>
            </div>
            <div className="dark:text-gray-300 text-gray-900">
              Silahkan pilih periode tahun ajaran untuk melakukan absensi
            </div>
          </div>
          <div className="w-full space-y-2">
            {dataPeriode.map((data, index) => (
              <CardMenuList
                icon={<HiOutlineCalendar />}
                href={`/absensi/periode/${kelasId}/${data.id}`}
                subTitle={`TA ${data.periodeStart} - ${data.periodeEnd}`}
                key={index}
                isActive={
                  (yearNow == data.periodeEnd && monthNow < 7) ||
                  (yearNow == data.periodeStart && monthNow > 7)
                    ? true
                    : false
                }
              >
                {data.name}
              </CardMenuList>
              // <CardMenu
              //   href={`/absensi/periode/${kelasId}/${data.id}`}
              //   key={index}
              //   subTitle={`TA ${data.periodeStart} - ${data.periodeEnd}`}
              // >
              //   {data.name}
              // </CardMenu>
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
