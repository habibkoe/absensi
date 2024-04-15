import AppLayout from "@/components/AppLayout";
import AddButton from "@/components/Attribute/AddButton";
import { useAllPosts } from "@/hooks/kelasHook";
import { siteConfig } from "@/libs/config";
import Head from "next/head";
import React from "react";
import FormKelas from "@/components/Forms/Settings/Kelas/FormKelas";
import { useGlobalState } from "@/store/globalStore";
import CardList from "@/components/Forms/Settings/Kelas/CardList";
import LoadingListMaster from "@/components/Attribute/LoadingListMaster";

const KelasPage = () => {
  const setGlobal = useGlobalState((state) => state.setGlobal);
  const showFormKelas = useGlobalState((state) => state.showFormKelas);

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAllPosts();

  const newData = (params: boolean) => {
    setGlobal("showFormKelas", params);
  };

  if (isDataLoading) {
    return <LoadingListMaster />;
  }

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Kelas`}</title>
      </Head>

      <div className="w-full">
        {!showFormKelas ? (
          <AddButton handleClick={() => newData(true)}>
            Tambah data kelas
          </AddButton>
        ) : null}

        {showFormKelas ? <FormKelas /> : null}

        {dataAll !== undefined && dataAll?.length > 0 ? (
          <div className="overflow-x-auto">
            {dataAll.map((data, index) => (
              <CardList data={data} key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full text-red-500">Belum ada data</div>
        )}
      </div>
    </>
  );
};

KelasPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Kelas">{content}</AppLayout>;
};

export default KelasPage;
