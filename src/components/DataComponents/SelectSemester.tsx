import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectSemester = (props: Props) => {
  const pertemuans = [];

  for (let pertemuan = 1; pertemuan <= 2; pertemuan++) {
    pertemuans.push(pertemuan);
  }

  const [arrPertemuan, setArrPertemuan] = useState<any[]>(pertemuans);

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="semester" value="Semester" />
      </div>
      <Select
        id="semester"
        name="semester"
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        <option value="">Pilih</option>
        {arrPertemuan.map((data, index) => (
          <option value={data} key={data}>
            Semester {data}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectSemester;
