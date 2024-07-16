import pg from "pg";
import dotenv from "dotenv";

const saltRounds = 10;
dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "worksuit",
  password: "070904",
  port: 5433,
});
db.connect((err) => {
  if (err) {
    console.log("Error establishing Connection", err);
  } else {
    console.log("Connection Succesfull");
  }
});

export default db;
