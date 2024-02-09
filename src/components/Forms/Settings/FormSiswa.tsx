import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import { useCreatePost, usePostById, useUpdatePost } from "@/hooks/siswaHook";
import {
  Button,
  Datepicker,
  Label,
  Select,
  TextInput,
  Toast,
} from "flowbite-react";
import React, { MouseEvent, useEffect, useState } from "react";
import { format } from "date-fns";

export interface NewForm {
  id?: Number | null;
  nis?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  parent?: string;
  rating?: number;
  favoriteLearn?: string;
  Hobby?: string;
}

interface Props {
  id?: any;
  isEdit?: boolean;
  handleCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FormSiswa = (props: Props) => {
  const {
    data: dataDetail,
    isPending: isDataLoading,
    isError: isPeriodeError,
  } = usePostById(props.id);

  let initialState: NewForm = {
    id: null,
    nis: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    parent: "",
    rating: 0,
    favoriteLearn: "",
    Hobby: "",
  };

  const [newData, setNewData] = useState<NewForm>(initialState);

  useEffect(() => {
    if (props.id != null) {
      setNewData({
        id: props.id,
        nis: dataDetail?.nis,
        firstName: dataDetail?.firstName,
        lastName: dataDetail?.lastName,
        email: dataDetail?.email,
        gender: dataDetail?.gender,
        dateOfBirth: dataDetail?.dateOfBirth,
        address: dataDetail?.address,
        parent: dataDetail?.parent,
        rating: dataDetail?.rating,
        favoriteLearn: dataDetail?.favoriteLearn,
        Hobby: dataDetail?.Hobby,
      });
    }
  }, [isDataLoading]);

  const [showToastMessage, setShowToastMessage] = useState<any>({
    type: 0,
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const datePickerHandler = (params: any) => {
    console.log("masuk sini nggak ", params);

    let newDate = format(new Date(params), "dd/MM/yyyy");

    console.log("masuk sini nggak new date ", newDate);
    setNewData({
      ...newData,
      dateOfBirth: newDate,
    });
  };

  const [saveLoading, setSaveLoading] = useState(false);

  const closeToast = () => {
    setShowToastMessage({
      type: 0,
      message: "",
    });
  };

  const {
    mutate: addMutate,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useCreatePost();

  const {
    mutate: editMudate,
    isPending: isUpdateLoading,
    isError: isUpdateError,
  } = useUpdatePost();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaveLoading(true);
      let store = null;

      if (
        newData.nis !== "" &&
        newData.firstName !== "" &&
        newData.gender !== "" &&
        String(newData.dateOfBirth) !== ""
      ) {
        if (!props.isEdit) {
          store = addMutate(newData, {
            onSuccess: (response) => {
              return response.data.body;
            },
          });
        } else {
          store = editMudate(
            { id: props.id, data: newData },
            {
              onSuccess: (response) => {
                return response.data.body;
              },
            }
          );
        }

        if (store !== null) {
          setNewData(initialState);

          setShowToastMessage({
            type: 1,
            message: "Berhasil simpan data",
          });
        } else {
          setShowToastMessage({
            type: 2,
            message: "Gagal simpan data",
          });
          console.error("Failed to post data");
        }

        setSaveLoading(false);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  if (isDataLoading) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <div className="rounded-lg p-5 mb-4 bg-[#3A3B3C]">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <CardForm>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="nis" className="text-gray-300" value="NIS" />
                </div>
                <TextInput
                  id="nis"
                  name="nis"
                  type="text"
                  placeholder="Nis siswa..."
                  required
                  color={newData.nis == "" ? "failure" : "gray"}
                  value={newData.nis}
                  helperText={
                    newData.nis == "" ? (
                      <>
                        <span className="font-medium">Oops!</span> Harus diisi
                      </>
                    ) : null
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="firstName"
                    className="text-gray-300"
                    value="Nama awal"
                  />
                </div>
                <TextInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="nama awal..."
                  required
                  color={newData.firstName == "" ? "failure" : "gray"}
                  value={newData.firstName}
                  helperText={
                    newData.firstName == "" ? (
                      <>
                        <span className="font-medium">Oops!</span> Harus diisi
                      </>
                    ) : null
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="lastName"
                    className="text-gray-300"
                    value="Nama Ahir"
                  />
                </div>
                <TextInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="nama ahir..."
                  value={newData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email"
                    className="text-gray-300"
                    value="Email"
                  />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email siswa..."
                  value={newData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="gender"
                    className="text-gray-300"
                    value="Gender"
                  />
                </div>
                <Select
                  id="gender"
                  name="gender"
                  required
                  value={newData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih</option>
                  <option value="laki - laki">Laki - Laki</option>
                  <option value="perempuan">Perempuan</option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email1"
                    className="text-gray-300"
                    value="DOB"
                  />
                </div>
                <Datepicker
                  name="dateOfBirth"
                  language="ID"
                  value={newData.dateOfBirth}
                  showTodayButton={false}
                  showClearButton={true}
                  onSelectedDateChanged={(date) => datePickerHandler(date)}
                  color="gray"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="address"
                    className="text-gray-300"
                    value="Alamat"
                  />
                </div>
                <TextInput
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Alamat siswa..."
                  value={newData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="parent"
                    className="text-gray-300"
                    value="Orang Tua"
                  />
                </div>
                <TextInput
                  id="parent"
                  type="text"
                  name="parent"
                  placeholder="Nama orang tua siswa..."
                  value={newData.parent}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="rating"
                    className="text-gray-300"
                    value="Rating"
                  />
                </div>
                <TextInput
                  id="rating"
                  type="text"
                  name="rating"
                  placeholder="Rating siswa..."
                  value={newData.rating}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="favoriteLearn"
                    className="text-gray-300"
                    value="Pelajaran Paforite"
                  />
                </div>
                <TextInput
                  id="favoriteLearn"
                  type="text"
                  name="favoriteLearn"
                  placeholder="pelajaran paforit siswa..."
                  value={newData.favoriteLearn}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="Hobby"
                    className="text-gray-300"
                    value="Hobby"
                  />
                </div>
                <TextInput
                  id="Hobby"
                  type="text"
                  name="Hobby"
                  placeholder="Hobi siswa..."
                  value={newData.Hobby}
                  onChange={handleInputChange}
                />
              </div>
            </CardForm>
            <div className="flex gap-4">
              {newData.nis == "" ||
              newData.firstName == "" ||
              newData.gender == "" ? (
                <Button color="dark">Simpan</Button>
              ) : (
                <Button
                  type="submit"
                  gradientDuoTone="pinkToOrange"
                  className="w-fit"
                >
                  Simpan
                </Button>
              )}
              <Button color="dark" onClick={props.handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
        {showToastMessage.type > 0 ? (
          <Toast className="mb-10 fixed bottom-2 right-10 z-50">
            <ToastSave
              type={showToastMessage.type}
              message={showToastMessage.message}
            />
            <Toast.Toggle onDismiss={() => closeToast()} />
          </Toast>
        ) : null}
      </>
    );
  }
};

export default FormSiswa;
