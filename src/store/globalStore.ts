import { GlobalModel } from "@/models/GlobalModel";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  setGlobal: (name: string, value: any) => any;
  setGlobalArray: (name: string, uniqueKey: any, value: any) => any;
  resetGlobal: () => any;
};

const initialState: GlobalModel = {
  showFormPeriode: false,
  showFormKelas: false,
  showFormMapel: false,
  showFormSekolah: false,
  showFormSiswaKelas: false,
  showFormSiswa: false,
  showFormUser: false,
  showFormEditPeriode: [],
  showFormEditKelas: [],
  showFormEditMapel: [],
  showFormEditSekolah: [],
  showFormEditSiswaKelas: [],
  showFormEditSiswa: [],
  showFormEditUser: []
};

const globalState = create(
  devtools(
    persist<GlobalModel & Actions>(
      (set, get) => ({
        ...initialState,
        resetGlobal: () => {
          set(initialState);
        },
        setGlobal: (name: string, value: any) =>
          set(
            produce((draft) => {
              draft[name] = value;
            })
          ),
        setGlobalArray: (name: string, uniqueKey: any, value: any) =>
          set(
            produce((draft) => {
              console.log("check name ", name)
              console.log("check key ", uniqueKey)
              console.log("check value ", value)
              draft[name][uniqueKey] = value;
            })
          ),
      }),
      {
        name: "globalState",
      }
    )
  )
);

export const useGlobalState = globalState;
