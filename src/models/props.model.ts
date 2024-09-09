import {
  SearchInitState,
  SearchState,
  SelectedButtonState,
  UserDataState,
} from "./states.model";

export namespace Props {
  export interface Modal {
    handleUserDelete: () => void;
    setModalAlert: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export interface Option {
    columnName: string;
    selected: boolean; //część buttonInitState
    onClick: () => void;
  }

  export interface Rows {
    columnName: string;
    isAnyButtonsSelected: boolean;
    markColumn: (columnName: string) => boolean;
  }

  export interface SearchBar {
    search: SearchState["state"];
    isAnyButtonsSelected: boolean;
    selectedButton: Array<SelectedButtonState>;
    data: Array<UserDataState>;
    setSearch: SearchState["setState"];
    setFilteredData: React.Dispatch<React.SetStateAction<Array<UserDataState>>>;
  }

  export interface Table {
    selectedButton: Array<SelectedButtonState>;
    data: Array<UserDataState>;
    loading: boolean;
    error: boolean;
    isAnyButtonsSelected: boolean;
    filteredData: Array<UserDataState>;
    searchResults: SearchInitState;
    setUserIdToDelete: React.Dispatch<React.SetStateAction<number>>;
    setModalAlert: React.Dispatch<React.SetStateAction<boolean>>;
  }
}
