import { getAllData } from "@/services/studentService";
import { Students } from "@prisma/client";
import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectStudent = (props: Props) => {
  const [dataSiswa, setDataSiswa] = useState<Students[]>([]);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataSiswa(datas.data);
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
        <Label htmlFor="studentId" value="Siswa" />
      </div>
      <Select
        id="studentId"
        name="studentId"
        required
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        <option value="">Pilih</option>
        {dataSiswa.map((data, index) => (
          <option value={data.id} key={data.id}>
            {data.firstName} {data.lastName}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectStudent;
