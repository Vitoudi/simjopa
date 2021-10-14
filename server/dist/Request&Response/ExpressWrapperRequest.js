"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressWrapperRequest = void 0;
var ExpressWrapperRequest = /** @class */ (function () {
    function ExpressWrapperRequest(req) {
        this.req = req;
    }
    ;
    ExpressWrapperRequest.prototype.getBody = function () {
        return this.req.body;
    };
    ExpressWrapperRequest.prototype.getBodyProp = function (propName) {
        return this.getBody()[propName];
    };
    ExpressWrapperRequest.prototype.getParams = function () {
        return this.req.params;
    };
    ExpressWrapperRequest.prototype.extractParam = function (paramName) {
        return this.getParams()[paramName];
    };
    ExpressWrapperRequest.prototype.getBodyPropAsNumber = function (propName) {
        var props = this.getBody();
        return this.getAsNumber(props, propName);
    };
    ExpressWrapperRequest.prototype.getParamAsNumber = function (paramName) {
        var params = this.getParams();
        return this.getAsNumber(params, paramName);
    };
    ExpressWrapperRequest.prototype.getFile = function () {
        return this.req.file;
    };
    ExpressWrapperRequest.prototype.getHeaders = function () {
        return this.req.headers;
    };
    ExpressWrapperRequest.prototype.getDecodedAuthToken = function () {
        var decodedToken = this.req.decodedToken;
        if (!decodedToken)
            return null;
        return decodedToken;
    };
    ExpressWrapperRequest.prototype.getQueryParams = function () {
        return this.req.query;
    };
    ExpressWrapperRequest.prototype.getAsNumber = function (obj, propName) {
        var value = obj[propName];
        return Number(value);
    };
    return ExpressWrapperRequest;
}());
exports.ExpressWrapperRequest = ExpressWrapperRequest;
