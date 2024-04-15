import { useAllPosts } from "@/hooks/periodeHook";
import { Label, Select } from "flowbite-react";
import React, { ChangeEvent } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  errors?: any;
  color?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectPeriode = (props: Props) => {

  const { isPending: isPeriodeLoading, error: isPeriodeError, data: dataPeriode } = useAllPosts();

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="periodeId" className="text-gray-300" value="Tahun Ajaran" />
      </div>
      <Select
        id="periodeId"
        name="periodeId"
        required
        defaultValue={props.value}
        onChange={props.handleChange}
        color={props.color}
        helperText={props.errors != null ? <>{props.errors}</> : ""}
      >
        <option value="">Pilih</option>
        {dataPeriode !== undefined && dataPeriode.map((data, index) => (
          <option value={data.id} key={data.id}>
            {data.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectPeriode;
