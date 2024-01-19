import { getAllData } from "@/services/classRoomService";
import { ClassRooms } from "@prisma/client";
import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectClassRoom = (props: Props) => {
  const [dataKelas, setDataKelas] = useState<ClassRooms[]>([]);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataKelas(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="classRoomId" className="text-gray-300" value="Ruang Kelas" />
      </div>
      <Select
        id="classRoomId"
        name="classRoomId"
        required
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        <option value="">Pilih</option>
        {dataKelas.map((data, index) => (
          <option value={data.id} key={data.id}>
            {data.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectClassRoom;
