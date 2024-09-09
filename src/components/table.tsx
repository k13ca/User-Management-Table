import Loading from "./loading";
import Rows from "./rows";
import deleteIcon from "../assets/delete-icon.png";
import { COLUMNS, COLUMNS_ID } from "../constants/conts";
import Error from "./error";
import { FC } from "react";
import { Props } from "../models/props.model";

const Table: FC<Props.Table> = ({
  selectedButton,
  data,
  loading,
  error,
  isAnyButtonsSelected,
  setModalAlert,
  filteredData,
  searchResults,
  setUserIdToDelete,
}) => {
  const markColumn = (columnName: string) => {
    const concreteButton = selectedButton.find(
      (item) => item.type.toLowerCase() === columnName
    );
    return concreteButton?.isSelected === true;
  };

  const isSearchingStarted = () => {
    return searchResults.isSearchingStarted ? filteredData : data;
  };

  const setUserToDelete = (id: number) => {
    setModalAlert(true);
    setUserIdToDelete(id);
  };
  return (
    <table>
      <thead>
        <tr>
          {COLUMNS.map((item) => (
            <th key={item} scope="col">
              {item}
            </th>
          ))}
        </tr>
      </thead>

      {!error && (
        <tbody>
          {isSearchingStarted().map((user) => (
            <tr key={user.id}>
              {COLUMNS_ID.map((column) => (
                <Rows
                  markColumn={markColumn}
                  columnName={column}
                  key={column}
                  isAnyButtonsSelected={isAnyButtonsSelected}
                >
                  {loading ? <Loading /> : user[column]}
                </Rows>
              ))}

              <td>
                <div>
                  <img
                    src={deleteIcon}
                    className="icons"
                    style={{ cursor: "pointer" }}
                    onClick={() => setUserToDelete(user.id)}
                  ></img>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      )}

      {error && <Error />}
    </table>
  );
};

export default Table;
