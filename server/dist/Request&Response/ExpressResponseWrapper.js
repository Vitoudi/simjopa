"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressWrapperResponse = void 0;
var ExpressWrapperResponse = /** @class */ (function () {
    function ExpressWrapperResponse(res) {
        this.res = res;
    }
    ExpressWrapperResponse.prototype.sendJson = function (jsonData) {
        this.res.json(jsonData);
    };
    ExpressWrapperResponse.prototype.send = function (text) {
        this.res.send(text);
    };
    ExpressWrapperResponse.prototype.setStatusCode = function (status) {
        this.res.status(status);
        return this;
    };
    return ExpressWrapperResponse;
}());
exports.ExpressWrapperResponse = ExpressWrapperResponse;
