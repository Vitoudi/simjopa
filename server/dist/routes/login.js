"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
var express_1 = require("express");
var adaptExpressRoute_1 = require("../adapters/adaptExpressRoute");
var login_1 = require("../useCases/login");
var loginRouter = express_1.Router();
exports.loginRouter = loginRouter;
loginRouter.post("/", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) {
        return login_1.loginController.handle(req, res);
    });
});
