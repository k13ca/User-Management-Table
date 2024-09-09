import { columnType, columnWithoutIdType } from "../models/states.model";

export const COLUMNS = ["Id", "Username", "Name", "Email", "Phone"];
export const COLUMNS_ID = COLUMNS.map((item) =>
  item.toLowerCase()
) as columnType;

export const COLUMNS_WITHOUT_ID = COLUMNS_ID.filter(
  (item) => item !== "id"
) as columnWithoutIdType;
