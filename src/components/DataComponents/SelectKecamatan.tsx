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

const SelectKecamatan = (props: Props) => {
  const [dataPeriode, setDataPeriode] = useState<any[]>([
    { id: "kepsek", name: "Kepala Sekolah" },
    { id: "wali", name: "Wali Kelas" },
    { id: "bendahara", name: "Kepala Sekolah" },
    { id: "waka", name: "Wakil Kepala Sekolah" },
    { id: "guru_mapel", name: "Guru Mata Pelajaran" },
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
        {dataPeriode.map((data, index) => (
          <option value={data.name} key={data.id}>
            {data.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectKecamatan;
