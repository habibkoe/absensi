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

const SelectProvinsi = (props: Props) => {
  const [dataSelect, setDataSelect] = useState<any[]>([
    { id: 1, name: "Nusa Tenggara Barat" },
    { id: 2, name: "Nusa Tenggara Timur" },
    { id: 3, name: "Bali" }
  ]);
  return (
    <>
      <div className="mb-2 block">
        <Label
          htmlFor="province"
          className="text-gray-300"
          value="Provinsi"
        />
      </div>
      <Select
        id="province"
        name="province"
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

export default SelectProvinsi;