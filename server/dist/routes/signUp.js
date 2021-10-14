"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRouter = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var adaptExpressRoute_1 = require("../adapters/adaptExpressRoute");
var signUpJournalist_1 = require("../useCases/signUpJournalist");
var SignUp_1 = require("../useCases/SignUp");
var MulterStorage_1 = require("../utils/MulterStorage");
var signUpRouter = express_1.Router();
exports.signUpRouter = signUpRouter;
var uploadImg = multer_1.default({ storage: MulterStorage_1.multerUserStorage }).single("profileImg");
signUpRouter.post("/", uploadImg, function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return SignUp_1.signUpController.handle(req, res); });
});
signUpRouter.post("/journalist", uploadImg, function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return signUpJournalist_1.signUpJournalistController.handle(req, res); });
});
