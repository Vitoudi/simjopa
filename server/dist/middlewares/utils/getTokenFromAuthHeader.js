"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecodedTokenFromAuthHeader = exports.getRawTokenFromAuthHeader = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getRawTokenFromAuthHeader(authHeader) {
    var token = authHeader.split(" ")[1];
    return token;
}
exports.getRawTokenFromAuthHeader = getRawTokenFromAuthHeader;
function getDecodedTokenFromAuthHeader(authHeader) {
    var token = getRawTokenFromAuthHeader(authHeader);
    var decodedToken = jsonwebtoken_1.default.decode(token);
    return decodedToken;
}
exports.getDecodedTokenFromAuthHeader = getDecodedTokenFromAuthHeader;
