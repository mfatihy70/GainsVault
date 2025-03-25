import createUserTable from "./createUserTable.js";

export const migration = async () => {
    await createUserTable();
}