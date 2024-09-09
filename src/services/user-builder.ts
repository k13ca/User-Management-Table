import { User } from "../models/users.model";

export const userDataBuilder = (data: User.General) => ({
  id: data.id,
  username: data.username,
  email: data.email,
  phone: data.phone,
  name: data.name,
});
