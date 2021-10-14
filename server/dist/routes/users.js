"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
var express_1 = require("express");
var adaptExpressRoute_1 = require("../adapters/adaptExpressRoute");
var SignUp_1 = require("../useCases/SignUp");
var getUserByAuthToken_1 = require("../useCases/getUserByAuthToken");
var usersRouter = express_1.Router();
exports.usersRouter = usersRouter;
usersRouter.post("/create", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) {
        return SignUp_1.signUpController.handle(req, res);
    });
});
usersRouter.get("/:token", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) {
        return getUserByAuthToken_1.getUserByAuthTokenController.handle(req, res);
    });
});
