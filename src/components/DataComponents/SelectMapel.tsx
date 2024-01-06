import { getAllData } from "@/services/mapelService";
import { getByUserData } from "@/services/userMapelService";
import { ClassRooms } from "@prisma/client";
import { Label, Select } from "flowbite-react";
import React, { ChangeEvent, useEffect, useState } from "react";

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
  const [dataMapel, setDataMapel] = useState<ClassRooms[]>([]);
  const [dataMapelByUser, setDataMapelByUser] = useState<any[]>([]);

  const getData = async () => {
    try {
      // if 1 = byUser
      if (props.typeData && props.typeData == 1) {
        let datas = await getByUserData(props.userId);
        setDataMapelByUser(datas.data);
      } else {
        let datas = await getAllData();
        setDataMapel(datas.data);
      }
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
        <Label htmlFor="mapelId" value="Mata Pelajaran" />
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
          {dataMapelByUser.map((data, index) => (
            <option value={data.mapel.id} key={data.mapel.id}>
              {data.mapel.name}
            </option>
          ))}
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
          {dataMapel.map((data, index) => (
            <option value={data.id} key={data.id}>
              {data.name}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};

export default SelectMapel;
