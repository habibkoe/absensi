import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectJamPelajaran = (props: Props) => {
  const jamPelajarans = [];

  for (let jam = 1; jam <= 5; jam++) {
    jamPelajarans.push(jam);
  }

  const [arrJam, setArrJam] = useState<any[]>(jamPelajarans);

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="jamPelajaran" className="text-gray-300" value="Jam Pelajaran" />
      </div>
      <Select
        id="jamPelajaran"
        name="jamPelajaran"
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        <option value="">Pilih</option>
        {arrJam.map((data, index) => (
          <option value={data} key={data}>
            Jam ke {data}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectJamPelajaran;
