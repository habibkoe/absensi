import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTahun = (props: Props) => {
  const currentYear = new Date().getFullYear() + 10;
  const startYear = 1990;

  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  const [arrYears, setArrYears] = useState<any[]>(years);

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor={props.name} className="text-gray-300" value={props.label} />
      </div>
      <Select
        id={props.name}
        name={props.name}
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        <option value="">Pilih</option>
        {arrYears.map((data, index) => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectTahun;
