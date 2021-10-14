"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptExpressRoute = void 0;
var ExpressResponseWrapper_1 = require("../Request&Response/ExpressResponseWrapper");
var ExpressWrapperRequest_1 = require("../Request&Response/ExpressWrapperRequest");
function adaptExpressRoute(req, res, cb) {
    var customReq = new ExpressWrapperRequest_1.ExpressWrapperRequest(req);
    var customRes = new ExpressResponseWrapper_1.ExpressWrapperResponse(res);
    return cb(customReq, customRes);
}
exports.adaptExpressRoute = adaptExpressRoute;
