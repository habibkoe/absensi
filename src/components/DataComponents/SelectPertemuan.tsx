import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  errors?: any;
  color?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectPertemuan = (props: Props) => {
  const pertemuans = [];

  for (let pertemuan = 1; pertemuan <= 20; pertemuan++) {
    pertemuans.push(pertemuan);
  }

  const [arrPertemuan, setArrPertemuan] = useState<any[]>(pertemuans);

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="pertemuan" className="text-gray-300" value="Pertemuan" />
      </div>
      <Select
        id="pertemuan"
        name="pertemuan"
        defaultValue={props.value}
        onChange={props.handleChange}
        color={props.color}
        helperText={props.errors != null ? <>{props.errors}</> : ""}
      >
        <option value="">Pilih</option>
        {arrPertemuan.map((data, index) => (
          <option value={data} key={data}>
            Pertemuan ke {data}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectPertemuan;
