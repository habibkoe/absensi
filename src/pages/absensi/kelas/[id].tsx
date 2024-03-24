import AppLayout from "@/components/AppLayout";
import CardMenu from "@/components/Attribute/CardMenu";
import { usePostById } from "@/hooks/kelasHook";
import { useAllPosts } from "@/hooks/periodeHook";
import { siteConfig } from "@/libs/config";

import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const AbsensiKelasPage = () => {
  const router = useRouter();

  let kelasId = router.query.id;

  const { isPending: isPeriodeLoading, error: isPeriodeError, data: dataPeriode } = useAllPosts();

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataKelas,
  } = usePostById(Number(kelasId));

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Absensi Kelas`}</title>
      </Head>

      {dataPeriode !== undefined && dataPeriode.length > 0 ? (
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
