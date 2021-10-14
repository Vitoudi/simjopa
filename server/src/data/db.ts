import mySql from "mysql2"

const connectionObj = {
  host: process.env.DB_host,
  password: process.env.DB_password,
  user: process.env.DB_user,
  database: process.env.DB_database,
  port: process.env.DB_port ? +process.env.DB_port : 3306,
}

const connection = mySql.createConnection(connectionObj);

console.log("CONNECTION: ", connectionObj);


export const db = connection.promise();

db.connect
