import AppLayout from "@/components/AppLayout";
import AddButton from "@/components/Attribute/AddButton";
import LoadingListMaster from "@/components/Attribute/LoadingListMaster";
import CardList from "@/components/Forms/Settings/Siswa/CardList";
import FormSiswa from "@/components/Forms/Settings/Siswa/FormSiswa";
import { useAllPosts } from "@/hooks/siswaHook";
import { siteConfig } from "@/libs/config";
import { useGlobalState } from "@/store/globalStore";
import Head from "next/head";
import React from "react";

const SiswaPage = () => {
  const setGlobal = useGlobalState((state) => state.setGlobal);
  const showFormSiswa = useGlobalState((state) => state.showFormSiswa);

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAllPosts();

  const newData = (params: boolean) => {
    setGlobal("showFormSiswa", params);
  };

  if (isDataLoading) {
    return <LoadingListMaster />;
  }

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Siswa`}</title>
      </Head>

      <div className="w-full">
        {!showFormSiswa ? (
          <AddButton handleClick={() => newData(true)}>
            Tambah data siswa
          </AddButton>
        ) : null}

        {showFormSiswa ? <FormSiswa /> : null}
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

SiswaPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Siswa">{content}</AppLayout>;
};

export default SiswaPage;
