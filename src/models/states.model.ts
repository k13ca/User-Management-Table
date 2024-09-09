import { User } from "./users.model";
export interface SearchInitState {
  value: string;
  isSearchingStarted: boolean;
}

export interface SearchState {
  state: SearchInitState;
  setState: React.Dispatch<React.SetStateAction<SearchInitState>>;
}

export interface SelectedButtonState {
  isSelected: boolean;
  type: string;
}

export type UserDataState = Pick<
  User.General,
  "id" | "username" | "name" | "email" | "phone"
>;

export type columnType = Array<keyof UserDataState>;

export type columnWithoutIdType = Array<keyof UserInputData>;

export interface UserInputData {
  username: string;
  name: string;
  email: string;
  phone: string;
}
