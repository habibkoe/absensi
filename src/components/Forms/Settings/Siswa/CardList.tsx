import { useDeletePost } from "@/hooks/siswaHook";
import { useGlobalState } from "@/store/globalStore";
import { Students } from "@prisma/client";
import { Dropdown } from "flowbite-react";
import React from "react";
import {
  HiOutlineDocumentText,
  HiOutlineDotsHorizontal,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import FormSiswa from "./FormSiswa";

interface Props {
  children?: React.ReactNode;
  subTitle?: string;
  data?: Students;
}

const CardList = (props: Props) => {
  const setGlobalArray = useGlobalState((state) => state.setGlobalArray);
  const showFormEditSiswa = useGlobalState((state) => state.showFormEditSiswa);
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
    setGlobalArray("showFormEditSiswa", Number(props.data?.id), params);
  };

  return (
    <div className="card-list-item">
      {showFormEditSiswa[Number(props.data?.id)] ? (
        <FormSiswa data={props.data} />
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <div className="table-icon">
              <HiOutlineDocumentText />
            </div>
            <div className="flex flex-col">
              <div>
                <span className="table-title">
                  {props.data?.firstName} {props.data?.lastName}
                </span>
                <br />
                <span className="table-sub-title">NIS: {props.data?.nis}</span>
                <br />
                <span className="table-sub-title">
                  Alamat: {props.data?.address}
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
