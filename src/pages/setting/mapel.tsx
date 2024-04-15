import AppLayout from "@/components/AppLayout";
import AddButton from "@/components/Attribute/AddButton";
import LoadingListMaster from "@/components/Attribute/LoadingListMaster";
import CardList from "@/components/Forms/Settings/Mapel/CardList";
import FormMapel from "@/components/Forms/Settings/Mapel/FormMapel";
import { useAllPosts } from "@/hooks/mapelHook";
import { siteConfig } from "@/libs/config";
import { useGlobalState } from "@/store/globalStore";
import Head from "next/head";
import React from "react";

const MapelPage = () => {
  const setGlobal = useGlobalState((state) => state.setGlobal);
  const showFormMapel = useGlobalState((state) => state.showFormMapel);

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAllPosts();

  const newData = (params: boolean) => {
    setGlobal("showFormMapel", params);
  };

  if (isDataLoading) {
    return <LoadingListMaster />;
  }

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Mata Pelajaran`}</title>
      </Head>

      <div className="w-full">
        {!showFormMapel ? (
          <AddButton handleClick={() => newData(true)}>
            Tambah data mapel
          </AddButton>
        ) : null}

        {showFormMapel ? <FormMapel /> : null}
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

MapelPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Mata Pelajaran">{content}</AppLayout>;
};

export default MapelPage;
