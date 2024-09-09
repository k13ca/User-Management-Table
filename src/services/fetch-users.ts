import { User } from "../models/users.model";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk<Array<User.General>>(
  "users/fetchUsers",
  async () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  }
);
