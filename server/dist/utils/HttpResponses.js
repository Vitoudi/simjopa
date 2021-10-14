"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customHttpResponse = exports.internalServerError = exports.notFound = exports.badRequest = exports.unauthorized = exports.noContent = exports.created = exports.ok = exports.sendHttpResponseWithMsg = exports.HTTP_STATUS_CODES = void 0;
var HTTP_STATUS_CODES;
(function (HTTP_STATUS_CODES) {
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["OK"] = 200] = "OK";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["CREATED"] = 201] = "CREATED";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["NO_CONTENT"] = 204] = "NO_CONTENT";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_STATUS_CODES[HTTP_STATUS_CODES["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HTTP_STATUS_CODES = exports.HTTP_STATUS_CODES || (exports.HTTP_STATUS_CODES = {}));
function getJsonMsgTemplate(msg) {
    return { msg: msg };
}
function sendHttpResponseWithMsg(_a) {
    var msg = _a.msg, res = _a.res, status = _a.statusCode;
    var resWithStatus = res.setStatusCode(status);
    return msg ? resWithStatus.sendJson(getJsonMsgTemplate(msg)) : resWithStatus.send();
}
exports.sendHttpResponseWithMsg = sendHttpResponseWithMsg;
function ok(res, data) {
    return res.setStatusCode(200).sendJson(data);
}
exports.ok = ok;
function created(res, data) {
    return res.setStatusCode(201).sendJson(data);
}
exports.created = created;
function noContent(res, msg) {
    return sendHttpResponseWithMsg({ statusCode: 204, res: res, msg: msg });
}
exports.noContent = noContent;
function unauthorized(res, msg) {
    return sendHttpResponseWithMsg({ statusCode: 401, res: res, msg: msg });
}
exports.unauthorized = unauthorized;
function badRequest(res, msg) {
    return sendHttpResponseWithMsg({ statusCode: 400, res: res, msg: msg });
}
exports.badRequest = badRequest;
function notFound(res, msg) {
    return sendHttpResponseWithMsg({ statusCode: 404, res: res, msg: msg });
}
exports.notFound = notFound;
function internalServerError(res, msg) {
    return sendHttpResponseWithMsg({ statusCode: 500, res: res, msg: msg });
}
exports.internalServerError = internalServerError;
function customHttpResponse(res, _a) {
    var status = _a.statusCode, msg = _a.msg;
    return sendHttpResponseWithMsg({ statusCode: status, res: res, msg: msg });
}
exports.customHttpResponse = customHttpResponse;
