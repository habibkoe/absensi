import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";
import BottomInfo from "../Attribute/BottomInfo";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  errors?: any;
  color?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectKota = (props: Props) => {
  const [dataSelect, setDataSelect] = useState<any[]>([
    { id: 1, provinciId: 1, name: "Kabupaten Lombok Utara" },
    { id: 2, provinciId: 1, name: "Kabupaten Lombok Timur" },
    { id: 3, provinciId: 1, name: "Kabupaten Lombok Barat" },
    { id: 4, provinciId: 1, name: "Kabupaten Lombok Tengah" },
    { id: 5, provinciId: 1, name: "Kota Madya Mataram" },
  ]);
  return (
    <>
      <div className="mb-2 block">
        <Label
          htmlFor="typeTeacher"
          className="text-gray-300"
          value="Jabatan guru"
        />
      </div>
      <Select
        id="typeTeacher"
        name="typeTeacher"
        required
        value={props.value}
        onChange={props.handleChange}
        color={props.color}
        helperText={props.errors != null ? <>{props.errors}</> : ""}
      >
        <option value="">Pilih</option>
        {dataSelect.map((data, index) => (
          <option value={data.id} key={data.id}>
            {data.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectKota;
