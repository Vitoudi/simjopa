require("dotenv").config();
import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "https://simjopa.vercel.app",
  "http://localhost:3000",
];

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins }));

export { app };
