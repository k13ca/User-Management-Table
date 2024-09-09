import { FC, PropsWithChildren } from "react";
import { Props } from "../models/props.model";
const Rows: FC<PropsWithChildren<Props.Rows>> = ({
  children,
  markColumn,
  columnName,
  isAnyButtonsSelected,
}) => {
  const isSelected = markColumn(columnName);
  return (
    <td
      className={
        !isAnyButtonsSelected
          ? ""
          : isSelected
          ? "selected-column"
          : "not-selected-column"
      }
      data-label={children}
    >
      {children}
    </td>
  );
};

export default Rows;
