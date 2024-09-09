import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../../services/fetch-users";
import { UserInitialState } from "../../models/store.model";
import { PromiseState } from "../../enums/enums";
import { userDataBuilder } from "../../services/user-builder";
const initialState: UserInitialState = {
  data: [],
  error: "",
  status: PromiseState.idle,
  viewData: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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

export const {} = usersSlice.actions;

export default usersSlice.reducer;
