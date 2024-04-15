import AppLayout from "@/components/AppLayout";
import AddButton from "@/components/Attribute/AddButton";
import LoadingListMaster from "@/components/Attribute/LoadingListMaster";
import CardList from "@/components/Forms/Settings/User/CardList";
import FormUser from "@/components/Forms/Settings/User/FormUser";
import { useAllPosts } from "@/hooks/userHook";
import { siteConfig } from "@/libs/config";
import { useGlobalState } from "@/store/globalStore";
import Head from "next/head";
import React from "react";

const UserPage = () => {
  const setGlobal = useGlobalState((state) => state.setGlobal);
  const showFormUser = useGlobalState((state) => state.showFormUser);

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAllPosts();

  const newData = (params: boolean) => {
    setGlobal("showFormUser", params);
  };

  if (isDataLoading) {
    return <LoadingListMaster />;
  }

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Users`}</title>
      </Head>

      <div className="w-full">
        {!showFormUser ? (
          <AddButton handleClick={() => newData(true)}>
            Tambah data kelas
          </AddButton>
        ) : null}

        {showFormUser ? <FormUser /> : null}

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

UserPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Users">{content}</AppLayout>;
};

export default UserPage;
