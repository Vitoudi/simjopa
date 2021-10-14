"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var adaptExpressRoute_1 = require("../adapters/adaptExpressRoute");
var getJornalists_1 = require("../useCases/getJornalists");
var getJournalist_1 = require("../useCases/getJournalist");
var MulterStorage_1 = require("../utils/MulterStorage");
exports.router = express_1.default.Router();
var upload = multer_1.default({ storage: MulterStorage_1.multerUserStorage }).single("profileImg");
exports.router.get("/", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return getJornalists_1.getJournalistsController.handle(req, res); });
});
exports.router.get("/:id", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) {
        return getJournalist_1.getJournalistByIdController.handle(req, res);
    });
});
exports.router.get("/user/:id", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) {
        return getJournalist_1.getJournalistByUserIdController.handle(req, res);
    });
});
