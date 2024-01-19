import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
  label?: any;
  value?: string | number;
  placeholder?: string;
  name?: any;
  indexData?: number;
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
          <Label htmlFor="absensiType" className="text-gray-300" value="Status Absensi" />
        </div>
      ) : null}

      <Select
        id="absensiType"
        name="absensiType"
        data-indexdata={props.indexData}
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        <option value="">Pilih</option>
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
