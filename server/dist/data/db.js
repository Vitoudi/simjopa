"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
var connection = mysql2_1.default.createConnection({
    host: process.env.DB_host,
    password: process.env.DB_password,
    user: process.env.DB_user,
    database: process.env.DB_database,
    port: process.env.DB_port ? +process.env.DB_port : 3306,
});
console.log("CONNECTION: ", connection);
exports.db = connection.promise();
exports.db.connect;
