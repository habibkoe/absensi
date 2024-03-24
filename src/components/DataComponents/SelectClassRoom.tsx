import { useAllPosts } from "@/hooks/kelasHook";
import { Label, Select } from "flowbite-react";
import React, { ChangeEvent } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectClassRoom = (props: Props) => {
  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAllPosts();

  return (
    <>
      <div className="mb-2 block">
        <Label
          htmlFor="classRoomId"
          className="text-gray-300"
          value="Ruang Kelas"
        />
      </div>
      <Select
        id="classRoomId"
        name="classRoomId"
        required
        color="gray"
        defaultValue={props.value}
        onChange={props.handleChange}
      >
        <option value="">Pilih</option>
        {dataAll !== undefined &&
          dataAll.map((data, index) => (
            <option value={data.id} key={data.id}>
              {data.name}
            </option>
          ))}
      </Select>
    </>
  );
};

export default SelectClassRoom;
