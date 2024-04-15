import AppLayout from "@/components/AppLayout";
import AddButton from "@/components/Attribute/AddButton";
import CardList from "@/components/Forms/Settings/Periode/CardList";
import { useAllPosts } from "@/hooks/periodeHook";
import { siteConfig } from "@/libs/config";
import Head from "next/head";
import React from "react";
import { useGlobalState } from "@/store/globalStore";
import LoadingListMaster from "@/components/Attribute/LoadingListMaster";
import FormPeriode from "@/components/Forms/Settings/Periode/FormPeriode";

const PeriodePage = () => {
  const setGlobal = useGlobalState((state) => state.setGlobal);
  const showFormPeriode = useGlobalState((state) => state.showFormPeriode);
  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAllPosts();

  const newData = (params: boolean) => {
    setGlobal("showFormPeriode", params);
  };

  if (isDataLoading) {
    return <LoadingListMaster />;
  }

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Periode`}</title>
      </Head>

      <div className="w-full">
        {!showFormPeriode ? (
          <AddButton handleClick={() => newData(true)}>
            Tambah data periode
          </AddButton>
        ) : null}

        {showFormPeriode ? <FormPeriode /> : null}
        {/* <FormCreatePeriode /> */}
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

PeriodePage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Periode">{content}</AppLayout>;
};

export default PeriodePage;
