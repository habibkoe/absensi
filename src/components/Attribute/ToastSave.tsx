import { Toast } from "flowbite-react";
import React, { MouseEvent } from "react";
import { HiCheck } from "react-icons/hi";

interface Props {
  type?: number;
  message?: string;
}

const ToastSave = (props: Props) => {
  return (
    <>
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg  ${
          props.type == 1
            ? "text-green-500 dark:bg-green-800 bg-green-100"
            : "text-red-500 dark:bg-red-800 bg-red-100"
        }  dark:text-red-200`}
      >
        <HiCheck className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{props.message}</div>
    </>
  );
};

export default ToastSave;
