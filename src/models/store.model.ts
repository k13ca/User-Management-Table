import { PromiseState } from "../enums/enums";
import { UserDataState } from "./states.model";
import { User } from "./users.model";

export type PromiseStateType =
  | PromiseState.failed
  | PromiseState.idle
  | PromiseState.loading
  | PromiseState.succeeded;

export interface UserInitialState {
  data: Array<User.General>;
  status: PromiseStateType;
  error: string | undefined;
  viewData: Array<UserDataState>;
}
