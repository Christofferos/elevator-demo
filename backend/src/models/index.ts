import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: "127.0.0.1",
  username: "chris",
  password: "chris",
  database: "elevators",
  storage: ":memory:",
});

export default sequelize;
