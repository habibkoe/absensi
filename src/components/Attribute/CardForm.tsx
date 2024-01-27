import React from "react";

interface Props {
  children?: React.ReactNode;
}

const CardForm = (props: Props) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      {props.children}
    </div>
  );
};

export default CardForm;
