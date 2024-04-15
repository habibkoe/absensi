import AppLayout from "@/components/AppLayout";
import AddButton from "@/components/Attribute/AddButton";
import LoadingListMaster from "@/components/Attribute/LoadingListMaster";
import CardList from "@/components/Forms/Settings/Sekolah/CardList";
import FormSekolah from "@/components/Forms/Settings/Sekolah/FormSekolah";
import { useAllPosts } from "@/hooks/schoolHook";
import { siteConfig } from "@/libs/config";
import { useGlobalState } from "@/store/globalStore";
import Head from "next/head";
import React from "react";

const SchoolPage = () => {
  const setGlobal = useGlobalState((state) => state.setGlobal);
  const showFormSekolah = useGlobalState((state) => state.showFormSekolah);

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAllPosts();

  const newData = (params: boolean) => {
    setGlobal("showFormSekolah", params);
  };

  if (isDataLoading) {
    return <LoadingListMaster />;
  }

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Sekolah`}</title>
      </Head>

      <div className="w-full">
        {!showFormSekolah ? (
          <AddButton handleClick={() => newData(true)}>
            Tambah data sekolah
          </AddButton>
        ) : null}

        {showFormSekolah ? <FormSekolah /> : null}

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

SchoolPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Sekolah">{content}</AppLayout>;
};

export default SchoolPage;
