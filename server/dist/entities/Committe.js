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
exports.Committe = void 0;
var GenericEntity_1 = require("./GenericEntity");
var Committe = /** @class */ (function (_super) {
    __extends(Committe, _super);
    function Committe(name, imgRef, id) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.id = id;
        _this.imgRef = Committe.getImgRefForFileName(imgRef);
        return _this;
    }
    Committe.getImgRefForFileName = function (imgFileName) {
        var path = "/assets/committes";
        return path + "/" + imgFileName;
    };
    return Committe;
}(GenericEntity_1.GenericEntity));
exports.Committe = Committe;