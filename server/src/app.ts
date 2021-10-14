require("dotenv").config();
import express from "express";
import cors from "cors";
import formidable from "express-formidable";

const app = express();

// app.use(formidable());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

export { app };
