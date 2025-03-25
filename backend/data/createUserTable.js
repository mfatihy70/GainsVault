import { sequelize } from '../config/db.js';

const createUserTable = async () => {
    const query = `
        CREATE TABLE if not exists users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
    try {
        await sequelize.query(query);
        console.log("User table created successfully");
    }
    catch (error) {
        console.error("Error creating user table: " + error);
    }
}
export default createUserTable;
