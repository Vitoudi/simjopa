import mySql from "mysql2"

const connection = mySql.createConnection({
  host: process.env.DB_host,
  password: process.env.DB_password,
  user: process.env.DB_user,
  database: process.env.DB_database,
  port: process.env.DB_port ? +process.env.DB_port : 3306,
});

console.log("CONNECTION: ", connection);


export const db = connection.promise();

db.connect
