import { getAllData } from "@/services/periodeService";
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
  const [dataPeriode, setDataPeriode] = useState<Periode[]>([]);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataPeriode(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="periodeId" value="Tahun Angkatan" />
      </div>
      <Select
        id="periodeId"
        name="periodeId"
        required
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        <option value="">Pilih</option>
        {dataPeriode.map((data, index) => (
          <option value={data.id} key={data.id}>
            {data.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectPeriode;
