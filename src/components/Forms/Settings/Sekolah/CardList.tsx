import { useDeletePost } from "@/hooks/schoolHook";
import { useGlobalState } from "@/store/globalStore";
import { Schools } from "@prisma/client";
import { Card, Dropdown } from "flowbite-react";
import React from "react";
import {
  HiOutlineDocumentText,
  HiOutlineDotsHorizontal,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import FormSekolah from "./FormSekolah";

interface Props {
  children?: React.ReactNode;
  subTitle?: string;
  data?: Schools;
}

const CardList = (props: Props) => {
  const setGlobalArray = useGlobalState((state) => state.setGlobalArray);
  const showFormEditSekolah = useGlobalState(
    (state) => state.showFormEditSekolah
  );

  const {
    mutate: deleteMutate,
    isPending: isPeriodeDeleteLOading,
    isError: isErrorDeleteLoading,
  } = useDeletePost();

  const hapusData = async () => {
    deleteMutate(Number(props.data?.id), {
      onSuccess: (response) => {
        alert("Deleted Successfully!");
      },
    });
  };

  const editData = (params: boolean) => {
    setGlobalArray("showFormEditSekolah", Number(props.data?.id), params);
  };

  return (
    <div className="card-list-item">
      {showFormEditSekolah[Number(props.data?.id)] ? (
        <FormSekolah data={props.data} />
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <div className="table-icon">
              <HiOutlineDocumentText />
            </div>
            <div className="flex flex-col">
              <div>
                <span className="table-title">{props.data?.name}</span>
                <br />
                <span className="table-sub-title">
                  Location: {props.data?.location}
                </span>
              </div>
              <p className="font-normal text-xs text-[#DADCE1]">
                {props.subTitle}
              </p>
            </div>
          </div>
          <div>
            <Dropdown
              className="action-menu"
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <div className="action-menu-button">
                  <HiOutlineDotsHorizontal />
                </div>
              )}
            >
              <Dropdown.Item
                onClick={() => editData(true)}
                className="action-menu-list"
              >
                <HiOutlinePencil /> <div>Edit data</div>
              </Dropdown.Item>
              <Dropdown.Item onClick={hapusData} className="action-menu-list">
                <HiOutlineTrash /> <span>Hapus data</span>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;
