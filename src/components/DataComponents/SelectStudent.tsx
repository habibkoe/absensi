import { useAvailablePosts } from "@/hooks/siswaHook";
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

const SelectStudent = (props: Props) => {
  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useAvailablePosts();

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="studentId" className="text-gray-300" value="Siswa" />
      </div>
      <Select
        id="studentId"
        name="studentId"
        required
        defaultValue={props.value}
        onChange={props.handleChange}
        color={props.color}
        helperText={props.errors != null ? <>{props.errors}</> : ""}
      >
        <option value="">Pilih</option>
        {dataAll !== undefined &&
          dataAll.map((data, index) => (
            <option value={data.id} key={data.id}>
              {data.firstName} {data.lastName}
            </option>
          ))}
      </Select>
    </>
  );
};

export default SelectStudent;
