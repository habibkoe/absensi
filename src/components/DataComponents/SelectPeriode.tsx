import { useAllPosts } from "@/hooks/periodeHook";
import { Periode } from "@prisma/client";
import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
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
