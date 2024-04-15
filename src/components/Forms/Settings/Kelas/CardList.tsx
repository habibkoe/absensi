import { useDeletePost } from "@/hooks/kelasHook";
import { useGlobalState } from "@/store/globalStore";
import { ClassRooms } from "@prisma/client";
import { Dropdown } from "flowbite-react";
import React from "react";
import {
  HiOutlineDocumentText,
  HiOutlineDotsHorizontal,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import FormKelas from "./FormKelas";

interface Props {
  children?: React.ReactNode;
  subTitle?: string;
  data?: ClassRooms;
}

const CardList = (props: Props) => {
  const setGlobalArray = useGlobalState((state) => state.setGlobalArray);
  const showFormEditKelas = useGlobalState((state) => state.showFormEditKelas);

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
    setGlobalArray("showFormEditKelas", Number(props.data?.id), params);
  };
  return (
    <div className="card-list-item">
      {showFormEditKelas[Number(props.data?.id)] ? (
        <FormKelas data={props.data} />
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
                  Lokasi: {props.data?.location}
                </span>
                <br />
                <span className="table-sub-title">
                  Daya Tampung: {props.data?.studentTotal}
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
