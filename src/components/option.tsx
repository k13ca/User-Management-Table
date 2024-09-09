import { FC } from "react";
import { Props } from "../models/props.model";
const Option: FC<Props.Option> = ({ columnName, selected, onClick }) => {
  return (
    <>
      <button
        key={columnName}
        className={`${selected ? "option-button-selected" : "option-button"}`}
        onClick={onClick}
      >
        {columnName}
      </button>
    </>
  );
};
export default Option;
