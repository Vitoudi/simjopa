"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var GenericEntity_1 = require("./GenericEntity");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["USER"] = 0] = "USER";
    UserRole[UserRole["JOURNALIST"] = 1] = "JOURNALIST";
    UserRole[UserRole["ADMIN"] = 2] = "ADMIN";
    UserRole[UserRole["MASTER"] = 3] = "MASTER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
(function (UserRole) {
    function includes(numProp) {
        for (var key in UserRole) {
            var keyAsNumber = Number(key);
            if (keyAsNumber === numProp)
                return true;
        }
        return false;
    }
    UserRole.includes = includes;
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(name, email, hashPassword, role, imgRef, id) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.email = email;
        _this.hashPassword = hashPassword;
        _this.role = role;
        _this.imgRef = imgRef;
        _this.id = id;
        return _this;
    }
    User.prototype.hasValidUsername = function () {
        var MIN_LENGTH = 3;
        var hasMinLength = this.name.length >= MIN_LENGTH;
        return hasMinLength;
    };
    return User;
}(GenericEntity_1.GenericEntity));
exports.User = User;
