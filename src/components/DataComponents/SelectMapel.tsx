import { usePostByUserId } from "@/hooks/mapelHook";
import { Label, Select } from "flowbite-react";
import React, { ChangeEvent } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  typeData?: any;
  userId?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMapel = (props: Props) => {

  const { isPending: isPeriodeLoading, error: isPeriodeError, data: dataMapel } = usePostByUserId(props.typeData, props.userId);


  console.log("check data mapel ", dataMapel);

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="mapelId" className="text-gray-300" value="Mata Pelajaran" />
      </div>
      {props.typeData && props.typeData == 1 ? (
        <Select
          id="mapelId"
          name="mapelId"
          required
          defaultValue={props.value}
          onChange={props.handleChange}
        >
          <option value="">Pilih</option>
          {/* {dataMapelByUser.map((data, index) => (
            <option value={data.mapel.id} key={data.mapel.id}>
              {data.mapel.name}
            </option>
          ))} */}
        </Select>
      ) : (
        <Select
          id="mapelId"
          name="mapelId"
          required
          defaultValue={props.value}
          onChange={props.handleChange}
        >
          <option value="">Pilih</option>
          {/* {dataMapel.map((data, index) => (
            <option value={data.id} key={data.id}>
              {data.name}
            </option>
          ))} */}
        </Select>
      )}
    </>
  );
};

export default SelectMapel;
