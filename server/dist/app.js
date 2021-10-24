"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
exports.app = app;
var allowedOrigins = [
    "https://simjopa.vercel.app",
    "http://localhost:3000",
];
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({ origin: allowedOrigins }));
