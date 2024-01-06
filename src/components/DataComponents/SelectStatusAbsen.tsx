import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
  label?: any;
  value?: string | number;
  placeholder?: string;
  name?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectStatusAbsen = (props: Props) => {
  const [arrAbsensi, setArrAbsensi] = useState<any[]>([
    { id: 1, name: "Hadir" },
    { id: 2, name: "Sakit" },
    { id: 3, name: "Bolos" },
    { id: 4, name: "Alpa" },
    { id: 5, name: "Izin" },
    { id: 6, name: "Terlambat" },
  ]);

  return (
    <>
      {props.label ? (
        <div className="mb-2 block">
          <Label htmlFor="absensiType" value="Status Absensi" />
        </div>
      ) : null}

      <Select
        id="absensiType"
        name="absensiType"
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        {arrAbsensi.map((data, index) => (
          <option value={data.name} key={data.id}>
            {data.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectStatusAbsen;
