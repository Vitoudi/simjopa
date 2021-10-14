"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
var getTokenFromAuthHeader_1 = require("./utils/getTokenFromAuthHeader");
var HttpResponses_1 = require("../utils/HttpResponses");
function requireRole(userRole) {
    return function (req, res, next) {
        var authHeader = req.headers.authorization;
        var decodedToken = getTokenFromAuthHeader_1.getDecodedTokenFromAuthHeader(authHeader);
        var role = decodedToken.role;
        if (role < userRole)
            return res
                .status(HttpResponses_1.HTTP_STATUS_CODES.UNAUTHORIZED)
                .json({ msg: "sua conta não tem permissão" });
        next();
    };
}
exports.requireRole = requireRole;
