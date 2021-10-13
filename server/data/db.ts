import mySql from "mysql2"

const connection = mySql.createConnection({
  host: "localhost",
  password: "vespadomar0",
  user: "root",
  database: "sinuma",
});


export const db = connection.promise();

db.connect
