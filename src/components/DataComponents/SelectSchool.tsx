import { useAllPosts } from "@/hooks/schoolHook";
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

const SelectSchool = (props: Props) => {
  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAllPosts();

  return (
    <>
      <div className="mb-2 block">
        <Label
          htmlFor="schoolId"
          className="text-gray-300"
          value="Sekolah"
        />
      </div>
      <Select
        id="schoolId"
        name="schoolId"
        required
        color={props.color}
        helperText={props.errors != null ? <>{props.errors}</> : ""}
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

export default SelectSchool;
