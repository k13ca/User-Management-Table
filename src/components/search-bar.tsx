import { useRef } from "react";
import { FC } from "react";
import { Props } from "../models/props.model";
import searchIcon from "../assets/search-icon.png";
import closeIcon from "../assets/close-icon.png";
import { COLUMNS_ID } from "../constants/conts";
import { UserDataState } from "../models/states.model";
import { columnType } from "../models/states.model";

const SearchBar: FC<Props.SearchBar> = ({
  search,
  setSearch,
  selectedButton,
  data,
  setFilteredData,
  isAnyButtonsSelected,
}) => {
  const searchInput = useRef<HTMLInputElement | null>(null);

  const selectedButtonsName = selectedButton
    .filter((item) => item.isSelected)
    .map((item) => item.type.toLowerCase());

  const allColumns = COLUMNS_ID.map((item) => item.toLowerCase());

  const filterByColumns = (
    array: Array<UserDataState>,
    columns: columnType,
    value: string
  ) => {
    return array.filter((item) => {
      return columns.some((column) => {
        return String(item[column]).toLowerCase().includes(value.toLowerCase());
      });
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch({ value: value, isSearchingStarted: true });
    const filteredData = isAnyButtonsSelected
      ? filterByColumns(data, selectedButtonsName as columnType, value)
      : filterByColumns(data, allColumns as columnType, value);

    setFilteredData(filteredData);

    if (!value) {
      if (searchInput.current) {
        searchInput.current.value = "";
        setSearch({ value: "", isSearchingStarted: false });
        setFilteredData(data);
      }
    }
  };

  const handleResetInput = () => {
    if (searchInput.current) {
      searchInput.current.value = "";
      setSearch({ value: "", isSearchingStarted: false });
      setFilteredData(data);
    }
  };

  return (
    <div className="searchbar">
      <img src={searchIcon} className="icons" />
      <input
        type="text"
        placeholder="Search..."
        value={search.value}
        onChange={handleSearchInput}
        ref={searchInput}
      ></input>
      <img
        src={closeIcon}
        className="icons icon-hover"
        onClick={handleResetInput}
      />
    </div>
  );
};
export default SearchBar;
