"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.committesRouter = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var adaptExpressRoute_1 = require("../adapters/adaptExpressRoute");
var User_1 = require("../entities/User");
var requireRole_1 = require("../middlewares/requireRole");
var createCommitte_1 = require("../useCases/createCommitte");
var getCommittes_1 = require("../useCases/getCommittes");
var getCommitte_1 = require("../useCases/getCommitte");
var MulterStorage_1 = require("../utils/MulterStorage");
var update = multer_1.default({ storage: MulterStorage_1.multerCommitteStorage }).single("committeImg");
var committesRouter = express_1.Router();
exports.committesRouter = committesRouter;
committesRouter.get('/', function (req, res) { return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return getCommittes_1.getAllCommittesController.handle(req, res); }); });
committesRouter.get("/:id", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return getCommitte_1.getCommitteController.handle(req, res); });
});
committesRouter.use(requireRole_1.requireRole(User_1.UserRole.ADMIN));
committesRouter.post("/", update, function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return createCommitte_1.createCommitteController.handle(req, res); });
});
