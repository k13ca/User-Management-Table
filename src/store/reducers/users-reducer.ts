import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../../services/fetch-users";
import { UserInitialState, UserInputDataPayload } from "../../models/store.model";
import { PromiseState } from "../../enums/enums";
import { userDataBuilder } from "../../services/user-builder";
const initialState: UserInitialState = {
  data: [],
  error: "",
  status: PromiseState.idle,
  viewData: [],
  userInputData: {email:"", name:"",phone:"",username:""},
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

addUserInput: (state, action: PayloadAction<UserInputDataPayload>) => {
  const prevState = state.userInputData;
  const columnName = action.payload.columnName;
  state.userInputData = {...prevState, [columnName]: action.payload.data}
},

addNewUser: (state) => {
  const lastUser = state.viewData[state.viewData.length - 1];
  const newUser = {...state.userInputData, id: lastUser.id + 1};
  state.viewData.push(newUser);
  state.userInputData = initialState.userInputData
},

deleteUser: (state, action) => {
  const dataAfterDeleteUser = state.viewData.filter(
    (item) => item.id !== action.payload
  );
state.viewData = dataAfterDeleteUser
}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = PromiseState.loading;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = PromiseState.succeeded;
        state.data = action.payload;
        state.viewData = action.payload.map((item) => userDataBuilder(item));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = PromiseState.failed;
        state.error = action.error.message;
      });
  },
});

export const {addNewUser, deleteUser, addUserInput} = usersSlice.actions;

export default usersSlice.reducer;
